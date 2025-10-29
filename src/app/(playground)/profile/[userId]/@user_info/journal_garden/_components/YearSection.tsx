import { Check, ChevronDown } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { cn } from '@/shared/utils/tw-merge'

interface Props {
  yearList: number[]
  selectedYear: number
  onSelect: (year: number) => void
}

export default function YearSection({ yearList, selectedYear, onSelect }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="self-end gap-1">
          {selectedYear}
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {yearList.map((year) => (
          <DropdownMenuItem
            key={year}
            onClick={() => onSelect(year)}
            className="gap-2 cursor-pointer"
          >
            {year}
            <Check
              className={cn(
                'ml-auto size-4',
                selectedYear === year ? 'opacity-100' : 'opacity-0'
              )}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
