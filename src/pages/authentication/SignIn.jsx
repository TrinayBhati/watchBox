import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Img from "../../components/lazyLoadImage/Img";
import useFetch from "../../hooks/useFetch";
import logo from "../../assets/watchbox1.png";
import iconlogo from "../../assets/logoicon.png";
import Modal from "react-modal";
import { signUp } from "../../store/authenticationSlice";
import { getError } from "../../store/authenticationSlice";

const SignIn = () => {
  const [background, setBackground] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");

  const { status } = useSelector((state) => state.auth);
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
    // console.log("bg", background);
  }, [data]);

  useEffect(() => {
    status && localStorage.setItem("userDetails", JSON.stringify(status));

    if (status?.status === "success") {
      navigate("/");
    }
    // console.log("status", status);
  }, [status]);

  useEffect(() => {
    error && openModal();
    dispatch(getError(null));
  }, [error]);

  const signUpHandler = () => {
    dispatch(signUp(name, email, password));
    // if (status.status == "success") {
    //   navigate("/");
    // } else {
    //   window.alert("Try clicking again");
    // }
  };
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
              <span className="logtitle">Sign in</span>
              <span className="logsubtitle">
                Create a free account with your email.
              </span>
              <div className="form-container">
                <input
                  type="text"
                  className="input"
                  placeholder="Full Name"
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
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button onClick={signUpHandler}>Sign up</button>
            </form>
            <div className="form-section">
              <p>
                Already have an account?{" "}
                <a
                  onClick={() => {
                    navigate("/log-in");
                  }}
                >
                  Log in
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
        <h2>User already exists</h2>
        {/* <button className="hwe" onClick={closeModal}>
          Close Modal
        </button> */}
      </Modal>
    </div>
  );
};

export default SignIn;
