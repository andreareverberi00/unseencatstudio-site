export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-neutral-50">
      <main className="w-full max-w-4xl rounded-2xl border border-neutral-800 bg-neutral-900 p-10 md:p-16">
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
          UnseenCatStudio
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
          Games with personality.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-neutral-300">
          This is the starter website for UnseenCatStudio, built with Next.js
          and ready to be deployed on Vercel.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            className="rounded-xl bg-white px-5 py-3 text-center font-semibold text-neutral-900 transition hover:bg-neutral-200"
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deploy on Vercel
          </a>
          <a
            className="rounded-xl border border-neutral-700 px-5 py-3 text-center font-semibold text-neutral-100 transition hover:border-neutral-500"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js Docs
          </a>
        </div>
      </main>
    </div>
  );
}
