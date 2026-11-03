import Link from "next/link";
import type { Course } from "@/lib/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/academy/${course.slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-colors hover:border-line-strong"
    >
      <h3 className="text-lg font-semibold tracking-tight text-fg group-hover:text-red-bright">
        {course.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{course.summary}</p>
      <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-xs text-fg-subtle">
        <div>
          <dt className="inline">Duration: </dt>
          <dd className="inline font-mono text-fg-muted">{course.duration}</dd>
        </div>
        <div>
          <dt className="inline">Format: </dt>
          <dd className="inline text-fg-muted">{course.format}</dd>
        </div>
      </dl>
      <div className="mt-auto border-t border-line pt-4 text-sm">
        <span className="text-fg-subtle">From </span>
        <span className="font-mono text-fg">{course.priceMarker}</span>
      </div>
    </Link>
  );
}
