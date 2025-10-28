import { cva } from "class-variance-authority";
import type { ComponentProps, PropsWithChildren } from "react";
import { cn } from "@/shared/utils/tw-merge";

type GapSizes = "px" | 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64;

interface StackProps extends ComponentProps<"div"> {
  className?: string;
  dataStatus?: string;
  gap?: GapSizes;
  as?: "div" | "nav" | "header" | "main" | "footer" | "article" | "section";
  direction?: "row" | "col";
}

const stackClasses = cva("", {
  variants: {
    gap: {
      0: "gap-0",
      px: "gap-px",
      0.5: "gap-0.5",
      1: "gap-1",
      1.5: "gap-1.5",
      2: "gap-2",
      2.5: "gap-2.5",
      3: "gap-3",
      3.5: "gap-3.5",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      7: "gap-7",
      8: "gap-8",
      9: "gap-9",
      10: "gap-10",
      11: "gap-11",
      12: "gap-12",
      14: "gap-14",
      16: "gap-16",
      20: "gap-20",
      24: "gap-24",
      28: "gap-28",
      32: "gap-32",
      36: "gap-36",
      40: "gap-40",
      44: "gap-44",
      48: "gap-48",
      52: "gap-52",
      56: "gap-56",
      60: "gap-60",
      64: "gap-64",
    },
    direction: {
      col: "flex flex-col",
      row: "flex",
    },
  },
});

const Stack = ({
  children,
  gap = 2,
  className,
  dataStatus,
  as: Component = "div",
  direction,
}: PropsWithChildren<StackProps>) => {
  return (
    <Component
      data-status={dataStatus}
      className={cn(stackClasses({ gap, direction }), className)}
    >
      {children}
    </Component>
  );
};

export const XStack = (props: PropsWithChildren<StackProps>) => (
  <Stack {...props} direction="row" />
);
export const YStack = (props: PropsWithChildren<StackProps>) => (
  <Stack {...props} direction="col" />
);
export const ZStack = (props: PropsWithChildren<StackProps>) => (
  <Stack {...props} className="relative" />
);

XStack.displayName = "XStack";
YStack.displayName = "YStack";
ZStack.displayName = "ZStack";
