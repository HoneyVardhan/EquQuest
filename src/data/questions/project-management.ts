
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const projectManagement: Question[] = [
  {
    id: 1,
    question: "What is a project in project management terms?",
    options: [
      "Any task assigned to a team",
      "A temporary endeavor with a defined beginning and end",
      "A department within an organization",
      "A continuous business operation"
    ],
    correctAnswer: 1,
    explanation: "A project is a temporary endeavor with a defined beginning and end, undertaken to create a unique product, service, or result.",
    difficulty: "beginner"
  },
  {
    id: 2,
    question: "What does the term 'scope' refer to in project management?",
    options: [
      "The project timeline",
      "The project budget",
      "The work that needs to be completed to deliver the project",
      "The team members involved"
    ],
    correctAnswer: 2,
    explanation: "Scope refers to all the work that needs to be completed to deliver a product, service, or result with the specified features and functions.",
    difficulty: "beginner"
  },
  {
    id: 3,
    question: "What is a Gantt chart used for?",
    options: [
      "Financial planning",
      "Resource allocation",
      "Project scheduling and tracking progress",
      "Team performance evaluation"
    ],
    correctAnswer: 2,
    explanation: "A Gantt chart is a popular project management tool that provides a visual timeline of project tasks, showing start and finish dates, dependencies, and progress.",
    difficulty: "beginner"
  },
  {
    id: 4,
    question: "What is a project milestone?",
    options: [
      "A regular team meeting",
      "A significant point or event in a project",
      "A project failure",
      "The final deadline"
    ],
    correctAnswer: 1,
    explanation: "A milestone is a significant point or event in a project that marks the completion of a major deliverable or phase, often used to monitor progress.",
    difficulty: "beginner"
  },
  {
    id: 5,
    question: "What is the definition of a stakeholder in project management?",
    options: [
      "Only the project sponsor",
      "Only the project team",
      "Anyone who can affect or is affected by the project",
      "Only the project manager"
    ],
    correctAnswer: 2,
    explanation: "A stakeholder is any individual, group, or organization that can affect, be affected by, or perceive itself to be affected by a project.",
    difficulty: "beginner"
  },
  {
    id: 6,
    question: "What is the critical path in project management?",
    options: [
      "The most expensive parts of a project",
      "The sequence of stages that determines the minimum time needed for operation",
      "The riskiest tasks in a project",
      "The path between stakeholders"
    ],
    correctAnswer: 1,
    explanation: "The critical path is the longest sequence of dependent tasks that determines the minimum time needed to complete a project. Any delay in these tasks will delay the entire project.",
    difficulty: "intermediate"
  },
  {
    id: 7,
    question: "What does MVP stand for in product development?",
    options: [
      "Most Valuable Player",
      "Minimum Viable Product",
      "Maximum Value Proposition",
      "Multiple Version Product"
    ],
    correctAnswer: 1,
    explanation: "Minimum Viable Product is a development approach where a new product is developed with sufficient features to satisfy early users and provide feedback for future development.",
    difficulty: "intermediate"
  },
  {
    id: 8,
    question: "What is a sprint in Agile project management?",
    options: [
      "A race between team members",
      "A short, time-boxed period when a team works to complete a set amount of work",
      "A quick meeting to resolve issues",
      "The final phase of a project"
    ],
    correctAnswer: 1,
    explanation: "A sprint is a short, time-boxed period (typically 1-4 weeks) during which a scrum team works to complete a set amount of work, delivering potentially shippable increments.",
    difficulty: "intermediate"
  },
  {
    id: 9,
    question: "What is a burndown chart?",
    options: [
      "A chart showing team fatigue",
      "A chart showing completed vs. remaining work over time",
      "A chart showing budget depletion",
      "A chart showing team performance"
    ],
    correctAnswer: 1,
    explanation: "A burndown chart is a graphical representation of work completed versus work remaining over time, often used in Agile methodologies to track progress.",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "What is resource leveling in project management?",
    options: [
      "Ensuring all team members have equal skills",
      "A technique to resolve resource conflicts by adjusting the project schedule",
      "Allocating equal budgets to all project phases",
      "Hiring more team members"
    ],
    correctAnswer: 1,
    explanation: "Resource leveling is a technique in which start and finish dates are adjusted based on resource constraints to balance resource demand with available supply.",
    difficulty: "intermediate"
  },
  {
    id: 11,
    question: "What is a Kanban board used for?",
    options: [
      "Financial tracking",
      "Visualizing work and workflow",
      "Design prototyping",
      "Customer feedback collection"
    ],
    correctAnswer: 1,
    explanation: "A Kanban board is a visual management tool that helps visualize work, limit work-in-progress, and maximize flow/efficiency, typically using cards and columns to represent work items and workflow stages.",
    difficulty: "intermediate"
  },
  {
    id: 12,
    question: "What are the three pillars of Scrum?",
    options: [
      "Planning, Execution, Review",
      "Transparency, Inspection, Adaptation",
      "Time, Cost, Quality",
      "Requirements, Development, Testing"
    ],
    correctAnswer: 1,
    explanation: "The three pillars of Scrum are Transparency (clear visibility of the process), Inspection (regular checks on progress), and Adaptation (adjusting to changes quickly).",
    difficulty: "intermediate"
  },
  {
    id: 13,
    question: "What is the purpose of a Work Breakdown Structure (WBS)?",
    options: [
      "To organize team responsibilities",
      "To decompose project deliverables into smaller, manageable components",
      "To track employee work hours",
      "To manage customer expectations"
    ],
    correctAnswer: 1,
    explanation: "A Work Breakdown Structure breaks down project deliverables into smaller, more manageable components, organizing the team's work into sections that can be easily tracked and managed.",
    difficulty: "advanced"
  },
  {
    id: 14,
    question: "What is stakeholder mapping?",
    options: [
      "Creating office seating charts",
      "Identifying stakeholders and assessing their influence and interest",
      "Tracking stakeholder locations",
      "Matching stakeholders with team members"
    ],
    correctAnswer: 1,
    explanation: "Stakeholder mapping is the process of identifying stakeholders and analyzing their power, interest, influence, and requirements to develop appropriate management strategies.",
    difficulty: "advanced"
  },
  {
    id: 15,
    question: "What is technical debt in software development projects?",
    options: [
      "Money owed for technical equipment",
      "The cost of future rework caused by choosing an easy solution now",
      "Outstanding payments to technical consultants",
      "The cost of technical training"
    ],
    correctAnswer: 1,
    explanation: "Technical debt refers to the future cost of rework needed when teams choose a quick or easy solution now instead of implementing the best overall solution, often resulting in additional work later.",
    difficulty: "advanced"
  },
  {
    id: 16,
    question: "What is risk management in project management?",
    options: [
      "Avoiding all project risks",
      "The process of identifying, assessing, and controlling threats to project success",
      "Taking insurance for project failures",
      "Managing risky team members"
    ],
    correctAnswer: 1,
    explanation: "Risk management is the systematic process of identifying, analyzing, and responding to project risks, including maximizing positive events and minimizing negative events.",
    difficulty: "advanced"
  },
  {
    id: 17,
    question: "What is the difference between a product owner and a scrum master in Agile?",
    options: [
      "They are different names for the same role",
      "Product owner manages the product backlog, while scrum master facilitates the scrum process",
      "Product owner leads the team, while scrum master manages the client",
      "Product owner handles technical aspects, while scrum master handles business aspects"
    ],
    correctAnswer: 1,
    explanation: "The product owner is responsible for maximizing product value by managing the product backlog, while the scrum master serves the team by facilitating scrum events, removing impediments, and ensuring scrum practices.",
    difficulty: "advanced"
  },
  {
    id: 18,
    question: "What is a product backlog in Agile methodology?",
    options: [
      "A list of technical issues",
      "A prioritized list of features, enhancements, and fixes to be worked on",
      "A record of completed work",
      "A log of customer complaints"
    ],
    correctAnswer: 1,
    explanation: "A product backlog is a prioritized list of features, enhancements, and fixes that constitute the changes to be made to a product, ordered by value and risk.",
    difficulty: "advanced"
  },
  {
    id: 19,
    question: "What is earned value management (EVM)?",
    options: [
      "A method for calculating team bonuses",
      "A project performance measurement technique",
      "A system for tracking employee time",
      "A way to calculate client billing"
    ],
    correctAnswer: 1,
    explanation: "Earned Value Management is a project performance measurement technique that combines schedule, cost, and scope measurements to assess project performance and progress.",
    difficulty: "advanced"
  },
  {
    id: 20,
    question: "What is the purpose of a retrospective meeting in Agile?",
    options: [
      "To plan the next sprint",
      "To demo completed work to stakeholders",
      "To reflect on processes and identify improvements",
      "To evaluate individual team performance"
    ],
    correctAnswer: 2,
    explanation: "A retrospective meeting is held at the end of each sprint for the team to reflect on their work process, identify what went well, what didn't go well, and how to improve in the future.",
    difficulty: "advanced"
  }
];
