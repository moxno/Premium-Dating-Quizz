
export interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    score: number;
  }[];
}

export enum AppState {
  WELCOME = 'WELCOME',
  QUIZ = 'QUIZ',
  CALCULATING = 'CALCULATING',
  RESULT = 'RESULT'
}
