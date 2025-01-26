import type { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen text-center bg-gradient-to-b from-blue-100 to-blue-200">
        
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-700"> Saylani MicroFinance App</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-6 text-center">© 2023 Loan Services. All rights reserved.</div>
      </footer>
    </div>
  )
}

