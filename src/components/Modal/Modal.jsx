import "./modal.css";
import { useContext } from "react";
import { UserContext } from "../../App.jsx";
const root = document.getElementById("root");



export default function Modal() {
  const { setShowModal } = useContext(UserContext);
  const { modalContent, setModalContent } = useContext(UserContext);

  const hello =
    "Hello! This website is only for demonstration purposes yet fully functional." +
    " For the needs of the server you wont be able to upload large 3d models.  \n" +
    "Enjoy your visit!";

  const closeModal = () => {
    setShowModal(false);
    localStorage.setItem("modalShown", true);
    root.style.filter = "blur(0px)";
    root.style.opacity = "1";
    root.style.pointerEvents = "auto";
  };

  return (
    <div className="modal">
      <div>
        <p>{modalContent === "hello" ? hello : modalContent}</p>
      </div>
      <button onClick={closeModal}>Close</button>
    </div>
  );
}
