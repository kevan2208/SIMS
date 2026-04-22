import { cn } from "@/lib/utils";

export type ActionIconName = "facebook" | "file" | "instagram" | "map" | "whatsapp";

type ActionIconProps = {
  name: ActionIconName;
  className?: string;
};

export function inferActionIcon({
  href,
  label,
  download
}: {
  href?: string;
  label?: string;
  download?: boolean;
}): ActionIconName | null {
  const normalizedHref = href?.toLowerCase();
  const normalizedLabel = label?.toLowerCase();

  if (download || normalizedHref?.endsWith(".pdf")) {
    return "file";
  }

  if (normalizedHref?.includes("wa.me") || normalizedLabel?.includes("whatsapp")) {
    return "whatsapp";
  }

  if (normalizedHref?.includes("facebook.com") || normalizedLabel?.includes("facebook")) {
    return "facebook";
  }

  if (normalizedHref?.includes("instagram.com") || normalizedLabel?.includes("instagram")) {
    return "instagram";
  }

  if (
    normalizedHref?.includes("google.com/maps") ||
    normalizedHref?.includes("maps.google") ||
    normalizedLabel?.includes("direction") ||
    normalizedLabel?.includes("map")
  ) {
    return "map";
  }

  return null;
}

export function ActionIcon({ name, className }: ActionIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("h-[1.05rem] w-[1.05rem] shrink-0", className)}
      fill="none"
      viewBox="0 0 24 24"
    >
      {name === "whatsapp" ? (
        <path
          d="M12 2.2a9.7 9.7 0 0 0-8.38 14.6L2.3 21.7l5.03-1.31A9.7 9.7 0 1 0 12 2.2Zm0 17.56a7.83 7.83 0 0 1-3.98-1.08l-.29-.17-2.99.78.8-2.91-.19-.3a7.85 7.85 0 1 1 6.65 3.68Zm4.3-5.9c-.24-.12-1.42-.7-1.64-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.92-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.17-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.12-.12.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.04.4 1.4.5.58.18 1.1.16 1.52.1.46-.06 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"
          fill="currentColor"
        />
      ) : null}

      {name === "facebook" ? (
        <path
          d="M13.4 21.2v-8.05h2.67l.4-3.13H13.4V8.02c0-.9.25-1.52 1.55-1.52h1.66V3.7c-.29-.04-1.27-.12-2.42-.12-2.39 0-4.03 1.46-4.03 4.14v2.3H7.46v3.13h2.7v8.05h3.24Z"
          fill="currentColor"
        />
      ) : null}

      {name === "instagram" ? (
        <>
          <rect
            height="14.2"
            rx="4.1"
            stroke="currentColor"
            strokeWidth="1.8"
            width="14.2"
            x="4.9"
            y="4.9"
          />
          <circle cx="12" cy="12" r="3.35" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="16.9" cy="7.1" fill="currentColor" r="1.05" />
        </>
      ) : null}

      {name === "map" ? (
        <>
          <path
            d="M12 21.1s6.15-5.4 6.15-11.04A6.15 6.15 0 0 0 5.85 10.06C5.85 15.7 12 21.1 12 21.1Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="10.05" fill="currentColor" r="2.1" />
        </>
      ) : null}

      {name === "file" ? (
        <>
          <path
            d="M8 3.7h5.78l3.52 3.54V20.3H8V3.7Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path d="M13.78 3.7v3.54h3.52" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
          <path
            d="M10.05 15.35h5.9M10.05 12.35h5.1"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.8"
          />
        </>
      ) : null}
    </svg>
  );
}
