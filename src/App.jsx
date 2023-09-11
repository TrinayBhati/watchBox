import { useState, useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenre } from "./store/homeSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Explore from "./pages/explore/Explore";
import SearchResult from "./pages/searchResult/SearchResult";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/404/PageNotFound";
import Details from "./pages/details/Details";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import SubscriptionPage from "./pages/subscriptionPage/SubscriptionPage";
import LogIn from "./pages/authentication/LogIn";
import SignIn from "./pages/authentication/SignIn";
import PrivacyTerms from "./pages/footerItems/PrivacyTerms";
import Layout from "./Layout";
import MyProfile from "./pages/myProfile/MyProfile";
import UpdatePassword from "./pages/authentication/UpdatePassword";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  // console.log(url);
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);
  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((response) => {
      // console.log("image", response);
      const url = {
        backdrop: response.images.secure_base_url + "original",
        poster: response.images.secure_base_url + "original",
        profile: response.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGenres = {};

    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres?.map((item) => (allGenres[item.id] = item));
    });
    // console.log("geres", allGenres);
    // console.log("promises", data);
    dispatch(getGenre(allGenres));
  };

  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/:mediaType/:id"
            element={
              <Layout>
                <ProtectedRoute>
                  <Details />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/search/:query"
            element={
              <Layout>
                <SearchResult />
              </Layout>
            }
          />
          <Route
            path="/explore/:mediaType"
            element={
              <Layout>
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/subscription"
            element={
              <Layout>
                <ProtectedRoute>
                  <SubscriptionPage />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/update-password" element={<UpdatePassword />} />

          <Route
            path="/privacy-terms"
            element={
              <Layout>
                <PrivacyTerms />
              </Layout>
            }
          />
          <Route
            path="/my-profile"
            element={
              <Layout>
                <ProtectedRoute>
                  <MyProfile />
                </ProtectedRoute>
              </Layout>
            }
          />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
