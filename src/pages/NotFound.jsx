import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white animate-fadeIn px-4">
      <img
        src="https://cdn.jsdelivr.net/gh/stevensegallery/cdn/fun404-cat.png"
        alt="Chat perdu"
        className="w-64 h-64 mb-6 rounded-xl shadow-lg"
      />
      <h1 className="text-4xl font-bold mb-2">404 - Page introuvable</h1>
      <p className="text-lg mb-6 text-center max-w-md">
        Oups ! Ce petit chat IA s'est perdu dans le code... 😿<br />
        Mais t’inquiète, on va le ramener au tableau de bord.
      </p>
      <Link
        to="/dashboard"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition duration-200"
      >
        Retour au tableau de bord
      </Link>
    </div>
  )
}

export default NotFound
