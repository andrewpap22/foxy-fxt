import { useState } from "react";
import { MainMint, NavBar } from "../components";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [accounts, setAccounts] = useState<any[]>([]);

  return (
    <>
      <div className="flexCenter">
        <NavBar accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className="flexCenter">
        <MainMint accounts={accounts} setAccounts={setAccounts} />
      </div>
    </>
  );
};

export default Home;
