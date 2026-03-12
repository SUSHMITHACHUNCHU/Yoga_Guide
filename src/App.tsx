import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

type Pose = {
  id: number;
  name: string;
  image: string;
  difficulty: string;
  instructions: string[];
  benefits: string[];
};

export default function App() {
  const [poses, setPoses] = useState<Pose[]>([]);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [selectedPose, setSelectedPose] = useState<Pose | null>(null);

  useEffect(() => {
    fetch('/api/poses')
      .then(res => res.json())
      .then(data => setPoses(data))
      .catch(err => console.error('Error fetching poses:', err));
  }, []);

  const filteredPoses = poses.filter(pose => {
    const matchesSearch = pose.name.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = difficulty === 'All' || pose.difficulty === difficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-[#8FBC8F] text-white py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Yoga Pose Guide</h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          This application helps users learn different yoga poses with instructions and benefits.
        </p>
        <div className="flex justify-center gap-4 flex-wrap max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search poses..."
            className="px-6 py-3 rounded-full text-gray-800 outline-none shadow-sm w-full sm:flex-1"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="px-6 py-3 rounded-full text-gray-800 outline-none shadow-sm cursor-pointer"
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
          >
            <option value="All">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
          </select>
        </div>
      </header>

      {/* Main Grid */}
      <main className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPoses.map(pose => (
            <div 
              key={pose.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <img 
                src={pose.image} 
                alt={pose.name} 
                className="w-full h-56 object-cover" 
                referrerPolicy="no-referrer" 
              />
              <div className="p-6 flex flex-col flex-grow items-center text-center">
                <h3 className="text-2xl font-semibold text-[#8FBC8F] mb-6">{pose.name}</h3>
                <div className="mt-auto">
                  <button
                    onClick={() => setSelectedPose(pose)}
                    className="bg-[#8FBC8F] hover:bg-[#7AA97A] text-white px-8 py-3 rounded-full transition-colors font-medium shadow-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPoses.length === 0 && poses.length > 0 && (
          <p className="text-center text-gray-500 mt-12 text-lg">No poses found matching your criteria.</p>
        )}
        {poses.length === 0 && (
          <p className="text-center text-gray-500 mt-12 text-lg">Loading poses...</p>
        )}
      </main>

      {/* Modal */}
      {selectedPose && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" 
          onClick={() => setSelectedPose(null)}
        >
          <div 
            className="bg-[#F5F5DC] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-8 shadow-2xl" 
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPose(null)}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition-colors bg-white/50 rounded-full p-2"
            >
              <X size={24} />
            </button>
            
            <img 
              src={selectedPose.image} 
              alt={selectedPose.name} 
              className="w-full h-72 object-cover rounded-2xl mb-8 shadow-sm" 
              referrerPolicy="no-referrer" 
            />
            
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-4xl font-bold text-[#8FBC8F]">{selectedPose.name}</h2>
              <span className="inline-block bg-[#8FBC8F] text-white px-4 py-1.5 rounded-full text-sm font-medium">
                {selectedPose.difficulty}
              </span>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Instructions</h3>
                <ol className="list-decimal pl-6 text-gray-700 space-y-3 text-lg">
                  {selectedPose.instructions.map((inst, idx) => (
                    <li key={idx} className="pl-2">{inst}</li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Benefits</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-3 text-lg">
                  {selectedPose.benefits.map((ben, idx) => (
                    <li key={idx} className="pl-2">{ben}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
