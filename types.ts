
export enum Tone {
  SKEPTICAL = 'skeptical',
  CURIOUS = 'curious',
  THOUGHTFUL = 'thoughtful',
  CONFIDENT = 'confident'
}

export interface Discipline {
  id: string;
  label: string;
  color: string;
  textColor: string;
}

export interface ArgumentResult {
  speaker: string;
  text: string;
}
