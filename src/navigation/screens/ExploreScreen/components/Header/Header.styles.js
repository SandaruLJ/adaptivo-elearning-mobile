import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const headerStyles = StyleSheet.create({
  container: {
    height: windowHeight * 25/100,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottomLeftRadius: windowWidth * 8/100,
    borderBottomRightRadius: windowWidth * 8/100,  
  },
  greetingContainer: {
    flexDirection: 'row',
    marginTop: windowWidth * 8/100,
    marginStart: windowWidth * 8/100,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginEnd: 8
  },
  subGreeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginStart: windowWidth * 8/100,
  },
  headerBackground: {
    flex: 1,
  },
  searchbar: {
    marginTop: windowHeight * 3/100,
    marginHorizontal: windowWidth * 8/100
  },
  avatar: {
    position: 'absolute',
    right: windowWidth * 8/100,
    top: windowHeight * 3/100,
    backgroundColor: 'grey',
  },
  handWave: {
      height: 32,
      width: 32
  }
});
  