import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OutputBox from "../OutputBox/OutputBox";
import TypeBox from "../TypeBox/TypeBox";
import {
  addMessage,
  fetchChatHistory,
  clearMessages,
} from "../../slices/messagesSlice";
import { triggerFetchCredits } from "../../hooks/useCredits";
import withAuthorization from "../../utils/withAuthorization";
import { Permissions } from "../../utils/roles";

const HomeArea = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const history = useSelector((state) => state.messages.history);
  const [currentResponse, setCurrentResponse] = useState(null);

  useEffect(() => {
    dispatch(clearMessages());
    if (sessionStorage.getItem("authToken")) {
      triggerFetchCredits();
      dispatch(fetchChatHistory());
    }
  }, [dispatch]);

  const handleAddMessage = (message) => {
    dispatch(addMessage(message)).then((action) => {
      setCurrentResponse(action.payload);
    });
  };

  return (
    <>
      <TypeBox addMessage={handleAddMessage} isResponsePending={false} />
      <OutputBox
        messages={history.concat(messages)}
        currentResponse={currentResponse}
        addMessage={handleAddMessage}
      />
    </>
  );
};

export default withAuthorization(Permissions.User_Access)(HomeArea);
