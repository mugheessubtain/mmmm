"use client"

import { useState } from "react"
import { Layout } from "../components/layoutOFcategeries"
import { LoanCategory } from "../components/loan-category"
import { Popup } from "../components/popup"
import { LoanCalculator } from "../components/loan-calculator"

const loanCategories = [
  {
    title: "Wedding Loans",
    icon: "💍",
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
    maxLoan: "PKR 5 Lakh",
    loanPeriod: "3 years",
  },
  {
    title: "Home Construction Loans",
    icon: "🏠",
    subcategories: ["Structure", "Finishing", "Loan"],
    maxLoan: "PKR 10 Lakh",
    loanPeriod: "5 years",
  },
  {
    title: "Business Startup Loans",
    icon: "💼",
    subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
    maxLoan: "PKR 10 Lakh",
    loanPeriod: "5 years",
  },
  {
    title: "Education Loans",
    icon: "🎓",
    subcategories: ["University Fees", "Child Fees Loan"],
    maxLoan: "Based on requirement",
    loanPeriod: "4 years",
  },
]

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof loanCategories)[0] | null>(null)

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Loan Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {loanCategories.map((category, index) => (
          <LoanCategory
            key={index}
            title={category.title}
            icon={category.icon}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </div>

      <LoanCalculator />

      {selectedCategory && (
        <Popup
          isOpen={!!selectedCategory}
          onClose={() => setSelectedCategory(null)}
          title={selectedCategory.title}
          subcategories={selectedCategory.subcategories}
          maxLoan={selectedCategory.maxLoan}
          loanPeriod={selectedCategory.loanPeriod}
        />
      )}
    </Layout>
  )
}

