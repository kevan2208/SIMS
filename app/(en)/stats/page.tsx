import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { getContent } from "@/lib/content";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Booking stats", robots: { index: false, follow: false } };

type Row = Record<string, string | number>;

const EVENT_NAMES: Record<string, string> = {
  whatsapp: "Tapped Book on WhatsApp",
  "book-list": "Sent a booking list",
  add: "Added a service to the list",
  call: "Tapped Call",
  promo: "Booked the monthly offer"
};

/** Private page: /stats?key=… (the key is set in Vercel as STATS_KEY). */
export default async function StatsPage({ searchParams }: { searchParams: { key?: string; days?: string } }) {
  if (!process.env.STATS_KEY || searchParams.key !== process.env.STATS_KEY) {
    return (
      <main className="pink-wash -mt-16 pt-16">
        <Container className="py-20">
          <h1 className="font-display text-[2rem] text-ink">Booking stats</h1>
          <p className="mt-3 text-mauve">This page needs the private link with its key.</p>
        </Container>
      </main>
    );
  }

  const days = Math.min(365, Math.max(1, Number(searchParams.days) || 30));
  const sql = db();
  if (!sql) {
    return (
      <main className="pink-wash -mt-16 pt-16">
        <Container className="py-20">
          <p className="text-mauve">The stats database isn&apos;t connected (DATABASE_URL is missing).</p>
        </Container>
      </main>
    );
  }

  const since = new Date(Date.now() - days * 86_400_000).toISOString();
  const [byEvent, topServices, byPage, byDevice] = (await Promise.all([
    sql`SELECT event, count(*)::int AS n FROM taps WHERE at >= ${since} GROUP BY event ORDER BY n DESC`,
    sql`SELECT label, count(*)::int AS n FROM taps WHERE at >= ${since} AND event = 'add' GROUP BY label ORDER BY n DESC LIMIT 15`,
    sql`SELECT path, count(*)::int AS n FROM taps WHERE at >= ${since} AND event IN ('whatsapp','book-list','promo','call') GROUP BY path ORDER BY n DESC LIMIT 10`,
    sql`SELECT device, count(*)::int AS n FROM taps WHERE at >= ${since} AND event IN ('whatsapp','book-list','promo','call') GROUP BY device ORDER BY n DESC`
  ])) as Row[][];

  // Turn "hair-care:Shampoo + Blowdry" back into a readable name.
  const { categories } = await getContent("en");
  const names = new Map(categories.flatMap((c) => c.items.map((i) => [i.id, `${i.name} (${c.name})`] as const)));

  const periods = [7, 30, 90, 365];

  return (
    <main className="pink-wash -mt-16 pt-16">
      <Container className="max-w-[48rem] py-10">
        <h1 className="font-display text-[2.2rem] text-ink">Booking stats</h1>
        <p className="mt-2 text-[0.95rem] text-mauve">Taps on booking buttons, last {days} days. These are taps, not confirmed bookings.</p>
        <p className="mt-3 flex gap-3 text-[0.92rem]">
          {periods.map((d) => (
            <a
              className={d === days ? "font-semibold text-ink" : "text-sims-red underline underline-offset-4"}
              href={`/stats?key=${encodeURIComponent(searchParams.key ?? "")}&days=${d}`}
              key={d}
            >
              {d === 365 ? "1 year" : `${d} days`}
            </a>
          ))}
        </p>

        <Table empty="No taps yet." head={["What", "Times"]} rows={byEvent.map((r) => [EVENT_NAMES[String(r.event)] ?? String(r.event), r.n])} title="Overview" />
        <Table
          empty="No services added yet."
          head={["Service", "Added"]}
          rows={topServices.map((r) => [names.get(String(r.label)) ?? String(r.label), r.n])}
          title="Most added services"
        />
        <Table
          empty="No booking taps yet."
          head={["Page", "Booking taps"]}
          rows={byPage.map((r) => [String(r.path) || "/", r.n])}
          title="Pages that lead to bookings"
        />
        <Table empty="No booking taps yet." head={["Device", "Booking taps"]} rows={byDevice.map((r) => [String(r.device), r.n])} title="Phone or computer" />
      </Container>
    </main>
  );
}

function Table({ title, head, rows, empty }: { title: string; head: [string, string]; rows: Array<[string, string | number]>; empty: string }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-[1.4rem] text-ink">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-2 text-[0.95rem] text-mauve">{empty}</p>
      ) : (
        <table className="mt-3 w-full overflow-hidden rounded-md bg-white text-left text-[0.95rem]">
          <thead>
            <tr className="border-b border-seam text-mauve">
              <th className="px-4 py-2 font-medium">{head[0]}</th>
              <th className="px-4 py-2 text-right font-medium">{head[1]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([a, b]) => (
              <tr className="border-b border-seam last:border-0" key={a}>
                <td className="px-4 py-2 text-ink">{a}</td>
                <td className="px-4 py-2 text-right font-semibold tabular-nums text-ink">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
