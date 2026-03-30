export const metadata = {
  title: "Datenschutz | Marcus Hartmann",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 mx-auto max-w-360 px-6 pt-32 pb-24">
      <a
        href="/"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400
                   hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 mb-10 group"
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
      <h1 className="font-mono text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-8">
        Datenschutzerklärung
      </h1>
      <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-8 max-w-2xl">

        <section className="space-y-2">
          <h2 className="font-medium text-neutral-900 dark:text-white">1. Verantwortlicher</h2>
          <p>
            Marcus Hartmann<br />
            Liegnitzer Str. 16<br />
            10999 Berlin<br />
            E-Mail:{" "}
            <a
              href="mailto:info@marcus-hartmann.net"
              className="text-neutral-900 dark:text-white underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              info@marcus-hartmann.net
            </a>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-medium text-neutral-900 dark:text-white">2. Hosting</h2>
          <p>
            Diese Website wird gehostet von ALL-INKL.COM – Neue Medien Münnich, Hauptstraße 68,
            02742 Friedersdorf. Beim Aufruf der Website werden durch den Hoster automatisch
            Server-Logfiles erfasst (z.&nbsp;B. IP-Adresse, Browsertyp, aufgerufene Seite,
            Datum und Uhrzeit). Diese Daten sind technisch notwendig zur Bereitstellung der
            Website und werden nicht mit anderen Datenquellen zusammengeführt.
            Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes
            Interesse am stabilen Betrieb der Website). Die Datenschutzerklärung von ALL-INKL.COM
            findest du unter{" "}
            <a
              href="https://all-inkl.com/datenschutzinformationen/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 dark:text-white underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              all-inkl.com/datenschutzinformationen
            </a>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-medium text-neutral-900 dark:text-white">3. Kontaktformular</h2>
          <p>
            Wenn du das Kontaktformular nutzt, werden dein Name, deine E-Mail-Adresse und deine
            Nachricht an einen PHP-Mailversand-Dienst auf meinem Server übermittelt und
            ausschließlich zur Bearbeitung deiner Anfrage verwendet. Die Daten werden nicht an
            Dritte weitergegeben und nach Abschluss der Kommunikation gelöscht, sofern keine
            gesetzlichen Aufbewahrungspflichten bestehen. Rechtsgrundlage ist
            Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO (Vertragsanbahnung) bzw.
            Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse an der
            Beantwortung von Anfragen).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-medium text-neutral-900 dark:text-white">4. Cookies & Tracking</h2>
          <p>
            Diese Website verwendet keine Cookies und keinerlei Tracking- oder
            Analyse-Tools. Es werden keine Nutzungsprofile erstellt.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-medium text-neutral-900 dark:text-white">5. Schriftarten</h2>
          <p>
            Diese Website verwendet die Schriftart „Geist" von Vercel. Die Schriftdateien
            werden beim Build-Prozess heruntergeladen und auf dem eigenen Server ausgeliefert.
            Es findet keine Verbindung zu externen Servern statt.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-medium text-neutral-900 dark:text-white">6. Externe Links</h2>
          <p>
            Diese Website enthält Links zu externen Diensten (GitHub, LinkedIn). Sobald du
            diese Links aufrufst, gelten die Datenschutzbestimmungen der jeweiligen Anbieter.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-medium text-neutral-900 dark:text-white">7. Deine Rechte</h2>
          <p>
            Du hast nach der DSGVO das Recht auf Auskunft (Art.&nbsp;15), Berichtigung
            (Art.&nbsp;16), Löschung (Art.&nbsp;17), Einschränkung der Verarbeitung
            (Art.&nbsp;18), Datenübertragbarkeit (Art.&nbsp;20) sowie Widerspruch
            (Art.&nbsp;21). Zur Ausübung deiner Rechte wende dich an{" "}
            <a
              href="mailto:info@marcus-hartmann.net"
              className="text-neutral-900 dark:text-white underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              info@marcus-hartmann.net
            </a>
            . Außerdem steht dir ein Beschwerderecht bei der zuständigen
            Datenschutzaufsichtsbehörde zu.
          </p>
        </section>

      </div>
    </main>
  );
}
