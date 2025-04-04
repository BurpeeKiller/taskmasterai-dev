// src/components/Layout.jsx
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 px-6 py-8 md:pl-72 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
