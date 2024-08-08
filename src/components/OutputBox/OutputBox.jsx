import React, { useState, useEffect, useRef } from "react";
import WelcomeBox from "../WelcomeBox/WelcomeBox";
import "./OutputBox.css";
import img from "../../assets/logo.png";
import Loader from "../../assets/loader.gif";
import Markdown from "markdown-to-jsx";
import withAuthorization from "../../utils/withAuthorization";
import { Permissions } from "../../utils/roles";

const OutputBox = ({ messages }) => {
  const [showWelcomeBox, setShowWelcomeBox] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      setShowWelcomeBox(false);
    } else {
      setShowWelcomeBox(true);
    }
  }, [messages]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, displayedText]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && !lastMessage.loading && lastMessage.output) {
      const words = lastMessage.output.split(" ");
      setCurrentIndex(0);
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex < words.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(interval);
            return prevIndex;
          }
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [messages]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && !lastMessage.loading && lastMessage.output) {
      const words = lastMessage.output.split(" ");
      setDisplayedText(words.slice(0, currentIndex + 1).join(" "));
    }
  }, [currentIndex, messages]);

  const renderMessage = (msg, index) => (
    <div className="outputbox__content" key={index}>
      <span>
        <img src={img} alt="output" className="outputbox__image" />
        <div className="outputbox__textspace">{msg.user}</div>
      </span>
      <span>
        <img src={img} alt="output" className="outputbox__image" />
        <div className="outputbox__textspace outputbox__textspace_output">
          {msg.loading ? (
            <img src={Loader} alt="loading" className="loader" />
          ) : (
            <Markdown>{msg.output}</Markdown>
          )}
        </div>
      </span>
    </div>
  );

  return showWelcomeBox ? (
    <WelcomeBox />
  ) : (
    <div className="outputbox__container" ref={containerRef}>
      {messages.length > 1 &&
        renderMessage(messages[messages.length - 2], messages.length - 2)}
      {messages.length > 0 && (
        <div className="outputbox__content">
          <span>
            <img src={img} alt="output" className="outputbox__image" />
            <div className="outputbox__textspace">
              {messages[messages.length - 1].user}
            </div>
          </span>
          <span>
            <img src={img} alt="output" className="outputbox__image" />
            <div className="outputbox__textspace outputbox__textspace_output">
              {messages[messages.length - 1].loading ? (
                <img src={Loader} alt="loading" className="loader" />
              ) : (
                <Markdown>{displayedText}</Markdown>
              )}
            </div>
          </span>
        </div>
      )}
    </div>
  );
};

export default withAuthorization(Permissions.User_Access)(OutputBox);
