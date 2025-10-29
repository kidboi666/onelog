"use client";

import type { PropsWithChildren } from "react";

interface Props {
  params: Promise<{ userId: string }>;
}

export default function Layout({ children }: PropsWithChildren<Props>) {
  return <>{children}</>;
}
