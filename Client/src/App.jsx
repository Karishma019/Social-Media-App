import Form from "./components/Form";
import Header from "./components/Header";
import Posts from "./components/Posts";
import AuthModal from "./components/AuthModal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [currentId, setCurrentId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loggedInUser } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const [user, setUser] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [loggedInUser, posts]);

  const contextClass = {
    success: "bg-green-400",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  return (
    <>
      <Header
        user={user}
        setUser={setUser}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        toggleModal={toggleModal}
      />

      <AuthModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        setIsModalOpen={setIsModalOpen}
      />
      <Form
        currentId={currentId}
        setCurrentId={setCurrentId}
        isOpen={isModalOpen}
        onClose={toggleModal}
      />

      <div className="container">
        <Posts toggleModal={toggleModal} setCurrentId={setCurrentId} />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        theme="light"
        toastClassName={(context) =>
          contextClass[context?.type || "default"] +
          " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        }
      />
    </>
  );
}

export default App;
