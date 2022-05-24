import React, { useRef } from "react";
import { Text,Platform,PermissionsAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Video from "react-native-video";
import { View } from "react-native";
import { singleCourseScreenStyles } from "./SingleCourseScreen.style";
import { Caption, Colors, Headline, IconButton, Subheading, Title } from "react-native-paper";

import { Tabs, TabScreen } from "react-native-paper-tabs";

import CourseTabs from "../../../components/CustomTabs/CourseTabs";
import BottomNavigation from "../../BottomNavigation";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import ReactNativeBlobUtil from 'react-native-blob-util'

export default function SingleCourseScreen({ navigation }) {
  const style = singleCourseScreenStyles;

  const checkPermission = async () => {
    console.log('Check Permission');
    if(Platform.OS === 'ios'){
      downloadFile();
    }else if(Platform.OS === "android"){
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error','Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++"+err);
      }
    }
  }
  
  const downloadFile = async () => {

    const path = ReactNativeBlobUtil.fs.dirs.SDCardDir;
    
    console.log("downloadFile")
    ReactNativeBlobUtil
    .config({
        addAndroidDownloads : {
            useDownloadManager : true, // <-- this is the only thing required
            // Optional, override notification setting (default to true)
            notification : false,
            // Optional, but recommended since android DownloadManager will fail when
            // the url does not contains a file extension, by default the mime type will be text/plain
            mime : 'video/mp4',
            description : 'File downloaded by download manager.', 
            path: path+'/adaptivo/sample-mp4-file.mp4'
        },
        
    })
    .fetch('GET', 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4')
    .progress({count: 10}, (received, total) => {
      console.log('progress', received / total)
  })
    .then((resp) => {
      // the path of downloaded file
      console.log("Downloaded")
      console.log(resp.path())
      resp.path()
    })
    .catch((err)=>{a
      console.log(err);
    })
  }

  
  return (
    <SafeAreaView style={style.container}>
     <VideoPlayer/>
      <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start" }}>
        <View style={style.courseDetails}>
          <View style={{ flex: 0.8 }}>
            <Title>Newtons' law</Title>
            <Caption>Grade 10 Science</Caption>
          </View>
          <View style={{ flex: 0.4, flexDirection: "row" }}>
            <IconButton icon="bookmark-outline" size={34} onPress={() => console.log("Pressed")} />
            <IconButton icon="download" size={34} onPress={() => checkPermission()} />
          </View>
        </View>
        <CourseTabs />
      </View>
    </SafeAreaView>
  );
}
