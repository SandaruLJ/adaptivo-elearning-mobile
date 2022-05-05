import { StyleSheet } from "react-native";

export const courseProgressStyles = StyleSheet.create({
  container: {
    height: 128,
    width: 196,
    marginEnd: 12,
  },
  thumbnail: {
    borderRadius: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 4,
    paddingStart: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  progress: {
    fontSize: 14,
    color: 'white',
    paddingTop: -2,
    paddingStart: 12,
    paddingBottom: 6,
    textShadowColor: '#000',
    textShadowRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  }
});
