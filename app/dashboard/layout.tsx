import Navbar from "@/components/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100"
    >
      <Navbar />
      {children}
    </div>
  );
}
