import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import { PlusIcon } from "../Plusbtn";
import { TickIcon } from "../TickBtn";
import { addToWatchlist } from "../../../store/watchlistSlice";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { mediaType, id } = useParams();

  const [toggle, setToggle] = useState(() => {
    const existingData = JSON.parse(localStorage.getItem("watchListId")) || [];
    const itemIndex = existingData.findIndex(
      (item) => item?.id === id && item?.mediaType === mediaType
    );
    return itemIndex !== -1;
  });

  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const { status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const onWatchListClick = async () => {
    // dispatch(addToWatchlist(id, status?.token));
    const existingData = JSON.parse(localStorage.getItem("watchListId")) || [];

    const itemIndex = existingData.findIndex(
      (item) => item.id === id && item.mediaType === mediaType
    );

    if (itemIndex !== -1) {
      existingData.splice(itemIndex, 1);
    } else {
      existingData.push({ id, mediaType });
    }

    localStorage.setItem("watchListId", JSON.stringify(existingData));

    setToggle(!toggle);
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {data && (
            <>
              <div className="backdrop-img">
                <Img src={url?.backdrop + data?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data?.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.poster + data?.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">{`${data.name || data.title}(${dayjs(
                      data?.release_date
                    ).format("YYYY")})`}</div>
                    <div className="subtitle">{data?.tagline}</div>
                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating rating={data?.vote_average?.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Now</span>
                      </div>
                      <div className="playbtn" onClick={onWatchListClick}>
                        {toggle ? <TickIcon /> : <PlusIcon />}
                        <span className="text">Add to Watchlist</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data?.overview}</div>
                    </div>
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: {""}</span>
                          <span className="text">{data?.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: {""}</span>
                          <span className="text">
                            {dayjs(data?.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: {""}</span>
                          <span className="text">
                            {" "}
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director : {""}</span>
                        <span className="text">
                          {director?.map((dir, index) => (
                            <span key={index}>
                              {dir.name}
                              {director.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer : {""}</span>
                        <span className="text">
                          {writer?.map((dir, index) => (
                            <span key={index}>
                              {dir.name}
                              {writer.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator : {""}</span>
                        <span className="text">
                          {data?.created_by?.map((dir, index) => (
                            <span key={index}>
                              {dir.name}
                              {data?.created_by.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
