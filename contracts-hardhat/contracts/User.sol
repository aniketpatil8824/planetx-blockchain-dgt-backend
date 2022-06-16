// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


/**
 * @title User
 */
 
 contract User is Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable {

     /**
    * @dev Possible roles for the contract are declared as enumerator
    */
     enum roles {
         admin,
         merchant,
         customer
     }

    /**
    * @dev User Structure is defined
    */
     struct user{
         bool isActive;
         bool initialized;
         roles role;
     }

    // address of the ERC20 token
    IERC20 private _token;

    mapping(address => user) private platformUsers;

    event Updated(address userAddress);


     /**
    * @dev Reverts if the user status is not active
    */
    modifier onlyIfActive(address userAddress) {
        require(platformUsers[userAddress].isActive,"Status of the user is Inactive");
        _;
    }

    function initialize(
        address token_
    ) external initializer{
        require(token_ != address(0x0));    
        _token = IERC20(token_);
        __Ownable_init();
        __ReentrancyGuard_init();
    }

    /**
    * @dev 
    * @return Returns the state of the user.
    */
    function getUser(address _userAddress)
    external
    view
    returns(user memory){
        return platformUsers[_userAddress];
    }

    /**
    * @dev Returns the amount of tokens available with the user.
    * @return the amount of tokens
    */
    function getBalance(address userAddress)
        public
        view
        returns(uint256){
        return _token.balanceOf(userAddress);
    }

    /**
    * @dev Returns the address of the ERC20 token managed by the vesting contract.
    */
    function getToken()
    external
    view
    returns(address){
        return address(_token);
    }

      /**
    * @notice Creates a new User.
    * @param _userAddress address of the user 
    * @param _isActive status of the user
    * @param _role role of the user
    */
    function createUser(
        address _userAddress,
        bool _isActive,
        uint _role
    )external
     onlyOwner
     {
        require(!platformUsers[_userAddress].initialized,"User with the address already exists");
        platformUsers[_userAddress] = user(_isActive,true,roles(_role));
        emit Updated(_userAddress);
    }

     /**
    * @notice Creates a new User.
    * @param _userAddress address of the user 
    * @param _isActive status of the user
    */
    function updateStatus(
        address _userAddress,
        bool _isActive
    )external
     onlyOwner
    {
        require(platformUsers[_userAddress].initialized,"User does not exists");
        platformUsers[_userAddress].isActive = _isActive; 
        emit Updated(_userAddress);
    }
 }
