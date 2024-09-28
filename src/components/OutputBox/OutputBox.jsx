import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import WelcomeBox from "../WelcomeBox/WelcomeBox";
import "./OutputBox.css";
import img from "../../assets/logo.png";
import loading from "../../assets/loader.gif";
import Markdown from "markdown-to-jsx";
import { BsPersonCircle } from "react-icons/bs";
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
  const timeoutRef = useRef(null); // Ref for setTimeout ID

  // Word-by-word effect with stop functionality
  const runWordEffect = useCallback(() => {
    if (currentResponse && currentResponse.output) {
      const words = currentResponse.output.split(" ");
      let index = 0;
      setCurrentOutput(""); // Start with an empty output

      dispatch(startWordEffect()); // Mark the word effect as running
      const wordEffect = () => {
        if (index < words.length) {
          setCurrentOutput((prev) => prev + words[index] + " "); // Append word
          index++;
          timeoutRef.current = setTimeout(wordEffect, 150); // Recursive timeout
        } else {
          dispatch(responseRecieved()); // Word effect completed
          setCurrentOutput(currentResponse.output); // Show full output
          onStopEffect(); // Notify parent component to re-enable input field
        }
      };

      wordEffect(); // Start the recursive function
    }
  }, [currentResponse, dispatch, onStopEffect]);

  // Stop the word effect and show full response
  const handleStop = () => {
    clearTimeout(timeoutRef.current); // Clear the timeout
    setCurrentOutput(currentResponse.output); // Show full response immediately
    dispatch(responseRecieved()); // Stop word effect
    onStopEffect(); // Notify parent component to handle UI changes
  };

  useEffect(() => {
    if (currentResponse && isWordEffectRunning) {
      runWordEffect(); // Run word effect when the state indicates
    }
    return () => clearTimeout(timeoutRef.current); // Cleanup on unmount
  }, [currentResponse, isWordEffectRunning, runWordEffect]);

  // Auto-scroll to the bottom when new messages arrive
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
            <img src={img} alt="output" className="outputbox__image" />
            <div className="outputbox__textspace">{msg.prompt}</div>
          </span>
          <span>
            <BsPersonCircle className="outputbox__image" />
            <div className="outputbox__textspace outputbox__textspace_output">
              {/* Display word-by-word effect for the last message */}
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
