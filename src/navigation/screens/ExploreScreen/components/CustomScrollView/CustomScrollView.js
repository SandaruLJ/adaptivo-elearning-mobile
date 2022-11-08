import { Auth } from "aws-amplify";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { getAllCoursesByUserId } from "../../../../../services/usercourse.service";
import Category from "../../Category/Category";
import CourseDetails from "../CourseDetails/CourseDetails";
import CourseProgress from "../CourseProgress/CourseProgress";
import { customScrollViewStyles as styles } from "./CustomScrollView.styles";

const mathImage = require("../../../../../../assets/math.png");
const scienceImage = require("../../../../../../assets/science.png");
const itImage = require("../../../../../../assets/it.jpg");
const englishImage = require("../../../../../../assets/english.jpg");
const musicImage = require("../../../../../../assets/music.jpg");
const MathsCourseImage = require("../../../../../../assets/images/math-background.jpg");
const ScienceCourseImage = require("../../../../../../assets/course-thumb-placeholder.jpg");

const categories = [
  { name: "Math", image: mathImage },
  { name: "Science", image: scienceImage },
  { name: "IT", image: itImage },
  { name: "English", image: englishImage },
  { name: "Music", image: musicImage },
];

export default function CustomScrollView({ title, subtitle, type, navigation }) {
  const [ongoingCourses, setOngoingCourses] = useState([]);

  const getOngoingCourses = async (email) => {
    const response = await getAllCoursesByUserId(email);
    setOngoingCourses(response);
  };
  useEffect(() => {
    Auth.currentAuthenticatedUser().then((data) => {
      getOngoingCourses(data.attributes.email);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <Text style={styles.seeAll}>See All</Text>
      <ScrollView style={styles.scrollView} horizontal showsHorizontalScrollIndicator={false}>
        {type === "course-progress" && (
          <>
            {ongoingCourses.map((course) => (
              <CourseProgress
                key={course._id}
                id={course._id}
                name={course.courseId.title}
                completed={2}
                total={course.learningPath[0].units.length + course.learningPath[1].units.length}
                thumbnail={course.courseId.thumbnail.url}
                navigation={navigation}
              />
            ))}
          </>
        )}

        {type === "course-details" && (
          <>
            <CourseDetails name="Grade 10 Maths" category="Math" instructor="Mr. Chandana Jayasinghe" totalLessons={64} duration={240} price={2000.0} rating={4.3} thumbnail={MathsCourseImage} />
            <CourseDetails
              name="Grade 10 Science"
              category="Science"
              instructor="Mr. Chandana Jayasinghe"
              totalLessons={56}
              duration={218}
              price={2200.0}
              rating={4.4}
              thumbnail={ScienceCourseImage}
            />
          </>
        )}

        {type === "categories" && (
          <>
            {categories.map((category, index) => (
              <Category key={index} name={category.name} image={category.image} />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}
