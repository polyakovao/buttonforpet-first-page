import { Bell, Send } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { PetButton } from "@/data/pet-buttons"

interface PetButtonCardProps {
  button: PetButton
  onAcknowledge: (id: string) => void
}

const channelLabels: Record<PetButton["channels"][number], string> = {
  telegram: "Telegram",
  push: "Push",
}

const channelIcons: Record<PetButton["channels"][number], typeof Send> = {
  telegram: Send,
  push: Bell,
}

export function PetButtonCard({ button, onAcknowledge }: PetButtonCardProps) {
  const isPending = button.status === "pending"

  return (
    <Card
      className={cn(
        "transition-colors duration-500",
        isPending && "animate-button-breathe"
      )}
    >
      <CardHeader>
        <CardTitle>{button.petName}</CardTitle>
        <CardDescription>{button.name}</CardDescription>
        <CardAction>
          {isPending ? (
            <Badge className="border-transparent bg-attention text-attention-foreground">
              Ждёт ответа
            </Badge>
          ) : (
            <Badge className="border-transparent bg-muted text-muted-foreground">
              Принято
            </Badge>
          )}
        </CardAction>
      </CardHeader>

      <CardContent className="flex items-end justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-2">
          <p className="text-sm text-foreground">{button.message}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {button.channels.map((channel) => {
              const Icon = channelIcons[channel]
              return (
                <span key={channel} className="inline-flex items-center gap-1">
                  <Icon className="size-3.5" />
                  {channelLabels[channel]}
                </span>
              )
            })}
          </div>
        </div>

        {isPending ? (
          <div className="flex shrink-0 flex-col items-end">
            <span className="font-numeric text-6xl leading-none font-medium tabular-nums">
              {button.elapsedMinutes}
            </span>
            <span className="mt-1 text-xs text-muted-foreground">
              мин назад
            </span>
          </div>
        ) : (
          <span className="shrink-0 text-sm text-muted-foreground">
            {button.elapsedMinutes} мин назад
          </span>
        )}
      </CardContent>

      {isPending && (
        <CardFooter className="border-t-0 bg-transparent">
          <Button className="ml-auto" onClick={() => onAcknowledge(button.id)}>
            Принял
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
