import type { ElementType } from "react";

interface MaskedTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
}

/**
 * Splits a line of type into words, each inside a clipping box, so the
 * words can rise into place. Server-rendered; the motion runtime animates
 * `[data-mask-word]` and the CSS hidden state only applies with JS + motion.
 */
export function MaskedText({ text, as: Tag = "span", className, id }: MaskedTextProps) {
  const words = text.split(" ");
  return (
    <Tag id={id} data-mask-words className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
          <span data-mask-word className="inline-block">
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
