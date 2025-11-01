import type { ChangeEvent } from "react";
import { Textarea } from "@/shared/components/ui/textarea";

type WriteFormProps = {
  value: string;
  onValueChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const WriteForm = ({ value, onValueChange }: WriteFormProps) => {
  return (
    <Textarea
      value={value}
      onChange={onValueChange}
      className="h-full resize-none border-none shadow-none"
    />
  );
};
