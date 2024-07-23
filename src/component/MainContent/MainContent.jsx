import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./MainContent.module.css";
import logo from "../../assets/image/logo.png";
import Conversation from "../conversation/Conversation";
import { FaComments } from "react-icons/fa";

const MainContent = ({
  toggleSidebar,
  onSaveConversation,
  currentConversation,
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [showQuestions, setShowQuestions] = useState(true);

  useEffect(() => {
    if (currentConversation) {
      setShowQuestions(false);
    }
  }, [currentConversation]);

  const handleTypographyClick = (text) => {
    setSelectedQuestion(text);
    setShowQuestions(false);
  };

  const handleClearChat = () => {
    setShowQuestions(true);
  };

  return (
    <Box className={styles.mainContent}>
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
            <FaBars />
          </IconButton>
          <Typography variant="h6" className={styles.appbarTitle}>
            <FaComments /> Bot AI
          </Typography>
        </Toolbar>
      </AppBar>

      <Box className={styles.middleItem}>
        <Box>
          <Typography
            className={styles.midText}
            variant="h4"
            align="center"
            gutterBottom
          >
            How Can I Help You Today?
          </Typography>
        </Box>
        <Box>
          <img className={styles.logo} src={logo} alt="Soul AI Logo" />
        </Box>
      </Box>

      {showQuestions && (
        <Box className={styles.textContainer}>
          <Box className={styles.text1}>
            <Box
              className={styles.textHead}
              onClick={() => handleTypographyClick("Hi, what is the weather")}
            >
              <Typography>Hi, what is the weather</Typography>
              <Typography className={styles.AItext}>
                Get immediate AI generated response
              </Typography>
            </Box>
            <Box
              className={styles.textHead}
              onClick={() => handleTypographyClick("Hi, what is my location")}
            >
              <Typography>Hi, what is my location</Typography>
              <Typography className={styles.AItext}>
                Get immediate AI generated response
              </Typography>
            </Box>
          </Box>
          <Box className={styles.text2}>
            <Box
              className={styles.textHead}
              onClick={() =>
                handleTypographyClick("Hi, what is the temperature")
              }
            >
              <Typography>Hi, what is the temperature</Typography>
              <Typography className={styles.AItext}>
                Get immediate AI generated response
              </Typography>
            </Box>
            <Box
              className={styles.textHead}
              onClick={() => handleTypographyClick("Hi, how are you")}
            >
              <Typography>Hi, how are you</Typography>
              <Typography className={styles.AItext}>
                Get immediate AI generated response
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      <Conversation
        selectedQuestion={selectedQuestion}
        onClearChat={handleClearChat}
        onSaveConversation={onSaveConversation}
        initialMessages={
          currentConversation ? currentConversation.messages : []
        }
      />
    </Box>
  );
};

export default MainContent;
