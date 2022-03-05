import { SafeAreaProvider } from "react-native-safe-area-context";
import MainContainer from "./src/navigation/MainContainer";

export default function App() {
  return (
    <SafeAreaProvider>
      <MainContainer />
    </SafeAreaProvider>
  );
}
