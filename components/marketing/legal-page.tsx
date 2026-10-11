export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <>
      <section className="border-b border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            Legal
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: {updated}
          </p>
        </div>
      </section>

      <article className="py-20">
        <div className="mx-auto max-w-3xl space-y-12 px-6">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-bold tracking-tight">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.body.map((para, i) => (
                  <p key={i} className="text-muted-foreground">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}