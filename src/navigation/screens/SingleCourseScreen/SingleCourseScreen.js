import React, { useEffect, useRef, useState } from "react";
import { Text, Platform, PermissionsAndroid, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Video from "react-native-video";
import { View } from "react-native";
import { singleCourseScreenStyles } from "./SingleCourseScreen.style";
import { Caption, Colors, Headline, IconButton, Subheading, Title } from "react-native-paper";

import { Tabs, TabScreen } from "react-native-paper-tabs";

import CourseTabs from "../../../components/CustomTabs/CourseTabs";
import BottomNavigation from "../../BottomNavigation";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import ReactNativeBlobUtil from "react-native-blob-util";
import { getCourseById } from "../../../services/course.service";
import { useDispatch, useSelector } from "react-redux";
import { courseActions } from "../../../store/course-slice";
import { getUserCourseById } from "../../../services/usercourse.service";
import { checkFreeStorage, setDownloadQuality } from "../../../utils/smartDownloadAgent";
import { colors } from "../../../utils/colors";

export default function SingleCourseScreen({ navigation }) {
  const style = singleCourseScreenStyles;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const type = useSelector((state) => state.course.contentType);
  const body = useSelector((state) => state.course.contentBody);
  const selectedUnitName = useSelector((state) => state.course.selectedUnitName);
  const courseName = useSelector((state) => state.course.courseName);

  const [isAllDownloaded, setIsAllDownloaded] = useState(false);
  const filesToDownload = [
    "manifest.m3u8",
    "manifest.mpd",
    "audio-en.m3u8",
    "audio-en-audio-en-mp4a.mp4",
    "video-H264-640-1200k.m3u8",
    "video-H264-640-1200k-video-avc1.mp4",
    "video-H264-640-1200k_iframes.m3u8",
  ];

  const getData = async () => {
    //Fetches the data from the db
    const response = await getUserCourseById("632321a83d306c8028f4e711");
    setIsLoading(true);
    setData(response);
    dispatch(courseActions.setCourseName(response.title));
    dispatch(courseActions.setCurriculum([...response.learningPath]));

    dispatch(courseActions.setSelectedUnit({ section: 0, unit: 0 }));
    dispatch(courseActions.setNextUnit());
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const checkPermission = async () => {
    console.log("Check Permission");
    if (Platform.OS === "ios") {
      downloadFile();
    } else if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
          title: "Storage Permission Required",
          message: "Application needs access to your storage to download File",
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log("Storage Permission Granted.");
        } else {
          // If permission denied then show alert
          Alert.alert("Error", "Storage Permission Not Granted");
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };
  // https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4
  const downloadFile = async () => {
    const path = ReactNativeBlobUtil.fs.dirs.SDCardDir;

    setDownloadQuality(1000000);
    // filesToDownload.map((fileName) => {
    ReactNativeBlobUtil.config({
      addAndroidDownloads: {
        useDownloadManager: true, // <-- this is the only thing required
        // Optional, override notification setting (default to true)
        notification: false,
        // Optional, but recommended since android DownloadManager will fail when
        // the url does not contains a file extension, by default the mime type will be text/plain
        mime: "video/mp4",
        description: "File downloaded by download manager.",
        path: path + `/adaptivo/course/${fileName}`,
      },
    })
      .fetch("GET", `https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/resources/output/cmaf/${fileName}`)
      .progress({ count: 10 }, (received, total) => {
        console.log(received);
        console.log(total);
        console.log("progress", received / total);
      })
      .then((resp) => {
        // the path of downloaded file
        console.log("Downloaded");
        console.log(resp.path());
        resp.path();
        setIsAllDownloaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
    // });
  };

  return isLoading ? (
    <View style={style.loadingContainer}>
      <ActivityIndicator size="large" color={colors.orange} />
    </View>
  ) : (
    <SafeAreaView style={style.container}>
      <ScrollView style={{ flex: 1, flexDirection: "column" }} nestedScrollEnabled={true}>
        <View style={{ height: 700 }}>
          {(type == "video" || type == "realExampleVideo" || type == "additionalVideo") && <VideoPlayer src={body} isAllDownloaded={isAllDownloaded} />}

          {data && (
            <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start" }}>
              <View style={style.courseDetails}>
                <View style={{ flex: 0.8 }}>
                  <Title>{selectedUnitName}</Title>
                  <Caption>{courseName}</Caption>
                </View>
                <View style={{ flex: 0.4, flexDirection: "row" }}>
                  <IconButton icon="bookmark-outline" style={style.courseDetailIcon} size={32} onPress={() => console.log("Pressed")} />
                  <IconButton icon="download" size={32} onPress={() => checkPermission()} />
                </View>
              </View>
              <CourseTabs curriculum={data.learningPath} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
