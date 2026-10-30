import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { HistoryEntry } from "@/data/pet-buttons"

interface PressHistoryProps {
  entries: HistoryEntry[]
}

export function PressHistory({ entries }: PressHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>История за сегодня</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <ul className="divide-y divide-border">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-(--card-spacing) py-3 text-sm"
            >
              <div className="flex items-center gap-3">
                <span className="font-numeric text-muted-foreground tabular-nums">
                  {entry.time}
                </span>
                <span className="font-medium">{entry.buttonName}</span>
              </div>

              <div className="flex items-center gap-2">
                {entry.acknowledged ? (
                  <>
                    <span className="text-xs text-muted-foreground">
                      {entry.acknowledgedBy} · через{" "}
                      {entry.acknowledgedAfterMinutes} мин
                    </span>
                    <Badge className="border-transparent bg-muted text-muted-foreground">
                      Принято
                    </Badge>
                  </>
                ) : (
                  <Badge className="border-transparent bg-attention text-attention-foreground">
                    Не принято
                  </Badge>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
