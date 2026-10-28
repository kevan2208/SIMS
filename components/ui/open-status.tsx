"use client";

import { useEffect, useState } from "react";

import { openingHours } from "@/content/site";
import { cn } from "@/lib/utils";

type Status = { open: boolean; text: string };

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

export function getStatus(date: Date): Status {
  const { day, minutes } = mauritiusNow(date);
  const opens = toMinutes(openingHours.opens);
  const closes = toMinutes(openingHours.closes);
  const openToday = openingHours.days.includes(day);

  if (openToday && minutes >= opens && minutes < closes) {
    const left = closes - minutes;
    return {
      open: true,
      text: left <= 60 ? `Open now, closing soon at ${openingHours.closes}` : `Open now until ${openingHours.closes}`
    };
  }

  if (openToday && minutes < opens) {
    return { open: false, text: `Closed now, opens today at ${openingHours.opens}` };
  }

  for (let step = 1; step <= 7; step++) {
    const next = (day + step) % 7;
    if (openingHours.days.includes(next)) {
      const when = step === 1 ? "tomorrow" : dayNames[next];
      return { open: false, text: `Closed now, opens ${when} at ${openingHours.opens}` };
    }
  }

  return { open: false, text: "Closed" };
}

export function OpenStatus({ className }: { className?: string }) {
  // Rendered on the server without a status, so the page never shows a stale time from build day.
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(getStatus(new Date()));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p aria-live="polite" className={cn("flex min-h-6 items-center gap-2 text-[0.95rem]", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "inline-block h-2 w-2 rounded-full",
          status === null ? "bg-line" : status.open ? "bg-[#2f7d4f]" : "bg-muted/60"
        )}
      />
      <span className={status?.open ? "text-[#25633f]" : "text-muted"}>
        {status ? status.text : openingHours.summary}
      </span>
    </p>
  );
}
