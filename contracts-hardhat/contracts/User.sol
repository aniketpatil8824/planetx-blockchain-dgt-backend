// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title User
 */
 
 contract User is Ownable, ReentrancyGuard{

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
         roles role;
         bool initialized;
     }

    // address of the ERC20 token
    IERC20 immutable private _token;

    mapping(address => user) private platformUsers;

    event Updated(address userAddress);


     /**
    * @dev Reverts if the user status is not active
    */
    modifier onlyIfActive(address userAddress) {
        require(platformUsers[userAddress].isActive,"Status of the user is Inactive");
        _;
    }

     /**
     * @dev Creates a User contract.
     * @param token_ address of the ERC20 token contract
     */
    constructor(address token_) {
        require(token_ != address(0x0));
        _token = IERC20(token_);
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
        roles _role
    )external
     onlyOwner
     {
        require(!platformUsers[_userAddress].initialized,"User with the address already exists");
        platformUsers[_userAddress] = user(_isActive,_role,true);
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
