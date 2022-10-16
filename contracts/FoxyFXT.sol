// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract FoxyFXT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply; // The current number of tokens while minting
    uint256 public maxSupply; // The maximum number of tokens that will be in the collection
    uint256 public maxPerWallet; // The max number of tokens a specific wallet can mint, so Elon can't mint all of them at once
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints; // keep track of how many tokens each wallet has minted so they won't go over the maxPerWallet

    constructor() payable ERC721('FoxyFXT', 'FXT') {
        mintPrice = 0.022 ether;
        totalSupply = 0;
        maxSupply = 10000;
        maxPerWallet = 3;
        /// set withdraw wallet address
    }
    
    /// only the owner of the contract can call this function
    function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    /// url of where the token metadata are gonna be located
    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), 'Token does not exist');

        return string(abi.encodePacked(baseTokenUri, Strings.toString(_tokenId), ".json"));
    }

    /// calling the wallet by passing the address set on the constructor
    /// basically it allows us to withdraw the funds from the contract
    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}('');
        require(success, 'Withdraw failed!');
    }

    function mint(uint256 _quantity) public payable {
        /// @Important! user mint requirements and checks - basically a validator
        require(isPublicMintEnabled, 'Public mint is not enabled');
        require(msg.value == mintPrice * _quantity, 'Incorrect value sent');
        require(totalSupply + _quantity <= maxSupply, 'Purchase would exceed max supply');
        require(walletMints[msg.sender] + _quantity <= maxPerWallet, 'Exceeds max NFTs per wallet');

        /// mint the tokens
        for (uint256 i = 0; i < _quantity; i++) {
            uint256 newTokenId = totalSupply + 1;

            /**
             * @Important!!!
             * Check effect interaction pattern
             * WDYM? - https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html
             * 
             * Basically, we are updating the state of the contract before we mint the token
             * Prevention of reentrancy attacks
             */
            totalSupply += 1; 
            _safeMint(msg.sender, newTokenId);
        }
    }
}