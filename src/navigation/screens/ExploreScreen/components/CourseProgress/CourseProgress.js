import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import { courseProgressStyles as styles } from "./CourseProgress.styles";
import { ProgressBar } from "react-native-paper";
import { colors } from "../../../../../utils/colors";

const courseThumbPlaceholder = require('../../../../../../assets/course-thumb-placeholder.jpg');

export default function CourseProgress({name, completed, total}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(completed / total);
  }, [completed, total])

  return (
    <ImageBackground
      source={courseThumbPlaceholder}
      style={styles.container}
      imageStyle={styles.thumbnail}
    >
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.progress}>{completed}/{total} Lessons</Text>
      <ProgressBar progress={progress} color={colors.orange}/>
    </ImageBackground>
  )
}