import React from "react";
import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import Upcoming from "./upcoming/Upcoming";
import NewReleases from "./newReleases/NewReleases";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <Upcoming />
      <Popular />
      <TopRated />
      <NewReleases />
    </div>
  );
};

export default Home;
