import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface LoanCategoryProps {
  title: string
  icon: string
  onClick: () => void
}

export function LoanCategory({ title, icon, onClick }: LoanCategoryProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6 flex flex-col items-center">
        <span className="text-4xl mb-4">{icon}</span>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <Button onClick={onClick}>Learn More</Button>
      </CardContent>
    </Card>
  )
}

