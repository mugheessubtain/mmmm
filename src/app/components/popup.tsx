import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface PopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subcategories: string[]
  maxLoan: string
  loanPeriod: string
}

export function Popup({ isOpen, onClose, title, subcategories, maxLoan, loanPeriod }: PopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <h3 className="font-semibold mt-4">Subcategories:</h3>
          <ul className="list-disc list-inside mb-4">
            {subcategories.map((sub, index) => (
              <li key={index}>{sub}</li>
            ))}
          </ul>
          <p>
            <strong>Maximum loan:</strong> {maxLoan}
          </p>
          <p>
            <strong>Loan period:</strong> {loanPeriod}
          </p>
        </DialogDescription>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  )
}

