//CONTRACT DEPLOYED - 0x485607C70343f3BadDceF043Fb50528113595A5A

// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0-solc-0.7/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {

    constructor () ERC20("Embark", "MBRK") {
        _mint(msg.sender, 100101 * (10 ** uint256(decimals())));
    }
}
