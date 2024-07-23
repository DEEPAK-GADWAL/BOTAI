

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import MainContent from "../MainContent/MainContent";
import styles from "./ChatLayout.module.css";

const ChatLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [savedConversations, setSavedConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);

  useEffect(() => {
    const savedConvos = JSON.parse(localStorage.getItem("conversations")) || [];
    setSavedConversations(savedConvos);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSaveConversation = (conversation) => {
    const updatedConversations = [...savedConversations, conversation];
    setSavedConversations(updatedConversations);
    localStorage.setItem("conversations", JSON.stringify(updatedConversations));
  };

  const handleSelectConversation = (conversation) => {
    setCurrentConversation(conversation);
  };

  const handleRemoveConversation = (conversation) => {
    // Remove from state
    const updatedConversations = savedConversations.filter(
      (c) => c !== conversation
    );
    setSavedConversations(updatedConversations);

    // Update localStorage
    localStorage.setItem("conversations", JSON.stringify(updatedConversations));
  };

  return (
    <Box className={styles.container}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        conversations={savedConversations}
        onSelectConversation={handleSelectConversation}
        onRemoveConversation={handleRemoveConversation}
      />
      <MainContent
        toggleSidebar={toggleSidebar}
        onSaveConversation={handleSaveConversation}
        currentConversation={currentConversation}
      />
    </Box>
  );
};

export default ChatLayout;
