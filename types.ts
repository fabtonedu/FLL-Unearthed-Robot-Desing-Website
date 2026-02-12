
export interface Mission {
  id: string;
  name: string;
  description: string;
  points: number;
}

export interface RunStrategy {
  id: number;
  name: string;
  focus: string;
  module: string;
  moduleImage: string;
  pathImage: string;
  estimatedPoints: number;
  missions: string[];
  complexity: 'Alacsony' | 'Közepes' | 'Magas';
  runTime: string;
  setupTime: string;
  testResults: boolean[]; // Array representing 20 runs (true = success, false = fail)
}

export interface RobotSpec {
  category: string;
  value: string;
  icon: string;
}

export interface Milestone {
  title: string;
  description: string;
  tag: 'Stratégia' | 'Építés' | 'Programozás' | 'Tesztelés';
}

export interface CodeBlock {
  title: string;
  description: string;
  codeSnippet: string;
  tags: string[];
}

export interface EvolutionItem {
  id: number;
  component: string;
  problem: string;
  solution: string;
  imageBefore: string;
  imageAfter: string;
}