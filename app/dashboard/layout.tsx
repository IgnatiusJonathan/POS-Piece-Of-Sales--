import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="app-container">
      <Header />
      <Sidebar />
      <main className="content" id="content">
        {children}
      </main>
      <Footer />
    </div>
  )
}