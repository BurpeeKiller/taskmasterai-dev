import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { LogOut, Settings, Sun, Moon, Search, Bell, Menu } from 'lucide-react'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="bg-[#1e293b] border-b border-[#334155] px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      {/* Bouton Menu (visible uniquement sur mobile) */}
      <button className="md:hidden text-gray-300">
        <Menu size={20} />
      </button>

      {/* Recherche */}
      <div className="hidden md:flex items-center relative flex-1 max-w-md">
        <Search className="absolute left-3 text-gray-400" size={16} />
        <input 
          type="text" 
          placeholder="Rechercher..." 
          className="w-full bg-[#334155] border-none rounded-lg py-1.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-200"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="p-1.5 rounded-full hover:bg-[#334155] text-gray-300 relative">
          <Bell size={18} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-full hover:bg-[#334155] text-gray-300"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Déconnexion */}
        <button
          onClick={handleLogout}
          className="p-1.5 rounded-full hover:bg-[#334155] text-gray-300"
        >
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
