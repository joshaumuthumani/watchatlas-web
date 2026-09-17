import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import {
  IMAGE_FALLBACK_SRC,
  recordImageOutcome,
  type ImageSurface,
} from "@/lib/imageDelivery";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | null | undefined;
  surface: ImageSurface;
};

/** A direct browser image with a bundled fallback for missing or failed sources. */
export default function ResilientImage({ src, surface, alt = "", ...props }: Props) {
  const source = src?.trim() || null;
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const reported = useRef(false);
  const unavailable = !source || failedSource === source;

  const report = (outcome: "loaded" | "unavailable") => {
    if (reported.current) return;
    reported.current = true;
    recordImageOutcome(surface, outcome);
  };

  useEffect(() => {
    reported.current = false;
    if (!source) report("unavailable");
  }, [source]);

  return (
    <img
      {...props}
      src={unavailable ? IMAGE_FALLBACK_SRC : source}
      alt={unavailable ? (alt ? `Image unavailable: ${alt}` : "Image unavailable") : alt}
      data-image-source-state={unavailable ? "unavailable" : "source"}
      onLoad={(event) => {
        if (!unavailable) report("loaded");
        props.onLoad?.(event);
      }}
      onError={(event) => {
        if (!unavailable) {
          setFailedSource(source);
          report("unavailable");
        }
        props.onError?.(event);
      }}
    />
  );
}
