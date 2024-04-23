import React, { useState, useEffect } from "react";

import { Chat } from "@flyerhq/react-native-chat-ui";

// import { speak, isSpeakingAsync, stop } from "expo-speech";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import ChatBubble from "../ChatBubble";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
// import { types } from "react-native-document-picker";
const user = {
  id: "user",
};
const bot = {
  id: "model",
};
const MessageScreen = () => {
  const [messages, setMessages] = useState([]);
  const [formattedMessages, setFormattedMessages] = useState([]);
  const addMessage = (message) => {
    setMessages((prevMessages) => [message, ...prevMessages]);
  };
  const addFormattedMessages = (formattedMessage) => {
    setFormattedMessages((prevFormattedMessages) => [
      formattedMessage,
      ...prevFormattedMessages,
    ]);
  };
  const API_KEY = "AIzaSyAQNTg3qa2OVVmNro0BymWduYen6N66XWg";
  const createTrainPrompt = (userPrompt) => {
    let prompt =
      'You are a chat assistant.\nYour name is Nout and was developed by the HuyChinh team.\nYour task is to respond to user requests.\nThe request will begin with the word "Prompt".\nPrompt: ' +
      userPrompt;
    return prompt;
  };
  useEffect(() => {
    if (formattedMessages.length > 0) {
      if (formattedMessages[0].role == "user")
        getResponseFromGemini(formattedMessages);
    }
  }, [formattedMessages]);
  const getResponseFromGemini = async (prompt) => {
    try {
      console.log("Prompt: " + prompt);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // const result = await model.generateContent(prompt);
      // console.log("Result: ", result);
      // const response = result.response;
      // const modelResponse = response.text();
      let contents = prompt.map((item) => {
        // Log the item before constructing the contents
        console.log("Item:", item);
        return {
          role: item.role,
          parts: item.parts.map((part) => ({ text: part.text })),
        };
      });
      // console.log("contents: ", contents);

      // if (contents.length <= 0) {
      //   const promptMessage = "";
      //   contents = createTrainPrompt(prompt);
      //   console.log("oke");
      // }
      const result = await model.generateContent({
        contents: contents,
      });
      const response = result.response;
      const modelResponse = response.text();
      if (modelResponse) {
        console.log("Response: " + modelResponse);
        const newMessage = {
          author: bot,
          createdAt: Date.now(),
          id: uuidv4(),
          text: modelResponse,
          type: "text",
        };
        console.log("New message: " + newMessage);
        addMessage(newMessage);
        addFormattedMessages(formatMessage(newMessage));
      }
    } catch (error) {
      console.error("Error calling Gemini Pro API: ", error);
      console.error("Error response: ", error.response);
    }
  };
  const formatMessage = (message) => {
    return {
      role: message.author.id,
      parts: [{ text: message.text }],
    };
  };
  const handleSendPress = (message) => {
    try {
      const textMessage = {
        author: user,
        createdAt: Date.now(),
        id: uuidv4(),
        text: message.text,
        type: "text",
      };
      console.log(
        "Text message: " +
          textMessage.author +
          " " +
          textMessage.createdAt +
          " " +
          textMessage.text
      );

      addMessage(textMessage);
      addFormattedMessages(formatMessage(textMessage));
    } catch (error) {
      console.log(error);
      console.error(error.message);
    }
  };
  return (
    <Chat
      messages={messages}
      // onAttachmentPress={handleAttachmentPress}
      // onMessagePress={handleMessagePress}
      // onPreviewDataFetched={handlePreviewDataFetched}
      onSendPress={handleSendPress}
      user={user}
      // l10nOverride={{
      //   emptyChatPlaceholder: "Chat with Nout",
      // }}
    />
  );
};
export default MessageScreen;
