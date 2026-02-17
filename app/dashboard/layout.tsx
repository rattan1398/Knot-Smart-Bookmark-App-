import Navbar from "@/components/NavBar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {children}
    </div>
  )
}
