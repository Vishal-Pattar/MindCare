import React from "react";
import "./WelcomeBox.css";
import withAuthorization from "../../utils/withAuthorization";
import { Permissions } from "../../utils/roles";

const WelcomeBox = ({ addMessage }) => {
  const prompts = [
    "I feel lonely. Can you help?",
    "How can I stop overthinking?",
    "Why am I feeling so sad all the time?",
    "What should I do if I feel like crying all the time?",
  ];

  return (
    <div className="welcomebox__container">
      <div className="welcomebox__container--one">
        <div className="welcomebox__header">
          Welcome to Your Mental Health Companion!
        </div>
        <div className="welcomebox__content">
          <p>
            Life can sometimes feel overwhelming, and it's important to have
            someone to talk to. Our AI chatbot is here to provide support,
            guidance, and a listening ear when you need it most.
          </p>
          <p>
            Whether you're feeling anxious, stressed, or simply need to share
            your thoughts, we're here to help you navigate these emotions.
            Remember, you are not alone, and taking the first step towards
            better mental health is a commendable act.
          </p>
        </div>
      </div>
      <div className="welcomebox__container--two">
        {prompts.map((prompt, index) => (
          <div
            key={index}
            className="welcomebox__prompts"
            onClick={() => addMessage(prompt)}
          >
            {prompt}
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuthorization(Permissions.User_Access)(WelcomeBox);
