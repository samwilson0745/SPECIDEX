// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
import Webcam from "react-webcam";

// 2. TODO - Import drawing utility here
 import { drawRect } from "./utilities";

 function WebCam() {
   const [buttonState,setButtonState] = useState(0);
   const [disableState,setDisableState] = useState(false);

   const webCamStyle={
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    textAlign: "center",
    zindex: 9,
    width: 640,
    height: 480,
   }
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    // e.g. const net = await cocossd.load();
    const net = await tf.loadGraphModel('http://127.0.0.1:8080/model.json')
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 16.7);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const img=tf.browser.fromPixels(video)
      const resized=tf.image.resizeBilinear(img,[640,480])
      const casted=resized.cast('int32')//to perform out model a little bit better
      const expanded= casted.expandDims(0)//this is the pre proccessed image
      const obj=await net.executeAsync(expanded)
      
      const boxes   =  await obj[1].array()
      const classes =  await obj[4].array()
      const scores  =  await obj[2].array()
      console.log(scores)
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
        requestAnimationFrame(()=>{
          drawRect(
            boxes[0],classes[0],scores[0],.7,videoWidth,videoHeight,ctx
          )
        })
      //after draeing removal of disposal of the values
      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <div style={{
        backgroundColor:"Red"
      }}>
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={webCamStyle}
        />

        <canvas
          ref={canvasRef}
          style={webCamStyle}
        />
</div>
      <div className="buttons" style={{position:"absolute",
      top : "80%",
      left : "35%",
      width : '30%'
    }}>
        <button className="button">Start</button>
        <button className="button">Stop</button>
      </div>
    </div>
  );
}

export default WebCam;
