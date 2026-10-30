import { useState } from "react"

import { PetButtonCard } from "@/components/pet-button-card"
import { PressHistory } from "@/components/press-history"
import {
  petButtons as initialButtons,
  todayHistory as initialHistory,
} from "@/data/pet-buttons"
import type { PetButton } from "@/data/pet-buttons"

function byPendingFirst(buttons: PetButton[]) {
  return [...buttons].sort((a) => (a.status === "pending" ? -1 : 1))
}

export function App() {
  const [buttons, setButtons] = useState<PetButton[]>(initialButtons)
  const [history, setHistory] = useState(initialHistory)

  function handleAcknowledge(id: string) {
    const button = buttons.find((b) => b.id === id)

    setButtons((prev) =>
      prev.map((button) =>
        button.id === id ? { ...button, status: "acknowledged" } : button
      )
    )

    if (button?.historyId) {
      setHistory((prev) =>
        prev.map((entry) =>
          entry.id === button.historyId
            ? {
                ...entry,
                acknowledged: true,
                acknowledgedBy: "Вы",
                acknowledgedAfterMinutes: button.elapsedMinutes,
              }
            : entry
        )
      )
    }
  }

  return (
    <div className="min-h-svh bg-background px-4 py-10 sm:py-14">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <header className="flex flex-col gap-1">
          <h1 className="text-lg font-medium">Кнопки дома</h1>
          <p className="text-sm text-muted-foreground">
            Видно, кто из питомцев звал и сколько минут прошло
          </p>
        </header>

        <div className="flex flex-col gap-3">
          {byPendingFirst(buttons).map((button) => (
            <PetButtonCard
              key={button.id}
              button={button}
              onAcknowledge={handleAcknowledge}
            />
          ))}
        </div>

        <PressHistory entries={history} />
      </div>
    </div>
  )
}

export default App
