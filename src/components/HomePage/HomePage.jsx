import './homePage.css'

import Header from "../Header/Header.jsx";
import Hero from "../Hero/Hero.jsx";
import Footer from "../Footer/Footer.jsx";
import { createPortal } from "react-dom";
import { UserContext } from "../../App.jsx";
import { useContext } from "react";
import Modal from "../Modal/Modal.jsx";


export default function HomePage() {
  
  const { showModal, setShowModal } = useContext(UserContext);
  const { modalContent, setModalContent } = useContext(UserContext);
  
  if(!localStorage.getItem('modalShown')){
    setModalContent("hello")
    setShowModal(true);
  }

  return (
    <>
      <Header />
        <div className="homePage">
          {showModal && createPortal(
            <Modal />,
            document.body
          )}
          <Hero />
        </div>
    <Footer />
    </>
  )
}
