export const metadata = {
  title: "Privacy Policy | Marcus Hartmann",
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
        Privacy Policy
      </h1>
      <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-6 max-w-2xl">
        <section className="space-y-2">
          <h2 className="font-medium text-neutral-900 dark:text-white">1. Data Controller</h2>
          <p>
            Marcus Hartmann, Berlin, Germany.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-medium text-neutral-900 dark:text-white">2. Data Collected</h2>
          <p>
            This website does not use cookies, tracking scripts, or analytics tools. No personal data
            is collected, stored, or shared with third parties when you browse this site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-medium text-neutral-900 dark:text-white">3. Contact Form</h2>
          <p>
            If you contact me via the contact form, your message and e-mail address are used solely
            to respond to your inquiry and will not be passed on to third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-medium text-neutral-900 dark:text-white">4. External Links</h2>
          <p>
            This site contains links to external platforms (GitHub, LinkedIn). These providers have
            their own privacy policies which apply once you leave this site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-medium text-neutral-900 dark:text-white">5. Your Rights</h2>
          <p>
            Under GDPR you have the right to access, rectify, or erase any personal data held about
            you. Contact me at{" "}
            <a
              href="mailto:hello@marcushartmann.dev"
              className="text-neutral-900 dark:text-white underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              hello@marcushartmann.dev
            </a>{" "}
            for any such requests.
          </p>
        </section>
      </div>
    </main>
  );
}
