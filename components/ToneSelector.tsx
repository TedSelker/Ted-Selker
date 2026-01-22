
import React from 'react';
import { Tone } from '../types';
import { TONE_ASSETS } from '../constants';

interface ToneSelectorProps {
  selectedTones: Tone[];
  onToggleTone: (tone: Tone) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTones, onToggleTone }) => {
  const tones = Object.values(Tone);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <h2 className="text-xl font-bold text-gray-800">Choose one or more tone</h2>
      <div className="flex justify-center gap-2 md:gap-4 w-full px-2">
        {tones.map((tone) => {
          const isSelected = selectedTones.includes(tone);
          return (
            <button
              key={tone}
              onClick={() => onToggleTone(tone)}
              className={`flex flex-col items-center transition-all duration-300 group ${
                isSelected ? 'scale-105' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <div className={`relative w-20 h-24 md:w-32 md:h-40 overflow-hidden rounded-lg border-2 transition-colors ${
                isSelected ? 'border-orange-600 shadow-lg' : 'border-gray-300'
              }`}>
                <img
                  src={TONE_ASSETS[tone].image}
                  alt={tone}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-orange-600/10 ring-2 ring-inset ring-orange-600"></div>
                )}
              </div>
              <span className={`mt-2 font-bold capitalize text-sm md:text-base ${
                isSelected ? 'text-orange-700' : 'text-gray-600'
              }`}>
                {tone}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ToneSelector;
