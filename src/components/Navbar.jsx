import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { supabase } from '../lib/supabase.js'
import ThemeToggle from './ThemeToggle.jsx'

const Navbar = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-neutral-800 shadow mb-4">
      <div className="flex items-center gap-4 text-sm font-medium">
        <Link to="/dashboard" className="hover:underline text-blue-600 dark:text-blue-400">Dashboard</Link>
        <Link to="/settings" className="hover:underline text-blue-600 dark:text-blue-400">Paramètres</Link>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        {user && (
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
            Déconnexion
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
