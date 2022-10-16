import React from 'react'

type Props = {
    accounts: any[];
    setAccounts: React.Dispatch<React.SetStateAction<any[]>>;
}

const NavBar = (props: Props) => {
  const { accounts, setAccounts } = props;
  const isConnected = Boolean(accounts[0]);
  
  async function connectAccount() {
    if ((window as any).ethereum) {
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      setAccounts(accounts);
    }
  }

  return (
    <div>
        {/* Left Side - Social Media Icons */}
        <div>Facebook</div>
        <div>Twitter</div>
        <div>Email</div>

        {/* Right Side - Sections and Connect */}
        <div>About</div>
        <div>Mint</div>
        <div>Team</div>

        {/* Connect Button */}
        {
            isConnected ? (
                <p>Connected</p>
            ) : (
                <button onClick={connectAccount}>Connect</button>
            )
        }
    </div>
  )
}

export default NavBar