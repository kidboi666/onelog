import { Edit2, MoreVertical, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

type ArticleOptionsDropdownMenuProps = {
  onModify: () => void;
  onDelete: () => void;
};

export const ArticleOptionsDropdownMenu = ({
  onModify,
  onDelete,
}: ArticleOptionsDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-2">
          <MoreVertical className="h-4 w-4 md:h-6 md:w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onModify} className="cursor-pointer gap-2">
          <Edit2 className="h-4 w-4" />
          수정하기
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="cursor-pointer gap-2">
          <Trash2 className="h-4 w-4" />
          삭제하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
