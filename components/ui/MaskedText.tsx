import { createElement, Fragment, type HTMLAttributes } from "react";

interface MaskedTextProps extends HTMLAttributes<HTMLElement> {
  text: string;
  as?: "span" | "h1" | "h2" | "p";
  className?: string;
  id?: string;
}

/**
 * Splits a line of type into words, each inside a clipping box, so the
 * words can rise into place. Server-rendered; the motion runtime animates
 * `[data-mask-word]` and the CSS hidden state only applies with JS + motion.
 * The spaces sit between the boxes, where they cannot be collapsed away.
 */
export function MaskedText({ text, as = "span", className, id, ...rest }: MaskedTextProps) {
  const words = text.split(" ");
  return createElement(
    as,
    { id, "data-mask-words": true, className, ...rest },
    words.map((word, i) => (
      <Fragment key={`${word}-${i}`}>
        <span className="-mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-top">
          <span data-mask-word className="inline-block">
            {word}
          </span>
        </span>
        {i < words.length - 1 ? " " : null}
      </Fragment>
    )),
  );
}
