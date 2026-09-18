"use client";

/* eslint-disable react-hooks/immutability --
   three.js objects are mutable by design. Everything here is mutated only
   inside the render loop (`useFrame`), never during a React render. */

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { CABIN, STAIR, STOREY } from "@/lib/scene/geometry";
import { poseAt, type Pose } from "@/lib/scene/pose";
import type { ProgressStore } from "@/lib/scene/progress";
import {
  boxCenter,
  boxSize,
  CABIN_FRAME_BOXES,
  CABIN_FRONT_FIXED,
  CABIN_GLASS_BOXES,
  edgesFor,
  HOUSE_BOXES,
  LOWER_DOOR_LEAVES,
  LOWER_DOOR_SLIDE,
  LOWER_FRAME_BOXES,
  soffitEdges,
  soffitTransform,
  TREAD_BOXES,
  UPPER_DOOR_PANELS,
  UPPER_DOOR_SLIDE,
  voidGeometry,
  type Box,
} from "./houseModel";

const C = {
  warmWhite: new THREE.Color("#f5f3ee"),
  white: new THREE.Color("#ffffff"),
  stone: new THREE.Color("#dcd7ce"),
  charcoal: new THREE.Color("#151515"),
  charcoalSoft: new THREE.Color("#2a2926"),
  warmGrey: new THREE.Color("#a8a39a"),
  oxide: new THREE.Color("#8c4a2f"),
};

/** Material targets at full resolve; every surface starts as flat warm white. */
interface Surface {
  mat: THREE.MeshStandardMaterial;
  color: THREE.Color;
  opacity: number;
}

function surface(color: THREE.Color, opacity = 1, extra: Partial<THREE.MeshStandardMaterialParameters> = {}): Surface {
  const mat = new THREE.MeshStandardMaterial({
    color: C.warmWhite.clone(),
    roughness: 0.9,
    metalness: 0,
    transparent: opacity < 1,
    opacity: 1,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
    ...extra,
  });
  return { mat, color, opacity };
}

interface HouseSceneProps {
  progress: ProgressStore;
  quality: "full" | "lite";
}

function BoxMesh({ box, material, shadow }: { box: Box; material: THREE.Material; shadow: boolean }) {
  return (
    <mesh position={boxCenter(box)} material={material} castShadow={shadow} receiveShadow={shadow}>
      <boxGeometry args={boxSize(box)} />
    </mesh>
  );
}

/**
 * The house in section. Everything the scroll changes is written in
 * `useFrame` from the shared progress store, so the scene renders only when
 * the page asks it to (the canvas runs on demand).
 */
