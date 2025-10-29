import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { MBTI, TMBTI } from "../model/mbti";

interface Props {
  mbti?: TMBTI;
  setMbti: (mbti: TMBTI) => void;
}

export function MBTISection({ mbti, setMbti }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor="mbti" className="font-bold text-lg">
        MBTI
      </Label>
      <Select value={mbti || ""} onValueChange={(value) => setMbti(value as TMBTI)}>
        <SelectTrigger id="mbti" className="w-40">
          <SelectValue placeholder="MBTI 선택" />
        </SelectTrigger>
        <SelectContent>
          {MBTI.map((v) => (
            <SelectItem key={v} value={v}>
              {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
