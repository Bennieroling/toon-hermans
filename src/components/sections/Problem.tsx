import { ProblemSystemGaps } from "@/components/problems/ProblemVariants"

/**
 * Production homepage Problem section.
 *
 * Currently renders Variant 9 from /demo/problems — the "story in
 * facts" reframe that shows integration gaps between systems instead
 * of incident-based scenarios. Honest scope: doesn't promise to stop
 * incidents the audit can't prevent, instead pitches what a coherent
 * stack should be doing for the operator that it currently isn't.
 *
 * Want to see the alternatives or revert? /demo/problems holds 10
 * variants including the original incident-based section as Variant 0.
 *
 * TODO i18n: copy is currently English-only (see ProblemVariants.tsx).
 * NL and ES users see English here. Migrate to i18n locales when
 * doing the broader translation pass.
 */
export function Problem() {
  return (
    <div id="problem" className="scroll-mt-24">
      <ProblemSystemGaps />
    </div>
  )
}
