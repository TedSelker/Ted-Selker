
import { Tone, Discipline } from './types';

export const DISCIPLINES: Discipline[] = [
  { id: 'science', label: 'Science', color: '#ff7f27', textColor: '#cc5c00' },
  { id: 'geography', label: 'Geography', color: '#ff9c3a', textColor: '#cc6e00' },
  { id: 'history', label: 'History', color: '#ed1c24', textColor: '#b50000' },
  { id: 'theology', label: 'Theology, Religious Studies', color: '#ff5c9f', textColor: '#d6006e' },
  { id: 'languages', label: 'Languages of the World', color: '#e01693', textColor: '#990060' },
  { id: 'literature', label: 'Our Language and Literature', color: '#8d309b', textColor: '#601b6b' },
  { id: 'arts', label: 'The Arts', color: '#3f48cc', textColor: '#222999' },
  { id: 'philosophy', label: 'Philosophy', color: '#00a2e8', textColor: '#006ea6' },
  { id: 'engineering', label: 'Engineering and Computer Science', color: '#22b14c', textColor: '#157532' },
  { id: 'math', label: 'Mathematics', color: '#8ed93b', textColor: '#5b9e15' }
];

export const TONE_ASSETS: Record<Tone, { image: string, description: string }> = {
  [Tone.SKEPTICAL]: { 
    image: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80&w=400&h=400', 
    description: 'Questioning and doubt-filled perspective' 
  },
  [Tone.CURIOUS]: { 
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400', 
    description: 'Inquisitive and open-ended exploration' 
  },
  [Tone.THOUGHTFUL]: { 
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=400&h=400', 
    description: 'Reflective and deep analysis' 
  },
  [Tone.CONFIDENT]: { 
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400&h=400', 
    description: 'Assertive and authoritative stance' 
  }
};
