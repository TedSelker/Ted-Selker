
import React, { useState, useCallback } from 'react';
import { Tone, Discipline, ArgumentResult } from './types';
import { DISCIPLINES } from './constants';
import ToneSelector from './components/ToneSelector';
import DisciplineWheel from './components/DisciplineWheel';
import { generateArgument } from './services/geminiService';

const App: React.FC = () => {
  const [selectedTones, setSelectedTones] = useState<Tone[]>([]);
  const [selectedDisciplineIds, setSelectedDisciplineIds] = useState<string[]>([]);
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [argumentsList, setArgumentsList] = useState<ArgumentResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const toggleTone = (tone: Tone) => {
    setSelectedTones(prev => 
      prev.includes(tone) ? prev.filter(t => t !== tone) : [...prev, tone]
    );
  };

  const toggleDiscipline = (id: string) => {
    setSelectedDisciplineIds(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleArguing = async () => {
    if (!topic.trim()) {
      setError("Please provide a topic to argue about.");
      return;
    }
    if (selectedTones.length === 0) {
      setError("Please select at least one tone.");
      return;
    }
    if (selectedDisciplineIds.length === 0) {
      setError("Please select at least one discipline.");
      return;
    }

    setError(null);
    setIsGenerating(true);
    setArgumentsList([]);

    const activeDisciplines = DISCIPLINES.filter(d => selectedDisciplineIds.includes(d.id));

    try {
      const results = await generateArgument(topic, selectedTones, activeDisciplines);
      setArgumentsList(results);
    } catch (err) {
      setError("Something went wrong during the debate. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-[900px] bg-[#f0ece9] border-[12px] border-black rounded-[60px] shadow-2xl overflow-hidden flex flex-col min-h-[90vh]">
      {/* Header */}
      <header className="pt-8 pb-4 text-center">
        <h1 className="serif-title text-4xl md:text-5xl font-bold text-[#8b5e3c]">The Big Argue</h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 md:px-12 flex flex-col gap-8 pb-12 overflow-y-auto max-h-[75vh]">
        
        {/* Step 1: Tone */}
        <ToneSelector selectedTones={selectedTones} onToggleTone={toggleTone} />

        {/* Step 2: Disciplines */}
        <DisciplineWheel 
          selectedDisciplines={selectedDisciplineIds} 
          onToggleDiscipline={toggleDiscipline} 
        />

        {/* Step 3: Input & Trigger */}
        <div className="w-full max-w-2xl mx-auto mt-4">
          <div className="bg-white border-4 border-black p-6 rounded-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-2xl font-bold text-[#8b5e3c]">+</span>
              <label htmlFor="topic" className="text-xl font-bold text-[#8b5e3c] italic">Argue about ...</label>
            </div>
            <textarea
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="E.g., The ethical implications of artificial intelligence in creative writing"
              className="w-full h-24 p-2 text-lg outline-none resize-none focus:ring-2 focus:ring-[#8b5e3c]/20 border-b-2 border-transparent focus:border-[#8b5e3c]"
            />
          </div>

          <div className="flex flex-col items-center mt-8 gap-4">
            <button
              onClick={handleArguing}
              disabled={isGenerating}
              className={`px-12 py-4 text-2xl font-black rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 active:shadow-none ${
                isGenerating 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              {isGenerating ? 'DELIBERATING...' : 'START THE ARGUMENT'}
            </button>
            {error && <p className="text-red-600 font-bold bg-red-50 px-4 py-2 rounded-lg border-2 border-red-600">{error}</p>}
          </div>
        </div>

        {/* Output Section */}
        {argumentsList.length > 0 && (
          <div className="w-full max-w-2xl mx-auto space-y-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h3 className="text-2xl font-black text-center border-b-4 border-black pb-2 mb-8">The Consensus (or lack thereof)</h3>
            {argumentsList.map((arg, idx) => (
              <div key={idx} className="flex flex-col gap-2 p-6 bg-white border-2 border-black rounded-xl shadow-md">
                <span className="text-sm font-black uppercase tracking-widest text-[#8b5e3c]">
                  {arg.speaker}
                </span>
                <p className="text-lg leading-relaxed text-gray-800 italic">
                  "{arg.text}"
                </p>
              </div>
            ))}
          </div>
        )}

        {isGenerating && (
          <div className="flex flex-col items-center justify-center p-12 text-gray-500 italic">
            <div className="w-12 h-12 border-4 border-[#8b5e3c] border-t-transparent rounded-full animate-spin mb-4"></div>
            Gathering the experts...
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="p-4 text-center opacity-50 text-xs font-bold uppercase tracking-widest">
        The Big Argue &copy; 2024 - Intellectual Combat Simulator
      </footer>
    </div>
  );
};

export default App;
