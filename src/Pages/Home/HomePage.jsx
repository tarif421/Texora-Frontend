import React from "react";
import Banner from "./Banner";
import WorkFlow from "./WorkFlow";
import Reviews from "./Reviews";
import LatestProducts from "./Products/LatestProducts";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const HomePage = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestProducts></LatestProducts>
      <WorkFlow></WorkFlow>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div>
  );
};

export default HomePage;
