import { DndContext, closestCenter } from '@dnd-kit/core.jsx'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable.jsx'
import { CSS } from '@dnd-kit/utilities.jsx'
import { useState } from 'react.jsx'
import { mockTasks } from '../lib/mockTasks.js'
import TaskCard from './TaskCard.jsx'

const COLUMN_NAMES = {
  todo: 'À faire',
  inProgress: 'En cours',
  done: 'Terminé'
}

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(mockTasks)

  const grouped = {
    todo: tasks.filter(t => t.status === 'todo'),
    inProgress: tasks.filter(t => t.status === 'inProgress'),
    done: tasks.filter(t => t.status === 'done')
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const sourceTask = tasks.find(t => t.id === active.id)
    const updatedTasks = tasks.map(t =>
      t.id === sourceTask.id ? { ...t, status: over.id } : t
    )
    setTasks(updatedTasks)
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(grouped).map(([status, items]) => (
          <Column key={status} id={status} title={COLUMN_NAMES[status]} tasks={items} />
        ))}
      </div>
    </DndContext>
  )
}

const Column = ({ title, tasks }) => (
  <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-xl min-h-[300px]">
    <h2 className="text-lg font-semibold mb-4 text-neutral-700 dark:text-neutral-200">{title}</h2>
    <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
      <div className="space-y-3">
        {tasks.map(task => (
          <SortableTask key={task.id} task={task} />
        ))}
      </div>
    </SortableContext>
  </div>
)

const SortableTask = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} />
    </div>
  )
}

export default KanbanBoard
