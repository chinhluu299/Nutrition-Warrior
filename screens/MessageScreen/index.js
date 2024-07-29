import React, { useState } from "react";
import { Chat } from "@flyerhq/react-native-chat-ui";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { launchImageLibrary } from "react-native-image-picker";
import { View } from "react-native";
import Back from "../../components/Back";
import { useNavigation } from "@react-navigation/native";
import keyApi from "../../api/keyApi";

const user = {
  id: "user",
};
const bot = {
  id: "model",
};

const MessageScreen = () => {
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const navigation = useNavigation();
  const addMessage = (message) => {
    setMessages((prevMessages) => [message, ...prevMessages]);
  };

  const createTrainPrompt = (userPrompt) => {
    let prompt =
      `You are NutritionBot, an AI assistant developed by the UIT HuyChinh team.
    Your primary focus is on nutrition, fitness, and health.
    Please adhere to the following guidelines:
    1. Provide accurate, science-based information about nutrition and fitness.
    2. Offer personalized advice based on the user's goals and health status when provided.
    3. Encourage healthy eating habits and regular exercise.
    4. Avoid giving medical diagnoses or prescribing medications.
    5. If a question is outside your expertise, politely redirect the user to consult a healthcare professional.
    6. Be friendly, supportive, and motivating in your responses.
    7. When appropriate, ask follow-up questions to better understand the user's needs.
    8. Provide practical tips and easy-to-follow recommendations.
    Remember, your goal is to help users make informed decisions about their nutrition and fitness.
    The request will begin with the word "Prompt".
    Prompt: ` + userPrompt;
    return prompt;
  };

  const getResponseFromGemini = async (prompt) => {
    try {
      if (chats.length == 0) {
        const userPrompt = createTrainPrompt(prompt);
        updatedChats = [
          ...chats,
          { role: "user", parts: [{ text: userPrompt }] },
        ];
        setChats(updatedChats);
      } else {
        updatedChats = [...chats, { role: "user", parts: [{ text: prompt }] }];
        setChats(updatedChats);
      }
      let keyResponse = await keyApi.getKey();
      if (keyResponse.data.success) {
        console.log("🚀 ~ handleAnalyze ~ key:", keyResponse.data.key);
        var API_KEY = keyResponse.data.key;
      } else {
        alert("There was an error sending the message. Please try again.");
        setLoading(false);
        return;
      }
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      let contents = updatedChats.map((item) => {
        return {
          role: item.role,
          parts: item.parts.map((part) => ({ text: part.text })),
        };
      });

      const result = await model.generateContent({
        contents: contents,
      });

      const response = result.response;

      if (response && response.text) {
        const modelResponse = response.text();

        const newMessage = {
          author: bot,
          createdAt: Date.now(),
          id: uuidv4(),
          text: modelResponse,
          type: "text",
        };

        addMessage(newMessage);
      }
    } catch (error) {
      console.error("Error calling Gemini Pro API: ", error);
    }
  };

  const handleSendPress = (message) => {
    try {
      setIsTyping(true);
      const textMessage = {
        author: user,
        createdAt: Date.now(),
        id: uuidv4(),
        text: message.text,
        type: "text",
      };
      addMessage(textMessage);
      getResponseFromGemini(textMessage.text);
    } catch (error) {
      console.log(error);
      console.error(error.message);
    }
  };

  const handleImageSelection = () => {
    launchImageLibrary(
      {
        includeBase64: true,
        maxWidth: 1440,
        mediaType: "photo",
        quality: 0.7,
      },
      ({ assets }) => {
        const response = assets?.[0];

        if (response?.base64) {
          const imageMessage = {
            author: user,
            createdAt: Date.now(),
            height: response.height,
            id: uuidv4(),
            name: response.fileName ?? response.uri?.split("/").pop() ?? "🖼",
            size: response.fileSize ?? 0,
            type: "image",
            uri: `data:image/*;base64,${response.base64}`,
            width: response.width,
          };
          addMessage(imageMessage);
        }
      }
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Chat
        messages={messages}
        onSendPress={handleSendPress}
        user={user}
        // onAttachmentPress={handleImageSelection}
      />
      <Back backEvent={() => navigation.goBack()} />
    </View>
  );
};

export default MessageScreen;
