import { useRef } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  WarningIcon,
  LightningIcon,
  ArrowFatLinesRightIcon,
  ArrowFatLineDownIcon,
  ShuffleIcon,
  ArrowSquareRightIcon,
} from "@phosphor-icons/react";
import type { Translations } from "@/lib/i18n/translations";

const EASE = [0.22, 1, 0.36, 1] as const;
const LIST_STAGGER = 0.1;
const LIST_START = 0.15;
const ARROW_DELAY = 1.55;
const SOLUTION_DELAY = 2.5;

/** Renders `problem`'s markdown with each block-level element (list item or
 * paragraph) revealed in its own staggered step, so a bulleted problem reads
 * as a list assembling itself rather than popping in as one block. */
function ProblemMarkdown({
  problem,
  active,
}: {
  problem: string;
  active: boolean;
}) {
  const indexRef = useRef(0);
  indexRef.current = 0;

  const components: Components = {
    li: ({ children }) => {
      const i = indexRef.current++;
      return (
        <motion.li
          initial={{ opacity: 0, x: -10 }}
          animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: LIST_START + i * LIST_STAGGER,
            ease: EASE,
          }}
        >
          {children}
        </motion.li>
      );
    },
    p: ({ children }) => (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, delay: LIST_START, ease: EASE }}
      >
        {children}
      </motion.p>
    ),
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {problem}
    </ReactMarkdown>
  );
}

/** Two-column problem/solution highlight shown near the top of a project
 * page, before the deeper documentation; see lib/project-problem-solution.ts
 * for where the text comes from. It plays once as the block scrolls into
 * view: the problem is listed out first, then an arrow draws the connection,
 * then the solution forms as the block's clear point of emphasis. */
export default function ProblemSolution({
  problem,
  solution,
  t,
}: {
  problem: string;
  solution: string;
  t: Translations;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const active = !!reduceMotion || inView;

  return (
    <div ref={ref} className="p-6 sm:px-6 px-0">
      <div className="flex sm:flex-row flex-col items-stretch justify-between gap-4 sm:gap-2 h-full relative">
        <div className="flex flex-col items-center text-center gap-2 p-6 bg-muted flex-1 shrink-0 ">
          <span className="flex justify-center items-center gap-1.5 font-heading text-md font-semibold tracking-widest text-muted-foreground italic">
            <WarningIcon className="size-3.5" />
            {t.projects.problem}
          </span>
          <div className="prose prose-sm max-w-none text-sm text-muted-foreground [&>ul]:my-0">
            <ProblemMarkdown problem={problem} active={active} />
          </div>
        </div>

        <ArrowSquareRightIcon
          weight="fill"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-6 sm:-translate-y-1/2 sm:size-10 size-8 transition-all text-foreground bg-background rounded-[4px] sm:p-0.5 rotate-90 sm:rotate-0"
        />

        <div className="bg-foreground text-background flex flex-col flex-1 shrink-0 p-6 gap-2 ">
          <span className="flex items-center gap-1.5 font-heading justify-center font-semibold tracking-widest text-primary text-md italic text-center w-full">
            <LightningIcon className="size-3.5" weight="fill" />
            {t.projects.solution}
          </span>
          <div className="prose prose-sm max-w-none text-sm font-medium text-background text-center leading-relaxed! [&>ul]:my-0">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {solution}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
