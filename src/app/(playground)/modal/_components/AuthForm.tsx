import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

interface Props {
  register: UseFormRegisterReturn;
  error?: FieldError;
  type?: string;
  name?: string;
  placeholder?: string;
}

export default function AuthForm({
  placeholder,
  type,
  name,
  register,
  error,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-2">
      {name && (
        <Label htmlFor={type} className="font-semibold text-sm">
          {name}
        </Label>
      )}
      <Input
        id={type}
        placeholder={placeholder}
        type={type}
        {...register}
        className="w-full"
      />
      {error?.message && (
        <p className="text-destructive text-sm">{error.message}</p>
      )}
    </div>
  );
}
