import { Button, Title, Paragraph, Text, Subheading, IconButton, Caption } from "react-native-paper";
import { Tabs, TabScreen, useTabIndex, useTabNavigation } from "react-native-paper-tabs";
import { TouchableHighlight, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/colors";
import { courseTabStyles } from "./CourseTabs.styles";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { courseActions } from "../../store/course-slice";
import { setDownloadQuality } from "../../utils/smartDownloadAgent";
import { useState } from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";

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
        {/* <View style={{ backgroundColor: "black", flex: 1, height: 500 }} /> */}
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
  const curriculum = useSelector((state) => state.course.curriculum);
  const selectedUnit = useSelector((state) => state.course.selectedUnit);
  const dispatch = useDispatch();

  const [isDownloading, setIsDownloading] = useState({ section: -1, unit: -1 });

  const goTo = useTabNavigation();
  const index = useTabIndex();

  const handleUnitClick = (sectionNum, unitNum) => {
    dispatch(courseActions.setSelectedUnit({ section: sectionNum, unit: unitNum }));
  };
  const handleUnitDownload = async (section, unit) => {
    const downloadQuality = await setDownloadQuality(1000000);
    setIsDownloading({ section, unit });
  };
  return (
    <ScrollView style={{ flex: 1, flexDirection: "column", height: 800 }} nestedScrollEnabled={true}>
      {curriculum.map((section, sectionNum) => {
        return (
          <View style={style.section} key={sectionNum}>
            <View style={style.sectionHead}>
              <Subheading style={style.sectionHeading}>
                Section {sectionNum + 1}: {section.name}
              </Subheading>
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
            {section.units.map((unit, unitNum) => {
              if (sectionNum == selectedUnit.section && unitNum == selectedUnit.unit) {
                return (
                  <LinearGradient colors={["#FFD25ABF", "#FF9E4380"]} style={style.unit} useAngle={true} angle={45} angleCenter={{ x: 0.5, y: 0.5 }} key={unitNum}>
                    <Text style={{ flex: 0.2, ...style.unitText }}>{unitNum + 1}</Text>
                    <View style={{ flex: 0.7 }}>
                      <Text style={style.unitText}>{unit.name}</Text>
                      <Caption>
                        {unit.type} - {unit.type == "video" ? unit.video.duration : "02:00"} min
                      </Caption>
                    </View>

                    {unit.type != "preTest" && unit.type != "quiz" && isDownloading.unit != unitNum && (
                      <IconButton icon="download-circle-outline" style={style.sectionDownloadIcon} size={30} color={"#6B6B6B"} onPress={() => handleUnitDownload(sectionNum, unitNum)} />
                    )}
                    {isDownloading.section == sectionNum && isDownloading.unit == unitNum && (
                      <AnimatedCircularProgress size={30} style={style.downloadProgress} width={5} fill={100} tintColor="#fff" backgroundColor="#999" duration={60000} />
                    )}
                  </LinearGradient>
                );
              } else {
                return (
                  <TouchableOpacity onPress={() => handleUnitClick(sectionNum, unitNum)} key={unitNum}>
                    <View style={style.sectionBody}>
                      <View style={style.unit}>
                        <Text style={{ flex: 0.2, ...style.unitText }}>{unitNum + 1}</Text>
                        <View style={{ flex: 0.7 }}>
                          <Text style={style.unitText}>{unit.name}</Text>
                          <Caption>{unit.type} - 02:00 min</Caption>
                        </View>

                        {unit.type != "preTest" && unit.type != "quiz" && isDownloading.unit != unitNum && (
                          <IconButton icon="download-circle-outline" style={style.sectionDownloadIcon} size={30} color={"#777"} onPress={() => handleUnitDownload(sectionNum, unitNum)} />
                        )}
                        {isDownloading.section == sectionNum && isDownloading.unit == unitNum && (
                          <AnimatedCircularProgress size={30} style={style.downloadProgress} width={5} fill={100} tintColor="#ff9c3f" backgroundColor="#999" duration={60000} />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        );
      })}
    </ScrollView>
  );
}
function downloadResource() {}
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
