import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios.js";
import { triggerAlert } from "../context/AlertContext.js";

// Fetch chat history
export const fetchChatHistory = createAsyncThunk(
  "messages/fetchChatHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/history`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

// Add a new message
export const addMessage = createAsyncThunk(
  "messages/addMessage",
  async (userMessage, { rejectWithValue, dispatch }) => {
    const tempMessageId = Date.now(); // Temporary ID for the message

    try {
      dispatch(promptSent({ id: tempMessageId, user: userMessage })); // Immediately dispatch user message

      const response = await axios.post("/generate", {
        prompt: userMessage,
      });

      const message = {
        id: tempMessageId,
        user: userMessage,
        output: response.data.response,
      };
      return message;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    history: [],
    loading: false,
    error: null,
    isResponsePending: false,
  },
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
    promptSent: (state, action) => {
      const { id, user } = action.payload;
      state.isResponsePending = true;
      state.messages.push({ id, prompt: user, response: "Loading..." });
    },
    responseRecieved: (state) => {
      state.isResponsePending = false;
    },
    updateMessageOutput: (state, action) => {
      const { id, output } = action.payload;
      const message = state.messages.find((msg) => msg.id === id);
      if (message) {
        message.response = output;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.history = action.payload.data || [];
        state.loading = false;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        const message = state.messages.find(
          (msg) => msg.id === action.payload.id
        );
        if (message) {
          message.response = action.payload.output;
        }
        state.isResponsePending = false;
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.error = action.payload;
        state.isResponsePending = false;

        const tempMessage = state.messages.find(
          (msg) => msg.response === "Loading..."
        );
        if (tempMessage) {
          tempMessage.response = "";
        }

        triggerAlert(action.payload, "error", "bottom_right");
      });
  },
});

export const {
  clearMessages,
  promptSent,
  responseRecieved,
  updateMessageOutput,
} = messagesSlice.actions;

export default messagesSlice.reducer;
