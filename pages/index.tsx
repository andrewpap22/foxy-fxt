import { useState } from "react";
import { MainMint, NavBar } from "../components";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flexCenter bg-nft-red-violet ">
      <NavBar />
      <MainMint />
    </div>
  );
};

export default Home;
