import React from "react";
import { ScrollView } from "react-native";
import { View } from "react-native";
import Pdf from "react-native-pdf";
import RenderHTML from "react-native-render-html";
import { PdfViewerStyles as styles } from "./PdfViewer.styles";

export default function PdfViewer(props) {
  const source = {
    uri: props.url,
  };
  return (
    <View style={styles.mainContainer}>
      {/* <ScrollView nestedScrollEnabled={true}> */}
      <Pdf
        trustAllCerts={false}
        source={source}
        onError={(error) => {
          console.log(error);
        }}
        style={styles.pdf}
      />
      {/* </ScrollView> */}
    </View>
  );
}
