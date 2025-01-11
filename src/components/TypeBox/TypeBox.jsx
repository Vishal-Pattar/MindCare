import React, { useRef, useEffect, useCallback } from "react";
import "./TypeBox.css";
import { MdSubdirectoryArrowLeft } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import withAuthorization from "../../utils/withAuthorization";
import { Permissions } from "../../utils/roles";

const TypeBox = ({ addMessage, isResponsePending }) => {
  const textareaRef = useRef(null);

  const handleSendMessage = useCallback(() => {
    if (textareaRef.current && textareaRef.current.value.trim()) {
      addMessage(textareaRef.current.value);
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
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
        <textarea
          rows="1"
          ref={textareaRef}
          placeholder="Send a Message..."
          disabled={isResponsePending}
        ></textarea>
        <div
          className="typebox__submit"
          data-tooltip-id="typebox_submit"
          data-tooltip-content="Send Message"
          onClick={handleSendMessage}
        >
          <Tooltip id="typebox_submit" className="typebox_tooltip" />
          <MdSubdirectoryArrowLeft className="typebox__icon" />
        </div>
      </div>
      <div className="typebox__footer">
        ChatBot built by&nbsp;<span>Creative Minds</span> 
      </div>
    </div>
  );
};

export default withAuthorization(Permissions.User_Access)(TypeBox);
