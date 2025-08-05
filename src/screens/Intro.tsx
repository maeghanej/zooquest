import { Link } from "react-router-dom";

export default function Intro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">How It Works</h2>
        <div className="space-y-4 text-gray-600 mb-8">
          <p className="text-lg">Visit animal habitats, play games, and discover amazing facts!</p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">What you'll do:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Match antlers with caribou</li>
              <li>• Learn about polar bear behavior</li>
              <li>• Observe river otters at play</li>
              <li>• Discover grizzly bear seasons</li>
            </ul>
          </div>
        </div>
        <Link 
          to="/stop/caribou" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
        >
          Let's Go!
        </Link>
      </div>
    </div>
  );
} 