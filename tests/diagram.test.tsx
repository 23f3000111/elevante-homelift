import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { CabinPlan } from "@/components/diagram/CabinPlan";
import { InstallationSheet } from "@/components/diagram/InstallationSheet";
import { PlanDrawing } from "@/components/diagram/PlanDrawing";
import { SectionDrawing } from "@/components/diagram/SectionDrawing";
import { mechanism, home } from "@/content/en/home";
import { CABIN, CABIN_X_MAX, STAIR_TOP_X, STOREY } from "@/lib/scene/geometry";
import { poseAt, STATE_COUNT, STATE_RANGES, stateAt } from "@/lib/scene/pose";

const drawing = (progress: number) =>
  renderToStaticMarkup(<SectionDrawing progress={progress} labels={mechanism.drawingLabels} title="t" desc="d" />);

describe("SectionDrawing", () => {
  it("is an accessible image with a title and description", () => {
    const html = drawing(1);
    expect(html).toContain('role="img"');
    expect(html).toContain("<title");
    expect(html).toContain("<desc");
  });

  it("exposes the parts a parent animates", () => {
    const html = drawing(1);
    for (const part of ["void", "house", "stair", "tread", "cabin", "door-lower-l", "door-lower-r", "door-upper", "path", "labels"]) {
      expect(html, part).toContain(`data-part="${part}"`);
    }
  });

  it("renders each pose without JavaScript", () => {
    expect(drawing(1)).toContain(`translate(0 ${-STOREY * 100})`);
    expect(drawing(0.36)).toContain("translate(0 0)");
    // The lower door belongs to the house: it is outside the cabin group.
    const html = drawing(0.5);
    expect(html.indexOf('data-part="door-lower"')).toBeGreaterThan(html.indexOf('data-part="cabin"'));
  });
});

describe("geometry", () => {
  it("puts the cabin beneath the head of the staircase, inside the house", () => {
    expect(CABIN.xMin).toBe(STAIR_TOP_X);
    expect(CABIN.height).toBeLessThan(STOREY);
    expect(CABIN_X_MAX).toBeGreaterThan(CABIN.xMin);
  });
});

describe("pose", () => {
  it("covers 0..1 with contiguous states", () => {
    expect(STATE_RANGES[0][0]).toBe(0);
    expect(STATE_RANGES[STATE_COUNT - 1][1]).toBe(1);
    for (let i = 1; i < STATE_COUNT; i++) expect(STATE_RANGES[i][0]).toBe(STATE_RANGES[i - 1][1]);
    expect(home.mechanism.states).toHaveLength(STATE_COUNT);
  });

  it("tells the story in order", () => {
    const start = poseAt(0);
    expect(start.headline).toBe(1);
    expect(start.house).toBe(0);
    expect(start.cabin).toBe(0);

    const stairs = poseAt(0.32);
    expect(stairs.house).toBe(1);
    expect(stairs.stair).toBe(1);
    expect(stairs.cabin).toBe(0);

    const enter = poseAt(0.5);
    expect(enter.cabin).toBe(1);
    expect(enter.lowerDoor).toBeGreaterThan(0.9);
    expect(enter.travel).toBe(0);

    const travel = poseAt(0.7);
    expect(travel.lowerDoor).toBe(0);
    expect(travel.upperDoor).toBe(1);
    expect(travel.travel).toBeGreaterThan(0);
    expect(travel.travel).toBeLessThan(1);

    const end = poseAt(1);
    expect(end.travel).toBe(1);
    expect(end.resolve).toBe(1);
    expect(end.statement).toBe(1);
    expect(end.headline).toBe(0);
    expect(stateAt(1)).toBe(STATE_COUNT - 1);
  });

  it("opens the upper door before the cabin reaches it", () => {
    const [travelStart] = STATE_RANGES[6];
    expect(poseAt(travelStart).upperDoor).toBeGreaterThan(0.8);
  });
});

describe("plans", () => {
  it("draws every comparison variant", () => {
    for (const variant of ["staircase", "stairlift", "conventional", "elevante"] as const) {
      const html = renderToStaticMarkup(<PlanDrawing variant={variant} labels={home.planLabels} title="t" desc="d" />);
      expect(html).toContain('role="img"');
      expect(html).toContain(`data-variant="${variant}"`);
    }
    expect(renderToStaticMarkup(<PlanDrawing variant="stairlift" title="t" desc="d" />)).toContain('data-part="stairlift"');
    expect(renderToStaticMarkup(<PlanDrawing variant="conventional" title="t" desc="d" />)).toContain('data-part="separate"');
  });

  it("draws every occupant the brief lists", () => {
    for (const occupant of ["person", "rollator", "wheelchair", "two-people"] as const) {
      const html = renderToStaticMarkup(<CabinPlan occupant={occupant} door="open" title="t" desc="d" />);
      expect(html).toContain(`data-occupant="${occupant}"`);
    }
  });

  it("fills the installation sheet in stage by stage", () => {
    const html = renderToStaticMarkup(<InstallationSheet step={3} title="t" desc="d" />);
    expect(html).toContain('data-step="3"');
    for (let n = 1; n <= 7; n++) expect(html).toContain(`data-layer="${n}"`);
  });
});
