import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Événements fictifs
  const events = [
    {
      id: 1,
      title: 'Réunion d\'équipe',
      date: new Date(2025, 3, 5, 10, 0),
      endDate: new Date(2025, 3, 5, 11, 30),
      category: 'work',
      location: 'Salle de conférence A'
    },
    {
      id: 2,
      title: 'Déjeuner avec clients',
      date: new Date(2025, 3, 5, 12, 30),
      endDate: new Date(2025, 3, 5, 14, 0),
      category: 'meeting',
      location: 'Restaurant Le Gourmet'
    },
    {
      id: 3,
      title: 'Présentation projet',
      date: new Date(2025, 3, 10, 15, 0),
      endDate: new Date(2025, 3, 10, 16, 30),
      category: 'work',
      location: 'Salle de conférence B'
    },
    {
      id: 4,
      title: 'Appel avec fournisseur',
      date: new Date(2025, 3, 15, 9, 0),
      endDate: new Date(2025, 3, 15, 9, 30),
      category: 'call',
      location: 'Zoom'
    }
  ];

  // Fonctions pour naviguer entre les mois
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Fonction pour obtenir les jours du mois actuel
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Jours du mois précédent pour compléter la première semaine
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false
      });
    }
    
    // Jours du mois actuel
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Jours du mois suivant pour compléter la dernière semaine
    const remainingDays = 42 - days.length; // 6 semaines * 7 jours = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  // Fonction pour formater la date
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Fonction pour obtenir les événements d'une date spécifique
  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Fonction pour vérifier si une date a des événements
  const hasEvents = (date) => {
    return getEventsForDate(date).length > 0;
  };

  // Fonction pour vérifier si deux dates sont le même jour
  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  // Fonction pour obtenir la couleur de catégorie
  const getCategoryColor = (category) => {
    switch (category) {
      case 'work':
        return 'bg-blue-600';
      case 'meeting':
        return 'bg-purple-600';
      case 'call':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  // Jours de la semaine
  const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  
  // Nom du mois et année
  const monthName = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(currentDate);
  const year = currentDate.getFullYear();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Calendrier</h1>
        <div className="flex gap-2">
          <button className="bg-[#334155] hover:bg-[#475569] text-xs px-3 py-1.5 rounded-md flex items-center gap-1">
            <Clock size={14} />
            <span>Aujourd'hui</span>
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-xs px-3 py-1.5 rounded-md flex items-center gap-1">
            <Plus size={14} />
            <span>Nouvel événement</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendrier */}
        <div className="lg:col-span-2 bg-[#1e293b] rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">
              {monthName.charAt(0).toUpperCase() + monthName.slice(1)} {year}
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={prevMonth}
                className="p-1 rounded-full hover:bg-[#334155] text-gray-400"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextMonth}
                className="p-1 rounded-full hover:bg-[#334155] text-gray-400"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Jours de la semaine */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, index) => (
              <div key={index} className="text-center text-xs font-medium text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Jours du mois */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth().map((day, index) => {
              const isToday = isSameDay(day.date, new Date());
              const isSelected = isSameDay(day.date, selectedDate);
              const dayEvents = getEventsForDate(day.date);
              
              return (
                <div 
                  key={index}
                  onClick={() => setSelectedDate(day.date)}
                  className={`
                    relative h-24 p-1 rounded-md cursor-pointer transition-colors
                    ${day.isCurrentMonth ? 'bg-[#334155]' : 'bg-[#1e293b] text-gray-500'}
                    ${isSelected ? 'ring-2 ring-indigo-500' : ''}
                    ${isToday ? 'border border-indigo-500' : ''}
                    hover:bg-[#475569]
                  `}
                >
                  <div className="text-right text-xs p-1">
                    {day.date.getDate()}
                  </div>
                  <div className="mt-1 space-y-1 overflow-hidden max-h-16">
                    {dayEvents.slice(0, 2).map((event, idx) => (
                      <div 
                        key={idx}
                        className={`text-xs px-1 py-0.5 rounded truncate ${getCategoryColor(event.category)} text-white`}
                      >
                        {formatDate(event.date)} {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-400 px-1">
                        +{dayEvents.length - 2} plus
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Détails du jour sélectionné */}
        <div className="bg-[#1e293b] rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">
              {new Intl.DateTimeFormat('fr-FR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              }).format(selectedDate)}
            </h2>
            <button className="p-1 rounded-full hover:bg-[#334155] text-gray-400">
              <Plus size={16} />
            </button>
          </div>

          <div className="space-y-3 mt-4">
            {getEventsForDate(selectedDate).length > 0 ? (
              getEventsForDate(selectedDate).map((event, index) => (
                <div key={index} className="bg-[#334155] rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${getCategoryColor(event.category)}`}></div>
                    <h3 className="font-medium">{event.title}</h3>
                  </div>
                  <div className="flex items-center text-xs text-gray-400 mb-1">
                    <Clock size={12} className="mr-1" />
                    {formatDate(event.date)} - {formatDate(event.endDate)}
                  </div>
                  {event.location && (
                    <div className="text-xs text-gray-400">
                      📍 {event.location}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <CalendarIcon size={40} className="mx-auto text-gray-500 mb-3" />
                <p className="text-gray-400">Aucun événement prévu</p>
                <p className="text-xs text-gray-500 mt-1">Cliquez sur + pour ajouter un événement</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
