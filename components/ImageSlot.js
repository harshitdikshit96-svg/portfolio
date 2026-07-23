"use client";

import { memo } from "react";
import Image from "next/image";
import { colors } from "@/lib/colors";

/**
 * Fixed-box image slot. Renders the real photo when `src` is given, or a
 * dashed placeholder (matching the original design's empty slots) when not —
 * so swapping in a new photo later is a one-line change, not a layout change.
 *
 * Two sizing modes:
 * - width + height: a fixed intrinsic size (portraits).
 * - fill: the image covers a responsive box — pass `height` for the box's
 *   fixed height, width stays 100%. Uses next/image's `fill` prop instead of
 *   stretching a fixed-ratio image via CSS, which is what next/image expects
 *   for a "crop to fill a box" thumbnail.
 */
function ImageSlot({
  src,
  alt,
  width,
  height,
  fill = false,
  shape = "rect",
  radius = 0,
  placeholder,
  preload = false,
  style,
}) {
  const borderRadius = shape === "rounded" ? `${radius}px` : "0px";

  if (!src) {
    return (
      <div
        style={{
          width: fill ? "100%" : width,
          height,
          borderRadius,
          background: colors.bgCard,
          border: `1px dashed ${colors.borderStrong}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: colors.textFaint,
          fontSize: 12,
          letterSpacing: "0.04em",
          textAlign: "center",
          padding: 12,
          ...style,
        }}
      >
        {placeholder}
      </div>
    );
  }

  if (fill) {
    return (
      <div style={{ position: "relative", width: "100%", height, borderRadius, overflow: "hidden", ...style }}>
        <Image
          src={src}
          alt={alt || placeholder || ""}
          fill
          preload={preload}
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || placeholder || ""}
      width={width}
      height={height}
      preload={preload}
      style={{ borderRadius, objectFit: "cover", ...style }}
    />
  );
}

export default memo(ImageSlot);
