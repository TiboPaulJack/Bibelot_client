import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import ViewerGlb from "../Viewer/ViewerGlb.jsx";
import "./productDetails.css";
import ProductComments from "../ProductComments/ProductComments.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
import baseApi from "../../assets/baseApi.js";

export default function ProductDetails() {
  const [productDetail, setProductDetail] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  
  if(/\/\d+$/.test(location.pathname)) {
    document.getElementById('root').style.overflow = 'scroll';
  }
  
  
  const setLoaded = () => {
    setIsLoaded(false);
  };

  const {
    name,
    format,
    download,
    data,
    size,
    description,
    pseudo,
    likes,
    comments,
    tags,
  } = productDetail;
  

  const id = useParams().id;

  useEffect(() => {
    window.scrollTo(0, 0);
    productDetails();
  }, []);
  

  const productDetails = () => {
    fetch(baseApi + `/model/data/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setProductDetail(data))
  };

  const bitesToMb = (bites) => {
    return Math.round(bites / 1000000);
  };

  const handleDownload = async () => {
    if (download) {
      const response = await fetch(baseApi + `/model/glb/${id}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.type = "model/gltf-binary";
      link.download = `${name}.glb`;
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <>
      <Header />
      <div className="productDetails">
        <div className="productDetails__top">
          <div className="model3d" id="canvasContainer">
            <div className="loaderDiv" id="loader">
              {!isLoaded && <Loader progress={progress} />}
            </div>
            
            {productDetail &&
              <ViewerGlb
                setIsLoaded={ setIsLoaded }
                data={ data }
                setProgress={ setProgress }
            /> }
            
          </div>
          <div className="productDetails__infos">
            <div className="infos__author">
              Author
              <span className="infos__author--content">{pseudo}</span>
            </div>
            <div className="infos__format">
              Format
              <span className="infos__format--content">{format}</span>
            </div>
            <div className="infos__size">
              Size
              <span className="infos__size--content">{bitesToMb(size)}Mo</span>
            </div>
            <div className="infos__download">
              Download
              <span className="infos__download--content">
                {{ download } ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
        <div className="productDetails__middle">
          <div className="productDetails__title">
            <h4>{name}</h4>
          </div>
          <div className="productDetails__description">
            <p>{description}</p>
          </div>
        </div>
        <div className="productDetails__bottom">
          <div className="bottom__comments">
            <ProductComments id={id} />
          </div>
          <div className="bottom__download">
            <button className="download__button" onClick={handleDownload}>
              Download
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
