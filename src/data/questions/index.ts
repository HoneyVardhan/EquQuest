
import { dataScience } from './data-science';
import { aiMl } from './ai-ml';
import { cloudComputing } from './cloud-computing';
import { cybersecurity } from './cybersecurity';
import { digitalMarketing } from './digital-marketing';
import { projectManagement } from './project-management';
import { Question } from './data-science';

export interface TopicQuestions {
  id: string;
  name: string;
  questions: Question[];
}

export const allTopics: TopicQuestions[] = [
  {
    id: 'data-science',
    name: 'Data Science & Analytics',
    questions: dataScience
  },
  {
    id: 'ai-ml',
    name: 'Artificial Intelligence & Machine Learning',
    questions: aiMl
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing & DevOps',
    questions: cloudComputing
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity Fundamentals',
    questions: cybersecurity
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing Strategies',
    questions: digitalMarketing
  },
  {
    id: 'project-management',
    name: 'Project Management & Agile',
    questions: projectManagement
  }
];
