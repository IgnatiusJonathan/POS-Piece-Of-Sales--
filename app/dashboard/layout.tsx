import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="app-container">
      <Header />
      <Navbar />
      <main className="content" id="content">
        {children}
      </main>
      <Footer />
    </div>
  )
}
