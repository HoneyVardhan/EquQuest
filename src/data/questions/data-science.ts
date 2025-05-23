
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const dataScience: Question[] = [
  {
    id: 1,
    question: "What is the primary goal of exploratory data analysis (EDA)?",
    options: ["Making predictions", "Summarizing data characteristics", "Testing hypotheses", "Model deployment"],
    correctAnswer: 1,
    explanation: "EDA involves summarizing the main characteristics of data, often using visual methods, to understand patterns, spot anomalies, and test hypotheses.",
    difficulty: "beginner"
  },
  {
    id: 2,
    question: "Which of the following is a measure of central tendency?",
    options: ["Variance", "Standard deviation", "Mean", "Range"],
    correctAnswer: 2,
    explanation: "Mean is the average value and a measure of central tendency, while variance and standard deviation measure dispersion.",
    difficulty: "beginner"
  },
  {
    id: 3,
    question: "What does a box plot visualize?",
    options: ["Correlation between variables", "Distribution of a dataset", "Frequency of categories", "Time series trends"],
    correctAnswer: 1,
    explanation: "A box plot displays the distribution, central value, and variability of a dataset, highlighting outliers.",
    difficulty: "beginner"
  },
  {
    id: 4,
    question: "Which library is commonly used for data manipulation in Python?",
    options: ["NumPy", "Matplotlib", "Pandas", "Seaborn"],
    correctAnswer: 2,
    explanation: "Pandas provides data structures and functions needed to manipulate structured data seamlessly.",
    difficulty: "beginner"
  },
  {
    id: 5,
    question: "What does the term 'outlier' refer to in statistics?",
    options: ["The mean of a dataset", "Unusual or extreme values in a dataset", "The mode of a dataset", "The standard deviation of a dataset"],
    correctAnswer: 1,
    explanation: "Outliers are data points that differ significantly from other observations and can affect statistical analyses.",
    difficulty: "beginner"
  },
  {
    id: 6,
    question: "Which algorithm is suitable for predicting a continuous outcome?",
    options: ["Logistic Regression", "K-Means Clustering", "Linear Regression", "Decision Trees"],
    correctAnswer: 2,
    explanation: "Linear regression predicts continuous outcomes by modeling the relationship between variables.",
    difficulty: "intermediate"
  },
  {
    id: 7,
    question: "What is the purpose of cross-validation in model evaluation?",
    options: ["To reduce overfitting", "To increase model complexity", "To eliminate outliers", "To perform feature selection"],
    correctAnswer: 0,
    explanation: "Cross-validation assesses how the results of a statistical analysis will generalize to an independent dataset.",
    difficulty: "intermediate"
  },
  {
    id: 8,
    question: "In a confusion matrix, what does the term 'True Positive' mean?",
    options: ["Model incorrectly predicts the positive class", "Model correctly predicts the negative class", "Model correctly predicts the positive class", "Model incorrectly predicts the negative class"],
    correctAnswer: 2,
    explanation: "True Positive indicates the model's correct prediction of the positive class.",
    difficulty: "intermediate"
  },
  {
    id: 9,
    question: "Which metric is suitable for evaluating classification models on imbalanced datasets?",
    options: ["Accuracy", "Precision", "Recall", "F1 Score"],
    correctAnswer: 3,
    explanation: "F1 Score balances precision and recall, making it suitable for imbalanced datasets.",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "What does PCA (Principal Component Analysis) aim to achieve?",
    options: ["Increase the number of features", "Reduce dimensionality", "Normalize data", "Encode categorical variables"],
    correctAnswer: 1,
    explanation: "PCA transforms data into a lower-dimensional space to reduce complexity while retaining variance.",
    difficulty: "intermediate"
  },
  {
    id: 11,
    question: "Which technique is used to handle multicollinearity in regression models?",
    options: ["Lasso Regression", "Ridge Regression", "Decision Trees", "K-Nearest Neighbors"],
    correctAnswer: 1,
    explanation: "Ridge regression adds a penalty to the loss function to handle multicollinearity.",
    difficulty: "advanced"
  },
  {
    id: 12,
    question: "What is the curse of dimensionality?",
    options: ["Difficulty in visualizing data", "Increased computational cost with more features", "Overfitting due to too many features", "All of the above"],
    correctAnswer: 3,
    explanation: "The curse of dimensionality refers to various phenomena that arise when analyzing data in high-dimensional spaces.",
    difficulty: "advanced"
  },
  {
    id: 13,
    question: "Which method is used for feature selection?",
    options: ["Random Forest", "Recursive Feature Elimination", "K-Means Clustering", "PCA"],
    correctAnswer: 1,
    explanation: "Recursive Feature Elimination selects features by recursively considering smaller sets of features.",
    difficulty: "advanced"
  },
  {
    id: 14,
    question: "What is heteroscedasticity in regression analysis?",
    options: ["Constant variance of errors", "Non-constant variance of errors", "Errors are normally distributed", "Errors are independent"],
    correctAnswer: 1,
    explanation: "Heteroscedasticity occurs when the variance of errors varies across observations.",
    difficulty: "advanced"
  },
  {
    id: 15,
    question: "Which evaluation metric is suitable for regression models?",
    options: ["ROC AUC", "Mean Absolute Error", "F1 Score", "Confusion Matrix"],
    correctAnswer: 1,
    explanation: "Mean Absolute Error measures the average magnitude of errors in predictions for regression models.",
    difficulty: "advanced"
  },
  {
    id: 16,
    question: "What does the R-squared value indicate in regression?",
    options: ["The slope of the regression line", "The correlation between variables", "The proportion of variance explained by the model", "The standard error of the estimate"],
    correctAnswer: 2,
    explanation: "R-squared indicates how well the independent variables explain the variability of the dependent variable.",
    difficulty: "advanced"
  },
  {
    id: 17,
    question: "Which algorithm is sensitive to outliers?",
    options: ["K-Means Clustering", "DBSCAN", "Hierarchical Clustering", "Mean Shift"],
    correctAnswer: 0,
    explanation: "K-Means uses mean values, making it sensitive to outliers.",
    difficulty: "advanced"
  },
  {
    id: 18,
    question: "What is the purpose of the elbow method in clustering?",
    options: ["Determine the number of clusters", "Normalize data", "Reduce dimensionality", "Evaluate model accuracy"],
    correctAnswer: 0,
    explanation: "The elbow method helps identify the optimal number of clusters by plotting the explained variance.",
    difficulty: "advanced"
  },
  {
    id: 19,
    question: "Which technique is used for time series forecasting?",
    options: ["ARIMA", "Logistic Regression", "K-Means Clustering", "Naive Bayes"],
    correctAnswer: 0,
    explanation: "ARIMA models are used for analyzing and forecasting time series data.",
    difficulty: "advanced"
  },
  {
    id: 20,
    question: "What is the main assumption of linear regression?",
    options: ["Non-linearity between variables", "Independence of errors", "Multicollinearity among predictors", "Heteroscedasticity of errors"],
    correctAnswer: 1,
    explanation: "Linear regression assumes that the residuals (errors) are independent.",
    difficulty: "advanced"
  }
];
