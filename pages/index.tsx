import { useState } from "react";
import { MainMint, NavBar } from "../components";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [accounts, setAccounts] = useState<any[]>([]);

  return (
    <div className="overlay">
      <div>
        <NavBar accounts={accounts} setAccounts={setAccounts} />
        <MainMint accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className="moving-background"></div>
    </div>
  );
};

export default Home;
