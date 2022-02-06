import React, { useEffect, useState } from "react";
import styles from "styles/Home.module.css";
import { useMoralis } from "react-moralis";
import NftAbi from "abi/NftGift.json"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text
} from '@chakra-ui/react'
import { QuestionIcon } from '@chakra-ui/icons'
import Web3 from "web3";
function Index() {
  const { Moralis, user } = useMoralis();
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

 
  const emailRegex = /\S+@\S+\.\S+/;

  const validateEmail = () => {
    if (emailRegex.test(email)) {
      setIsValid(true);
      saveEmail();
    } else {
      setIsValid(false);
      alert("Please enter a valid email address");
    }
  };

  // declare a saying funtion

  const saveEmail = async () => {
    if (email) {
      const query = new Moralis.Query("EmailIds");
      query.equalTo("email", email);
      const result = await query.find();
      if (result.length === 0) {
        const EmailIds = Moralis.Object.extend("EmailIds");
        const newRow = new EmailIds();
        newRow.set("email", email);
        newRow.set("user", user);
        await newRow.save()
        onOpen()
        // mintToken()
      } else {
        alert("Email already exists");
      }
    }
  };

  async function mintToken() {
    const nftContractAddress = "0xcfFdFf29CF9747d2C235010CB1D8E62058ed8b53"; // Make this variable
    let chainId= await window.ethereum.request({ method: 'eth_chainId' })
    if(chainId?.toString()==="0x13881"){
    const web3 = new Web3(window.ethereum);

    const encodedFunction = web3.eth.abi.encodeFunctionCall(
      {
        "inputs": [],
        "name": "getRandomBox",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
      ,
      []
    );

    const transactionParameters = {
      to: nftContractAddress,
      from: ethereum.selectedAddress,
      data: encodedFunction,
    };
    const txt = await ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });} else{
      alert("Switch to mumbai testnet")
    }
    onClose();
  }


  return (
    <div className={styles.container}>
       <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent boxShadow={"0 1px 10px rgba(220, 0, 255, 0.1)"} background={"#0D0D0D"} margin="auto">
          <ModalHeader color={"#fff"}>Subscription Succesful</ModalHeader>
          <ModalCloseButton color={"#fff"}/>
          <ModalBody display={"flex"} flexDirection="column" alignItems={"center"} justifyContent="center">
            
            <div style={
              {
                border:"1px solid #DC00FF",
                borderRadius:"1rem",
                padding:"0.625rem",
                display:"flex",
                background:"rgba(27, 0, 32, 0.5)"
              }
            }>
<QuestionIcon fontSize={"7rem"} color="rgba(220, 0, 255, 0.5)"/>
            </div>
            <Text align={"center"} mt="1rem" fontSize={"1rem"} color="#fff">
              Get A Random NFT! 
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button _active={{background:"#DC00FF"}} background={"#DC00FF"} color={"#fff"} fontWeight="700" w="100%" onClick={mintToken}>
              Get Your Nft Gift
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className={styles.content}>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

        <h1>Learn how the</h1>
        <h1>
          <span
            style={{
              color: "#DC00FF",
            }}
          >
            Web3
          </span>{" "}
          works.
        </h1>

        <div className={styles.newsletterInput}>
          <input
            placeholder="vitalik@polygon.com"
            type={"text"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button onClick={validateEmail}>Get Weekly Learns</button>
        </div>
      </div>
      <img className={styles.earth} src="./earth.jpg" />
    </div>
  );
}

export default Index;
