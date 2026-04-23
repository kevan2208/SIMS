export const controlTransitionClass =
  "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none";

export const controlFocusClass =
  "outline-none focus:outline-none focus-visible:outline-none focus-visible:border-brand-berry/56 focus-visible:shadow-[0_0_0_3px_rgba(139,38,57,0.08),0_18px_34px_rgba(87,59,55,0.08)]";

export const controlHoverClass =
  "hover:-translate-y-1 hover:scale-[1.015] hover:border-brand-berry/46 hover:bg-[linear-gradient(180deg,rgba(248,233,238,0.99),rgba(239,212,220,0.97))] hover:text-brand-noir hover:shadow-[0_20px_42px_rgba(139,38,57,0.11),0_8px_18px_rgba(87,59,55,0.05)] active:translate-y-[1px] active:scale-[0.985]";

export const controlSurfaceClass =
  "rounded-full border border-brand-stone/84 bg-[linear-gradient(180deg,rgba(253,249,250,0.995),rgba(248,241,243,0.985))] shadow-[0_12px_24px_rgba(87,59,55,0.045)]";

export const primaryControlClass =
  "rounded-full border border-brand-stone/82 bg-[linear-gradient(180deg,rgba(254,250,251,0.995),rgba(248,241,243,0.985))] text-brand-noir shadow-[0_16px_34px_rgba(87,59,55,0.08)]";

export const secondaryControlClass = `${controlSurfaceClass} text-brand-ink`;

export const ghostControlClass =
  "rounded-full border border-brand-stone/72 bg-[linear-gradient(180deg,rgba(252,248,249,0.9),rgba(247,240,242,0.88))] text-brand-ink shadow-[0_8px_18px_rgba(87,59,55,0.04)]";

export const utilitySurfaceClass =
  "rounded-full border border-brand-stone/80 bg-[linear-gradient(180deg,rgba(252,247,248,0.985),rgba(246,239,241,0.965))] shadow-[0_10px_20px_rgba(87,59,55,0.04)]";

export const utilityActiveClass =
  "rounded-full border border-brand-berry/44 bg-[linear-gradient(180deg,rgba(247,233,237,0.99),rgba(239,214,221,0.97))] text-brand-red shadow-[0_12px_28px_rgba(139,38,57,0.1)]";

export const controlPillClass = `${utilitySurfaceClass} ${controlHoverClass} ${controlFocusClass}`;

export const navPillContainerClass =
  "gap-1 rounded-full border border-brand-stone/72 bg-[linear-gradient(180deg,rgba(250,243,244,0.98),rgba(245,235,237,0.96))] px-2 py-1 shadow-[0_12px_24px_rgba(87,59,55,0.05)]";

export const navTabBaseClass =
  `rounded-full font-medium text-brand-ink/78 ${controlTransitionClass} ${controlFocusClass} hover:-translate-y-1 hover:scale-[1.01] hover:border-brand-stone/74 hover:bg-[linear-gradient(180deg,rgba(247,236,239,0.96),rgba(239,216,221,0.9))] hover:text-brand-noir hover:shadow-[0_12px_24px_rgba(87,59,55,0.06)] active:translate-y-[1px] active:scale-[0.985]`;

export const navTabActiveClass =
  "border border-brand-stone/76 bg-[linear-gradient(180deg,rgba(248,239,241,0.98),rgba(236,214,220,0.95))] text-brand-noir shadow-[0_14px_28px_rgba(87,59,55,0.08)]";
