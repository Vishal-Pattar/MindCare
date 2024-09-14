import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OutputBox from "../OutputBox/OutputBox";
import TypeBox from "../TypeBox/TypeBox";
import {
  addMessage,
  fetchChatHistory,
  responseRecieved,
} from "../../slices/messagesSlice";
import { triggerFetchCredits } from "../../hooks/useCredits";
import withAuthorization from "../../utils/withAuthorization";
import { Permissions } from "../../utils/roles";

const HomeArea = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const history = useSelector((state) => state.messages.history);
  const isWordEffectRunning = useSelector(
    (state) => state.messages.isWordEffectRunning
  );
  const [currentResponse, setCurrentResponse] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("authToken")) {
      triggerFetchCredits();
      dispatch(fetchChatHistory());
    }
  }, [dispatch]);

  const handleAddMessage = (message) => {
    dispatch(addMessage(message)).then((action) => {
      setCurrentResponse(action.payload); // Set current response
    });
  };

  const handleStop = () => {
    dispatch(responseRecieved()); // Stop word effect
    setCurrentResponse(null); // Clear current response
  };

  return (
    <>
      <TypeBox
        addMessage={handleAddMessage}
        isResponsePending={isWordEffectRunning}
        handleStop={handleStop}
      />
      <OutputBox
        messages={history.concat(messages)}
        currentResponse={currentResponse}
        onStopEffect={handleStop}
      />
    </>
  );
};

export default withAuthorization(Permissions.User_Access)(HomeArea);
