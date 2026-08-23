import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-24 lg:py-32">
      <p className="t-label text-graphite">404</p>
      <h1 className="t-display mt-4 text-[clamp(2.5rem,8vw,6rem)]">
        Nothing here
      </h1>
      <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-graphite">
        The page you asked for has moved or never existed. The range is short
        enough that it is quicker to just look.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/catalog" className="btn btn-ink">
          <span>See the range</span>
        </Link>
        <Link href="/contact" className="btn btn-line text-ink">
          <span>Contact support</span>
        </Link>
      </div>
    </div>
  );
}
