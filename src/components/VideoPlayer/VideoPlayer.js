import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Video from "react-native-video";
import { videoPlayerStyles } from "./VideoPlayer.styles";
import RNFS from "react-native-fs";

export default function VideoPlayer(props) {
  const videoPlayer = useRef();
  const style = videoPlayerStyles;
  const [url, setUrl] = useState();

  // const drm = {
  //   type: 'widevine',
  //   licenseServer:'https://drm-widevine-licensing.axprod.net/AcquireLicense',
  //   headers: {
  //     'X-AxDRM-Message':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiZTgzMTM1ODAtODc5MS00ZjczLTliNGYtYWU3ZjAwYmUyYjkxIiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsInZlcnNpb24iOjIsImxpY2Vuc2UiOnsic3RhcnRfZGF0ZXRpbWUiOiIyMDIyLTA1LTA1VDE5OjM3OjE4LjU0NFoiLCJleHBpcmF0aW9uX2RhdGV0aW1lIjoiMjAyMi0wNS0wN1QxOTozNzoxOC41NDRaIiwiYWxsb3dfcGVyc2lzdGVuY2UiOnRydWV9LCJjb250ZW50X2tleXNfc291cmNlIjp7ImlubGluZSI6W3siaWQiOiJiNDcyN2NmMy0wMGVmLTQwMmYtOTc2NS0zMzQxNmJjOWVlNmMiLCJ1c2FnZV9wb2xpY3kiOiJQb2xpY3kgQSJ9XX0sImNvbnRlbnRfa2V5X3VzYWdlX3BvbGljaWVzIjpbeyJuYW1lIjoiUG9saWN5IEEiLCJwbGF5cmVhZHkiOnsibWluX2RldmljZV9zZWN1cml0eV9sZXZlbCI6MTUwLCJwbGF5X2VuYWJsZXJzIjpbIjc4NjYyN0Q4LUMyQTYtNDRCRS04Rjg4LTA4QUUyNTVCMDFBNyJdfX1dfSwiYmVnaW5fZGF0ZSI6IjIwMjItMDUtMDVUMTk6Mzc6MTguNTQ0WiIsImV4cGlyYXRpb25fZGF0ZSI6IjIwMjItMDUtMDdUMTk6Mzc6MTguNTQ0WiJ9.gpUkc80h8iLomyQMMCeETFjdFfIl4yEU_mCPtu6oMPo',
  //   'Transfer-Encoding': 'Chunked',
  //     'Content-Type': 'application/octet-stream'
  // }}
  // https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/resources/videos/WebHD_720p_4.mp4

  useEffect(async () => {
    // let file = "/storage/emulated/0/Android/data/com.sparkcoders.elearningMobile/files/adaptivo/course/manifest.m3u8";
    // let exists = await RNFS.exists(file);
    // if (exists) {
    //   setUrl(file);
    // } else {
    // setUrl(props.src);
    // }
    setUrl(props.src);
    console.log("new url");
    // setUrl("https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/encoded/concepts/Newton'sSecondLawofMotion/cmaf/manifest.m3u8");
  }, [props.src, props.isAllDownloaded]);
  return (
    <Video
      source={{
        uri: props.src,
        // uri: "https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/resources/output/manifest.m3u8",
        // uri: "https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/encoded/concepts/ApplicationofNewtons1stLaw/manifest.m3u8",
      }} // Can be a URL or a local file.
      ref={(ref) => {
        videoPlayer.current = ref;
      }}
      controls={true}
      drm={{
        type: "widevine",
        licenseServer: "https://drm-widevine-licensing.axprod.net/AcquireLicense",
        headers: {
          "X-AxDRM-Message":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiZTgzMTM1ODAtODc5MS00ZjczLTliNGYtYWU3ZjAwYmUyYjkxIiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsInZlcnNpb24iOjIsImxpY2Vuc2UiOnsic3RhcnRfZGF0ZXRpbWUiOiIyMDIyLTA5LTE4VDA3OjIwOjU4LjkxNloiLCJleHBpcmF0aW9uX2RhdGV0aW1lIjoiMjAyMi0wOS0yMFQwNzoyMDo1OC45MTZaIiwiYWxsb3dfcGVyc2lzdGVuY2UiOnRydWV9LCJjb250ZW50X2tleXNfc291cmNlIjp7ImxpY2Vuc2VfcmVxdWVzdCI6eyJzZWVkX2lkIjoiYWJhNDc4ZjUtNjFkMy00Njk1LWI4NmMtYWU3ZjAwYmUyYjkxIiwidXNhZ2VfcG9saWN5IjoiUG9saWN5IEEifX0sImNvbnRlbnRfa2V5X3VzYWdlX3BvbGljaWVzIjpbeyJuYW1lIjoiUG9saWN5IEEiLCJwbGF5cmVhZHkiOnsibWluX2RldmljZV9zZWN1cml0eV9sZXZlbCI6MTUwLCJwbGF5X2VuYWJsZXJzIjpbIjc4NjYyN0Q4LUMyQTYtNDRCRS04Rjg4LTA4QUUyNTVCMDFBNyJdfX1dfSwiYmVnaW5fZGF0ZSI6IjIwMjItMDktMThUMDc6MjA6NTguOTE2WiIsImV4cGlyYXRpb25fZGF0ZSI6IjIwMjItMDktMjBUMDc6MjA6NTguOTE2WiJ9.9JAaRumZ2D44FqJt_WdoKvBnH1bx6ceTWT4BI2SIKXk",
          "Transfer-Encoding": "Chunked",
          "Content-Type": "application/octet-stream",
        },
      }}
      resizeMode="cover"
      onBuffer={(e) => console.log(e)}
      onError={(e) => console.log(e)}
      style={style.backgroundVideo}
    />
  );
}
