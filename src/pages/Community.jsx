import React, { useState } from 'react';
import { Search, MessageSquare, Heart, Share2, Bookmark, Filter, TrendingUp, Users, Clock } from 'lucide-react';

const Community = () => {
  // Données fictives de posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: 'Marie Dubois',
        avatar: 'https://i.pravatar.cc/150?img=1',
        role: 'Designer UX/UI'
      },
      content: "J'ai créé un modèle de tableau Kanban pour la gestion de projet. Qu'en pensez-vous ?",
      image: 'https://placehold.co/600x400/1e293b/FFFFFF/png?text=Kanban+Board+Template',
      likes: 24,
      comments: 8,
      time: 'Il y a 2 heures',
      liked: false,
      bookmarked: true,
      tags: ['kanban', 'productivité', 'gestion de projet']
    },
    {
      id: 2,
      author: {
        name: 'Thomas Martin',
        avatar: 'https://i.pravatar.cc/150?img=2',
        role: 'Développeur Full Stack'
      },
      content: "Astuce du jour : utilisez la technique Pomodoro pour améliorer votre concentration. 25 minutes de travail, 5 minutes de pause. Répétez 4 fois, puis prenez une pause plus longue. Ça fonctionne vraiment !",
      image: null,
      likes: 42,
      comments: 15,
      time: 'Il y a 5 heures',
      liked: true,
      bookmarked: false,
      tags: ['pomodoro', 'productivité', 'concentration']
    },
    {
      id: 3,
      author: {
        name: 'Sophie Laurent',
        avatar: 'https://i.pravatar.cc/150?img=3',
        role: 'Chef de projet'
      },
      content: "Je viens de découvrir cette application et je suis impressionnée par toutes les fonctionnalités ! Quelqu'un utilise-t-il la fonction d'IA pour générer des tâches automatiquement ?",
      image: 'https://placehold.co/600x400/1e293b/FFFFFF/png?text=TaskMasterAI+Screenshot',
      likes: 18,
      comments: 23,
      time: 'Hier',
      liked: false,
      bookmarked: false,
      tags: ['débutant', 'IA', 'automatisation']
    }
  ]);

  // Données fictives de tendances
  const trends = [
    { id: 1, name: '#productivité', posts: 1243 },
    { id: 2, name: '#pomodoro', posts: 856 },
    { id: 3, name: '#timeblocking', posts: 642 },
    { id: 4, name: '#kanban', posts: 521 },
    { id: 5, name: '#IA', posts: 489 }
  ];

  // Données fictives de groupes populaires
  const groups = [
    { id: 1, name: 'Productivité Maximale', members: 2845, avatar: 'https://placehold.co/100/4f46e5/FFFFFF/png?text=PM' },
    { id: 2, name: 'Développeurs Organisés', members: 1756, avatar: 'https://placehold.co/100/7c3aed/FFFFFF/png?text=DO' },
    { id: 3, name: 'Gestion de Projet Agile', members: 1243, avatar: 'https://placehold.co/100/0ea5e9/FFFFFF/png?text=GPA' }
  ];

  // État pour le filtre actif
  const [activeFilter, setActiveFilter] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');

  // Fonction pour liker un post
  const toggleLike = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        const liked = !post.liked;
        return {
          ...post,
          liked,
          likes: liked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  // Fonction pour mettre un post en favori
  const toggleBookmark = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          bookmarked: !post.bookmarked
        };
      }
      return post;
    }));
  };

  // Fonction pour filtrer les posts
  const getFilteredPosts = () => {
    let filtered = [...posts];
    
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    switch (activeFilter) {
      case 'recent':
        return filtered.sort((a, b) => new Date(b.time) - new Date(a.time));
      case 'popular':
        return filtered.sort((a, b) => b.likes - a.likes);
      case 'bookmarked':
        return filtered.filter(post => post.bookmarked);
      default:
        return filtered;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Communauté</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-xs px-3 py-1.5 rounded-md flex items-center gap-1">
          <MessageSquare size={14} />
          <span>Nouveau post</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flux principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Barre de recherche et filtres */}
          <div className="bg-[#1e293b] rounded-xl shadow-sm p-5">
            <div className="relative flex items-center mb-4">
              <Search className="absolute left-3 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Rechercher dans la communauté..." 
                className="w-full bg-[#334155] border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1 ${activeFilter === 'trending' ? 'bg-indigo-600 text-white' : 'bg-[#334155] text-gray-300 hover:bg-[#475569]'}`}
                onClick={() => setActiveFilter('trending')}
              >
                <TrendingUp size={14} />
                <span>Tendances</span>
              </button>
              <button 
                className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1 ${activeFilter === 'recent' ? 'bg-indigo-600 text-white' : 'bg-[#334155] text-gray-300 hover:bg-[#475569]'}`}
                onClick={() => setActiveFilter('recent')}
              >
                <Clock size={14} />
                <span>Récents</span>
              </button>
              <button 
                className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1 ${activeFilter === 'popular' ? 'bg-indigo-600 text-white' : 'bg-[#334155] text-gray-300 hover:bg-[#475569]'}`}
                onClick={() => setActiveFilter('popular')}
              >
                <Heart size={14} />
                <span>Populaires</span>
              </button>
              <button 
                className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1 ${activeFilter === 'bookmarked' ? 'bg-indigo-600 text-white' : 'bg-[#334155] text-gray-300 hover:bg-[#475569]'}`}
                onClick={() => setActiveFilter('bookmarked')}
              >
                <Bookmark size={14} />
                <span>Enregistrés</span>
              </button>
            </div>
          </div>

          {/* Liste des posts */}
          {getFilteredPosts().length > 0 ? (
            getFilteredPosts().map(post => (
              <div key={post.id} className="bg-[#1e293b] rounded-xl shadow-sm p-5">
                {/* En-tête du post */}
                <div className="flex items-center mb-4">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h3 className="font-medium">{post.author.name}</h3>
                    <div className="flex items-center text-xs text-gray-400">
                      <span>{post.author.role}</span>
                      <span className="mx-1">•</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>
                
                {/* Contenu du post */}
                <div className="mb-4">
                  <p className="text-sm mb-4">{post.content}</p>
                  
                  {post.image && (
                    <div className="rounded-lg overflow-hidden mb-4">
                      <img 
                        src={post.image} 
                        alt="Post content" 
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="text-xs px-2 py-0.5 rounded-full bg-indigo-900/50 text-indigo-300 cursor-pointer hover:bg-indigo-800/50"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Actions du post */}
                <div className="flex items-center justify-between border-t border-[#334155] pt-3">
                  <div className="flex items-center gap-4">
                    <button 
                      className={`flex items-center gap-1 text-sm ${post.liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                      onClick={() => toggleLike(post.id)}
                    >
                      <Heart size={16} className={post.liked ? 'fill-red-500' : ''} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-indigo-400">
                      <MessageSquare size={16} />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-green-500">
                      <Share2 size={16} />
                    </button>
                  </div>
                  <button 
                    className={`text-sm ${post.bookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                    onClick={() => toggleBookmark(post.id)}
                  >
                    <Bookmark size={16} className={post.bookmarked ? 'fill-yellow-500' : ''} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-[#1e293b] rounded-xl shadow-sm p-8 text-center">
              <MessageSquare size={40} className="mx-auto text-gray-500 mb-3" />
              <p className="text-gray-400">Aucun post trouvé</p>
              <p className="text-xs text-gray-500 mt-1">Modifiez vos filtres ou créez un nouveau post</p>
            </div>
          )}
        </div>

        {/* Panneau latéral */}
        <div className="space-y-6">
          {/* Tendances */}
          <div className="bg-[#1e293b] rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Tendances</h2>
              <button className="text-gray-400 hover:text-gray-300">
                <Filter size={14} />
              </button>
            </div>
            
            <div className="space-y-3">
              {trends.map(trend => (
                <div key={trend.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-indigo-400" />
                    <span className="text-sm font-medium">{trend.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{trend.posts} posts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Groupes populaires */}
          <div className="bg-[#1e293b] rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Groupes populaires</h2>
              <button className="text-gray-400 hover:text-gray-300">
                <Users size={14} />
              </button>
            </div>
            
            <div className="space-y-3">
              {groups.map(group => (
                <div key={group.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={group.avatar} 
                      alt={group.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-sm font-medium">{group.name}</h3>
                      <p className="text-xs text-gray-400">{group.members} membres</p>
                    </div>
                  </div>
                  <button className="text-xs px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
                    Rejoindre
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Règles de la communauté */}
          <div className="bg-[#1e293b] rounded-xl shadow-sm p-5">
            <h2 className="font-semibold mb-3">Règles de la communauté</h2>
            <ul className="text-sm text-gray-400 space-y-2 list-disc pl-5">
              <li>Soyez respectueux envers les autres membres</li>
              <li>Partagez du contenu pertinent sur la productivité</li>
              <li>Pas de spam ou de contenu promotionnel</li>
              <li>Respectez la propriété intellectuelle</li>
              <li>Amusez-vous et apprenez des autres !</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
