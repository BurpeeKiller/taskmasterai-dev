import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { useState } from 'react'

const Settings = () => {
  const { user } = useAuth()
  const [displayName, setDisplayName] = useState('')
  const [message, setMessage] = useState(null)

  const handleUpdate = async (e) => {
    e.preventDefault()
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayName })
      .eq('id', user.id)

    if (error) {
      setMessage('❌ Erreur lors de la mise à jour.')
    } else {
      setMessage('✅ Nom mis à jour avec succès !')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-neutral-800 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">Paramètres du compte</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
        <p className="text-neutral-800 dark:text-neutral-200">{user.email}</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Nom affiché
          </label>
          <input
            type="text"
            className="mt-1 w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Enregistrer
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  )
}

export default Settings
