import React from "react";
import { ScrollView } from "react-native";
import { View } from "react-native";
import RenderHTML from "react-native-render-html";
import { NoteDisplayStyles as styles } from "./NoteDisplay.styles";

export default function NoteDisplay(props) {
  const source = {
    html: props.note,
  };
  return (
    <View style={styles.mainContainer}>
      <ScrollView nestedScrollEnabled={true}>
        <RenderHTML source={source} />
      </ScrollView>
    </View>
  );
}
