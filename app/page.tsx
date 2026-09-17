export default function Page() {
  return (
    <main className="container-content py-section">
      <p className="text-small text-caption">Design tokens</p>
      <h1 className="text-display-1 mt-6 max-w-[14ch]">
        Comfortably and safely remain living in your own home.
      </h1>
      <h2 className="text-display-2 mt-16 max-w-[18ch]">A lift inside the staircase.</h2>
      <h3 className="text-h3 mt-10">The staircase stays. The way you move through it changes.</h3>
      <p className="text-body-l mt-6 max-w-[60ch]">
        When using the stairs becomes difficult, this does not have to mean that parts of your home can no longer be used.
      </p>
      <p className="text-body mt-4 max-w-[64ch]">
        The Elevante Homelift is an integrated system in which the staircase and lift come together. The cabin travels in the space underneath the staircase.
      </p>
      <p className="mt-10 font-mono text-index text-caption">01 Enter 02 Move 03 Arrive</p>
      <div className="mt-10 flex gap-3">
        {["bg-warm-white", "bg-white", "bg-charcoal", "bg-charcoal-soft", "bg-stone", "bg-warm-grey", "bg-caption", "bg-oxide"].map((c) => (
          <div key={c} className={`h-16 w-16 border border-stone ${c}`} />
        ))}
      </div>
    </main>
  );
}
