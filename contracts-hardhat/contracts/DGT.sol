// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./Merkletree.sol";

/**
 * @title DGTPoints
 */
 
 contract DGT is Initializable, Merkle, ReentrancyGuardUpgradeable {

    

     /**
    * @dev Reverts if the user status is not active
    */
    modifier onlyIfActive(address userAddress) {
        require(isActive[userAddress],"Status of the user is Inactive");
        _;
    }

    function initialize(
        address token_
    ) external initializer{
        require(token_ != address(0x0));    
        _token = IERC20(token_);
        __Administered_init();
        __ReentrancyGuard_init();
    }
    

   
 }
