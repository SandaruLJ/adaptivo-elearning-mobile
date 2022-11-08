import React from "react";
import { Image, Text, View } from "react-native";
import { courseDetailsStyles as styles } from "./CourseDetails.styles";
import { AntDesign, FontAwesome, Octicons } from "react-native-vector-icons";

const courseDetailsThumbPlaceholder = require("../../../../../../assets/course-details-thumb-placeholder.jpg");

export default function CourseDetails({ name, category, instructor, totalLessons, duration, price, rating, favourite, thumbnail }) {
  return (
    <View style={styles.container}>
      <Image source={thumbnail} style={styles.image} />
      <View style={styles.detailsWrapper}>
        <View style={styles.categoryFavourite}>
          <Text style={styles.category}>{category}</Text>
          <AntDesign name={favourite ? "heart" : "hearto"} color={favourite ? "crimson" : "darkgrey"} style={styles.favourite} />
        </View>

        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>
        <Text numberOfLines={1} style={styles.instructor}>
          {instructor}
        </Text>

        <View style={styles.lessonsDuration}>
          <FontAwesome name="list-alt" style={styles.lessonsIcon} />
          <Text style={styles.lessons}>{totalLessons} Lessons</Text>
          <Octicons name="clock" style={styles.durationIcon} />
          <Text style={styles.duration}>{duration} Hours</Text>
        </View>

        <View style={styles.ratingPrice}>
          <View style={styles.ratingWrapper}>
            <FontAwesome name="star" color="#fec106" style={styles.ratingIcon} />
            <Text style={styles.rating}>{rating}</Text>
          </View>
          <Text style={styles.price}>Rs. {price}</Text>
        </View>
      </View>
    </View>
  );
}
