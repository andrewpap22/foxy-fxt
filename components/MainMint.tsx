import { useState } from 'react'
import { ethers, BigNumber } from 'ethers';
import { FoxyFXTAddress, FoxyFXTAddressABI } from '../utils/constants';

type Props = {
    accounts: any[];
    setAccounts: React.Dispatch<React.SetStateAction<any[]>>;
}

const MainMint = (props: Props) => {
  const { accounts, setAccounts } = props;
  const [mintAmount, setMintAmount] = useState<number>(1);
  const isConnected = Boolean(accounts[0]);
  
  async function handleMint() {
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(FoxyFXTAddress, FoxyFXTAddressABI, signer);
      
      try {
        const response = await contract.mint(BigNumber.from(mintAmount));

        console.log({response});
      } catch (error) {
        console.log({error});
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };
  
  return (
    <div>
        <h1>FoxyFXT 🦊</h1>
        <p>🦊🦊🦊🦊🦊🦊🦊🦊🦊🦊🦊🦊🦊🦊🦊</p>

        {
            isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={mintAmount} />
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleMint}>Mint 🍭</button>
                </div>
            ) : (
                <p>Connect Wallet 💰</p>
            )
        }
    </div>
  )
}

export default MainMint