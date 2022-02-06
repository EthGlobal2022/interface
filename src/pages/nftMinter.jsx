/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useChain, useMoralis, useMoralisFile } from "react-moralis";
import styles from "styles/NftMinter.module.css";
import Web3 from "web3";
import { Modal as AntModal, Button as AntButton } from "antd";

const nftMinter = () => {
  const { Moralis, user } = useMoralis();
  const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
  const [selectedFile, setSelectedFile] = useState();
  const [nftName, setNftName] = useState("");
  const [description, setDescription] = useState("");
  const [mintingState, setMintingState] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);

  Moralis.enableWeb3();

  const { switchNetwork, chainId, chain } = useChain();

  useEffect(() => {
    console.log(chainId);
    if (chainId && chainId?.toString() !== "0x13881") {
      setIsModalVisible(true);
    }
  }, [chainId]);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    // setIsSelected(true);
  };

  const handleSubmission = async () => {
    if (selectedFile) {
      setMintingState("Uploading Image in IPFS");
      const fileIpfs = await saveFile(selectedFile.name, selectedFile, {
        saveIPFS: true,
      });

      const imageURI = fileIpfs.ipfs();
      const metadata = {
        name: nftName,
        description: description,
        image: imageURI,
      };

      setMintingState("Uploading Metadata in IPFS");
      if (typeof window !== "undefined") {
        const metadataJson = await saveFile(
          "metadata.json",
          {
            base64: window.btoa(JSON.stringify(metadata)),
          },
          { saveIPFS: true }
        );
      }

      console.log(metadataJson);
      setMintingState("Getting Minting Approval");
      const txt = await mintToken(metadataJson);
      setMintingState(undefined);
      console.log("Minted!!");
    }
  };

  async function mintToken(_uri) {
    const nftContractAddress = "0x351bbee7C6E9268A1BF741B098448477E08A0a53"; // Make this variable

    // Ethereum Rinkeby 0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431
    // Polygon Mumbai 0x351bbee7C6E9268A1BF741B098448477E08A0a53
    // BSC Testnet 0x88624DD1c725C6A95E223170fa99ddB22E1C6DDD
    if (typeof window !== "undefined") {
      const web3 = new Web3(window.ethereum);
    }

    const encodedFunction = web3.eth.abi.encodeFunctionCall(
      {
        name: "mintToken",
        type: "function",
        inputs: [
          {
            type: "string",
            name: "tokenURI",
          },
        ],
      },
      [_uri]
    );

    const transactionParameters = {
      to: nftContractAddress,
      from: ethereum.selectedAddress,
      data: encodedFunction,
    };
    const txt = await ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return txt;
  }

  return (
    <div>
      <AntModal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "35px",
          fontSize: "17px",
          fontWeight: "500",
          textAlign: "center",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
        Current Chain is not supported please switch to Polygon Mumbai
        <AntButton
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={() => {
            switchNetwork("0x13881");
            setIsModalVisible(false);
          }}
        >
          Switch to Polygon Mumbai
        </AntButton>
      </AntModal>
      <h1 className={styles.label}>Mint your own Nft</h1>
      <div className={styles.fileInput}>
        <input
          type={"string"}
          placeholder="Name"
          value={nftName}
          onChange={(e) => {
            setNftName(e.target.value);
          }}
        />
        <input
          type={"string"}
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="file"
          name="fileInput"
          id="file"
          placeholder="File"
          onChange={changeHandler}
        />
        <button
          className={!!mintingState ? styles.loading : ""}
          disabled={!!mintingState}
          onClick={handleSubmission}
        >
          {mintingState ? mintingState : "To the moon"}
        </button>
      </div>
    </div>
  );
};

export default nftMinter;
