import React, { useRef } from "react";
import Video from "react-native-video";
import { videoPlayerStyles } from "./VideoPlayer.styles";

export default function VideoPlayer(props) {
  const videoPlayer = useRef();
  const style = videoPlayerStyles;
  // const drm = {
  //   type: 'widevine',
  //   licenseServer:'https://drm-widevine-licensing.axprod.net/AcquireLicense',
  //   headers: {
  //     'X-AxDRM-Message':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiZTgzMTM1ODAtODc5MS00ZjczLTliNGYtYWU3ZjAwYmUyYjkxIiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsInZlcnNpb24iOjIsImxpY2Vuc2UiOnsic3RhcnRfZGF0ZXRpbWUiOiIyMDIyLTA1LTA1VDE5OjM3OjE4LjU0NFoiLCJleHBpcmF0aW9uX2RhdGV0aW1lIjoiMjAyMi0wNS0wN1QxOTozNzoxOC41NDRaIiwiYWxsb3dfcGVyc2lzdGVuY2UiOnRydWV9LCJjb250ZW50X2tleXNfc291cmNlIjp7ImlubGluZSI6W3siaWQiOiJiNDcyN2NmMy0wMGVmLTQwMmYtOTc2NS0zMzQxNmJjOWVlNmMiLCJ1c2FnZV9wb2xpY3kiOiJQb2xpY3kgQSJ9XX0sImNvbnRlbnRfa2V5X3VzYWdlX3BvbGljaWVzIjpbeyJuYW1lIjoiUG9saWN5IEEiLCJwbGF5cmVhZHkiOnsibWluX2RldmljZV9zZWN1cml0eV9sZXZlbCI6MTUwLCJwbGF5X2VuYWJsZXJzIjpbIjc4NjYyN0Q4LUMyQTYtNDRCRS04Rjg4LTA4QUUyNTVCMDFBNyJdfX1dfSwiYmVnaW5fZGF0ZSI6IjIwMjItMDUtMDVUMTk6Mzc6MTguNTQ0WiIsImV4cGlyYXRpb25fZGF0ZSI6IjIwMjItMDUtMDdUMTk6Mzc6MTguNTQ0WiJ9.gpUkc80h8iLomyQMMCeETFjdFfIl4yEU_mCPtu6oMPo',
  //   'Transfer-Encoding': 'Chunked',
  //     'Content-Type': 'application/octet-stream'
  // }}
  // https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/resources/videos/WebHD_720p_4.mp4
  return (
    <Video
      source={{
        // uri: props.src,
        // uri: "https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/resources/output/manifest.m3u8",
        uri: "/storage/emulated/0/Android/data/com.sparkcoders.elearningMobile/files/adaptivo/course/manifest.m3u8",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiZTgzMTM1ODAtODc5MS00ZjczLTliNGYtYWU3ZjAwYmUyYjkxIiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsInZlcnNpb24iOjIsImxpY2Vuc2UiOnsic3RhcnRfZGF0ZXRpbWUiOiIyMDIyLTA5LTExVDE1OjI0OjA4LjQyNFoiLCJleHBpcmF0aW9uX2RhdGV0aW1lIjoiMjAyMi0wOS0xM1QxNToyNDowOC40MjRaIiwiYWxsb3dfcGVyc2lzdGVuY2UiOnRydWV9LCJjb250ZW50X2tleXNfc291cmNlIjp7ImlubGluZSI6W3siaWQiOiJiNDcyN2NmMy0wMGVmLTQwMmYtOTc2NS0zMzQxNmJjOWVlNmMiLCJ1c2FnZV9wb2xpY3kiOiJQb2xpY3kgQSJ9XX0sImNvbnRlbnRfa2V5X3VzYWdlX3BvbGljaWVzIjpbeyJuYW1lIjoiUG9saWN5IEEiLCJwbGF5cmVhZHkiOnsibWluX2RldmljZV9zZWN1cml0eV9sZXZlbCI6MTUwLCJwbGF5X2VuYWJsZXJzIjpbIjc4NjYyN0Q4LUMyQTYtNDRCRS04Rjg4LTA4QUUyNTVCMDFBNyJdfX1dfSwiYmVnaW5fZGF0ZSI6IjIwMjItMDktMTFUMTU6MjQ6MDguNDI0WiIsImV4cGlyYXRpb25fZGF0ZSI6IjIwMjItMDktMTNUMTU6MjQ6MDguNDI0WiJ9.EX1KE3HGLHHltpCIfS2_wfdcTFSDqxiJiZeQc-qf1FA",
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
