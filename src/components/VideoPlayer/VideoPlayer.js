import React, { useRef } from "react";
import Video from "react-native-video";
import { videoPlayerStyles } from "./VideoPlayer.styles";


export default function VideoPlayer(){
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
return <Video
        source={{ 
          uri: "https://media.axprod.net/TestVectors/v7-MultiDRM-SingleKey/Manifest_1080p.mpd",
          
           }} // Can be a URL or a local file.
        ref={(ref) => {
          videoPlayer.current = ref;
        }}
        controls={true}
        drm={{
      type: 'widevine',
      licenseServer:'https://drm-widevine-licensing.axtest.net/AcquireLicense',
      headers: {
        'X-AxDRM-Message':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiYjMzNjRlYjUtNTFmNi00YWUzLThjOTgtMzNjZWQ1ZTMxYzc4IiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImZpcnN0X3BsYXlfZXhwaXJhdGlvbiI6NjAsInBsYXlyZWFkeSI6eyJyZWFsX3RpbWVfZXhwaXJhdGlvbiI6dHJ1ZX0sImtleXMiOlt7ImlkIjoiOWViNDA1MGQtZTQ0Yi00ODAyLTkzMmUtMjdkNzUwODNlMjY2IiwiZW5jcnlwdGVkX2tleSI6ImxLM09qSExZVzI0Y3Iya3RSNzRmbnc9PSJ9XX19.FAbIiPxX8BHi9RwfzD7Yn-wugU19ghrkBFKsaCPrZmU',
      'Transfer-Encoding': 'Chunked',
        'Content-Type': 'application/octet-stream'
    }}}
        resizeMode="cover"
        onBuffer={(e)=>console.log(e)}

        onError={(e)=>console.log(e)}
        style={style.backgroundVideo}
      />



}