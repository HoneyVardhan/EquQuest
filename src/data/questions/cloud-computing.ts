
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const cloudComputing: Question[] = [
  {
    id: 1,
    question: "What is the main benefit of cloud computing?",
    options: [
      "Lower security",
      "Reduced scalability",
      "Reduced cost and increased flexibility",
      "More complex maintenance"
    ],
    correctAnswer: 2,
    explanation: "Cloud computing reduces costs by eliminating the need for physical hardware investment and provides flexibility to scale resources up or down based on demand.",
    difficulty: "beginner"
  },
  {
    id: 2,
    question: "Which cloud service model provides virtual machines and other hardware resources?",
    options: [
      "Software as a Service (SaaS)",
      "Platform as a Service (PaaS)",
      "Infrastructure as a Service (IaaS)",
      "Function as a Service (FaaS)"
    ],
    correctAnswer: 2,
    explanation: "IaaS provides virtualized computing resources like virtual machines, storage, and networking infrastructure.",
    difficulty: "beginner"
  },
  {
    id: 3,
    question: "What is a container in cloud computing?",
    options: [
      "A virtual machine",
      "A lightweight, portable computing environment",
      "A physical server",
      "A cloud storage unit"
    ],
    correctAnswer: 1,
    explanation: "Containers are lightweight, portable environments that package application code and dependencies to ensure consistent operation across different environments.",
    difficulty: "beginner"
  },
  {
    id: 4,
    question: "Which of the following is NOT a major cloud service provider?",
    options: [
      "Microsoft Azure",
      "Google Cloud Platform",
      "Oracle Cloud",
      "Adobe Cloud"
    ],
    correctAnswer: 3,
    explanation: "While Adobe offers cloud services like Creative Cloud, it is not considered one of the major cloud infrastructure providers like AWS, Azure, GCP, or Oracle Cloud.",
    difficulty: "beginner"
  },
  {
    id: 5,
    question: "What does DevOps aim to achieve?",
    options: [
      "Separate development and operations teams",
      "Faster software delivery through collaboration",
      "Reduced testing and quality assurance",
      "Increased documentation requirements"
    ],
    correctAnswer: 1,
    explanation: "DevOps aims to improve collaboration between development and operations teams to enable faster, more reliable software delivery with automated processes.",
    difficulty: "beginner"
  },
  {
    id: 6,
    question: "What is auto-scaling in cloud computing?",
    options: [
      "Manually adjusting resources based on predictions",
      "Automatic resource adjustment based on demand",
      "Scheduling regular server restarts",
      "Distributing traffic to the nearest server"
    ],
    correctAnswer: 1,
    explanation: "Auto-scaling automatically adjusts resources (like virtual machines or containers) based on current demand metrics to maintain performance and optimize costs.",
    difficulty: "intermediate"
  },
  {
    id: 7,
    question: "What is the purpose of a load balancer?",
    options: [
      "To increase server CPU capacity",
      "To distribute traffic across multiple servers",
      "To compress data for faster transmission",
      "To back up data across multiple regions"
    ],
    correctAnswer: 1,
    explanation: "Load balancers distribute network traffic across multiple servers to ensure no single server becomes overwhelmed, improving reliability and performance.",
    difficulty: "intermediate"
  },
  {
    id: 8,
    question: "Which tool is commonly used for containerization?",
    options: [
      "Jenkins",
      "Docker",
      "Terraform",
      "Apache Maven"
    ],
    correctAnswer: 1,
    explanation: "Docker is a leading containerization platform that packages applications and their dependencies into standardized units called containers.",
    difficulty: "intermediate"
  },
  {
    id: 9,
    question: "What is a CI/CD pipeline?",
    options: [
      "A cloud storage system",
      "An automated process for software delivery",
      "A network security protocol",
      "A database management system"
    ],
    correctAnswer: 1,
    explanation: "CI/CD (Continuous Integration/Continuous Delivery) pipelines automate the testing and deployment of code changes, enabling faster and more reliable software delivery.",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "What is infrastructure as code (IaC)?",
    options: [
      "Writing code on cloud servers",
      "Managing infrastructure through code files",
      "Converting infrastructure to programming languages",
      "Coding on virtual machines"
    ],
    correctAnswer: 1,
    explanation: "Infrastructure as Code is the practice of managing and provisioning infrastructure through machine-readable definition files rather than manual processes.",
    difficulty: "intermediate"
  },
  {
    id: 11,
    question: "Which AWS service provides managed Kubernetes?",
    options: [
      "AWS EC2",
      "AWS ECS",
      "AWS EKS",
      "AWS Lambda"
    ],
    correctAnswer: 2,
    explanation: "AWS EKS (Elastic Kubernetes Service) is a managed service that makes it easier to deploy, manage, and scale containerized applications using Kubernetes.",
    difficulty: "intermediate"
  },
  {
    id: 12,
    question: "What is a microservices architecture?",
    options: [
      "Creating very small physical servers",
      "Breaking applications into small, independent services",
      "Using micro-controllers for IoT devices",
      "Optimizing code to take minimal disk space"
    ],
    correctAnswer: 1,
    explanation: "Microservices architecture structures an application as a collection of loosely coupled, independently deployable services, each focused on a specific business capability.",
    difficulty: "intermediate"
  },
  {
    id: 13,
    question: "What is the primary purpose of Terraform?",
    options: [
      "Monitoring and alerting",
      "Infrastructure provisioning and management",
      "Container orchestration",
      "Code version control"
    ],
    correctAnswer: 1,
    explanation: "Terraform is an Infrastructure as Code tool that allows you to define and provision infrastructure resources across multiple cloud providers using a declarative configuration language.",
    difficulty: "advanced"
  },
  {
    id: 14,
    question: "Which statement about Kubernetes is true?",
    options: [
      "It's primarily used for code version control",
      "It's a container orchestration platform",
      "It's a cloud service provider",
      "It's a programming language for cloud environments"
    ],
    correctAnswer: 1,
    explanation: "Kubernetes is an open-source platform designed to automate deploying, scaling, and operating containerized applications.",
    difficulty: "advanced"
  },
  {
    id: 15,
    question: "What is a Kubernetes pod?",
    options: [
      "A storage volume",
      "A cluster of servers",
      "The smallest deployable unit containing one or more containers",
      "A network security group"
    ],
    correctAnswer: 2,
    explanation: "A pod is the smallest deployable unit in Kubernetes and can contain one or more containers that share storage, network, and specifications on how to run.",
    difficulty: "advanced"
  },
  {
    id: 16,
    question: "What is a blue-green deployment strategy?",
    options: [
      "A color-coding system for servers based on performance",
      "Running two identical environments with only one live at any time",
      "Gradually rolling out changes to all servers",
      "Deploying to testing and production simultaneously"
    ],
    correctAnswer: 1,
    explanation: "Blue-green deployment maintains two identical environments (blue and green) with only one serving production traffic, allowing for zero-downtime releases by switching traffic between them.",
    difficulty: "advanced"
  },
  {
    id: 17,
    question: "What is service mesh in cloud architecture?",
    options: [
      "A physical network of servers",
      "A dedicated infrastructure layer for service-to-service communication",
      "A mesh network for IoT devices",
      "A web of serverless functions"
    ],
    correctAnswer: 1,
    explanation: "A service mesh is a dedicated infrastructure layer for handling service-to-service communication, providing features like traffic management, security, and observability.",
    difficulty: "advanced"
  },
  {
    id: 18,
    question: "What does the principle of immutable infrastructure mean?",
    options: [
      "Infrastructure that cannot be modified after deployment",
      "Infrastructure that cannot be accessed by unauthorized users",
      "Infrastructure that cannot be scaled",
      "Infrastructure that cannot be monitored"
    ],
    correctAnswer: 0,
    explanation: "Immutable infrastructure means that servers, once deployed, are never modified – instead, new servers are built and deployed to replace the old ones when changes are needed.",
    difficulty: "advanced"
  },
  {
    id: 19,
    question: "What is a multi-tenancy architecture in cloud computing?",
    options: [
      "Using multiple cloud providers simultaneously",
      "Having multiple development teams work on the same project",
      "Serving multiple customers from a single software instance",
      "Deploying applications across multiple regions"
    ],
    correctAnswer: 2,
    explanation: "Multi-tenancy architecture allows a single instance of software to serve multiple customers (tenants) while keeping their data separate and secure.",
    difficulty: "advanced"
  },
  {
    id: 20,
    question: "What is chaos engineering?",
    options: [
      "A disorganized approach to software development",
      "Deliberately introducing failures to test system resilience",
      "Using random code generators to create applications",
      "Programming without specifications or requirements"
    ],
    correctAnswer: 1,
    explanation: "Chaos engineering is the practice of deliberately introducing controlled failures into a system to test its resilience and identify weaknesses before they cause real outages.",
    difficulty: "advanced"
  }
];
