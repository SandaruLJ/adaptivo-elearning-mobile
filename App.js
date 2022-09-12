import { SafeAreaProvider } from "react-native-safe-area-context";
import Amplify from "aws-amplify";
import config from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import MainContainer from "./src/navigation/MainContainer";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import store from "./src/store";
if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar />
        <MainContainer />
      </SafeAreaProvider>
    </Provider>
  );
}

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Email",
      key: "email",
      required: true,
      type: "string",
      placeholder: "Enter your email",
      displayOrder: 1,
    },
    {
      label: "Password",
      key: "password",
      required: true,
      type: "password",
      placeholder: "Enter a password",
      displayOrder: 2,
    },
    {
      label: "Given Name",
      key: "given_name",
      required: true,
      type: "string",
      placeholder: "Enter your first name",
      displayOrder: 3,
    },
    {
      label: "Family Name",
      key: "family_name",
      required: true,
      type: "string",
      placeholder: "Enter your last name",
      displayOrder: 4,
    },
    {
      label: "Phone Number",
      key: "phone_number",
      required: true,
      type: "phone_number",
      placeholder: "Enter your phone number",
      displayOrder: 5,
    },
    {
      label: "Address",
      key: "address",
      required: true,
      type: "string",
      placeholder: "Enter your address",
      displayOrder: 6,
    },
  ],
};

export default withAuthenticator(App, {
  signUpConfig: signUpConfig,
  usernameAttributes: "email",
});
