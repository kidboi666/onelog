import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/utils";

const Sidebar = ({ className, children }: ComponentProps<"aside">) => {
  return (
    <aside
      className={cn(
        "lg:-translate-y-1/2 fixed top-4 left-4 z-40 hidden h-fit w-16 flex-col gap-2 rounded-lg bg-card p-2 shadow-md sm:flex lg:top-1/2",
        className,
      )}
    >
      {children}
    </aside>
  );
};

const Page = ({ className, children }: ComponentProps<"div">) => {
  return (
    <main className="mt-4 flex justify-center px-4 sm:ml-[80px]">
      <div className={cn("w-full lg:w-[880px]", className)}>{children}</div>
    </main>
  );
};

export const Container = { Sidebar, Page };
