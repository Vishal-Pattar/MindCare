import React, { useState } from "react";
import "./FAQ.css";
import faqData from "./faqData.js";
import { FaPlus, FaMinus } from "react-icons/fa6";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState([]);

  const toggleAnswer = (index) => {
    if (openIndex.includes(index)) {
      setOpenIndex(openIndex.filter((i) => i !== index));
    } else {
      setOpenIndex([...openIndex, index]);
    }
  };

  return (
    <div className="faq__container">
      <h1 className="faq__header">Frequently Asked Questions</h1>
      <div className="faq__section">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="faq__item"
            onClick={() => toggleAnswer(index)}
          >
            <div className="faq__question">
              <span>{item.question}</span>
              <span
                className={`faq__toggle-icon ${
                  openIndex.includes(index) ? "open" : ""
                }`}
              >
                {openIndex.includes(index) ? <FaMinus /> : <FaPlus />}
              </span>
            </div>
            <div
              className={`faq__answer ${
                openIndex.includes(index) ? "visible" : ""
              }`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
