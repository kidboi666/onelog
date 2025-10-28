import { ComponentProps } from "react";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/utils/tw-merge";

interface Props extends ComponentProps<"textarea"> {
  value: string;
}

export default function AboutMeSection({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor="aboutMe" className="font-bold text-lg">
        한줄 소개
      </Label>
      <div className="flex items-end gap-2">
        <Textarea
          id="aboutMe"
          value={value ?? ""}
          onChange={onChange}
          className="bg-var-lightgray p-2 dark:bg-var-dark"
          maxLength={150}
        />
        {value && (
          <span
            className={cn(
              "text-nowrap text-sm",
              value?.length > 150 && "text-red-600"
            )}
          >{`${value?.length} / 150`}</span>
        )}
      </div>
    </div>
  );
}
