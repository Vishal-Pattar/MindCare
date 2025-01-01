import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import WelcomeBox from "../WelcomeBox/WelcomeBox";
import "./OutputBox.css";
import loading from "../../assets/loader.gif";
import Markdown from "markdown-to-jsx";
import { BsPersonCircle } from "react-icons/bs";
import { RiRobot2Fill } from "react-icons/ri";
import { responseRecieved, startWordEffect } from "../../slices/messagesSlice";
import { triggerFetchCredits } from "../../hooks/useCredits";
import withAuthorization from "../../utils/withAuthorization";
import { Permissions } from "../../utils/roles";

const OutputBox = ({ messages, currentResponse, onStopEffect }) => {
  const dispatch = useDispatch();
  const isWordEffectRunning = useSelector(
    (state) => state.messages.isWordEffectRunning
  );
  const [currentOutput, setCurrentOutput] = useState("");
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  const runWordEffect = useCallback(() => {
    if (currentResponse && currentResponse.output) {
      const words = currentResponse.output.split(" ");
      let index = 0;
      setCurrentOutput("");

      dispatch(startWordEffect());
      const wordEffect = () => {
        if (index < words.length) {
          setCurrentOutput((prev) => prev + words[index] + " ");
          index++;
          timeoutRef.current = setTimeout(wordEffect, 150);
        } else {
          dispatch(responseRecieved());
          setCurrentOutput(currentResponse.output);
          onStopEffect();
        }
      };

      wordEffect();
    }
  }, [currentResponse, dispatch, onStopEffect]);

  const handleStop = () => {
    clearTimeout(timeoutRef.current);
    setCurrentOutput(currentResponse.output);
    dispatch(responseRecieved());
    onStopEffect();
  };

  useEffect(() => {
    if (currentResponse && isWordEffectRunning) {
      runWordEffect();
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentResponse, isWordEffectRunning, runWordEffect]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    triggerFetchCredits();
  }, [currentResponse]);

  return messages.length === 0 ? (
    <WelcomeBox />
  ) : (
    <div className="outputbox__container" ref={containerRef}>
      {messages.map((msg, index) => (
        <div key={index} className="outputbox__content">
          <span>
            <BsPersonCircle className="outputbox__image" />
            <div className="outputbox__textspace">{msg.prompt}</div>
          </span>
          <span>
            <RiRobot2Fill className="outputbox__image" />
            <div className="outputbox__textspace outputbox__textspace_output">
              {index === messages.length - 1 && isWordEffectRunning ? (
                <Markdown>{currentOutput}</Markdown>
              ) : msg.response === "Loading..." ? (
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
