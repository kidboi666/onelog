"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export const PageTransitionContainer = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
