import { Project } from '@/types';

export const projects: Project[] = [
 {
  id: 'ai-pdf-intelligence',
  title: 'AI PDF Intelligence Chatbot',
  description: 'An AI-powered PDF chatbot that enables users to upload documents and interact with them through natural language conversations using Retrieval-Augmented Generation (RAG).',
  category: 'generative-ai',
  overview: 'AI PDF Intelligence is a conversational document analysis platform that allows users to upload PDF files and instantly ask questions about their content. The system processes documents using semantic search and Retrieval-Augmented Generation (RAG), ensuring responses remain grounded in the uploaded document while preventing hallucinations and cross-document memory leakage.',
  problem: 'Users often spend significant time manually searching through lengthy PDFs, project reports, resumes, research papers, and academic notes to find specific information. Traditional keyword search lacks contextual understanding and makes information retrieval inefficient.',
  solution: 'Built an intelligent RAG-based PDF chatbot using LangChain, ChromaDB, HuggingFace embeddings, and OpenRouter LLMs. The application automatically extracts document content, generates vector embeddings, performs semantic retrieval, and produces context-aware answers through a conversational interface built with Streamlit.',
  architecture: 'PDF Upload -> PyPDFLoader -> Recursive Text Splitting -> HuggingFace Embeddings -> Chroma Vector Database -> Semantic Retrieval -> Query Rewriting -> Context Construction -> OpenRouter LLM -> Streamlit Chat Interface',
  workflow: '1. User uploads a PDF document.\n2. The system extracts text using PyPDFLoader.\n3. Documents are split into overlapping chunks for optimal retrieval.\n4. HuggingFace embeddings are generated for each chunk.\n5. Chunks are stored in ChromaDB vector storage.\n6. User submits a question.\n7. Query rewriting improves retrieval for follow-up questions.\n8. Top relevant chunks are retrieved using semantic similarity search.\n9. Context-aware prompts are generated and sent to the LLM.\n10. Grounded answers are displayed in a modern chat interface.',
  dataset: 'Supports any text-based PDF document including resumes, academic notes, project reports, research papers, technical documentation, and business reports.',
  techStack: [
    'Python',
    'Streamlit',
    'LangChain',
    'ChromaDB',
    'HuggingFace Embeddings',
    'OpenRouter',
    'PyPDFLoader',
    'OpenAI SDK'
  ],
  results: 'Successfully implemented PDF-isolated conversational memory, semantic document retrieval, follow-up question handling, and grounded response generation. The chatbot can accurately summarize documents, extract key insights, answer contextual questions, and process multi-page PDFs in seconds.',
  challenges: 'Preventing memory leakage between uploaded PDFs, handling follow-up questions accurately, optimizing chunk size and overlap for retrieval quality, and ensuring the model remains strictly grounded to document content without hallucinating external information.',
  lessonsLearned: 'Retrieval quality is highly dependent on chunking strategy, semantic embeddings, and query rewriting. Proper vector store isolation is essential for preventing cross-document contamination. Well-designed prompts significantly improve grounded response generation.',
  futureImprovements: 'Add OCR support for scanned PDFs, implement source citations with page references, support multi-document conversations, integrate reranking models, enable hybrid search (BM25 + Vector Search), and add multimodal document understanding for charts and diagrams.',
  githubUrl: 'https://github.com/your-username/ai-pdf-intelligence',
  liveUrl: 'https://your-app-url.com',
  image: '/pdf-chatbot.png',
  status: 'completed',
  featured: true,
  date: '2025-06'
},
  {
    id: 'gmail-spam-classifier',
    title: 'Gmail Spam Classifier',
    description: 'A machine learning pipeline that classifies emails as spam or ham using Natural Language Processing (NLP) techniques and supervised classification models.',
    category: 'machine-learning',
    overview: 'The Gmail Spam Classifier parses incoming message payloads, cleanses text, performs tokenization and stemming, and transforms textual inputs into numerical features. It evaluates multiple machine learning classifiers to determine spam probability, optimizing for precision to prevent false positives.',
    problem: 'Email users are constantly bombarded with spam, phishing, and promotional emails. While modern clients have filters, developing custom classifiers for localized datasets or proprietary software environments remains a key challenge for developers.',
    solution: 'Designed and trained an NLP-driven classification pipeline. Preprocessed email text using NLTK (tokenization, stop-word removal, Porter Stemming). Applied TF-IDF vectorization for feature extraction. Trained Naive Bayes, Support Vector Machines, and Logistic Regression models. Developed an interactive dashboard for recruiters and users to test raw emails.',
    architecture: 'Raw Email Input -> Text Cleaning -> Stemming/Tokenization -> TF-IDF Vectorization -> Trained Classifier (Naive Bayes/SVM) -> Prediction Output -> Confidence Scoring -> UI Display.',
    workflow: '1. Text data is preprocessed to remove HTML tags, punctuation, and digits.\n2. Words are stemmed to their root form (e.g., "running" to "run").\n3. TF-IDF vectorizer builds a vocabulary and transforms text into numerical vectors.\n4. Model predicts binary classes (0: Ham, 1: Spam).\n5. Evaluates model performance using a confusion matrix, plotting ROC-AUC curves.',
    dataset: 'SMS Spam Collection and Kaggle Email Spam dataset (over 10,000 labeled entries).',
    techStack: ['Python', 'Scikit-Learn', 'NLTK', 'Pandas', 'NumPy', 'Streamlit'],
    results: 'Achieved 98.6% accuracy using a Multinomial Naive Bayes model. Precision was optimized to 99.2% to ensure legitimate emails (ham) are almost never misclassified as spam.',
    challenges: 'Handling adversarial spam (intentional typos, special characters) and balancing the trade-off between recall and precision.',
    lessonsLearned: 'Text normalization (stemming/lemmatization) is crucial. Over-fitting can occur if domain-specific terms in training data are not generalized.',
    futureImprovements: 'Deploy as an active API, integrate BERT or other transformer models for contextual classifications, and create a Chrome extension to filter emails directly in-browser.',
    githubUrl: 'https://github.com/nandanpatel/gmail-spam-classifier',
    liveUrl: 'https://github.com/nandanpatel/gmail-spam-classifier',
    image: '/mailshield-main.jpeg',
    status: 'completed',
    featured: true,
    date: '2024-08'
  },
 {
  id: 'garbage-classification',
  title: 'RecyclerAI – Smart Waste Classification System',
  description:
    'A deep learning image classification system that automatically categorizes waste into recyclable, non-recyclable, hazardous, and organic waste using Convolutional Neural Networks.',
  category: 'computer-vision',
  overview:
    'This project uses a Convolutional Neural Network (CNN) built with TensorFlow and Keras to classify waste images into different categories. The system helps improve waste segregation and supports smart recycling initiatives through automated image-based classification.',
  problem:
    'Manual waste segregation is time-consuming, inefficient, and often leads to incorrect disposal of recyclable and hazardous materials.',
  solution:
    'Developed a CNN-based image classification model using TensorFlow and Keras. Applied image preprocessing, normalization, and training techniques to accurately identify different categories of waste.',
  architecture:
    'Input Image → Image Preprocessing → Convolutional Layers → MaxPooling Layers → Flatten Layer → Dense Layers → Softmax Output → Waste Category Prediction',
  workflow:
    '1. Load and preprocess waste images.\n2. Resize and normalize images.\n3. Train CNN model on categorized waste data.\n4. Validate model performance.\n5. Predict waste category for new images.',
  dataset:
    'Garbage Classification Dataset containing images of recyclable, non-recyclable, hazardous, and organic waste categories.',
  techStack: [
    'Python',
    'TensorFlow',
    'Keras',
    'NumPy',
    'Matplotlib'
  ],
  results:
    'Successfully trained a CNN model capable of classifying waste images into multiple categories with strong validation accuracy and reliable prediction performance.',
  challenges:
    'Handling variations in image backgrounds, lighting conditions, object orientation, and similarities between certain waste categories.',
  lessonsLearned:
    'Learned CNN architecture design, image preprocessing, model training, evaluation techniques, and the importance of data augmentation for improving model generalization.',
  futureImprovements:
    'Increase dataset size, apply transfer learning models such as ResNet50 or EfficientNet, and deploy the model as a web application for real-time waste classification.',
  githubUrl:
    'https://github.com/Nandan0511/Garbage-Classification',
  liveUrl:
    'https://github.com/Nandan0511/Garbage-Classification',
  image: '/recycler-ai.png',
  status: 'completed',
  featured: true,
  date: '2025-05'
}
];
