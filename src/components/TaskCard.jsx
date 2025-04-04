// src/components/TaskCard.jsx
import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Trash2, Edit, MoreVertical, CheckCircle, Circle } from 'lucide-react'
import { supabase } from '../lib/supabase'

const TaskCard = ({ task, onDelete }) => {
  const [isCompleted, setIsCompleted] = useState(task.completed || false)
  const [showActions, setShowActions] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ 
    id: task.id,
    data: { task }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', task.id)
      
      if (error) throw error
      if (onDelete) onDelete()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }

  const handleComplete = async () => {
    const newStatus = !isCompleted
    setIsCompleted(newStatus)
    
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: newStatus })
        .eq('id', task.id)
      
      if (error) throw error
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error)
      setIsCompleted(!newStatus) // Revenir à l'état précédent en cas d'erreur
    }
  }

  // Déterminer la couleur de la priorité
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
      case 'haute':
        return 'text-red-300 bg-red-900/30'
      case 'medium':
      case 'moyenne':
        return 'text-yellow-300 bg-yellow-900/30'
      case 'low':
      case 'basse':
        return 'text-green-300 bg-green-900/30'
      default:
        return 'text-blue-300 bg-blue-900/30'
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-[#334155] p-4 rounded-lg shadow hover:shadow-md transition-all ${isCompleted ? 'opacity-70' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start gap-3">
        {/* Bouton de complétion */}
        <button 
          onClick={handleComplete}
          className="mt-1 text-gray-400 hover:text-green-400 transition-colors"
        >
          {isCompleted ? <CheckCircle size={18} className="text-green-400" /> : <Circle size={18} />}
        </button>
        
        {/* Contenu de la tâche */}
        <div className="flex-1">
          <h4 className={`text-base font-medium text-gray-100 ${isCompleted ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h4>
          {task.description && (
            <p className="text-sm text-gray-300 mt-1">{task.description}</p>
          )}
          
          {/* Métadonnées */}
          <div className="flex items-center gap-2 mt-2">
            {task.priority && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            )}
            {task.dueDate && (
              <span className="text-xs text-gray-400">
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className={`flex items-center gap-1 transition-opacity ${showActions ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            className="p-1 text-gray-400 hover:text-indigo-400"
            {...listeners}
            {...attributes}
          >
            <MoreVertical size={16} />
          </button>
          <button 
            className="p-1 text-gray-400 hover:text-yellow-400"
          >
            <Edit size={16} />
          </button>
          <button 
            className="p-1 text-gray-400 hover:text-red-400"
            onClick={handleDelete}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
