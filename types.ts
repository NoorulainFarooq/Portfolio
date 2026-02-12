
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
