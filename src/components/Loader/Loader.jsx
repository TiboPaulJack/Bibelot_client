import './loader.css';
import { useState } from "react";





export default function Loader({progress}) {
  
  
  return (
    <div className="loaderDiv" id="loader">
      <div className="loader">
        🌀
      </div>
      <div className="loader__progress">
        {`${progress} %`}
      </div>
    </div>
  )
}
