import SensorHelper from "./SensorHelper";

const img1 = require("../../assets/images/2.png");  
const img2 = require("../../assets/images/3.png");  
// const img3 = require("../../assets/images/4.png");  
const img4 = require("../../assets/images/5.png");  






export default function BackgroundImage() {

    const arr = [img1,img2,img4];

  return (
    <>
        {
            arr.reverse().map((k,i)=>(
                <SensorHelper key={i} imgSrc={k} index={i} />
            ))
        }
    </>
  )

}