"use client";

import { useEffect, useState } from "react";

import { openingHours } from "@/content/site";
import type { Strings } from "@/content/strings";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type Status = { open: boolean; text: string };

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** Current day and minute-of-day in Mauritius, whatever the visitor's own time zone. */
function mauritiusNow(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Indian/Mauritius",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export function getStatus(date: Date, t: Strings): Status {
  const { day, minutes } = mauritiusNow(date);
  const opens = toMinutes(openingHours.opens);
  const closes = toMinutes(openingHours.closes);
  const openToday = openingHours.days.includes(day);

  if (openToday && minutes >= opens && minutes < closes) {
    return {
      open: true,
      text: closes - minutes <= 60 ? t.status.closingSoon(openingHours.closes) : t.status.openUntil(openingHours.closes)
    };
  }
  if (openToday && minutes < opens) return { open: false, text: t.status.opensToday(openingHours.opens) };

  for (let step = 1; step <= 7; step++) {
    const next = (day + step) % 7;
    if (openingHours.days.includes(next)) {
      return {
        open: false,
        text: step === 1 ? t.status.opensTomorrow(openingHours.opens) : t.status.opensOn(t.status.days[next], openingHours.opens)
      };
    }
  }
  return { open: false, text: t.status.closed };
}

export function useOpenStatus() {
  const { t } = useLang();
  // Worked out in the browser, so the page never shows a stale time from when it was built.
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    const update = () => setStatus(getStatus(new Date(), t));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [t]);
  return status;
}

export function OpenStatus({ className }: { className?: string }) {
  const status = useOpenStatus();

  return (
    <p aria-live="polite" className={cn("flex min-h-6 items-center gap-2 text-[0.95rem]", className)}>
      <span
        aria-hidden="true"
        className={cn("inline-block h-2 w-2 rounded-full", status === null ? "bg-seam" : status.open ? "bg-[#2f7d4f]" : "bg-mauve/50")}
      />
      {/* One empty line until the browser knows the time, so nothing below it moves when the status appears. */}
      <span className={status?.open ? "text-[#2c6a45]" : "text-mauve"}>{status ? status.text : "\u00a0"}</span>
    </p>
  );
}
