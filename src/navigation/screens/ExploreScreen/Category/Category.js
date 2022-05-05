import React from "react";
import { ImageBackground, Text } from "react-native";
import { categoryStyles as styles } from "./Category.styles";

export default function Category({name, image}) {
  return (
    <ImageBackground
      source={image}
      style={styles.container}
      imageStyle={styles.image}
    >
      <Text style={styles.name}>{name}</Text>
    </ImageBackground>
  )
}