import { ComponentProps } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/utils/tw-merge";

interface Props extends ComponentProps<"input"> {
  value: string;
}

export default function UserNameSection({ value, onChange }: Props) {
  return (
    <div className="flex max-w-52 flex-col gap-4">
      <Label htmlFor="userName" className="font-bold text-lg">
        필명
      </Label>
      <div className="flex items-end gap-2">
        <Input
          id="userName"
          value={value}
          onChange={onChange}
          className="bg-var-lightgray dark:bg-var-dark"
          maxLength={10}
        />
        {value && (
          <span
            className={cn(
              "text-nowrap text-sm",
              value?.length > 10 && "text-red-600"
            )}
          >{`${value?.length} / 10`}</span>
        )}
      </div>
    </div>
  );
}
