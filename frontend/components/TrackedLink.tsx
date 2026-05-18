"use client";

import Link, { type LinkProps } from "next/link";
import type { PropsWithChildren } from "react";

import { recordInteractionEvent } from "@/lib/interactions";
import type { InteractionEventType, ObjectTargetType } from "@/lib/types";

type TrackedLinkProps = PropsWithChildren<
  LinkProps & {
    className?: string;
    eventType: InteractionEventType;
    targetType: ObjectTargetType;
    targetSlug: string;
  }
>;

export function TrackedLink({
  children,
  className,
  eventType,
  targetType,
  targetSlug,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      className={className}
      onClick={() => {
        void recordInteractionEvent({ eventType, targetType, targetSlug }).catch(() => undefined);
      }}
    >
      {children}
    </Link>
  );
}
