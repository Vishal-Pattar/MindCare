import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    question: "What is the purpose of this platform?",
    answer:
      "Our platform is designed to offer AI-based mental health support services to individuals suffering from issues like anxiety, depression, and other mental health conditions. It provides users with a confidential and anonymous space where they can access professional guidance and mental health resources.",
  },
  {
    question: "How does the AI system work in providing mental health support?",
    answer:
      "Our AI models are trained using mental health data from trusted sources. These AI models analyze user input and offer personalized responses, providing emotional support, relaxation techniques, or suggestions for managing mental health challenges.",
  },
  {
    question: "Is this platform a substitute for a therapist?",
    answer:
      "No, our platform is not a replacement for professional therapy. It is designed to offer support, guidance, and resources for users dealing with mental health issues. For serious conditions, we recommend seeking professional help from certified therapists or medical professionals.",
  },
  {
    question: "How do you ensure user anonymity?",
    answer:
      "We use encrypted communication protocols and do not store personal identifiers that could be traced back to individual users. All conversations are anonymized to encourage open and honest sharing, ensuring complete privacy.",
  },
  {
    question: "What kind of mental health issues does the platform address?",
    answer:
      "Our platform primarily addresses anxiety, depression, stress, and related emotional and mental health challenges. The AI system offers coping mechanisms and advice to help users manage their emotions better.",
  },
  {
    question: "How reliable is the AI in offering mental health advice?",
    answer:
      "Our AI models are trained using credible data from mental health organizations, ensuring the information provided is accurate and trustworthy. However, we advise users to consult healthcare professionals for severe cases.",
  },
  {
    question:
      "What makes your platform different from other mental health apps?",
    answer:
      "Our platform is powered by advanced AI models that deliver personalized and real-time emotional support. Additionally, we emphasize anonymity and privacy, and our credit-based system allows users to engage with the platform on their terms.",
  },
  {
    question: "How does the platform help in preventing burnout?",
    answer:
      "The platform offers stress-relief exercises, emotional support conversations, and resources designed to help users manage their workload and personal stress, reducing the risk of burnout.",
  },
  {
    question: "Can companies use this platform for their employees?",
    answer:
      "Yes, we offer B2B packages for companies looking to provide mental health support to their employees. Corporate clients can subscribe to our services through bulk packages, ensuring that employees have access to the platform s mental health resources.",
  },
  {
    question:
      "What are the main benefits of using AI for mental health support?",
    answer:
      "AI provides instant and personalized responses, allowing users to get real-time emotional support. Additionally, AI offers anonymity, which can make users more comfortable sharing sensitive information about their mental health.",
  },
  {
    question: "What kind of data is used to train the AI models?",
    answer:
      "We source our data from reputable mental health organizations such as the WHO and National Institutes of Health. The models are trained to offer responses that are scientifically accurate and empathetic to the user s situation.",
  },
  {
    question: "Can the platform be used globally?",
    answer:
      "Yes, our platform is available to users worldwide, though we are initially focusing on Indian national data to address local needs. However, our goal is to expand to a global audience with localized solutions.",
  },
  {
    question: "Does the platform offer support in multiple languages?",
    answer:
      "Currently, the platform supports English, but we are working on incorporating more regional and global languages to make it accessible to a wider audience.",
  },
  {
    question: "Are the AI models continuously updated?",
    answer:
      "Yes, our AI models are periodically updated with the latest mental health data and techniques. This ensures that users are receiving the most up-to-date advice and support.",
  },
  {
    question: "What should I do if the platform doesn t solve my issue?",
    answer:
      "If the platform doesn't meet your expectations or resolve your mental health concern, we recommend consulting a licensed therapist or healthcare provider for further assistance.",
  },
  {
    question: "What technologies are used in building this platform?",
    answer:
      "Our platform leverages cutting-edge technologies like Artificial Intelligence (AI) and Machine Learning (ML) models, including LLAMA 3.1 and Mistral, to provide personalized mental health support. We also use cloud computing to ensure scalability and seamless performance.",
  },
  {
    question: "What role does Machine Learning play in the platform?",
    answer:
      "Machine Learning (ML) helps the platform to learn and improve over time. As more users interact with the platform, the AI models can adapt and provide better recommendations based on historical interactions and feedback, thus improving the accuracy and effectiveness of support.",
  },
  {
    question: "How is user data processed and stored?",
    answer:
      "All user data is processed securely through our cloud infrastructure. We use encrypted databases to store data, and access to this information is strictly controlled. We follow data protection regulations like GDPR and HIPAA to ensure user privacy and security.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="faq__container">
      <h1 className="faq__header">Frequently Asked Questions</h1>
      {faqData.map((item, index) => (
        <div key={index} className="faq__item">
          <div className="faq__question" onClick={() => toggleAnswer(index)}>
            {item.question}
            <span
              className={`faq__toggle-icon ${
                openIndex === index ? "open" : ""
              }`}
            >
              {openIndex === index ? "▲" : "▼"}
            </span>
          </div>
          <div
            className={`faq__answer ${openIndex === index ? "visible" : ""}`}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
