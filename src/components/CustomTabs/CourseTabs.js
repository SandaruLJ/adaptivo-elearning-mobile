import { Button, Title, Paragraph, Text, Subheading, IconButton, Caption } from "react-native-paper";
import { Tabs, TabScreen, useTabIndex, useTabNavigation } from "react-native-paper-tabs";
import { View } from "react-native";
import { colors } from "../../utils/colors";
import { courseTabStyles } from "./CourseTabs.styles";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native";

export default function CourseTabs() {
  const style = courseTabStyles;
  return (
    <Tabs
      style={{ backgroundColor: "#fff" }}
      theme={{ colors: { primary: colors.orange } }}
      // defaultIndex={0} // default = 0
      // uppercase={false} // true/false | default=true | labels are uppercase
      // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
      // iconPosition // leading, top | default=leading
      // style={{ backgroundColor:'#fff' }} // works the same as AppBar in react-native-paper
      // dark={false} // works the same as AppBar in react-native-paper
      // theme={} // works the same as AppBar in react-native-paper
      mode="scrollable" // fixed, scrollable | default=fixed
      // onChangeIndex={(newIndex) => {}} // react on index change
      showLeadingSpace={false} //  (default=true) show leading space in scrollable tabs inside the header
      // disableSwipe={false} // (default=false) disable swipe to left/right gestures
    >
      <TabScreen label="Lessons">
        <LessonsTab />
      </TabScreen>
      <TabScreen label="Materials">
        <MaterialsTab />
      </TabScreen>
      <TabScreen label="Concepts">
        <ConceptsTab />
      </TabScreen>
      <TabScreen label=" Q & A">
        <View style={{ backgroundColor: "black", flex: 1 }} />
      </TabScreen>
    </Tabs>
  );
}

function LessonsTab() {
  const style = courseTabStyles;

  const goTo = useTabNavigation();
  const index = useTabIndex();
  return (
    <ScrollView>
      <View style={style.section}>
        <View style={style.sectionHead}>
          <Subheading style={style.sectionHeading}>Section 01: Force</Subheading>
          <IconButton icon="download" style={style.sectionDownloadIcon} size={24} color={"#777"} />
        </View>

        <LinearGradient colors={["#FFD25ABF", "#FF9E4380"]} style={style.unit} useAngle={true} angle={45} angleCenter={{ x: 0.5, y: 0.5 }}>
          <Text style={{ flex: 0.2, ...style.unitText }}>01</Text>
          <View style={{ flex: 0.7 }}>
            <Text style={style.unitText}>Introduction to Force</Text>
            <Caption>Video - 02:00 min</Caption>
          </View>
          <IconButton icon="download-circle-outline" style={style.sectionDownloadIcon} size={30} color={"#6B6B6B"} />
        </LinearGradient>
        <View style={style.sectionBody}>
          <View style={style.unit}>
            <Text style={{ flex: 0.2, ...style.unitText }}>01</Text>
            <View style={{ flex: 0.7 }}>
              <Text style={style.unitText}>Introduction to Force</Text>
              <Caption>Video - 02:00 min</Caption>
            </View>
            <IconButton icon="download-circle-outline" style={style.sectionDownloadIcon} size={30} color={"#777"} />
          </View>
        </View>
        <View style={style.sectionBody}>
          <View style={style.unit}>
            <Text style={{ flex: 0.2, ...style.unitText }}>01</Text>
            <Text style={{ flex: 0.7, ...style.unitText }}>Introduction to Force</Text>
            <IconButton icon="download-circle-outline" style={style.sectionDownloadIcon} size={30} color={"#777"} />
          </View>
        </View>
        <View style={style.sectionBody}>
          <View style={style.unit}>
            <Text style={{ flex: 0.2, ...style.unitText }}>01</Text>
            <Text style={{ flex: 0.7, ...style.unitText }}>Introduction to Force</Text>
            <IconButton icon="download-circle-outline" style={style.sectionDownloadIcon} size={30} color={"#777"} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
function MaterialsTab() {
  const style = courseTabStyles;

  const goTo = useTabNavigation();
  const index = useTabIndex();
  return (
    <ScrollView>
      <View style={style.section}>
        <View style={style.sectionHead}>
          <Subheading style={style.sectionHeading}>Section 01: Force</Subheading>
          <IconButton icon="download" style={style.sectionDownloadIcon} size={24} color={"#777"} />
        </View>

        {/* <LinearGradient colors={["#FFD25ABF", "#FF9E4380"]} style={style.unit} useAngle={true} angle={45} angleCenter={{ x: 0.5, y: 0.5 }}>
          <Text style={{ flex: 0.2, ...style.unitText }}>01</Text>
          <View style={{ flex: 0.7 }}>
            <Text style={style.unitText}>Introduction to Force</Text>
            <Caption>Video - 02:00 min</Caption>
          </View>
          <IconButton icon="download-circle-outline" style={style.sectionDownloadIcon} size={30} color={"#6B6B6B"} />
        </LinearGradient> */}
        <View style={style.sectionBody}>
          <View style={style.unit}>
            <Text style={{ flex: 0.2, ...style.unitText }}>01</Text>
            <View style={{ flex: 0.7 }}>
              <Text style={style.unitText}>Unit 01</Text>
              <Caption>PDF - 10 mb</Caption>
            </View>
            <IconButton icon="download-circle-outline" style={style.sectionDownloadIcon} size={30} color={"#777"} />
          </View>
          <LinearGradient colors={["#FFD25ABF", "#FF9E4380"]} style={style.unit} useAngle={true} angle={45} angleCenter={{ x: 0.5, y: 0.5 }}>
            <Text style={{ flex: 0.2, ...style.unitText }}>02</Text>
            <View style={{ flex: 0.7 }}>
              <Text style={style.unitText}>Unit 02</Text>
              <Caption>Pptx - 15 mb</Caption>
            </View>
            <IconButton icon="download-circle-outline" style={style.sectionDownloadIcon} size={30} color={"#777"} />
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
}

function ConceptsTab() {
  const style = courseTabStyles;

  const goTo = useTabNavigation();
  const index = useTabIndex();
  return (
    <ScrollView>
      <View style={style.section}>
        <View style={style.sectionHead}>
          <Subheading style={style.sectionHeading}>Section 01: Force</Subheading>
        </View>
        <View style={style.sectionBody}>
          <Text style={style.conceptHeading}>01. What is force?</Text>
          <Text style={style.conceptBody}>It is a push or pull on an object that produces acceleration in the body on which it acts. S.I. unit of force is Newton.</Text>
        </View>
        <View style={style.sectionBody}>
          <Text style={style.conceptHeading}>02. What is Accelaration?</Text>
          <Text style={style.conceptBody}>The rate of change of velocity per unit of time</Text>
        </View>
      </View>
    </ScrollView>
  );
}
