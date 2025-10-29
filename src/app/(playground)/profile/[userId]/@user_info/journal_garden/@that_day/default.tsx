'use client'

export default function Default() {
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-8">
        <h2 className="font-bold text-2xl">그날의 기록</h2>
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/30 p-12 shadow-sm">
          <p className="text-muted-foreground">날짜를 선택해주세요.</p>
        </div>
      </div>
    </div>
  )
}
