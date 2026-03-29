export const metadata = {
  title: "Imprint | Marcus Hartmann",
};

export default function ImprintPage() {
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
        Imprint
      </h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm text-neutral-600 dark:text-neutral-400 space-y-4">
        <p>
          <strong className="text-neutral-900 dark:text-white">Marcus Hartmann</strong>
          <br />
          Berlin, Germany
        </p>
        <p>
          <strong className="text-neutral-900 dark:text-white">Contact</strong>
          <br />
          E-Mail:{" "}
          <a
            href="mailto:hello@marcushartmann.dev"
            className="text-neutral-900 dark:text-white underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            hello@marcushartmann.dev
          </a>
        </p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 pt-4">
          Responsible for content according to § 55 Abs. 2 RStV: Marcus Hartmann
        </p>
      </div>
    </main>
  );
}
