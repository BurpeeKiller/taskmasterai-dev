import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext.jsx'

const TaskForm = ({ onTaskCreated }) => {
  const { user } = useAuth()
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  })
  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newTask = {
      ...form,
      status: 'todo',
      user_id: user?.id || null,
      created_at: new Date().toISOString(),
    }

    if (user) {
      const { error } = await supabase.from('tasks').insert([newTask])
      if (error) {
        setMessage('❌ Erreur lors de la création.')
      } else {
        setMessage('✅ Tâche ajoutée !')
        setForm({ title: '', description: '', priority: 'medium', dueDate: '' })
        onTaskCreated() // pour rafraîchir la liste
      }
    } else {
      // mode mock
      setMessage('✅ Tâche simulée (mode déconnecté)')
      onTaskCreated({ ...newTask, id: crypto.randomUUID() })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4 space-y-4 mb-6">
      <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">Ajouter une tâche</h3>

      <input
        name="title"
        placeholder="Titre"
        className="input"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="input"
        value={form.description}
        onChange={handleChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select
          name="priority"
          className="input"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="low">Faible</option>
          <option value="medium">Moyenne</option>
          <option value="high">Haute</option>
        </select>

        <input
          name="dueDate"
          type="date"
          className="input"
          value={form.dueDate}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
      >
        Créer la tâche
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  )
}

export default TaskForm
