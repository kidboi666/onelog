import { CornerDownRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface Props {
  onShowCommentInput: () => void;
}

export function CommentInputButton({ onShowCommentInput }: Props) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onShowCommentInput}
      className="flex gap-2 text-xs font-light h-auto p-2"
    >
      <CornerDownRight className="h-4 w-4" />
    </Button>
  );
}
