import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import TaskForm from './TaskForm'
import TaskCard from './TaskCard'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Clock, Calendar, Plus, BarChart2 } from 'lucide-react'
import PomodoroTimer from './PomodoroTimer'
import WeatherWidget from './WeatherWidget'

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [parent] = useAutoAnimate()
  const [currentDate, setCurrentDate] = useState(new Date())

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from('tasks').select('*')
    if (!error) setTasks(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchTasks()
    
    // Mettre à jour la date toutes les minutes
    const interval = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000)
    
    return () => clearInterval(interval)
  }, [fetchTasks])

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex(task => task.id === active.id)
      const newIndex = tasks.findIndex(task => task.id === over?.id)
      const reordered = arrayMove(tasks, oldIndex, newIndex)
      setTasks(reordered)
    }
  }

  // Formatter la date pour l'affichage
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(currentDate)

  // Récupérer l'heure pour le message d'accueil
  const hour = currentDate.getHours()
  let greeting = "Bonjour"
  if (hour < 5) greeting = "Bonne nuit"
  else if (hour < 12) greeting = "Bonjour"
  else if (hour < 18) greeting = "Bon après-midi"
  else greeting = "Bonsoir"

  return (
    <>
      {/* En-tête du Dashboard */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">{greeting}, giraud</h1>
        <p className="text-sm text-gray-400 italic">
          "Simplicity boils down to two steps: Identify the essential. Eliminate the rest." - Leo Babauta
        </p>
        <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colonne de gauche */}
        <div className="space-y-6">
          {/* Smart Overview */}
          <div className="bg-[#1e293b] rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">✨</span>
                <h2 className="font-semibold">Smart Overview</h2>
              </div>
              <span className="bg-blue-900/50 text-blue-300 text-xs px-2 py-1 rounded-full">NEW</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Add some items to get started with your Smart Overview.
            </p>
            <p className="text-xs text-gray-500">
              TaskMaster can make a review, thing details...
            </p>
          </div>

          {/* Your Productivity */}
          <div className="bg-[#1e293b] rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-purple-500">📊</span>
                <h2 className="font-semibold">Your Productivity</h2>
              </div>
              <button className="text-gray-400 hover:text-gray-300">
                <BarChart2 size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              No items to track yet. Start by creating some tasks, goals, projects, or habits!
            </p>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-[#1e293b] rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-red-500">📅</span>
                <h2 className="font-semibold">Upcoming Deadlines</h2>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              No upcoming deadlines.
            </p>
          </div>

          {/* Task List */}
          <div className="bg-[#1e293b] rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">Tasks</h2>
              </div>
              <div className="flex gap-2">
                <button className="bg-[#334155] hover:bg-[#475569] text-xs px-2 py-1 rounded-md">
                  All Tasks
                </button>
                <button className="bg-[#334155] hover:bg-[#475569] text-xs px-2 py-1 rounded-md">
                  Projects
                </button>
                <button className="bg-[#334155] hover:bg-[#475569] text-xs px-2 py-1 rounded-md">
                  Filters
                </button>
              </div>
            </div>
            
            {/* Task Input */}
            <div className="mb-4">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  placeholder="Enter new task..." 
                  className="w-full bg-[#334155] border-none rounded-lg py-2 px-4 pr-10 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button className="absolute right-2 text-gray-400 hover:text-indigo-400">
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Task List */}
            <div ref={parent} className="mt-4 space-y-3">
              {loading ? (
                <p className="text-center text-sm text-gray-500">Chargement des tâches...</p>
              ) : tasks.length > 0 ? (
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                    {tasks.map(task => (
                      <TaskCard key={task.id} task={task} onDelete={fetchTasks} />
                    ))}
                  </SortableContext>
                </DndContext>
              ) : (
                <p className="text-center text-sm text-gray-500">No tasks yet...</p>
              )}
            </div>
          </div>
        </div>

        {/* Colonne de droite */}
        <div className="space-y-6">
          {/* Weather & Forecast */}
          <div className="bg-[#1e293b] rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">🌤️</span>
                <h2 className="font-semibold">Weather & Forecast</h2>
              </div>
            </div>
            <WeatherWidget />
          </div>

          {/* Pomodoro Timer */}
          <div className="bg-[#1e293b] rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-red-500">⏱️</span>
                <h2 className="font-semibold">Pomodoro Timer</h2>
              </div>
              <button className="bg-purple-900/50 text-purple-300 text-xs px-2 py-1 rounded-full">
                New Timer
              </button>
            </div>
            <div className="flex flex-col items-center justify-center py-4">
              <PomodoroTimer />
            </div>
          </div>

          {/* Custom Timers */}
          <div className="bg-[#1e293b] rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-indigo-500">⏰</span>
                <h2 className="font-semibold">Custom Timers</h2>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              No custom timers yet...
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
