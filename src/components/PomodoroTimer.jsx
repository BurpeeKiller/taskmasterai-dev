import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes en secondes
  const [isRunning, setIsRunning] = useState(false);
  const [timerType, setTimerType] = useState('pomodoro'); // 'pomodoro', 'shortBreak', 'longBreak'

  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Notification sonore quand le minuteur atteint zéro
      const audio = new Audio('/notification.mp3'); // Assurez-vous d'avoir ce fichier audio
      audio.play().catch(e => console.log('Erreur de lecture audio:', e));
      
      setIsRunning(false);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    
    // Réinitialiser en fonction du type de minuteur
    switch(timerType) {
      case 'pomodoro':
        setTimeLeft(25 * 60);
        break;
      case 'shortBreak':
        setTimeLeft(5 * 60);
        break;
      case 'longBreak':
        setTimeLeft(15 * 60);
        break;
      default:
        setTimeLeft(25 * 60);
    }
  };

  const switchTimerType = (type) => {
    setIsRunning(false);
    setTimerType(type);
    
    switch(type) {
      case 'pomodoro':
        setTimeLeft(25 * 60);
        break;
      case 'shortBreak':
        setTimeLeft(5 * 60);
        break;
      case 'longBreak':
        setTimeLeft(15 * 60);
        break;
      default:
        setTimeLeft(25 * 60);
    }
  };

  // Formater le temps restant en MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center">
      {/* Sélecteur de type de minuteur */}
      <div className="flex gap-2 mb-3">
        <button 
          onClick={() => switchTimerType('pomodoro')} 
          className={`px-3 py-1 rounded-md text-xs ${
            timerType === 'pomodoro' 
              ? 'bg-red-600 text-white' 
              : 'bg-[#334155] text-gray-300 hover:bg-[#475569]'
          }`}
        >
          Pomodoro
        </button>
        <button 
          onClick={() => switchTimerType('shortBreak')} 
          className={`px-3 py-1 rounded-md text-xs ${
            timerType === 'shortBreak' 
              ? 'bg-green-600 text-white' 
              : 'bg-[#334155] text-gray-300 hover:bg-[#475569]'
          }`}
        >
          Pause courte
        </button>
        <button 
          onClick={() => switchTimerType('longBreak')} 
          className={`px-3 py-1 rounded-md text-xs ${
            timerType === 'longBreak' 
              ? 'bg-blue-600 text-white' 
              : 'bg-[#334155] text-gray-300 hover:bg-[#475569]'
          }`}
        >
          Pause longue
        </button>
      </div>
      
      {/* Affichage du temps */}
      <div className="text-5xl font-bold mb-4 text-indigo-300">{formatTime()}</div>
      
      {/* Boutons de contrôle */}
      <div className="flex gap-2 mb-4">
        {!isRunning ? (
          <button 
            onClick={startTimer} 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md text-sm"
          >
            Start
          </button>
        ) : (
          <button 
            onClick={pauseTimer} 
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-1 rounded-md text-sm"
          >
            Pause
          </button>
        )}
        <button 
          onClick={resetTimer} 
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm"
        >
          Reset
        </button>
      </div>
      
      {/* Message d'avertissement */}
      <p className="text-xs text-gray-500 mt-2 text-center">
        ⚠️ Native timers can ONLY be used when "New Timer" button is clicked ⚠️
      </p>
    </div>
  );
};

export default PomodoroTimer;
