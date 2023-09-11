import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
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

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const searchClickHandler = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="wrapper">
          <div className="heroBannerContent">
            <span className="title myBounceDiv">Welcome</span>
            <span className="subTitle">
              Millions of movies, TV shows and people to discover. Explore now.
              {/* Laughter. Tears. Thrills. Find it all here. */}
            </span>
            <div className="searchInput">
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
                placeholder="Search for a movie or tv show..."
              />
              <button onClick={searchClickHandler}>Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
