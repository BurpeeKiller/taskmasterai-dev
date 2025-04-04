import React from 'react';
import { Mail, Star, Archive, Trash, Tag } from 'lucide-react';

const Inbox = () => {
  // Données de messages fictives
  const messages = [
    {
      id: 1,
      sender: 'Équipe TaskMasterAI',
      subject: 'Bienvenue sur TaskMasterAI',
      preview: 'Merci d\'avoir rejoint TaskMasterAI ! Voici quelques conseils pour bien démarrer...',
      date: '2025-04-03',
      read: false,
      starred: true,
      tags: ['important']
    },
    {
      id: 2,
      sender: 'Système',
      subject: 'Votre rapport hebdomadaire',
      preview: 'Voici votre rapport de productivité pour la semaine dernière. Vous avez complété 12 tâches...',
      date: '2025-04-02',
      read: true,
      starred: false,
      tags: ['système']
    },
    {
      id: 3,
      sender: 'Support TaskMasterAI',
      subject: 'Nouvelles fonctionnalités disponibles',
      preview: 'Nous avons ajouté de nouvelles fonctionnalités à TaskMasterAI ! Découvrez la nouvelle interface...',
      date: '2025-04-01',
      read: true,
      starred: false,
      tags: []
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <div className="flex gap-2">
          <button className="bg-[#334155] hover:bg-[#475569] text-xs px-3 py-1.5 rounded-md flex items-center gap-1">
            <Archive size={14} />
            <span>Archive</span>
          </button>
          <button className="bg-[#334155] hover:bg-[#475569] text-xs px-3 py-1.5 rounded-md flex items-center gap-1">
            <Tag size={14} />
            <span>Étiquettes</span>
          </button>
        </div>
      </div>

      <div className="bg-[#1e293b] rounded-xl shadow-sm overflow-hidden">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`border-b border-[#334155] last:border-0 p-4 hover:bg-[#334155] transition-colors cursor-pointer ${!message.read ? 'bg-[#1e293b]' : ''}`}
          >
            <div className="flex items-center gap-3">
              <button className="text-gray-400 hover:text-yellow-400">
                {message.starred ? <Star size={16} className="fill-yellow-400 text-yellow-400" /> : <Star size={16} />}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-medium truncate ${!message.read ? 'text-white' : 'text-gray-300'}`}>
                    {message.sender}
                  </h3>
                  <span className="text-xs text-gray-500">{message.date}</span>
                </div>
                
                <p className={`text-sm truncate ${!message.read ? 'text-gray-200 font-medium' : 'text-gray-400'}`}>
                  {message.subject}
                </p>
                
                <p className="text-xs text-gray-500 truncate mt-1">
                  {message.preview}
                </p>
                
                {message.tags.length > 0 && (
                  <div className="flex gap-1 mt-2">
                    {message.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-1.5 py-0.5 rounded-full bg-indigo-900/50 text-indigo-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-gray-300">
                  <Archive size={16} />
                </button>
                <button className="text-gray-400 hover:text-red-400">
                  <Trash size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {messages.length === 0 && (
        <div className="text-center py-8 bg-[#1e293b] rounded-xl">
          <Mail size={40} className="mx-auto text-gray-500 mb-3" />
          <p className="text-gray-400">Votre boîte de réception est vide</p>
          <p className="text-xs text-gray-500 mt-1">Les notifications et messages apparaîtront ici</p>
        </div>
      )}
    </div>
  );
};

export default Inbox;
