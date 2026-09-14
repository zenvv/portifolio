import { useRef } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  WarningIcon,
  LightningIcon,
  ArrowFatLinesRightIcon,
  ArrowFatLineDownIcon,
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
    <div ref={ref} className="border pt-10 pb-6">
      {/* <div className="flex flex-col items-center gap-1 pt-10 pb-6 text-center">
        <h2 className="text-balance font-heading text-lg italic text-foreground sm:text-xl">
          {t.projects.problemSolutionTitle}
        </h2>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1.2fr]">
        <div className="flex flex-col gap-2 p-6 pt-0 sm:pt-6">
          <span className="flex justify-center items-center gap-1.5 font-heading text-md font-semibold tracking-widest text-muted-foreground italic">
            <WarningIcon className="size-3.5" />
            {t.projects.problem}
          </span>
          <div className="prose prose-sm max-w-none text-sm text-muted-foreground [&>ul]:my-0">
            <ProblemMarkdown problem={problem} active={active} />
          </div>
        </div>

        <div className="flex items-center justify-center py-2 sm:px-4 sm:py-6">
          <motion.span
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.4, delay: ARROW_DELAY, ease: EASE }}
          >
            <ArrowFatLineDownIcon
              className="size-8 text-muted-foreground sm:hidden"
              weight="light"
            />
            <ArrowFatLinesRightIcon
              className="hidden size-8 text-muted-foreground sm:block"
              weight="light"
            />
          </motion.span>
        </div>

        <motion.div
          className="m-6 mt-0 flex flex-col gap-2.5 border border-primary/30 p-2"
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{ duration: 0.5, delay: SOLUTION_DELAY, ease: EASE }}
        >
          <motion.div
            className="flex flex-col gap-2.5 border border-dashed border-primary/30 bg-primary/5 p-6 h-full w-full"
            initial={{
              opacity: 0,
              borderStyle: "solid",
            }}
            animate={{
              opacity: 1,
              borderStyle: "dashed",
            }}
            transition={{
              duration: 0.6,
              delay: SOLUTION_DELAY + 0.5,
              ease: EASE,
            }}
          >
            <motion.span
              className="flex items-center gap-1.5 font-heading justify-center font-semibold tracking-widest text-primary text-2xl italic text-center w-full"
              initial={{
                opacity: 0,
                scale: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: SOLUTION_DELAY + 0.5,
                ease: EASE,
              }}
            >
              <LightningIcon className="size-5" weight="fill" />
              {t.projects.solution}
            </motion.span>
            <motion.div
              className="prose prose-sm max-w-none text-sm font-medium text-foreground text-center leading-relaxed! [&>ul]:my-0"
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: SOLUTION_DELAY + 1,
                ease: EASE,
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {solution}
              </ReactMarkdown>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
