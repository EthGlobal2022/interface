//SEND LINK TO CONTRACT POST DEPLOYEMENT

//Contract Address - 0xcfFdFf29CF9747d2C235010CB1D8E62058ed8b53

/** CharacterNames - ["MGC#1 ", "MGC#2", "MGC#3", "MGC#4","MGC#5", "MGC#6",
      "MGC#7", "MGC#8","MGC#9", "MGC#10"] */

/**ImageURIs - ["QmbS3UaUXK3gKbFjoX6HHkBV3BL1chST7J461XtormU6CX",
       "QmTXb43pz9sYds8JnwnLeNMvey9bdKwoB9ar2auK95z2xe", 
       "QmNQ5eFQxa5NK8MQi6hqnCidmJQXJUhGX5msbbLDJ1sCM4",
        "QmPhAzeMCNBX6AfZvr4ddfGfXZgmekULk9iVzaPU4MGidx",
        "QmX4XYjpeooZXB7sMGiSs1Dd1KDNAKedtytcUVwuNspdFE",
        "QmcYLcui2m77BLYaCsmXHFvJNiqLv4ZBS7greTons3sGhn",
        "QmezYQvex4yhrDkgBHAS24KgtZjXF1byDmNXFFVVbivKyq",
        "QmS9sNpigLiAWCdrrz23JcqbQAzpaZ3di2Jgr4buJJa1io",
        "QmaiX254v6WiwsMvQwrjeZsTaSqfJihJX52Lm3ZFMsqyyJ",
        "QmdAUPRyxHchwGLVffAdZ2ub1UtpAD8a3fGTGQ7vyjCGod"] */

//VRFCoordinator - 0x8C7382F9D8f56b33781fE506E897a4F1e2d17255
//LINK TOKEN - 	0x326C977E6efc84E512bB9C30f76E30c160eD06FB
//KEYHASH - 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4
//FEE - 0.0001 LINK - 100000000000000

//https://faucets.chain.link/mumbai

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./@openzeppelin/contracts/utils/Counters.sol";
import "./@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";
import "./Base64.sol";
import "./@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract NFTGiftVRF is ERC721, VRFConsumerBase {
    
  struct GorillaNFTs {
    uint characterIndex;
    string name;
    string imageURI;   
  }

    //mapping(bytes32 => uint256) public requestToCharacterId;
	  mapping(bytes32 => address) public requestToSender;

    //event requestedCharacter(bytes32 indexed requestId);
    event CharacterNFTMinted(address sender, uint256 tokenId, uint256 characterIndex);
  
  // The tokenId is the NFTs unique identifier, it's just a number that goes
  // 0, 1, 2, 3, etc.
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  bytes32 internal keyHash;
  uint256 internal fee;
  
  // TODO - uint256 public ramdomResult



  // A lil array to help us hold the default data for our characters.
  // This will be helpful when we mint new characters and need to know
  // things like their HP, AD, etc.
  GorillaNFTs[] defaultCharacters;
  
  // We create a mapping from the nft's tokenId => that NFTs attributes.
  mapping(uint256 => GorillaNFTs) public nftHolderAttributes;

  // A mapping from an address => the NFTs tokenId. Gives me an ez way
  // to store the owner of the NFT and reference it later.
  mapping(address => uint256) public nftHolders;

  // Data passed in to the contract when it's first created initializing the characters.
  // We're going to actually pass these values in from from run.js.
  constructor(
      string[] memory characterNames,
      string[] memory characterImageURIs,
      address _VRFCordinator,
      address _LinkToken,
      bytes32 _keyHash,
      uint256 _fee
      ) ERC721("Gorilla", "")
      VRFConsumerBase(_VRFCordinator, _LinkToken)
      {
       keyHash = _keyHash;
       fee = _fee;   
    // Loop through all the characters, and save their values in our contract so
    // we can use them later when we mint our NFTs.
    for(uint i = 0; i < characterNames.length; i += 1) {
      defaultCharacters.push(GorillaNFTs({
        characterIndex: i,
        name: characterNames[i],
        imageURI: characterImageURIs[i]
      }));

      GorillaNFTs memory c = defaultCharacters[i];
      console.log("Done initializing %s w/ imgUri: %s,", c.name, c.imageURI);
    }
	// I increment tokenIds here so that my first NFT has an ID of 1.
    // More on this in the lesson!
    _tokenIds.increment();
  }


  function getRandomBox() public returns (bytes32) {
    require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet"); // TODO: Del faucet word production 
    require(nftHolders[msg.sender]==0, "One user can only redeem a price once");
    bytes32 requestId = requestRandomness(keyHash, fee);
    //requestToCharacterId[requestId] = _tokenId;
    requestToSender[requestId] = msg.sender;
    return requestId;
  }	


  function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
    address sender = requestToSender[requestId];
    uint256 caracterIndex = (randomness % defaultCharacters.length);
    mintCharacterNFT(caracterIndex,sender);
  }
  
  // Users would be able to hit this function and get their NFT based on the
  // characterId they send in!
  function mintCharacterNFT(uint _characterIndex, address _Sender) internal {
        // Get current tokenId (starts at 1 since we incremented in the constructor).
        uint256 newItemId = _tokenIds.current();
        // The magical function! Assigns the tokenId to the caller's wallet address.
        _safeMint(_Sender, newItemId);
        // We map the tokenId => their character attributes. More on this in
        // the lesson below.
            nftHolderAttributes[newItemId] = GorillaNFTs({
            characterIndex: _characterIndex,
            name: defaultCharacters[_characterIndex].name,
            imageURI: defaultCharacters[_characterIndex].imageURI
            });
            
            console.log("Minted NFT w/ tokenId %s and characterIndex %s, Character name %s", newItemId, _characterIndex);    
        // Keep an easy way to see who owns what NFT.
        nftHolders[_Sender] = newItemId;
        // Increment the tokenId for the next person that uses it.
        _tokenIds.increment();
        emit CharacterNFTMinted(_Sender, newItemId, _characterIndex);
  }



    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        GorillaNFTs memory charAttributes = nftHolderAttributes[_tokenId];    
        

        string memory json = Base64.encode(
            bytes(
            string(
                abi.encodePacked(
                '{"name": "',
                charAttributes.name,
                ' -- NFT #: ',
                Strings.toString(_tokenId),
                '", "description": "This is a NFT that was obtained as a gift.", "image": "ipfs://',
                charAttributes.imageURI,'"}'        
              )
            )
          )
    );

  string memory output = string(
    abi.encodePacked("data:application/json;base64,", json)
  );
  
  return output;
  }

      function checkIfUserHasNFT() public view returns (GorillaNFTs memory) {
      // Get the tokenId of the user's character NFT
      uint256 userNftTokenId = nftHolders[msg.sender];
      // If the user has a tokenId in the map, return their character.
      if (userNftTokenId > 0) {
          return nftHolderAttributes[userNftTokenId];
      }
      // Else, return an empty character.
      else {
          GorillaNFTs memory emptyStruct;
          return emptyStruct;
          }
      }

      function getAllDefaultCharacters() public view returns (GorillaNFTs[] memory) {
      return defaultCharacters;
      }
}