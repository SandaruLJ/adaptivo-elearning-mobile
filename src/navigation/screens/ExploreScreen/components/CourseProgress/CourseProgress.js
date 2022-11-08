import React, { useEffect, useState } from "react";
import { ImageBackground, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { courseProgressStyles as styles } from "./CourseProgress.styles";
import { ProgressBar } from "react-native-paper";
import { colors } from "../../../../../utils/colors";
import { constants } from "../../../../../utils/constants";

const courseThumbPlaceholder = require("../../../../../../assets/course-thumb-placeholder.jpg");

export default function CourseProgress({ name, completed, total, thumbnail, navigation, id }) {
  const [progress, setProgress] = useState(0);
  const image = { uri: thumbnail };

  useEffect(() => {
    setProgress(completed / total);
  }, [completed, total]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate(constants.singleCourse, { id })}>
      <ImageBackground source={image} style={styles.container} imageStyle={styles.thumbnail}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.progress}>
          {completed}/{total} Lessons
        </Text>
        <ProgressBar progress={progress} color={colors.orange} />
      </ImageBackground>
    </TouchableOpacity>
  );
}
