export const metadata = {
  title: "Imprint | Marcus Hartmann",
};

export default function ImprintPage() {
  return (
    <main className="flex-1 mx-auto max-w-360 px-6 pt-32 pb-24">
      <a
        href="/"
        className="inline-flex items-center gap-2 text-sm text-neutral-400
                   hover:text-white transition-colors duration-200 mb-10 group"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back
      </a>
      <h1 className="font-mono text-2xl font-bold tracking-tight text-white mb-8">
        Impressum
      </h1>
      <div className="text-sm text-neutral-400 space-y-6 max-w-2xl">
        <section className="space-y-1">
          <h2 className="font-medium text-white">Angaben gemäß § 5 TMG</h2>
          <p>
            Marcus Hartmann
            <br />
            Liegnitzer Str. 16
            <br />
            10999 Berlin
          </p>
        </section>

        <section className="space-y-1">
          <h2 className="font-medium text-white">Kontakt</h2>
          <p>
            Telefon: +49 151 40306800
            <br />
            E-Mail:{" "}
            <a
              href="mailto:info@marcus-hartmann.net"
              className="text-white underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              info@marcus-hartmann.net
            </a>
          </p>
        </section>

        <section className="space-y-1">
          <h2 className="font-medium text-white">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p>
            Marcus Hartmann
            <br />
            Liegnitzer Str. 16
            <br />
            10999 Berlin
          </p>
        </section>
      </div>
    </main>
  );
}
