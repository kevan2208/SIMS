"use client";

import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { LogoLockup } from "@/components/ui/logo-lockup";

export function PageLoadOverlay() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 700);
    const t2 = setTimeout(() => setGone(true), 1250);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div className={`page-reload-overlay${fading ? " page-reload-overlay--fade" : ""}`}>
      <Container className="flex min-h-screen items-center justify-center py-16">
        <div className="page-loading-card">
          <div className="page-loading-logo-wrap">
            <div className="page-loading-glow" />
            <LogoLockup className="page-loading-logo" priority variant="hero" />
          </div>

          <div className="page-loading-copy">
            <p className="page-loading-eyebrow">Welcome</p>
            <p className="page-loading-text">Loading Sim&apos;s Hair and Beauty.</p>
          </div>

          <div aria-hidden="true" className="page-loading-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      </Container>
    </div>
  );
}
