import { StyleSheet } from "react-native";

export const categoryStyles = StyleSheet.create({
  container: {
    height: 96,
    width: 96,
    marginTop: 2,
    marginStart: 2,
    marginEnd: 12,
    marginBottom: 4,
    elevation: 3,
    borderRadius: 12,
  },
  image: {
    borderRadius: 12,
  },
  name: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingStart: 8,
    paddingTop: 4,
    paddingBottom: 6,
    width: '100%',
    color: 'white',
    fontWeight: 'bold',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
})