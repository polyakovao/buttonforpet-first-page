export type ButtonStatus = "pending" | "acknowledged"

export type NotificationChannel = "telegram" | "push"

export interface PetButton {
  id: string
  name: string
  petName: string
  message: string
  elapsedMinutes: number
  status: ButtonStatus
  channels: NotificationChannel[]
  historyId?: string
}

export interface HistoryEntry {
  id: string
  time: string
  buttonName: string
  acknowledged: boolean
  acknowledgedBy?: string
  acknowledgedAfterMinutes?: number
}

export const petButtons: PetButton[] = [
  {
    id: "door",
    name: "Кнопка у двери",
    petName: "Бобик",
    message: "Бобик просится гулять",
    elapsedMinutes: 12,
    status: "pending",
    channels: ["telegram", "push"],
    historyId: "4",
  },
  {
    id: "bowl",
    name: "Кнопка у миски",
    petName: "Мурка",
    message: "Мурка просит есть",
    elapsedMinutes: 54,
    status: "acknowledged",
    channels: ["push"],
  },
]

export const todayHistory: HistoryEntry[] = [
  {
    id: "1",
    time: "07:15",
    buttonName: "Кнопка у миски",
    acknowledged: true,
    acknowledgedBy: "Аня",
    acknowledgedAfterMinutes: 4,
  },
  {
    id: "2",
    time: "08:02",
    buttonName: "Кнопка у двери",
    acknowledged: true,
    acknowledgedBy: "Аня",
    acknowledgedAfterMinutes: 2,
  },
  {
    id: "3",
    time: "13:40",
    buttonName: "Кнопка у двери",
    acknowledged: true,
    acknowledgedBy: "Игорь",
    acknowledgedAfterMinutes: 9,
  },
  {
    id: "4",
    time: "18:47",
    buttonName: "Кнопка у двери",
    acknowledged: false,
  },
]
