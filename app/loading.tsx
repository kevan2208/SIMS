import { Container } from "@/components/ui/container";
import { LogoLockup } from "@/components/ui/logo-lockup";

export default function Loading() {
  return (
    <main className="page-loading-screen">
      <Container className="flex min-h-[calc(100vh-5rem)] items-center justify-center py-16">
        <div className="page-loading-card">
          <div className="page-loading-logo-wrap">
            <div className="page-loading-glow" />
            <LogoLockup className="page-loading-logo" priority variant="hero" />
          </div>

          <div className="page-loading-copy">
            <p className="page-loading-eyebrow">Opening page</p>
            <p className="page-loading-text">Loading the next section of the salon site.</p>
          </div>

          <div aria-hidden="true" className="page-loading-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      </Container>
    </main>
  );
}
