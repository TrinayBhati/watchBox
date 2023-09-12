import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "react-avatar";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import useFetch from "../../hooks/useFetch";

const Profile = () => {
  const { id } = useParams();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch(`/person/${id}`);

  //   console.log(url.profile + data?.profile_path);
  // console.log(data);

  const gender = data?.gender == 2 ? "Male" : "Female";
  return (
    <div className="detailsBanner">
      <div className="opacity-layer-subs"></div>
      <ContentWrapper>
        <div className="content">
          <div className="left">
            {data?.profile_path ? (
              <img
                src={url?.profile + data?.profile_path}
                className="profileImg12"
              />
            ) : (
              <Avatar
                name={data?.name}
                size="200"
                round={true}
                className="profileImg12"
              />
            )}
          </div>
          <div className="right1">
            <div className="login-box">
              <form>
                <div className="user-box">
                  <input type="text" value={data?.name} readOnly />
                  <label>Name</label>
                </div>
                <div className="user-box">
                  <input
                    type="text"
                    value={data?.known_for_department}
                    readOnly
                  />
                  <label>Known for</label>
                </div>
                <div className="user-box">
                  <input type="text" value={data?.birthday} readOnly />
                  <label>Date of Birth</label>
                </div>
                <div className="user-box">
                  <input type="text" value={data?.place_of_birth} readOnly />
                  <label>Place of birth</label>
                </div>
                <div className="user-box">
                  <input type="text" value={gender} readOnly />
                  <label>Gender</label>
                </div>
              </form>
            </div>
          </div>
          <div className="right12">
            <div className="title12">Short Bio</div>
            <div className="subtitle12">{data?.biography}</div>
          </div>
        </div>

        <div className="content1">
          {/* {array?.map((item) => (
            <MovieCard
              key={`${item.mediaType}-${item.id}`}
              data={useFetch(`/${item.mediaType}/${item.id}`).data}
              fromSearch={false}
              mediaType={item.mediaType}
            />
          ))} */}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Profile;
