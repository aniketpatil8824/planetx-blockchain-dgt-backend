// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./Administered.sol";

/**
 * @title User
 */
 
 contract User is Initializable, Administered, ReentrancyGuardUpgradeable {

     /**
    * @dev Possible roles for the contract are declared as enumerator
    */
     enum roles {
         NONE, USER, MERCHANT
     }

    // address of the ERC20 token
    IERC20 private _token;
    mapping(address => bool) private isActive;
    event Updated(address userAddress);

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
    

    /**
    * @dev 
    * @return Returns the state of the user.
    */
    function getStatus(address _userAddress)
    external
    view
    returns(bool){
        return isActive[_userAddress];
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
    * @param _role role of the user
    */
    function createUser(
        address _userAddress,
        roles _role
    )external
     onlyAdmin
     ifNotExists(_userAddress)
     {
        setRoles(_userAddress,_role);
        isActive[_userAddress] = true;
        emit Updated(_userAddress);
    }

    /// @dev Give corresponding roles to the users.
    function setRoles(address _address,roles _role) internal {
        if(_role == roles(1)){
            addUser(_address);
        }
        else if(_role == roles(2)){
            addMerchant(_address);
        }
    }

     /**
    * @notice Creates a new User.
    * @param _userAddress address of the user 
    */
    function updateStatus(address _userAddress)external
     onlyAdmin
     onlyIfExists(_userAddress)
    {
        isActive[_userAddress] = !isActive[_userAddress]; 
        emit Updated(_userAddress);
    }

   /**
    * @notice Update the admin power to new account.
    * @param account address of the new admin 
    */
    function updateAdmin(address account) onlyAdmin external
    {
        super.changeAdmin(account);
    }
 }
