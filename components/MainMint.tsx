import { useState } from 'react'
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
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
        const response = await contract.mint(BigNumber.from(mintAmount), {
            value: ethers.utils.parseEther((0.022 * mintAmount).toString()),
        });

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
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
        <Box width="520px">
            <div>
                <Text fontSize="48px" textShadow="0 5px #000000">FoxyFXT 🦊</Text>
                <Text
                  fontSize="30px"
                  letterSpacing="-5.5%"
                  fontFamily="VT323"
                  textShadow="0 2px 2px #000000"
                >
                    🦊 ｲｶｹｪｳ ｮｷｺｼｳ ｩｶｲｶｹ ｺｮｻ ｦｳｪｻ, ｨｶｴｺｪｨｻｪｻｼｹ ｦｩｮｷｮｺｨｮｴｬ ｪｲｮｻ, ｺｪｩ ｩｶ ｪｮｼｺｳｶｩ ｻｪｳｷｶｹ ｮｴｨｮｩｮｩｼｴｻ ｼｻ ｲｦｧｶｹｪ ｪｻ ｩｶｲｶｹｪ ｳｦｬｴｦ ｦｲｮｸｼｦ 🦊
                </Text>
            </div>

            {
                isConnected ? (
                    <div>
                        <Flex align="center" justify="center">
                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px" 
                                onClick={handleDecrement}
                            >
                                -
                            </Button>
                            <Input
                                readOnly
                                fontFamily="inherit"
                                width="100px"
                                height="40px"
                                textAlign="center"
                                paddingLeft="19px"
                                marginTop="10px" 
                                type="number" 
                                value={mintAmount} 
                            />
                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px" 
                                onClick={handleIncrement}
                            >
                                +
                            </Button>
                        </Flex>
                        <Button 
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px" 
                            onClick={handleMint}
                        >
                            Mint 🍭
                        </Button>
                    </div>
                ) : (
                    <Text
                        marginTop="70px"
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 3px #000000"
                        color="#D6517D"
                    >
                        Connect Your Wallet 💰
                    </Text>
                )
            }
        </Box>
    </Flex>
  )
}

export default MainMint