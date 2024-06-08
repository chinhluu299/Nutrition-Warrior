// src/YouTubePlayer.js
import React, { useState, useCallback } from "react";
import { View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const YouTubePlayer = ({ videoId }) => {
  const [playing, setPlaying] = useState(false);

  const changeState = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <YoutubePlayer
        height={"100%"}
        width={"100%"}
        
        play={playing}
        videoId={videoId}
        onChangeState={changeState}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   
  },
});

export default YouTubePlayer;
