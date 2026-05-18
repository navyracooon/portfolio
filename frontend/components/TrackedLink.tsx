"use client";

import Link, { type LinkProps } from "next/link";
import type { PropsWithChildren } from "react";

type TrackedLinkProps = PropsWithChildren<
  LinkProps & {
    className?: string;
    eventType?: string;
    targetType?: string;
    targetSlug?: string;
  }
>;

export function TrackedLink({
  children,
  className,
  eventType: _eventType,
  targetType: _targetType,
  targetSlug: _targetSlug,
  ...props
}: TrackedLinkProps) {
  return (
    <Link {...props} className={className}>
      {children}
    </Link>
  );
}
