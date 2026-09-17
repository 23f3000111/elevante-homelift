import { CabinPlan } from "@/components/diagram/CabinPlan";
import { StairSection } from "@/components/diagram/StairSection";
import { Caption } from "@/components/ui/Caption";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { Figure, HomeContent } from "@/content/types";

/** Every situation the brief lists gets a photograph where one exists and a drawing where none does. */
function SituationFigure({ figure }: { figure: Figure }) {
  const stair = "h-auto w-full max-h-full";
  const plan = "h-full w-auto max-w-full";
  switch (figure) {
    case "move":
      return <StairSection state="move" labels={false} className={stair} />;
    case "doors":
      return <StairSection state="enter" highlight="door-lower" labels={false} className={stair} />;
    case "stair-opening":
      return <StairSection state="move" highlight="door-upper" labels={false} className={stair} />;
    case "rollator":
      return <CabinPlan occupant="rollator" className={plan} />;
    case "wheelchair":
      return <CabinPlan occupant="wheelchair" className={plan} />;
    case "two-people":
      return <CabinPlan occupant="two-people" className={plan} />;
  }
}

export function EverydayUse({ content }: { content: HomeContent["everydayUse"] }) {
  return (
    <Section id="everyday-use" tone="white" labelledBy="eu-title">
      <Reveal className="container-content">
        <div className="lg:grid lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="eu-title" data-reveal className="text-display-2">
              {content.title}
            </h2>
            <p data-reveal className="mt-6 max-w-[40ch] text-body-l text-charcoal-soft">
              {content.intro}
            </p>
          </div>
        </div>

        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
          {content.situations.map((s) => (
            <li key={s.id} data-reveal className="border-t border-stone pt-5">
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-warm-white p-5">
                {s.media ? (
                  <Picture
                    asset={s.media}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 640px) 46vw, 100vw"
                    className="-m-5 h-[calc(100%+2.5rem)] w-[calc(100%+2.5rem)]"
                  />
                ) : s.figure ? (
                  <SituationFigure figure={s.figure} />
                ) : null}
              </div>
              {s.media ? <Caption className="mt-2">{content.visualisationLabel}</Caption> : <Caption className="mt-2">&nbsp;</Caption>}
              <h3 className="mt-3 text-h3">{s.title}</h3>
              <p className="mt-2 text-body text-charcoal-soft">{s.body}</p>
            </li>
          ))}
          <li data-reveal className="flex flex-col justify-end bg-charcoal p-6 text-warm-white sm:col-span-2 xl:col-span-1">
            <h3 className="text-h3 text-warm-white">{content.safetyTitle}</h3>
            <p className="mt-3 text-body text-stone">{content.safety}</p>
          </li>
        </ul>
      </Reveal>
    </Section>
  );
}
