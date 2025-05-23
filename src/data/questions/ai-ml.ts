
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const aiMl: Question[] = [
  {
    id: 1,
    question: "What is machine learning?",
    options: [
      "Programming computers to follow specific rules",
      "Training computers to learn from data without explicit programming",
      "Creating robots that mimic human appearance",
      "Developing software that can pass the Turing test"
    ],
    correctAnswer: 1,
    explanation: "Machine learning is a subset of AI where algorithms learn patterns from data without being explicitly programmed to perform specific tasks.",
    difficulty: "beginner"
  },
  {
    id: 2,
    question: "Which of the following is an example of supervised learning?",
    options: [
      "Clustering customer segments",
      "Email spam detection",
      "Anomaly detection in network traffic",
      "Dimensionality reduction"
    ],
    correctAnswer: 1,
    explanation: "Email spam detection is supervised learning because it uses labeled examples (spam vs. not spam) to train the model.",
    difficulty: "beginner"
  },
  {
    id: 3,
    question: "What is the purpose of the activation function in neural networks?",
    options: [
      "To initialize weights",
      "To introduce non-linearity",
      "To normalize input data",
      "To calculate the loss"
    ],
    correctAnswer: 1,
    explanation: "Activation functions introduce non-linear properties to neural networks, allowing them to learn complex patterns.",
    difficulty: "beginner"
  },
  {
    id: 4,
    question: "Which algorithm is NOT commonly used for classification problems?",
    options: [
      "Logistic Regression",
      "Support Vector Machines",
      "Linear Regression",
      "Random Forest"
    ],
    correctAnswer: 2,
    explanation: "Linear regression is primarily used for regression problems to predict continuous values, not for classification.",
    difficulty: "beginner"
  },
  {
    id: 5,
    question: "What is the difference between AI and ML?",
    options: [
      "AI is a subset of ML",
      "AI and ML are the same thing",
      "ML is a subset of AI",
      "AI uses data, ML does not"
    ],
    correctAnswer: 2,
    explanation: "Machine Learning is a subset of Artificial Intelligence - it's one approach to achieve AI using statistical techniques.",
    difficulty: "beginner"
  },
  {
    id: 6,
    question: "What is the role of the loss function in machine learning models?",
    options: [
      "To measure model performance",
      "To initialize model parameters",
      "To preprocess the input data",
      "To visualize model outputs"
    ],
    correctAnswer: 0,
    explanation: "The loss function measures how well the model's predictions match the actual values, guiding the optimization process.",
    difficulty: "intermediate"
  },
  {
    id: 7,
    question: "Which layer type in a CNN is responsible for feature extraction?",
    options: [
      "Fully connected layer",
      "Softmax layer",
      "Convolutional layer",
      "Dropout layer"
    ],
    correctAnswer: 2,
    explanation: "Convolutional layers extract features by applying filters to the input, recognizing patterns like edges, textures, and more complex features.",
    difficulty: "intermediate"
  },
  {
    id: 8,
    question: "What is the vanishing gradient problem?",
    options: [
      "When model training is too fast",
      "When gradients become too small during backpropagation",
      "When input data has too many features",
      "When the model overfits the training data"
    ],
    correctAnswer: 1,
    explanation: "The vanishing gradient problem occurs when gradients become extremely small during backpropagation, slowing down or stopping learning in deep networks.",
    difficulty: "intermediate"
  },
  {
    id: 9,
    question: "Which technique helps prevent overfitting?",
    options: [
      "Increasing model complexity",
      "Training for more epochs",
      "Regularization",
      "Using more parameters"
    ],
    correctAnswer: 2,
    explanation: "Regularization techniques like L1/L2 regularization, dropout, and early stopping help prevent overfitting by constraining model complexity.",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "What is the main advantage of RNNs over traditional neural networks?",
    options: [
      "They require less training data",
      "They can process sequences of variable length",
      "They always converge faster",
      "They use fewer parameters"
    ],
    correctAnswer: 1,
    explanation: "Recurrent Neural Networks can process sequences of variable length by maintaining an internal state (memory) that captures information from previous inputs.",
    difficulty: "intermediate"
  },
  {
    id: 11,
    question: "What is transfer learning?",
    options: [
      "Moving data between different servers",
      "Training a model to solve multiple tasks simultaneously",
      "Using a pre-trained model as a starting point for a new task",
      "Transferring knowledge between human experts and AI systems"
    ],
    correctAnswer: 2,
    explanation: "Transfer learning leverages knowledge gained from one task to improve performance on a related task, often by using pre-trained models as initialization.",
    difficulty: "intermediate"
  },
  {
    id: 12,
    question: "How does LSTM solve the vanishing gradient problem?",
    options: [
      "By using multiple hidden layers",
      "By using a different activation function",
      "By using a smaller learning rate",
      "By using gates that control information flow"
    ],
    correctAnswer: 3,
    explanation: "LSTMs use specialized gates (input, forget, output) that control the flow of information, allowing gradients to flow through the network more effectively.",
    difficulty: "advanced"
  },
  {
    id: 13,
    question: "What is the core concept behind Generative Adversarial Networks (GANs)?",
    options: [
      "Reinforcement learning from human feedback",
      "Two networks competing against each other",
      "Ensemble learning from multiple models",
      "Self-supervised learning on unlabeled data"
    ],
    correctAnswer: 1,
    explanation: "GANs consist of a generator and a discriminator network that compete against each other: the generator creates fake data, and the discriminator tries to distinguish it from real data.",
    difficulty: "advanced"
  },
  {
    id: 14,
    question: "What is the exploding gradient problem?",
    options: [
      "When gradients become too large during training",
      "When the model has too many parameters",
      "When the dataset is too large to process",
      "When activation functions saturate"
    ],
    correctAnswer: 0,
    explanation: "The exploding gradient problem occurs when gradients become extremely large during backpropagation, causing unstable updates and potentially numerical overflow.",
    difficulty: "advanced"
  },
  {
    id: 15,
    question: "Which of the following is NOT a common attention mechanism in transformer models?",
    options: [
      "Self-attention",
      "Multi-head attention",
      "Temporal attention",
      "Cross-attention"
    ],
    correctAnswer: 2,
    explanation: "While self-attention, multi-head attention, and cross-attention are common in transformers, 'temporal attention' is not a standard mechanism (though attention over temporal sequences exists in other forms).",
    difficulty: "advanced"
  },
  {
    id: 16,
    question: "What is the purpose of beam search in sequence generation tasks?",
    options: [
      "To reduce training time",
      "To find the most likely sequence by exploring multiple paths",
      "To compress the model size",
      "To perform data augmentation"
    ],
    correctAnswer: 1,
    explanation: "Beam search explores multiple possible sequences simultaneously, keeping track of the most promising ones to find the overall most likely sequence.",
    difficulty: "advanced"
  },
  {
    id: 17,
    question: "How does batch normalization improve neural network training?",
    options: [
      "By reducing the number of parameters",
      "By normalizing layer inputs, reducing internal covariate shift",
      "By increasing the learning rate",
      "By eliminating the need for activation functions"
    ],
    correctAnswer: 1,
    explanation: "Batch normalization normalizes the inputs to each layer, reducing internal covariate shift and allowing for higher learning rates and more stable training.",
    difficulty: "advanced"
  },
  {
    id: 18,
    question: "What is a key difference between transformers and RNNs?",
    options: [
      "Transformers can only process fixed-length inputs",
      "RNNs are more computationally efficient",
      "Transformers process all tokens in parallel rather than sequentially",
      "RNNs use attention mechanisms by default"
    ],
    correctAnswer: 2,
    explanation: "Unlike RNNs which process tokens sequentially, transformers process all tokens in parallel, allowing for more efficient training and better capture of long-range dependencies.",
    difficulty: "advanced"
  },
  {
    id: 19,
    question: "What is knowledge distillation in machine learning?",
    options: [
      "Extracting facts from text documents",
      "Training a smaller model to mimic a larger one",
      "Breaking complex problems into simpler ones",
      "Converting neural networks to decision trees"
    ],
    correctAnswer: 1,
    explanation: "Knowledge distillation involves training a smaller 'student' model to replicate the behavior of a larger 'teacher' model, often by learning from the teacher's soft output probabilities.",
    difficulty: "advanced"
  },
  {
    id: 20,
    question: "Which statement about self-supervised learning is correct?",
    options: [
      "It always requires labeled data",
      "It creates its own supervisory signal from unlabeled data",
      "It is the same as unsupervised learning",
      "It only works for computer vision tasks"
    ],
    correctAnswer: 1,
    explanation: "Self-supervised learning creates supervisory signals from the unlabeled data itself (like predicting masked words or image parts), allowing models to learn useful representations without explicit human labels.",
    difficulty: "advanced"
  }
];