export function HouseScene({ progress, quality }: HouseSceneProps) {
  const shadow = quality === "full";
  const { invalidate, size, camera } = useThree();

  // Materials, one per kind of surface.
  const S = useMemo(
    () => ({
      ground: surface(C.stone),
      wall: surface(C.warmWhite),
      slab: surface(C.stone),
      tread: surface(C.charcoalSoft),
      soffit: surface(C.warmWhite),
      frame: surface(C.oxide, 1, { roughness: 0.55, metalness: 0.25 }),
      glass: surface(C.white, 0.22, { roughness: 0.15, side: THREE.DoubleSide, depthWrite: false }),
      leaf: surface(C.oxide.clone().lerp(C.white, 0.55), 0.55, { roughness: 0.2, side: THREE.DoubleSide, depthWrite: false }),
      panel: surface(C.stone),
    }),
    [],
  );
  const voidMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: C.oxide, transparent: true, opacity: 0, depthWrite: false }),
    [],
  );
  const lineMats = useMemo(
    () => ({
      house: new THREE.LineBasicMaterial({ color: C.charcoal, transparent: true, opacity: 1 }),
      stair: new THREE.LineBasicMaterial({ color: C.charcoal, transparent: true, opacity: 1 }),
      cabin: new THREE.LineBasicMaterial({ color: C.oxide, transparent: true, opacity: 0 }),
      soffit: new THREE.LineBasicMaterial({ color: C.charcoal, transparent: true, opacity: 0 }),
      door: new THREE.LineBasicMaterial({ color: C.oxide, transparent: true, opacity: 0 }),
    }),
    [],
  );

  // Edge geometries, merged per group so drawRange can reveal them in order.
  const edges = useMemo(
    () => ({
      house: edgesFor(HOUSE_BOXES),
      frame: edgesFor(LOWER_FRAME_BOXES),
      soffit: soffitEdges(),
      stair: edgesFor(TREAD_BOXES),
      cabin: edgesFor([...CABIN_FRAME_BOXES, ...CABIN_FRONT_FIXED]),
      leaves: LOWER_DOOR_LEAVES.map((b) => edgesFor([b])),
      panels: UPPER_DOOR_PANELS.map((b) => edgesFor([b])),
    }),
    [],
  );
  const voidGeo = useMemo(() => voidGeometry(), []);
  const soffit = useMemo(() => soffitTransform(), []);

  useEffect(() => {
    return () => {
      Object.values(S).forEach((s) => s.mat.dispose());
      voidMat.dispose();
      Object.values(lineMats).forEach((m) => m.dispose());
      edges.house.dispose();
      edges.frame.dispose();
      edges.soffit.dispose();
      edges.stair.dispose();
      edges.cabin.dispose();
      edges.leaves.forEach((g) => g.dispose());
      edges.panels.forEach((g) => g.dispose());
      voidGeo.dispose();
    };
  }, [S, voidMat, lineMats, edges, voidGeo]);

  // Objects the pose moves.
  const treadRefs = useRef<Array<THREE.Mesh | null>>([]);
  const soffitRef = useRef<THREE.Mesh>(null);
  const cabinRef = useRef<THREE.Group>(null);
  const leafRefs = useRef<Array<THREE.Group | null>>([]);
  const panelRefs = useRef<Array<THREE.Group | null>>([]);
  const houseLines = useRef<THREE.LineSegments>(null);
  const stairLines = useRef<THREE.LineSegments>(null);
  const ambient = useRef<THREE.AmbientLight>(null);
  const hemi = useRef<THREE.HemisphereLight>(null);
  const sun = useRef<THREE.DirectionalLight>(null);

  // Re-render whenever the scroll position changes.
  useEffect(() => progress.subscribe(() => invalidate()), [progress, invalidate]);

  const tmp = useMemo(() => ({ target: new THREE.Vector3(), dir: new THREE.Vector3(), a: new THREE.Vector3(), b: new THREE.Vector3() }), []);

  const apply = (pose: Pose) => {
    const r = pose.resolve;
    // Surfaces: flat warm white until the drawing resolves.
    for (const s of Object.values(S)) {
      s.mat.color.copy(C.warmWhite).lerp(s.color, r);
      s.mat.opacity = s.opacity < 1 ? 0.08 + (s.opacity - 0.08) * r : 1;
      s.mat.transparent = s.opacity < 1;
    }
    // The cabin frame keeps its oxide identity from the moment it appears.
    S.frame.mat.color.copy(C.warmWhite).lerp(C.oxide, Math.max(r, pose.cabin * 0.85));
    S.leaf.mat.color.copy(C.warmWhite).lerp(S.leaf.color, Math.max(r, pose.cabin * 0.6));
    S.leaf.mat.opacity = 0.15 + 0.4 * Math.max(r, pose.cabin * 0.5);

    // Lighting: ambient only while it is a drawing; sun and sky once it is a home.
    // Physically based lights: an ambient of π renders albedo exactly, which
    // is what a flat drawing needs. Sun and sky take over as it resolves.
    if (ambient.current) ambient.current.intensity = Math.PI * (1 - 0.42 * r);
    if (hemi.current) hemi.current.intensity = Math.PI * 0.45 * r;
    if (sun.current) sun.current.intensity = 2.1 * r;

    // Lines draw in, then recede.
    const lineFade = 1 - 0.7 * r;
    const houseCount = edges.house.attributes.position.count;
    edges.house.setDrawRange(0, Math.floor(houseCount * pose.house));
    lineMats.house.opacity = lineFade;
    const stairCount = edges.stair.attributes.position.count;
    edges.stair.setDrawRange(0, Math.floor(stairCount * pose.stair));
    lineMats.stair.opacity = lineFade;
    lineMats.cabin.opacity = pose.cabin * (1 - 0.35 * r);
    lineMats.door.opacity = pose.cabin * (1 - 0.35 * r);
    lineMats.soffit.opacity = (pose.stair > 0.92 ? 1 : 0) * lineFade;

    // Surfaces of the house appear with their lines.
    S.ground.mat.visible = pose.house > 0.02;
    S.wall.mat.visible = pose.house > 0.3;
    S.slab.mat.visible = pose.house > 0.55;
    S.panel.mat.visible = pose.cabin > 0.05;

    // Treads extend across the flight one after another.
    treadRefs.current.forEach((m, i) => {
      if (!m) return;
      const f = Math.min(1, Math.max(0, pose.stair * STAIR.risers - i));
      m.visible = f > 0.01;
      m.scale.z = Math.max(0.001, f);
    });
    if (soffitRef.current) {
      const f = Math.min(1, Math.max(0, pose.stair * STAIR.risers - (STAIR.risers - 2)));
      soffitRef.current.visible = f > 0.01;
      soffitRef.current.scale.z = Math.max(0.001, f);
    }
    voidMat.opacity = 0.14 * pose.voidTint;

    // The cabin, its doors and the upper door.
    if (cabinRef.current) {
      cabinRef.current.visible = pose.cabin > 0.01;
      cabinRef.current.position.y = pose.travel * STOREY;
    }
    S.frame.mat.opacity = 1;
    leafRefs.current.forEach((g, i) => {
      if (g) g.position.x = (i === 0 ? -1 : 1) * LOWER_DOOR_SLIDE * pose.lowerDoor;
    });
    panelRefs.current.forEach((g, i) => {
      if (g) g.position.z = (i === 0 ? -1 : 1) * UPPER_DOOR_SLIDE * pose.upperDoor;
    });

    // Camera: from an elevation to a three-quarter view, fitted to the
    // viewport. At the end it pulls back and the house moves aside so the
    // closing statement has the top left of the screen.
    const aspect = size.width / Math.max(1, size.height);
    const narrow = aspect < 0.85;
    const fitWidth = narrow ? 8.6 : 10.8;
    const cam = camera as THREE.PerspectiveCamera;
    const halfV = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    const dist = Math.max(11, fitWidth / 2 / (halfV * aspect)) * (1 + 0.3 * pose.settle);
    // The target sits below the house's centre so the house rides high and
    // leaves the lower part of the viewport to the captions.
    const shift = narrow ? 0 : -1.9 * pose.settle;
    tmp.target.set((narrow ? -0.4 : -0.5) + shift, (narrow ? 1.5 : 1.75) + (narrow ? -0.9 : 0.55) * pose.settle, 0);
    tmp.a.set(0.06, 0.08, 1).normalize();
    tmp.b.set(0.58, 0.36, 0.73).normalize();
    tmp.dir.copy(tmp.a).lerp(tmp.b, pose.camera).normalize();
    cam.position.copy(tmp.target).addScaledVector(tmp.dir, dist);
    cam.lookAt(tmp.target);
  };

  useFrame(() => apply(poseAt(progress.get())));

  return (
    <>
      <ambientLight ref={ambient} intensity={Math.PI} color={C.white} />
      <hemisphereLight ref={hemi} intensity={0} color={C.warmWhite} groundColor={C.stone} />
      <directionalLight
        ref={sun}
        intensity={0}
        color={C.white}
        position={[5, 9, 6]}
        castShadow={shadow}
        shadow-mapSize-width={1536}
        shadow-mapSize-height={1536}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-camera-near={2}
        shadow-camera-far={30}
        shadow-bias={-0.0006}
        shadow-normalBias={0.02}
      />

      {/* House */}
      <group>
        {HOUSE_BOXES.map((b, i) => (
          <BoxMesh key={i} box={b} material={i === 0 ? S.ground.mat : i <= 2 ? S.wall.mat : S.slab.mat} shadow={shadow} />
        ))}
        <lineSegments ref={houseLines} geometry={edges.house} material={lineMats.house} />
        {LOWER_FRAME_BOXES.map((b, i) => (
          <BoxMesh key={`f${i}`} box={b} material={S.wall.mat} shadow={shadow} />
        ))}
        <lineSegments geometry={edges.frame} material={lineMats.cabin} />
      </group>

      {/* Space beneath the staircase */}
      <mesh geometry={voidGeo} material={voidMat} />

      {/* Staircase */}
      <group>
        {TREAD_BOXES.map((b, i) => (
          <mesh
            key={i}
            ref={(el) => {
              treadRefs.current[i] = el;
            }}
            position={boxCenter(b)}
            material={S.tread.mat}
            castShadow={shadow}
            receiveShadow={shadow}
          >
            <boxGeometry args={boxSize(b)} />
          </mesh>
        ))}
        <mesh
          ref={soffitRef}
          position={soffit.center}
          rotation={[0, 0, soffit.angle]}
          material={S.soffit.mat}
          castShadow={shadow}
          receiveShadow={shadow}
        >
          <boxGeometry args={[soffit.length, 0.05, soffit.width]} />
        </mesh>
        <lineSegments ref={stairLines} geometry={edges.stair} material={lineMats.stair} />
        <lineSegments geometry={edges.soffit} material={lineMats.soffit} />
      </group>

      {/* Upper door over the stair opening */}
      {UPPER_DOOR_PANELS.map((b, i) => (
        <group
          key={i}
          ref={(el) => {
            panelRefs.current[i] = el;
          }}
        >
          <BoxMesh box={b} material={S.panel.mat} shadow={shadow} />
          <lineSegments geometry={edges.panels[i]} material={lineMats.door} />
        </group>
      ))}

      {/* Cabin */}
      <group ref={cabinRef} position={[CABIN.xMin, 0, CABIN.zMin]}>
        {CABIN_FRAME_BOXES.map((b, i) => (
          <BoxMesh key={i} box={b} material={S.frame.mat} shadow={shadow} />
        ))}
        {CABIN_GLASS_BOXES.map((b, i) => (
          <BoxMesh key={i} box={b} material={S.glass.mat} shadow={false} />
        ))}
        {CABIN_FRONT_FIXED.map((b, i) => (
          <BoxMesh key={i} box={b} material={S.glass.mat} shadow={false} />
        ))}
        <lineSegments geometry={edges.cabin} material={lineMats.cabin} />
      </group>

      {/* Lower landing door, fixed to the house */}
      {LOWER_DOOR_LEAVES.map((b, i) => (
        <group
          key={i}
          ref={(el) => {
            leafRefs.current[i] = el;
          }}
        >
          <BoxMesh box={b} material={S.leaf.mat} shadow={false} />
          <lineSegments geometry={edges.leaves[i]} material={lineMats.door} />
        </group>
      ))}
    </>
  );
}
