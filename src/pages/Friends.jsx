import React, { useState } from 'react';
import { Search, UserPlus, MessageCircle, Clock, Star, X, MoreHorizontal } from 'lucide-react';

const Friends = () => {
  // Données fictives d'amis
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: 'Marie Dubois',
      avatar: 'https://i.pravatar.cc/150?img=1',
      status: 'online',
      lastActive: 'En ligne',
      bio: 'Designer UX/UI | Passionnée de productivité',
      isFavorite: true
    },
    {
      id: 2,
      name: 'Thomas Martin',
      avatar: 'https://i.pravatar.cc/150?img=2',
      status: 'offline',
      lastActive: 'Il y a 3 heures',
      bio: 'Développeur Full Stack | Adepte de la méthode Pomodoro',
      isFavorite: false
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      avatar: 'https://i.pravatar.cc/150?img=3',
      status: 'busy',
      lastActive: 'Occupé(e)',
      bio: 'Chef de projet | Organisation et efficacité',
      isFavorite: true
    },
    {
      id: 4,
      name: 'Lucas Bernard',
      avatar: 'https://i.pravatar.cc/150?img=4',
      status: 'offline',
      lastActive: 'Hier',
      bio: 'Étudiant en informatique | Amateur de todo lists',
      isFavorite: false
    }
  ]);

  // Données fictives de suggestions d'amis
  const [suggestions, setSuggestions] = useState([
    {
      id: 5,
      name: 'Emma Petit',
      avatar: 'https://i.pravatar.cc/150?img=5',
      mutualFriends: 3,
      bio: 'Marketing Digital | Organisée et créative'
    },
    {
      id: 6,
      name: 'Alexandre Durand',
      avatar: 'https://i.pravatar.cc/150?img=6',
      mutualFriends: 2,
      bio: 'Entrepreneur | Expert en gestion du temps'
    }
  ]);

  // Données fictives de demandes d'amis
  const [requests, setRequests] = useState([
    {
      id: 7,
      name: 'Julie Moreau',
      avatar: 'https://i.pravatar.cc/150?img=7',
      mutualFriends: 1,
      requestTime: 'Il y a 2 jours'
    }
  ]);

  // État pour le filtre actif
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fonction pour filtrer les amis
  const getFilteredFriends = () => {
    let filtered = [...friends];
    
    if (activeTab === 'favorites') {
      filtered = filtered.filter(friend => friend.isFavorite);
    } else if (activeTab === 'online') {
      filtered = filtered.filter(friend => friend.status === 'online');
    }
    
    if (searchQuery) {
      filtered = filtered.filter(friend => 
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  // Fonction pour accepter une demande d'ami
  const acceptFriendRequest = (id) => {
    const request = requests.find(req => req.id === id);
    if (request) {
      setFriends([...friends, {
        id: request.id,
        name: request.name,
        avatar: request.avatar,
        status: 'offline',
        lastActive: 'Récemment',
        bio: '',
        isFavorite: false
      }]);
      setRequests(requests.filter(req => req.id !== id));
    }
  };

  // Fonction pour refuser une demande d'ami
  const rejectFriendRequest = (id) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  // Fonction pour ajouter un ami suggéré
  const addSuggestion = (id) => {
    setSuggestions(suggestions.filter(sugg => sugg.id !== id));
    // Dans une application réelle, cela enverrait une demande d'ami
  };

  // Fonction pour basculer le statut favori
  const toggleFavorite = (id) => {
    setFriends(friends.map(friend => 
      friend.id === id ? {...friend, isFavorite: !friend.isFavorite} : friend
    ));
  };

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'busy':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Amis</h1>
        <div className="flex gap-2">
          <button className="bg-[#334155] hover:bg-[#475569] text-xs px-3 py-1.5 rounded-md flex items-center gap-1">
            <UserPlus size={14} />
            <span>Ajouter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des amis */}
        <div className="lg:col-span-2 bg-[#1e293b] rounded-xl shadow-sm p-5">
          {/* Barre de recherche et filtres */}
          <div className="mb-4">
            <div className="relative flex items-center mb-4">
              <Search className="absolute left-3 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Rechercher un ami..." 
                className="w-full bg-[#334155] border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <button 
                className={`px-3 py-1.5 rounded-md text-sm ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'bg-[#334155] text-gray-300 hover:bg-[#475569]'}`}
                onClick={() => setActiveTab('all')}
              >
                Tous
              </button>
              <button 
                className={`px-3 py-1.5 rounded-md text-sm ${activeTab === 'online' ? 'bg-indigo-600 text-white' : 'bg-[#334155] text-gray-300 hover:bg-[#475569]'}`}
                onClick={() => setActiveTab('online')}
              >
                En ligne
              </button>
              <button 
                className={`px-3 py-1.5 rounded-md text-sm ${activeTab === 'favorites' ? 'bg-indigo-600 text-white' : 'bg-[#334155] text-gray-300 hover:bg-[#475569]'}`}
                onClick={() => setActiveTab('favorites')}
              >
                Favoris
              </button>
            </div>
          </div>

          {/* Liste des amis */}
          <div className="space-y-3 mt-6">
            {getFilteredFriends().length > 0 ? (
              getFilteredFriends().map(friend => (
                <div key={friend.id} className="bg-[#334155] rounded-lg p-3 flex items-center">
                  <div className="relative">
                    <img 
                      src={friend.avatar} 
                      alt={friend.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#334155] ${getStatusColor(friend.status)}`}></span>
                  </div>
                  
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{friend.name}</h3>
                      <div className="flex items-center gap-2">
                        <button 
                          className="text-gray-400 hover:text-yellow-400"
                          onClick={() => toggleFavorite(friend.id)}
                        >
                          <Star size={16} className={friend.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''} />
                        </button>
                        <button className="text-gray-400 hover:text-indigo-400">
                          <MessageCircle size={16} />
                        </button>
                        <button className="text-gray-400 hover:text-gray-300">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <Clock size={12} className="mr-1" />
                      {friend.lastActive}
                    </div>
                    
                    {friend.bio && (
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                        {friend.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <UserPlus size={40} className="mx-auto text-gray-500 mb-3" />
                <p className="text-gray-400">Aucun ami trouvé</p>
                <p className="text-xs text-gray-500 mt-1">Ajoutez des amis ou modifiez vos filtres</p>
              </div>
            )}
          </div>
        </div>

        {/* Panneau latéral */}
        <div className="space-y-6">
          {/* Demandes d'amis */}
          <div className="bg-[#1e293b] rounded-xl shadow-sm p-5">
            <h2 className="font-semibold mb-4">Demandes d'amis</h2>
            
            {requests.length > 0 ? (
              <div className="space-y-3">
                {requests.map(request => (
                  <div key={request.id} className="bg-[#334155] rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <img 
                        src={request.avatar} 
                        alt={request.name} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-3 flex-1">
                        <h3 className="font-medium text-sm">{request.name}</h3>
                        <p className="text-xs text-gray-400">
                          {request.mutualFriends} ami{request.mutualFriends > 1 ? 's' : ''} en commun
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                      <span>{request.requestTime}</span>
                      <div className="flex gap-2">
                        <button 
                          className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                          onClick={() => acceptFriendRequest(request.id)}
                        >
                          Accepter
                        </button>
                        <button 
                          className="px-2 py-1 bg-[#475569] hover:bg-[#64748b] text-white rounded"
                          onClick={() => rejectFriendRequest(request.id)}
                        >
                          Refuser
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Aucune demande en attente</p>
            )}
          </div>

          {/* Suggestions d'amis */}
          <div className="bg-[#1e293b] rounded-xl shadow-sm p-5">
            <h2 className="font-semibold mb-4">Suggestions</h2>
            
            {suggestions.length > 0 ? (
              <div className="space-y-3">
                {suggestions.map(suggestion => (
                  <div key={suggestion.id} className="bg-[#334155] rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <img 
                        src={suggestion.avatar} 
                        alt={suggestion.name} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-3 flex-1">
                        <h3 className="font-medium text-sm">{suggestion.name}</h3>
                        <p className="text-xs text-gray-400">
                          {suggestion.mutualFriends} ami{suggestion.mutualFriends > 1 ? 's' : ''} en commun
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-400 mb-2 line-clamp-1">
                      {suggestion.bio}
                    </p>
                    
                    <div className="flex justify-end gap-2">
                      <button 
                        className="px-2 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded flex items-center gap-1"
                        onClick={() => addSuggestion(suggestion.id)}
                      >
                        <UserPlus size={12} />
                        <span>Ajouter</span>
                      </button>
                      <button 
                        className="px-2 py-1 text-xs bg-[#475569] hover:bg-[#64748b] text-white rounded flex items-center gap-1"
                        onClick={() => setSuggestions(suggestions.filter(s => s.id !== suggestion.id))}
                      >
                        <X size={12} />
                        <span>Ignorer</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Aucune suggestion pour le moment</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
