import { useState, useEffect, useCallback } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import TaskCard from './TaskCard.jsx'
import TaskForm from './TaskForm.jsx'
import Navbar from './Navbar.jsx'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../contexts/AuthContext.jsx'

const Dashboard = () => {
  const { user } = useAuth()
  const [setAllTasks] = useState([])
  const [columns, setColumns] = useState({
    todo: { name: 'À faire', items: [] },
    inProgress: { name: 'En cours', items: [] },
    done: { name: 'Terminé', items: [] },
  })
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const fetchTasks = useCallback(async () => {
    setIsLoading(true)
    try {
      if (user) {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        if (data) {
          setAllTasks(data)

          const todo = data.filter(t => t.status === 'todo')
          const inProgress = data.filter(t => t.status === 'inProgress')
          const done = data.filter(t => t.status === 'done')

          setColumns({
            todo: { name: 'À faire', items: todo },
            inProgress: { name: 'En cours', items: inProgress },
            done: { name: 'Terminé', items: done },
          })

          const today = new Date()
          today.setHours(0, 0, 0, 0)

          setStats({
            totalTasks: data.length,
            completedTasks: done.length,
            pendingTasks: todo.length + inProgress.length,
            overdueTasks: data.filter(t => t.status !== 'done' && t.dueDate && new Date(t.dueDate) < today).length,
          })
        }
      } else {
        // Mode déconnecté : données mock
        const mockTasks = [
          {
            id: '1',
            title: 'Créer la maquette',
            description: 'Wireframes dans Figma',
            status: 'todo',
            priority: 'high',
          },
          {
            id: '2',
            title: 'Déployer la bêta',
            description: 'Version test sur serveur',
            status: 'done',
            priority: 'medium',
          },
        ]

        setAllTasks(mockTasks)
        setColumns({
          todo: { name: 'À faire', items: mockTasks.filter(t => t.status === 'todo') },
          inProgress: { name: 'En cours', items: [] },
          done: { name: 'Terminé', items: mockTasks.filter(t => t.status === 'done') },
        })
        setStats({
          totalTasks: mockTasks.length,
          completedTasks: 1,
          pendingTasks: 1,
          overdueTasks: 0,
        })
      }
    } catch (err) {
      console.error('Erreur chargement tâches :', err)
    } finally {
      setIsLoading(false)
    }
  }, [setAllTasks, user])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleDragEnd = ({ active, over }) => {
    if (!over) return
    const [taskId, sourceColumnId] = active.id.split('-')
    const [_, targetColumnId] = over.id.split('-')

    if (sourceColumnId === targetColumnId) return

    const sourceItems = [...columns[sourceColumnId].items]
    const targetItems = [...columns[targetColumnId].items]
    const taskIndex = sourceItems.findIndex(item => item.id === taskId)
    if (taskIndex < 0) return

    const [movedTask] = sourceItems.splice(taskIndex, 1)
    const updatedTask = { ...movedTask, status: targetColumnId }
    targetItems.push(updatedTask)

    setColumns({
      ...columns,
      [sourceColumnId]: { ...columns[sourceColumnId], items: sourceItems },
      [targetColumnId]: { ...columns[targetColumnId], items: targetItems },
    })

    if (user) {
      supabase.from('tasks').update({ status: targetColumnId }).eq('id', taskId)
    }
    setAllTasks(prev => prev.map(task => task.id === taskId ? { ...task, status: targetColumnId } : task))
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Navbar />
      <TaskForm onTaskCreated={fetchTasks} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card-stats">
          <h3>Total</h3>
          <p className="text-2xl font-bold">{stats.totalTasks}</p>
        </div>
        <div className="card-stats">
          <h3>Terminées</h3>
          <p className="text-2xl font-bold text-success">{stats.completedTasks}</p>
        </div>
        <div className="card-stats">
          <h3>En retard</h3>
          <p className="text-2xl font-bold text-danger">{stats.overdueTasks}</p>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center py-12">Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            {Object.entries(columns).map(([columnId, column]) => (
              <div key={columnId} className="card-column">
                <div className="p-4 font-semibold bg-neutral-100 dark:bg-neutral-800 rounded-t-xl border-b dark:border-neutral-700">
                  {column.name} ({column.items.length})
                </div>
                <div className="p-4 space-y-2 min-h-[300px] bg-neutral-50 dark:bg-neutral-800/50 rounded-b-xl">
                  <SortableContext
                    items={column.items.map(item => `${item.id}-${columnId}`)}
                    strategy={verticalListSortingStrategy}
                  >
                    {column.items.map(task => (
                      <TaskCard
                        key={`${task.id}-${columnId}`}
                        id={`${task.id}-${columnId}`}
                        task={task}
                        columnId={columnId}
                      />
                    ))}
                  </SortableContext>
                </div>
              </div>
            ))}
          </DndContext>
        </div>
      )}
    </div>
  )
}

export default Dashboard
