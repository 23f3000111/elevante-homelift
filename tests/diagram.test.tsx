import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { POSES, StairSection, STOREY } from "@/components/diagram/StairSection";
import { CabinPlan } from "@/components/diagram/CabinPlan";
import { Plan } from "@/components/diagram/PlanComparison";

describe("StairSection", () => {
  it("is an accessible image with a title and description", () => {
    const html = renderToStaticMarkup(<StairSection />);
    expect(html).toContain('role="img"');
    expect(html).toContain("<title");
    expect(html).toContain("<desc");
  });

  it("exposes the parts a parent animates", () => {
    const html = renderToStaticMarkup(<StairSection />);
    for (const part of ["void", "floors", "stair", "cabin", "door-lower", "door-upper", "path", "labels"]) {
      expect(html, part).toContain(`data-part="${part}"`);
    }
    expect(html).toContain("data-draw");
  });

  it("renders each static pose without JavaScript", () => {
    const arrive = renderToStaticMarkup(<StairSection state="arrive" />);
    expect(arrive).toContain(`translate(0 ${-STOREY})`);
    expect(POSES.arrive.upperOpen).toBe(1);
    const enter = renderToStaticMarkup(<StairSection state="enter" />);
    expect(enter).toContain("translate(0 0)");
    expect(enter).toContain('stroke-dashoffset="1"');
  });

  it("can hide labels for small uses", () => {
    expect(renderToStaticMarkup(<StairSection labels={false} />)).not.toContain("Upper floor");
  });
});

describe("CabinPlan and Plan", () => {
  it("draws every occupant the brief lists", () => {
    for (const occupant of ["person", "rollator", "wheelchair", "two-people"] as const) {
      const html = renderToStaticMarkup(<CabinPlan occupant={occupant} />);
      expect(html).toContain('role="img"');
      expect(html).toContain("<title");
    }
  });

  it("contrasts a separate lift position with the space beneath the staircase", () => {
    expect(renderToStaticMarkup(<Plan variant="conventional" />)).toContain("Separate position");
    expect(renderToStaticMarkup(<Plan variant="elevante" />)).toContain("beneath");
  });
});
