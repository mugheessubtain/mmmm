import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { BASE_URL } from "@/constant/constant"


interface ApplicationPopupProps {
  isOpen: boolean
  onClose: () => void
  loanDetails: {
    category: string
    subcategory: string
    amount: number
    period: number
  },
  onSubmit: (data: ApplicationData) => void;
}
export type ApplicationData = {
    cnic: string;
    email: string;
    name: string;
  };
  

export function ApplicationPopup({ isOpen, onClose, loanDetails }: ApplicationPopupProps) {
  const [cnic, setCnic] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("apple",loanDetails)
    try {
      const response = await fetch(`${BASE_URL}api/loan/submit-application`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cnic,
          email,
          name,
          loanDetails:loanDetails,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit application")
      }

      const data = await response.json()
      toast({
        title: "Application Submitted",
        description: "Please check your email for further instructions.",
      })
      onClose()
    } catch (error) {
      console.error("Error submitting application:", error)
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Loan Application</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cnic">CNIC</Label>
            <Input id="cnic" value={cnic} onChange={(e) => setCnic(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <Button type="submit">Submit Application</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

