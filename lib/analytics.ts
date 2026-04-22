// Analytics event tracking utility
// Tracks conversion events for both Google Analytics and Facebook Pixel

export type AnalyticsEvent = {
  event: string;
  category?: string;
  label?: string;
  value?: number;
};

export const trackEvent = (data: AnalyticsEvent) => {
  // Google Analytics
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", data.event, {
      event_category: data.category,
      event_label: data.label,
      value: data.value
    });
  }

  // Facebook Pixel
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", data.event);
  }
};

// Track booking button clicks
export const trackBookingClick = () => {
  trackEvent({
    event: "booking_click",
    category: "engagement",
    label: "whatsapp_booking"
  });
};

// Track service view
export const trackServiceView = (serviceName: string) => {
  trackEvent({
    event: "service_view",
    category: "engagement",
    label: serviceName
  });
};

// Track page views
export const trackPageView = (pagePath: string) => {
  trackEvent({
    event: "page_view",
    category: "navigation",
    label: pagePath
  });
};

// Track testimonial engagement
export const trackTestimonialView = (author: string) => {
  trackEvent({
    event: "testimonial_view",
    category: "engagement",
    label: author
  });
};

// Track map click for directions
export const trackDirectionsClick = () => {
  trackEvent({
    event: "directions_click",
    category: "engagement",
    label: "google_maps"
  });
};
