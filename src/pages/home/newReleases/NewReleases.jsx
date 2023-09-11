import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";

const NewReleases = () => {
  const [endPoint, setEndPoint] = useState("movie");
  const { data, loading } = useFetch(
    `/${endPoint}/${endPoint == "movie" ? "now_playing" : "on_the_air"}`
  );
  const onTabChange = (tab) => {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">New Releases</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
    </div>
  );
};

export default NewReleases;
