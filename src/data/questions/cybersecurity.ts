
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const cybersecurity: Question[] = [
  {
    id: 1,
    question: "What is phishing?",
    options: [
      "A type of computer virus",
      "Attempting to acquire sensitive information by disguising as a trustworthy entity",
      "A network security protocol",
      "A password encryption method"
    ],
    correctAnswer: 1,
    explanation: "Phishing is a social engineering attack that attempts to steal sensitive information by disguising as a trustworthy entity through deceptive emails, websites, or messages.",
    difficulty: "beginner"
  },
  {
    id: 2,
    question: "What does a firewall do?",
    options: [
      "Encrypts your data",
      "Monitors network traffic and blocks unauthorized access",
      "Speeds up your internet connection",
      "Detects physical intrusions"
    ],
    correctAnswer: 1,
    explanation: "A firewall monitors incoming and outgoing network traffic based on predetermined security rules, creating a barrier between trusted and untrusted networks.",
    difficulty: "beginner"
  },
  {
    id: 3,
    question: "What is two-factor authentication (2FA)?",
    options: [
      "Using two different passwords",
      "Using two separate security questions",
      "Requiring two different verification methods for access",
      "Having two administrators approve access"
    ],
    correctAnswer: 2,
    explanation: "Two-factor authentication adds a layer of security by requiring users to provide two different authentication factors: something they know (password) and something they have (like a phone) or something they are (biometric).",
    difficulty: "beginner"
  },
  {
    id: 4,
    question: "What is malware?",
    options: [
      "Hardware that's malfunctioning",
      "Software designed to damage or gain unauthorized access to systems",
      "Outdated software",
      "A type of secure coding practice"
    ],
    correctAnswer: 1,
    explanation: "Malware (malicious software) is any software intentionally designed to cause damage to a computer, server, client, or computer network, or to gain unauthorized access to information.",
    difficulty: "beginner"
  },
  {
    id: 5,
    question: "What is a strong password typically characterized by?",
    options: [
      "Using common words and personal information",
      "Being easy to remember",
      "Length, complexity, and uniqueness",
      "Being changed daily"
    ],
    correctAnswer: 2,
    explanation: "Strong passwords should be long (at least 12 characters), complex (mixing letters, numbers, and symbols), unique for each account, and avoid personal information or common words.",
    difficulty: "beginner"
  },
  {
    id: 6,
    question: "What is a DDoS attack?",
    options: [
      "Direct Denial of Server - shutting down a server directly",
      "Distributed Denial of Service - overwhelming a system with traffic from multiple sources",
      "Data Deletion on Server - remotely deleting data",
      "Double Denial of Security - bypassing two security layers"
    ],
    correctAnswer: 1,
    explanation: "A Distributed Denial of Service attack attempts to make a service unavailable by overwhelming it with traffic from multiple sources, effectively preventing legitimate users from accessing it.",
    difficulty: "intermediate"
  },
  {
    id: 7,
    question: "What is a zero-day vulnerability?",
    options: [
      "A vulnerability discovered after a system has been operating for zero days",
      "A vulnerability that takes zero days to exploit",
      "A vulnerability unknown to the software vendor that attackers can exploit before a patch is available",
      "A vulnerability that causes zero damage to systems"
    ],
    correctAnswer: 2,
    explanation: "A zero-day vulnerability is a previously unknown software flaw that attackers can exploit before the vendor has had an opportunity to create a patch to fix it.",
    difficulty: "intermediate"
  },
  {
    id: 8,
    question: "What is the principle of least privilege?",
    options: [
      "Giving users the minimum levels of access necessary to complete their job functions",
      "Restricting all privileged operations to administrators",
      "Allowing all users equal access to resources",
      "Limiting access based on seniority in the organization"
    ],
    correctAnswer: 0,
    explanation: "The principle of least privilege means giving users only the access rights they need to perform their specific job functions, reducing the attack surface and potential damage from compromised accounts.",
    difficulty: "intermediate"
  },
  {
    id: 9,
    question: "What is a man-in-the-middle attack?",
    options: [
      "A physical attack on a data center",
      "An attack where someone intercepts communication between two parties",
      "When a middleman steals hardware",
      "An attack specifically targeting middle management"
    ],
    correctAnswer: 1,
    explanation: "A man-in-the-middle attack occurs when an attacker secretly intercepts and potentially alters communications between two parties who believe they are directly communicating with each other.",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "What is the purpose of encryption?",
    options: [
      "To compress data for efficient storage",
      "To make data unreadable to unauthorized users",
      "To speed up data transmission",
      "To correct errors in data transmission"
    ],
    correctAnswer: 1,
    explanation: "Encryption converts information into a code to prevent unauthorized access, ensuring that only parties with the decryption key can read the data.",
    difficulty: "intermediate"
  },
  {
    id: 11,
    question: "What is a SQL injection attack?",
    options: [
      "Injecting malicious SQL code into queries to manipulate databases",
      "Using SQL to create secure database backups",
      "Transferring SQL databases between servers",
      "A method for optimizing SQL queries"
    ],
    correctAnswer: 0,
    explanation: "SQL injection attacks insert malicious SQL code into queries through unsanitized user inputs, potentially allowing attackers to access, modify, or delete database information.",
    difficulty: "intermediate"
  },
  {
    id: 12,
    question: "What is a security incident response plan?",
    options: [
      "A plan to develop new security products",
      "A documented approach to addressing and managing security breaches",
      "A regular schedule for updating security software",
      "A training program for security personnel"
    ],
    correctAnswer: 1,
    explanation: "A security incident response plan is a documented, structured approach to handling security incidents, breaches, and threats, outlining steps for identification, containment, eradication, recovery, and lessons learned.",
    difficulty: "intermediate"
  },
  {
    id: 13,
    question: "What is the OWASP Top 10?",
    options: [
      "The top 10 cybersecurity companies",
      "A list of the most critical web application security risks",
      "The 10 most expensive security breaches",
      "The 10 oldest computer viruses"
    ],
    correctAnswer: 1,
    explanation: "The OWASP (Open Web Application Security Project) Top 10 is a regularly updated document that represents a consensus about the most critical web application security risks.",
    difficulty: "advanced"
  },
  {
    id: 14,
    question: "What is a security token in authentication?",
    options: [
      "A physical device used for authentication",
      "A cryptocurrency used to pay for security services",
      "A temporary key for accessing secure areas of buildings",
      "A digital object representing authentication and authorization rights"
    ],
    correctAnswer: 3,
    explanation: "A security token in authentication is a digital object that represents proof of identity and permissions, often used in token-based authentication systems like OAuth or JWT.",
    difficulty: "advanced"
  },
  {
    id: 15,
    question: "What is cross-site scripting (XSS)?",
    options: [
      "Writing code that works across multiple websites",
      "A vulnerability where attackers inject client-side scripts into web pages",
      "Sharing scripts between different development teams",
      "Converting scripts from one programming language to another"
    ],
    correctAnswer: 1,
    explanation: "Cross-site scripting is a security vulnerability that allows attackers to inject malicious client-side scripts into web pages viewed by others, potentially stealing information or performing actions on behalf of the user.",
    difficulty: "advanced"
  },
  {
    id: 16,
    question: "What is a security control?",
    options: [
      "A cybersecurity professional",
      "Software to control physical access to buildings",
      "A safeguard implemented to reduce security risks",
      "A security operations center"
    ],
    correctAnswer: 2,
    explanation: "A security control is any safeguard or countermeasure implemented to avoid, detect, counteract, or minimize security risks to physical property, information, computer systems, or other assets.",
    difficulty: "advanced"
  },
  {
    id: 17,
    question: "What is the purpose of a penetration test?",
    options: [
      "Testing physical barriers for weaknesses",
      "Evaluating an organization's security posture by simulating attacks",
      "Testing network speed and reliability",
      "Verifying employee security credentials"
    ],
    correctAnswer: 1,
    explanation: "Penetration testing (pen testing) is an authorized simulated cyberattack on a computer system to evaluate security by identifying vulnerabilities that could be exploited by actual attackers.",
    difficulty: "advanced"
  },
  {
    id: 18,
    question: "What is a bug bounty program?",
    options: [
      "An initiative to eliminate insects from data centers",
      "A program rewarding users who report software bugs",
      "A contest for finding the most bugs in competitors' software",
      "A system that automatically detects software bugs"
    ],
    correctAnswer: 1,
    explanation: "A bug bounty program offers recognition and compensation to individuals who discover and report software bugs, particularly those with security implications.",
    difficulty: "advanced"
  },
  {
    id: 19,
    question: "What is a security information and event management (SIEM) system?",
    options: [
      "A management structure for security teams",
      "Software that combines security information management and security event management",
      "A scheduling system for security personnel",
      "A system for managing security clearances"
    ],
    correctAnswer: 1,
    explanation: "A SIEM system combines security information management and security event management functions to provide real-time analysis of security alerts and logs from applications and network hardware.",
    difficulty: "advanced"
  },
  {
    id: 20,
    question: "What is defense in depth?",
    options: [
      "Installing security software on all computers",
      "Having a deep understanding of security principles",
      "Multiple layers of security controls throughout a system",
      "Deeply analyzing each security incident"
    ],
    correctAnswer: 2,
    explanation: "Defense in depth is a cybersecurity strategy that employs multiple layers of security controls throughout an information system, creating redundancy if one security measure fails.",
    difficulty: "advanced"
  }
];
