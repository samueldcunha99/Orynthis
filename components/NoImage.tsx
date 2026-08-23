import { Mark } from "./Mark";

/**
 * Stands in for a product we have no photography for yet. Deliberately reads as
 * a placeholder — shipping a borrowed marketplace image would look finished
 * while being wrong.
 */
export function NoImage({ label = "Photography pending" }: { label?: string }) {
  return (
    <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-paper-alt">
      <Mark className="h-8 w-8 text-hairline" />
      <span className="t-label text-graphite">{label}</span>
    </span>
  );
}
