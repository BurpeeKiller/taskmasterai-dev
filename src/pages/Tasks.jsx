import React, { useState } from 'react';
import { CheckSquare, Plus, Filter, Calendar, Tag, Clock, MoreHorizontal } from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from '../components/TaskCard';

const Tasks = () => {
  // État pour les tâches (données fictives)
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Finaliser le design de la page d\'accueil', 
      description: 'Ajuster les couleurs et la typographie',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2025-04-10',
      tags: ['Design', 'UI/UX']
    },
    { 
      id: 2, 
      title: 'Implémenter l\'authentification', 
      description: 'Intégrer Supabase pour l\'authentification',
      priority: 'medium',
      status: 'todo',
      dueDate: '2025-04-15',
      tags: ['Backend', 'Auth']
    },
    { 
      id: 3, 
      title: 'Créer la documentation utilisateur', 
      description: 'Rédiger un guide d\'utilisation complet',
      priority: 'low',
      status: 'todo',
      dueDate: '2025-04-20',
      tags: ['Documentation']
    }
  ]);

  // État pour le filtre actif
  const [activeFilter, setActiveFilter] = useState('all');

  // Fonction pour gérer le drag and drop
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex(task => task.id === active.id);
        const newIndex = tasks.findIndex(task => task.id === over?.id);
        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
  };

  // Fonction pour filtrer les tâches
  const getFilteredTasks = () => {
    switch (activeFilter) {
      case 'todo':
        return tasks.filter(task => task.status === 'todo');
      case 'in-progress':
        return tasks.filter(task => task.status === 'in-progress');
      case 'completed':
        return tasks.filter(task => task.status === 'completed');
      case 'high-priority':
        return tasks.filter(task => task.priority === 'high');
      default:
        return tasks;
    }
  };

  // Fonction pour ajouter une tâche
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      description: '',
      priority: 'medium',
      status: 'todo',
      dueDate: '',
      tags: []
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <div className="flex gap-2">
          <button className="bg-[#334155] hover:bg-[#475569] text-xs px-3 py-1.5 rounded-md flex items-center gap-1">
            <Filter size={14} />
            <span>Filtres</span>
          </button>
          <button className="bg-[#334155] hover:bg-[#475569] text-xs px-3 py-1.5 rounded-md flex items-center gap-1">
            <Tag size={14} />
            <span>Tags</span>
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-xs px-3 py-1.5 rounded-md flex items-center gap-1">
            <Plus size={14} />
            <span>Nouvelle tâche</span>
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          className={`px-3 py-1.5 rounded-md text-sm ${activeFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-[#334155] text-gray-300 hover:bg-[#475569]'}`}
          onClick={() => setActiveFilter('all')}
        >
          Toutes
        </button>
        <button 
          className={`px-3 py-1.5 rounded-md text-sm ${activeFilter === 'todo' ? 'bg-indigo-600 text-white' : 'bg-[#334155] text-gray-300 hover:bg-[#475569]'}`}
          onClick={() => setActiveFilter('todo')}
        >
          À faire
        </button>
        <button 
          className={`px-3 py-1.5 rounded-md text-sm ${activeFilter === 'in-progress' ? 'bg-indigo-600 text-white' : 'bg-[#334155] text-gray-300 hover:bg-[#475569]'}`}
          onClick={() => setActiveFilter('in-progress')}
        >
          En cours
        </button>
        <button 
          className={`px-3 py-1.5 rounded-md text-sm ${activeFilter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-[#334155] text-gray-300 hover:bg-[#475569]'}`}
          onClick={() => setActiveFilter('completed')}
        >
          Terminées
        </button>
        <button 
          className={`px-3 py-1.5 rounded-md text-sm ${activeFilter === 'high-priority' ? 'bg-indigo-600 text-white' : 'bg-[#334155] text-gray-300 hover:bg-[#475569]'}`}
          onClick={() => setActiveFilter('high-priority')}
        >
          Haute priorité
        </button>
      </div>

      {/* Formulaire d'ajout de tâche */}
      <form onSubmit={handleAddTask} className="mb-6">
        <div className="relative flex items-center">
          <input 
            type="text" 
            placeholder="Ajouter une nouvelle tâche..." 
            className="w-full bg-[#334155] border-none rounded-lg py-2.5 px-4 pr-10 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-2 text-gray-400 hover:text-indigo-400"
          >
            <Plus size={18} />
          </button>
        </div>
      </form>

      {/* Liste des tâches */}
      <div className="space-y-3">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={getFilteredTasks().map(task => task.id)} strategy={verticalListSortingStrategy}>
            {getFilteredTasks().map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onDelete={(id) => setTasks(tasks.filter(t => t.id !== id))}
              />
            ))}
          </SortableContext>
        </DndContext>

        {getFilteredTasks().length === 0 && (
          <div className="text-center py-8 bg-[#1e293b] rounded-xl">
            <CheckSquare size={40} className="mx-auto text-gray-500 mb-3" />
            <p className="text-gray-400">Aucune tâche trouvée</p>
            <p className="text-xs text-gray-500 mt-1">Ajoutez des tâches ou modifiez vos filtres</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
