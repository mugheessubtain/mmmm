import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ApplicationPopup } from "./application-popup"
import { toast } from "@/hooks/use-toast"

const loanCategories = [
  { name: "Wedding Loans", subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"], maxLoan: 500000, period: 3 },
  { name: "Home Construction Loans", subcategories: ["Structure", "Finishing", "Loan"], maxLoan: 1000000, period: 5 },
  {
    name: "Business Startup Loans",
    subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
    maxLoan: 1000000,
    period: 5,
  },
  { name: "Education Loans", subcategories: ["University Fees", "Child Fees Loan"], maxLoan: 0, period: 4 },
]

export function LoanCalculator() {
  const [category, setCategory] = useState("")
  const [subcategory, setSubcategory] = useState("")
  const [initialDeposit, setInitialDeposit] = useState("")
  const [loanPeriod, setLoanPeriod] = useState("")
  const [loanBreakdown, setLoanBreakdown] = useState<string | null>(null)
  const [isApplicationPopupOpen, setIsApplicationPopupOpen] = useState(false)
  const [calculatedLoanDetails, setCalculatedLoanDetails] = useState<{
    category: string
    subcategory: string
    amount: number
    period: number
  } | null>(null)
  const [desiredLoanAmount, setDesiredLoanAmount] = useState("")

  const selectedCategory = loanCategories.find((c) => c.name === category)

  const calculateLoan = () => {
    if (!category || !subcategory || !initialDeposit || !loanPeriod || !desiredLoanAmount) {
      toast({ title: "Please fill all fields", })
      return
    }

    const deposit = Number.parseFloat(initialDeposit)
    const period = Number.parseInt(loanPeriod)
    const maxLoan = selectedCategory?.maxLoan || 0
    const desired = Number.parseFloat(desiredLoanAmount)

    if (deposit > maxLoan) {
      setLoanBreakdown("Initial deposit exceeds maximum loan amount")
      return
    }

    if (desired > maxLoan) {
      setLoanBreakdown(`Desired loan amount exceeds maximum loan of PKR ${maxLoan.toFixed(2)}`)
      return
    }

    const loanAmount = Math.min(desired, maxLoan - deposit)
    const monthlyPayment = loanAmount / (period * 12)

    setLoanBreakdown(`
      Loan amount: PKR ${loanAmount.toFixed(2)}
      Monthly payment: PKR ${monthlyPayment.toFixed(2)}
      Total repayment: PKR ${(monthlyPayment * period * 12).toFixed(2)}
    `)
    setCalculatedLoanDetails({
      category,
      subcategory,
      amount: loanAmount,
      period: Number.parseInt(loanPeriod),
    })
  }

  const handleApplicationSubmit = (data: { cnic: string; email: string; name: string }) => {
    // Here you would typically send this data to your backend
    console.log("Application submitted:", data)
    alert("Application submitted successfully!")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select loan category" />
            </SelectTrigger>
            <SelectContent>
              {loanCategories.map((cat) => (
                <SelectItem key={cat.name} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setSubcategory} disabled={!category}>
            <SelectTrigger>
              <SelectValue placeholder="Select subcategory" />
            </SelectTrigger>
            <SelectContent>
              {selectedCategory?.subcategories.map((sub) => (
                <SelectItem key={sub} value={sub}>
                  {sub}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Initial deposit (PKR)"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Desired loan amount (PKR)"
            value={desiredLoanAmount}
            onChange={(e) => setDesiredLoanAmount(e.target.value)}
          />

          <Select onValueChange={setLoanPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Select loan period" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year} year{year > 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={calculateLoan}>Calculate Loan</Button>

          {loanBreakdown && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md whitespace-pre-line">
              {loanBreakdown}
              <Button className="mt-4" onClick={() => setIsApplicationPopupOpen(true)}>
                Proceed
              </Button>
            </div>
          )}
        </div>
      </CardContent>

      {calculatedLoanDetails && (
        <ApplicationPopup
          isOpen={isApplicationPopupOpen}
          onClose={() => setIsApplicationPopupOpen(false)}
          loanDetails={calculatedLoanDetails}
          onSubmit={handleApplicationSubmit}
        />
      )}
    </Card>
  )
}

