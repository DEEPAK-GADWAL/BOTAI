import React from "react";
import styles from "./Sidebar.module.css";
import { PiNotePencilLight } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import logo from "../../assets/image/logo.png";

const Sidebar = ({
  isSidebarOpen,
  conversations,
  onSelectConversation,
  onRemoveConversation,
}) => {
  return (
    <div
      className={`${styles.sidebar} ${
        isSidebarOpen ? styles.open : styles.closed
      }`}
    >
      <div className={styles.topSection}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <div className={styles.newChat}>
          <p>New Chat</p>
          <PiNotePencilLight />
        </div>
      </div>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span>Past Conversations</span>
        </li>
        {conversations.map((conv, index) => (
          <li
            key={index}
            className={styles.listItem}
            onClick={() => onSelectConversation(conv)}
          >
            <span>{conv.timestamp}</span>
            <button
              className={styles.deleteButton}
              onClick={(e) => {
                e.stopPropagation(); 
                onRemoveConversation(conv);
              }}
            >
              <FaTimes />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
