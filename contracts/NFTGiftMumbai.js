const main = async () => {

    let fee = hre.ethers.utils.parseEther("0.0001");
    let linkAdress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
    const NFTGiftContractFactory = await hre.ethers.getContractFactory('RegalisVRF');
    //const LinkTokenInterface = await hre.ethers.getContractAt(linkAdress,'LinkTokenInterface', signer);
    //const LinkContract = LinkTokenInterface.attach(linkAdress);
    const NFTGiftContract = await NFTGiftContractFactory.deploy(
      ["MGC#1 ", "MGC#2", "MGC#3", "MGC#4","MGC#5", "MGC#6",
      "MGC#7", "MGC#8","MGC#9", "MGC#10"],["QmbS3UaUXK3gKbFjoX6HHkBV3BL1chST7J461XtormU6CX", // Images
       "QmTXb43pz9sYds8JnwnLeNMvey9bdKwoB9ar2auK95z2xe", 
       "QmNQ5eFQxa5NK8MQi6hqnCidmJQXJUhGX5msbbLDJ1sCM4",
        "QmPhAzeMCNBX6AfZvr4ddfGfXZgmekULk9iVzaPU4MGidx",
        "QmX4XYjpeooZXB7sMGiSs1Dd1KDNAKedtytcUVwuNspdFE",
        "QmcYLcui2m77BLYaCsmXHFvJNiqLv4ZBS7greTons3sGhn",
        "QmezYQvex4yhrDkgBHAS24KgtZjXF1byDmNXFFVVbivKyq",
        "QmS9sNpigLiAWCdrrz23JcqbQAzpaZ3di2Jgr4buJJa1io",
        "QmaiX254v6WiwsMvQwrjeZsTaSqfJihJX52Lm3ZFMsqyyJ",
        "QmdAUPRyxHchwGLVffAdZ2ub1UtpAD8a3fGTGQ7vyjCGod"],
        "0x8C7382F9D8f56b33781fE506E897a4F1e2d17255", //VRF
        linkAdress, //Link Token
        "0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4", // Keyhash
        fee
);  
    
    console.log(fee);
    let txn;
    let returnedTokenURI;
    await NFTGiftContract.deployed();
    console.log("Contract deployed to:", NFTGiftContract.address);
    //txt = await LinkTokenInterface.transfer(NFTGiftContract.address, hre.ethers.utils.parseEther("1"));
    //await txt.wait();    

    txn = await NFTGiftContract.getAllDefaultCharacters();
    console.log(txn);

    //txn = await NFTGiftContract.getRandomBox();
    //await txn.wait();

// Get the value of the NFT's URI.
    //returnedTokenUri = await NFTGiftContract.tokenURI(1);
    //console.log("Token URI:", returnedTokenUri);
    
};



const runMain = async () => {

    try {

            await main();

            process.exit(0);

          } catch (error) {

                  console.log(error);

                  process.exit(1);

                }

};



runMain();



