
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const digitalMarketing: Question[] = [
  {
    id: 1,
    question: "What is SEO?",
    options: [
      "Social Engine Optimization",
      "Search Engine Optimization",
      "Search Experience Operations",
      "Server Enhancement Operations"
    ],
    correctAnswer: 1,
    explanation: "Search Engine Optimization is the practice of optimizing a website to rank higher in search engine results pages (SERPs), increasing organic (non-paid) traffic.",
    difficulty: "beginner"
  },
  {
    id: 2,
    question: "Which metric measures the percentage of website visitors who take a desired action?",
    options: [
      "Click-through rate",
      "Conversion rate",
      "Bounce rate",
      "Impression share"
    ],
    correctAnswer: 1,
    explanation: "Conversion rate measures the percentage of visitors who complete a desired action (like making a purchase or filling out a form) relative to the total number of visitors.",
    difficulty: "beginner"
  },
  {
    id: 3,
    question: "What is a landing page?",
    options: [
      "The homepage of a website",
      "Any page on a website where visitors can arrive",
      "A standalone webpage designed for a specific marketing campaign",
      "The contact page of a website"
    ],
    correctAnswer: 2,
    explanation: "A landing page is a standalone webpage designed for a specific marketing campaign, typically designed with a single focused objective or call to action (CTA).",
    difficulty: "beginner"
  },
  {
    id: 4,
    question: "What does CTA stand for in marketing?",
    options: [
      "Creative Text Advertisement",
      "Call To Action",
      "Click Through Analysis",
      "Content Target Audience"
    ],
    correctAnswer: 1,
    explanation: "Call To Action refers to prompts on websites that tell users to take a specific action, such as 'Buy Now,' 'Learn More,' or 'Subscribe.'",
    difficulty: "beginner"
  },
  {
    id: 5,
    question: "Which of the following is NOT a social media platform commonly used for marketing?",
    options: [
      "LinkedIn",
      "Instagram",
      "TikTok",
      "Outlook"
    ],
    correctAnswer: 3,
    explanation: "Outlook is an email client developed by Microsoft, not a social media platform. LinkedIn, Instagram, and TikTok are all social media platforms commonly used for marketing.",
    difficulty: "beginner"
  },
  {
    id: 6,
    question: "What is a marketing funnel?",
    options: [
      "A tool for collecting customer data",
      "A visual representation of the customer journey toward purchase",
      "A filtering system for marketing emails",
      "A budget allocation framework"
    ],
    correctAnswer: 1,
    explanation: "A marketing funnel is a visual representation of the customer journey from initial awareness to final purchase, typically divided into stages like awareness, interest, consideration, and decision.",
    difficulty: "intermediate"
  },
  {
    id: 7,
    question: "What is the purpose of A/B testing in marketing?",
    options: [
      "Testing products before launch",
      "Comparing two versions to see which performs better",
      "Testing marketing software compatibility",
      "Assessing market size"
    ],
    correctAnswer: 1,
    explanation: "A/B testing compares two versions of a webpage, email, ad, or other marketing asset to determine which one performs better for a given conversion goal.",
    difficulty: "intermediate"
  },
  {
    id: 8,
    question: "What is remarketing?",
    options: [
      "Rebranding products that failed in the market",
      "Targeting ads to people who have previously interacted with your brand",
      "Sending products back to market after a recall",
      "Reintroducing discontinued products"
    ],
    correctAnswer: 1,
    explanation: "Remarketing is a strategy that targets ads to people who have previously visited your website or interacted with your brand but didn't convert, keeping your brand top of mind.",
    difficulty: "intermediate"
  },
  {
    id: 9,
    question: "What is PPC in digital marketing?",
    options: [
      "Price Per Customer",
      "Pay Per Click",
      "Potential Prospect Count",
      "Page Performance Coefficient"
    ],
    correctAnswer: 1,
    explanation: "Pay Per Click is an online advertising model where advertisers pay a fee each time their ad is clicked, essentially buying visits to their site rather than earning them organically.",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "What is a key performance indicator (KPI) in marketing?",
    options: [
      "A detailed marketing plan",
      "A measurable value that demonstrates effectiveness in achieving objectives",
      "A customer feedback system",
      "A competitor analysis tool"
    ],
    correctAnswer: 1,
    explanation: "Key Performance Indicators are measurable values that demonstrate how effectively a company is achieving key business objectives in their marketing efforts.",
    difficulty: "intermediate"
  },
  {
    id: 11,
    question: "What is content marketing?",
    options: [
      "Paying influencers to promote products",
      "Creating and sharing valuable content to attract and engage an audience",
      "Using content filtering tools for marketing emails",
      "Marketing content creation software"
    ],
    correctAnswer: 1,
    explanation: "Content marketing is a strategic approach focused on creating and distributing valuable, relevant, and consistent content to attract and engage a clearly defined audience.",
    difficulty: "intermediate"
  },
  {
    id: 12,
    question: "What is a marketing qualified lead (MQL)?",
    options: [
      "A lead that has been verified by a marketing agency",
      "A lead that has shown interest and fits the target customer profile",
      "A qualified marketing professional",
      "A lead with marketing experience"
    ],
    correctAnswer: 1,
    explanation: "A marketing qualified lead is a prospect who has demonstrated interest in a company's product/service through marketing efforts and fits the ideal customer profile.",
    difficulty: "intermediate"
  },
  {
    id: 13,
    question: "What is the difference between branded and non-branded keywords?",
    options: [
      "Branded keywords are trademarked, non-branded are not",
      "Branded keywords include your brand name, non-branded don't",
      "Branded keywords are paid, non-branded are organic",
      "Branded keywords target businesses, non-branded target consumers"
    ],
    correctAnswer: 1,
    explanation: "Branded keywords include your company or product name (e.g., 'Nike shoes'), while non-branded keywords are general terms related to your products/services ('running shoes').",
    difficulty: "advanced"
  },
  {
    id: 14,
    question: "What is attribution modeling in marketing analytics?",
    options: [
      "Assigning credit to touchpoints in a conversion path",
      "Creating a model of your ideal customer",
      "Attributing marketing expenses to specific departments",
      "Modeling future marketing trends"
    ],
    correctAnswer: 0,
    explanation: "Attribution modeling is the process of assigning credit to various marketing touchpoints in the customer journey to understand which channels or campaigns contribute most to conversions.",
    difficulty: "advanced"
  },
  {
    id: 15,
    question: "What is a customer persona?",
    options: [
      "A customer service representative",
      "A detailed representation of your ideal customer",
      "A personalized customer account",
      "A customer loyalty program participant"
    ],
    correctAnswer: 1,
    explanation: "A customer persona is a semi-fictional, detailed representation of your ideal customer based on market research and data about your existing customers.",
    difficulty: "advanced"
  },
  {
    id: 16,
    question: "What does ROAS stand for in digital marketing?",
    options: [
      "Return On Advertising Spend",
      "Rate Of Ad Sequence",
      "Reach, Objectives, Audience, Sales",
      "Regional Online Advertising Strategy"
    ],
    correctAnswer: 0,
    explanation: "Return On Advertising Spend measures the revenue generated for every dollar spent on advertising, helping marketers evaluate the effectiveness of their campaigns.",
    difficulty: "advanced"
  },
  {
    id: 17,
    question: "What is the purpose of a marketing automation platform?",
    options: [
      "To replace human marketers",
      "To automate repetitive marketing tasks and workflows",
      "To create marketing budgets automatically",
      "To automatically design marketing materials"
    ],
    correctAnswer: 1,
    explanation: "Marketing automation platforms help businesses automate repetitive marketing tasks like email marketing, social media posting, and ad campaigns to increase efficiency and personalization.",
    difficulty: "advanced"
  },
  {
    id: 18,
    question: "What is the concept of customer lifetime value (CLV)?",
    options: [
      "The average lifespan of a customer relationship",
      "The total revenue a business expects from a single customer throughout the business relationship",
      "The value a customer places on your product over alternatives",
      "The amount spent on retaining a customer"
    ],
    correctAnswer: 1,
    explanation: "Customer Lifetime Value is the total revenue a business can reasonably expect from a single customer throughout their entire relationship, helping businesses make decisions about acquisition and retention.",
    difficulty: "advanced"
  },
  {
    id: 19,
    question: "What is a marketing tech stack?",
    options: [
      "A collection of marketing materials",
      "A set of technology tools used to conduct and improve marketing activities",
      "A hierarchical organization of the marketing department",
      "A method for stacking marketing campaigns sequentially"
    ],
    correctAnswer: 1,
    explanation: "A marketing tech stack is the collection of technology tools and platforms that marketers use to execute, analyze, and improve their marketing activities across channels.",
    difficulty: "advanced"
  },
  {
    id: 20,
    question: "What is customer segmentation?",
    options: [
      "Dividing customers into groups based on shared characteristics",
      "Separating customers from prospects",
      "Breaking down customer complaints by type",
      "Segmenting customers by their physical location"
    ],
    correctAnswer: 0,
    explanation: "Customer segmentation is the process of dividing customers into groups based on shared characteristics like demographics, behavior, needs, or values to target them more effectively.",
    difficulty: "advanced"
  }
];
