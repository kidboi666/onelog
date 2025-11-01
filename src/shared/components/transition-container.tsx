import * as motion from "motion/react-client";
import type { ComponentProps } from "react";

type BaseTransitionProps = ComponentProps<"div"> & {
  duration?: number;
};
type FadeInProps = BaseTransitionProps;
type SlideInProps = BaseTransitionProps & {
  direction?: "left" | "right" | "up" | "down";
  type?: "spring" | "tween" | false;
};

const DIRECTION_VARIANTS = {
  left: [{ x: 100 }, { x: 0 }],
  right: [{ x: -100 }, { x: 0 }],
  up: [{ y: 100 }, { y: 0 }],
  down: [{ y: -100 }, { y: 0 }],
};

const FadeIn = ({ duration = 0.3, className, children }: FadeInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration } }}
      exit={{ opacity: 0 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SlideIn = ({
  duration = 0.3,
  direction = "down",
  type = "tween",
  className,
  children,
}: SlideInProps) => {
  return (
    <motion.div
      initial={DIRECTION_VARIANTS[direction][0]}
      animate={{
        ...DIRECTION_VARIANTS[direction][1],
        transition: { duration, type },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const TransitionContainer = { FadeIn, SlideIn };
