import { StyleSheet } from "react-native";

export const customScrollViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginStart: 12,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'grey',
    marginTop: -5,
    marginStart: 12,
  },
  seeAll: {
    position: 'absolute',
    right: 0,
    marginTop: 4,
    marginEnd: 12,
  },
  scrollView: {
    marginTop: 8,
    marginStart: 12
  }
});
  