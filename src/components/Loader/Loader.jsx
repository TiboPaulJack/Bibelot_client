import './loader.css';



export default function Loader({progress}) {
  
  
  return (
    <div className="loaderDiv" id="loader">
      <div className="loader">
        🌀
      </div>
      <div className="loader__progress">
        {progress ? ` Loading... ${progress} %` : `Loading...`}
      </div>
    </div>
  )
}
