import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Category from '../Category/Category';
import CourseDetails from '../CourseDetails/CourseDetails';
import CourseProgress from '../CourseProgress/CourseProgress';
import { customScrollViewStyles as styles } from './CustomScrollView.styles';

const mathImage = require('../../../../../../assets/math.png');
const scienceImage = require('../../../../../../assets/science.png');
const itImage = require('../../../../../../assets/it.jpg');
const englishImage = require('../../../../../../assets/english.jpg');
const musicImage = require('../../../../../../assets/music.jpg');

const categories = [
  { name: 'Math', image: mathImage },
  { name: 'Science', image: scienceImage },
  { name: 'IT', image: itImage },
  { name: 'English', image: englishImage },
  { name: 'Music', image: musicImage },
];

export default function CustomScrollView({title, subtitle, type}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <Text style={styles.seeAll}>See All</Text>
      <ScrollView
        style={styles.scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {type === 'course-progress' &&
        <>
          <CourseProgress name="Grade 10 Science" completed={25} total={30} />
          <CourseProgress name="Grade 11 Science" completed={8} total={23} />
          <CourseProgress name="Grade 9 Science" completed={10} total={17} />
        </>
        }
        
        {type === 'course-details' &&
        <>
          <CourseDetails
            name="Grade 10 Math Local Syllabus"
            category="Math"
            instructor="Mr. Chandana Jayasinghe"
            totalLessons={64}
            duration={240}
            price={2000.00}
            rating={4.3}
          />
          <CourseDetails
            name="Grade 11 Math Local Syllabus"
            category="Math"
            instructor="Mr. Chandana Jayasinghe"
            totalLessons={56}
            duration={218}
            price={2200.00}
            rating={4.4}
          />
          <CourseDetails
            name="Grade 9 Math Local Syllabus"
            category="Math"
            instructor="Mr. Chandana Jayasinghe"
            totalLessons={33}
            duration={162}
            price={1400.00}
            rating={4.1}
          />
        </>
        }

        {type === 'categories' &&
        <>
          {categories.map((category, index) => (
            <Category key={index} name={category.name} image={category.image} />  
          ))}
        </>
        }
      </ScrollView>
    </View>
  );
}
