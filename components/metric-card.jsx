import { Card, CardContent } from "@/components/ui/card"
import { Smile, DollarSign, Heart, Users, Target } from "lucide-react"

const METRIC_ICONS = {
  happiness: <Smile className="w-5 h-5 text-yellow-500" />,
  finance: <DollarSign className="w-5 h-5 text-green-500" />,
  health: <Heart className="w-5 h-5 text-red-500" />,
  social: <Users className="w-5 h-5 text-blue-500" />,
  fulfillment: <Target className="w-5 h-5 text-purple-500" />,
}

export const METRIC_LABELS = {
  happiness: "Kebahagiaan",
  finance: "Finansial",
  health: "Kesehatan",
  social: "Sosial",
  fulfillment: "Kepuasan Hidup",
}

export function MetricCard({ metric, value, className = "" }) {
  const icon = METRIC_ICONS[metric]
  const label = METRIC_LABELS[metric]

  // Normalize value to 0-100 for display (assuming raw weights can be negative/positive)
  // Let's assume the score is already somewhat normalized in the store or just show the number
  const displayValue = Math.round(value)

  return (
    <Card className={`overflow-hidden border-none bg-zinc-50 dark:bg-zinc-900 ${className}`}>
      <CardContent className="p-4 flex items-center gap-4">
        <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium truncate">{label}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, displayValue))}%` }}
              />
            </div>
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {displayValue}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
