import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomNavigationComponent from "./src/navigation/BottomNavigation";
import MainContainer from "./src/navigation/MainContainer";

export default function App() {
  return (
    <SafeAreaProvider>
      <MainContainer />
    </SafeAreaProvider>
  );
}
