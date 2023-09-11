import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Img from "../../components/lazyLoadImage/Img";
import useFetch from "../../hooks/useFetch";
import logo from "../../assets/watchbox1.png";
import iconlogo from "../../assets/logoicon.png";
import {
  getError,
  getUpdatePassword,
  updatePassword,
} from "../../store/authenticationSlice"; // Import the updated action
import Modal from "react-modal";

const UpdatePassword = () => {
  const [background, setBackground] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const { status } = useSelector((state) => state.auth);
  const { password } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const updateHandler = async () => {
    // Call the updated action with the required parameters
    // console.log(name, email, oldPassword, newPassword, status?.token);
    dispatch(
      updatePassword(name, email, oldPassword, newPassword, status?.token)
    );
  };

  useEffect(() => {
    // console.log("password", password);
    if (password?.status == "success") {
      openModal();
      dispatch(getUpdatePassword(null));
    }
  }, [password]);

  useEffect(() => {
    error && openModal();
    dispatch(getError(null));
  }, [error]);

  const openModal = () => {
    // Function to open modal
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // Function to close modal
    setIsModalOpen(false);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80vw",
      maxWidth: "400px",
      borderRadius: "10px",
      padding: "20px",
      backgroundColor: "#1E2A38", // You can change this color
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)", // Box shadow for the modal
      color: "white", // Text color
      fontSize: "1.5rem",
      // fontFamily: "Pacifico, cursive",
      border: "none",
      display: "flex", // Center contents horizontally
      flexDirection: "column",
      alignItems: "center", // Center contents vertically
      justifyContent: "center", // Center contents horizontally
      textAlign: "center", // Center text within the modal
      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", // Text shadow
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)", // Background color for the overlay
    },
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer-subs"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <div
            className="logo myBounceDiv"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={iconlogo} alt="" />
            <img src={logo} alt="" />
          </div>
          <div className="form-box">
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <span className="logtitle">Update Password</span>
              <span className="logsubtitle">Be carefull</span>
              <div className="form-container">
                <input
                  type="text"
                  className="input"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Enter old Password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Enter new Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button onClick={updateHandler}>Update</button>
            </form>
            <div className="form-section">
              <p>
                New to watchBox?{" "}
                <a
                  onClick={() => {
                    navigate("/sign-in");
                  }}
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </ContentWrapper>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h2>Password updated successfully</h2>
        {/* <button className="hwe" onClick={closeModal}>
          Close Modal
        </button> */}
      </Modal>
    </div>
  );
};

export default UpdatePassword;
