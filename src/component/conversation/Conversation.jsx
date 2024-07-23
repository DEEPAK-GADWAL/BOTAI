import React, { useState, useEffect } from "react";
import styles from "./Conversation.module.css";
import {
  TextField,
  IconButton,
  Button,
  InputAdornment,
  Box,
} from "@mui/material";
import { FaTimes } from "react-icons/fa";

const Conversation = ({
  selectedQuestion,
  onClearChat,
  onSaveConversation,
  initialMessages = [],
}) => {
  const [conversation, setConversation] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    fetch("/Questions.json")
      .then((response) => response.json())
      .then((data) => setConversation(data))
      .catch((error) =>
        console.error("Error fetching conversation data:", error)
      );
  }, []);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (selectedQuestion) {
      handleAskClick(selectedQuestion);
    }
  }, [selectedQuestion]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAskClick = (question) => {
    const normalizedInput = (question || inputValue).trim().toLowerCase();
    const responseObject = conversation.find((item) =>
      item.question.toLowerCase().includes(normalizedInput)
    );

    const answer = responseObject
      ? responseObject.response
      : "Sorry, I don't understand the question.";

    const currentTime = new Date().toLocaleTimeString();

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "user",
        text: question || inputValue,
        name: "You",
        time: currentTime,
      },
      { type: "ai", text: answer, name: "Soul AI", time: currentTime },
    ]);
    setInputValue("");
  };

  const handleClearChat = () => {
    setMessages([]);
    onClearChat();
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  const handleSaveClick = () => {
    const currentTime = new Date().toLocaleString();
    onSaveConversation({ messages, timestamp: currentTime });
    handleClearChat();
  };

  return (
    <div className={styles.conversationContainer}>
      <div className={styles.conversationContent}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.type === "user" ? styles.userMessage : styles.aiMessage
            }
          >
            <div className={styles.message}>
              <div className={styles.messageHeader}>
                <span className={styles.name}>{msg.name}</span>
                <span className={styles.time}>{msg.time}</span>
              </div>
              <div className={styles.messageText}>{msg.text}</div>
            </div>
          </div>
        ))}
      </div>
      <Box className={styles.inputContainer}>
        <TextField
          className={styles.textField}
          value={inputValue}
          onChange={handleInputChange}
          variant="outlined"
          placeholder="Type your message..."
          multiline
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClearInput}>
                  <FaTimes />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          className={styles.Btn}
          variant="contained"
          onClick={() => handleAskClick(null)}
        >
          Ask
        </Button>
        <Button
          className={styles.Btn}
          variant="contained"
          onClick={handleSaveClick}
        >
          Save
        </Button>
        <Button
          className={styles.Btn}
          variant="contained"
          onClick={handleClearChat}
        >
          Clear Chat
        </Button>
      </Box>
    </div>
  );
};

export default Conversation;
