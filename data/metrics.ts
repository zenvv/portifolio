/**
 * Single source for every number that gets repeated in more than one place
 * across the site (home impact stats, project result blocks, meta
 * descriptions). A project's own one-off numbers (e.g. "6 areas" for the
 * ERP) stay local to that project's content instead of living here.
 */

/** nfs-transporte's manual-effort cycle, before and after. */
export const NFS_REDUCTION = { from: "6h", to: "20min" } as const;

/** risk-analysis-app's ADR approval chain, before and after. */
export const RISK_REDUCTION = { from: "1h30", to: "15min" } as const;

/** Career-wide counts shown in the home impact stats band. */
export const CAREER_COUNTS = {
  hoursReduced: 20,
  automatedProcesses: 40,
  powerPlatformApps: 18,
  automationFlows: 60,
} as const;
