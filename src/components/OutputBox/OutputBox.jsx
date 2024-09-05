import React, { useState, useEffect, useRef } from "react";
import WelcomeBox from "../WelcomeBox/WelcomeBox";
import "./OutputBox.css";
import img from "../../assets/logo.png";
import Loader from "../../assets/loader.gif";
import Markdown from "markdown-to-jsx";
import withAuthorization from "../../utils/withAuthorization";
import { Permissions } from "../../utils/roles";
import { BsPersonCircle } from "react-icons/bs";

const OutputBox = ({ messages }) => {
  const [showWelcomeBox, setShowWelcomeBox] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    setShowWelcomeBox(messages.length === 0);
  }, [messages]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, displayedText]);

  useEffect(() => {
    if (messages.length > 0) {
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
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && !lastMessage.loading && lastMessage.output) {
        const words = lastMessage.output.split(" ");
        setDisplayedText(words.slice(0, currentIndex + 1).join(" "));
      }
    }
  }, [currentIndex, messages]);

  const MessageItem = ({ msg, isLast }) => (
    <div className="outputbox__content">
      <span>
        <img src={img} alt="output" className="outputbox__image" />
        <div className="outputbox__textspace">{msg.user}</div>
      </span>
      <span>
        <BsPersonCircle className="outputbox__image" />
        <div className="outputbox__textspace outputbox__textspace_output">
          {msg.loading ? (
            <img src={Loader} alt="loading" className="loader" />
          ) : (
            <Markdown>{isLast ? displayedText : msg.output}</Markdown>
          )}
        </div>
      </span>
    </div>
  );

  return showWelcomeBox ? (
    <WelcomeBox />
  ) : (
    <div className="outputbox__container" ref={containerRef}>
      {messages.slice(-2).map((msg, index) => (
        <MessageItem
          key={index}
          msg={msg}
          isLast={index === messages.length - 1}
        />
      ))}
    </div>
  );
};

export default withAuthorization(Permissions.User_Access)(OutputBox);
