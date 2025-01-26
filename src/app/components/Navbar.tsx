import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Saylani MicroFinance App
        </Link>
        <div className="space-x-4">
          <Link href="/login" passHref>
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/admin-login" passHref>
            <Button>Admin Login</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

