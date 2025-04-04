// src/components/TaskForm.jsx
import { useState } from 'react'

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Moyenne')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({ title, description, priority, dueDate })
    setTitle('')
    setDescription('')
    setPriority('Moyenne')
    setDueDate('')
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 mb-6">
      <input
        type="text"
        placeholder="Titre"
        className="p-2 rounded border dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-800 dark:text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="p-2 rounded border dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-800 dark:text-white"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="p-2 rounded border dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-800 dark:text-white"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Haute</option>
        <option>Moyenne</option>
        <option>Basse</option>
      </select>
      <input
        type="date"
        className="p-2 rounded border dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-800 dark:text-white"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button
        type="submit"
        className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Créer la tâche
      </button>
    </form>
  )
}

export default TaskForm
