import React, { useRef, useEffect, useCallback } from "react";
import "./TypeBox.css";
import { FiPlus } from "react-icons/fi";
import { MdSubdirectoryArrowLeft, MdStop } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import withAuthorization from "../../utils/withAuthorization";
import { Permissions } from "../../utils/roles";

const TypeBox = ({ addMessage, isResponsePending, handleStop }) => {
  const textareaRef = useRef(null);

  const handleSendMessage = useCallback(() => {
    if (textareaRef.current && textareaRef.current.value.trim()) {
      addMessage(textareaRef.current.value); // Trigger add message
      textareaRef.current.value = ""; // Clear the input after sending
      textareaRef.current.style.height = "auto"; // Reset textarea height
    }
  }, [addMessage]);

  useEffect(() => {
    const textarea = textareaRef.current;

    const resizeTextarea = () => {
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        if (!isResponsePending) {
          handleSendMessage();
        }
      }
    };

    if (textarea) {
      textarea.addEventListener("input", resizeTextarea);
      textarea.addEventListener("keydown", handleKeyDown);

      return () => {
        textarea.removeEventListener("input", resizeTextarea);
        textarea.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleSendMessage, isResponsePending]);

  return (
    <div className="typebox__container">
      <div className="typebox__textarea">
        <div
          className="typebox__newchat"
          data-tooltip-id="typebox_newchat"
          data-tooltip-content="New Chat"
        >
          <Tooltip id="typebox_newchat" className="typebox_tooltip" />
          <FiPlus className="typebox__icon" />
        </div>
        <textarea
          rows="1"
          ref={textareaRef}
          placeholder="Send a Message..."
          disabled={isResponsePending}
        ></textarea>
        <div
          className="typebox__submit"
          data-tooltip-id="typebox_submit"
          data-tooltip-content={isResponsePending ? "Stop" : "Send Message"}
          onClick={isResponsePending ? handleStop : handleSendMessage} // Switch between send and stop
        >
          <Tooltip id="typebox_submit" className="typebox_tooltip" />
          {isResponsePending ? (
            <MdStop className="typebox__icon" /> // Show Stop icon
          ) : (
            <MdSubdirectoryArrowLeft className="typebox__icon" /> // Show Send icon
          )}
        </div>
      </div>
      <div className="typebox__footer">
        <span>
          Open source AI chatbot built by <span>Creative Minds</span>
        </span>
      </div>
    </div>
  );
};

export default withAuthorization(Permissions.User_Access)(TypeBox);
