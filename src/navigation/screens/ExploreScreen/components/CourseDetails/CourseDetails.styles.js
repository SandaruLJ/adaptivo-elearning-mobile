import { StyleSheet } from "react-native";

export const courseDetailsStyles = StyleSheet.create({
  container: {
    borderRadius: 20,
    flex: 1,
    width: 196,
    backgroundColor: 'white',
    elevation: 3,
    marginTop: 2,
    marginStart: 2,
    marginEnd: 12,
    marginBottom: 4,
  },
  image: {
    height: 128,
    width: 196,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  detailsWrapper: {
    padding: 6
  },
  category: {
    color: 'darkgrey',
    fontWeight: 'bold',
  },
  favourite: {
    fontSize: 18
  },
  categoryFavourite: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  instructor: {
    color: 'grey'
  },
  lessons: {
    fontSize: 12,
    marginEnd: 8,
  },
  lessonsIcon: {
    alignSelf: 'center',
    fontSize: 14,
    marginEnd: 4,
  },
  duration: {
    fontSize: 12,
  },
  durationIcon: {
    alignSelf: 'center',
    fontSize: 14,
    marginEnd: 4,
  },
  lessonsDuration: {
    flexDirection: 'row',
    marginTop: 4
  },
  rating: {
    fontSize: 12,
    alignSelf: 'center',
  },
  ratingIcon: {
    alignSelf: 'center',
    fontSize: 14,
    marginEnd: 4
  },
  ratingWrapper: {
    flexDirection: 'row',
  },
  price: {
    fontWeight: 'bold',
  },
  ratingPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 2,
  }
});
