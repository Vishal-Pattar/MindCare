import React, { useEffect, useRef } from "react";
import WelcomeBox from "../WelcomeBox/WelcomeBox";
import "./OutputBox.css";
import loading from "../../assets/loader.gif";
import Markdown from "markdown-to-jsx";
import { BsPersonCircle } from "react-icons/bs";
import { RiRobot2Fill } from "react-icons/ri";
import { triggerFetchCredits } from "../../hooks/useCredits";
import withAuthorization from "../../utils/withAuthorization";
import { Permissions } from "../../utils/roles";

const OutputBox = ({ messages, currentResponse, addMessage }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    triggerFetchCredits();
  }, [currentResponse]);

  return messages.length === 0 ? (
    <WelcomeBox addMessage={addMessage} />
  ) : (
    <div className="outputbox__container" ref={containerRef}>
      {messages.map((msg, index) => (
        <div key={index} className="outputbox__content">
          <span className="outputbox__pr">
            <BsPersonCircle className="outputbox__image" />
            <div className="outputbox__textspace">{msg.prompt}</div>
          </span>
          <span className="outputbox__pr">
            <RiRobot2Fill className="outputbox__image" />
            <div className="outputbox__textspace outputbox__textspace_output">
              {msg.response === "Loading..." ? (
                <img src={loading} alt="loading" className="loader" />
              ) : (
                <Markdown>{msg.response}</Markdown>
              )}
            </div>
          </span>
        </div>
      ))}
    </div>
  );
};

export default withAuthorization(Permissions.User_Access)(OutputBox);
