// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/**
 * @title Administered
 * @author Alberto Cuesta Canada
 * @notice Implements Admin and User roles.
 */
contract Administered is OwnableUpgradeable, AccessControlUpgradeable {
  bytes32 private constant USER_ROLE = keccak256("USER");
  bytes32 private constant MERCHANT_ROLE = keccak256("MERCHANT");

  /// @dev Add owner as defalut admin role.
    function __Administered_init() internal onlyInitializing {
        __Ownable_init();
        __AccessControl_init();
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setRoleAdmin(USER_ROLE, DEFAULT_ADMIN_ROLE);
        _setRoleAdmin(MERCHANT_ROLE, DEFAULT_ADMIN_ROLE);
    }

  /// @dev Restricted to members of the admin role.
  modifier onlyAdmin()
  {
    require(isAdmin(msg.sender), "Restricted to admins");
    _;
  }

  /// @dev Restricted to members of the user role.
  modifier onlyUser()
  {
    require(isUser(msg.sender), "Restricted to users");
    _;
  }

  /// @dev Restricted to members of the merchant role.
  modifier onlyMerchant()
  {
    require(isMerchant(msg.sender), "Restricted to users");
    _;
  }

  /// @dev Restricted to members of the merchant role.
  modifier ifNotExists(address account)
  {
    require(isAdmin(account) == false, "This is the admin user");
    require(isMerchant(account) == false, "Account exists as Marchant");
    require(isUser(account) == false, "Account exists as user");
    _;
  }

  /// @dev Restricted to members of the merchant role.
  modifier onlyIfExists(address account)
  {
    require(isMerchant(account) || isUser(account), "Account does not exists");
    _;
  }

  /// @dev Return `true` if the account belongs to the admin role.
  function isAdmin(address account)
    public virtual view returns (bool)
  {
    return hasRole(DEFAULT_ADMIN_ROLE, account);
  }

  /// @dev Return `true` if the account belongs to the user role.
  function isUser(address account)
    public virtual view returns (bool)
  {
    return hasRole(USER_ROLE, account);
  }

  /// @dev Return `true` if the account belongs to the merchant role.
  function isMerchant(address account)
    public virtual view returns (bool)
  {
    return hasRole(MERCHANT_ROLE, account);
  }

  /// @dev Add an account to the user role. Restricted to admins.
  function addAdmin(address account)
    internal virtual onlyAdmin
  {
    grantRole(DEFAULT_ADMIN_ROLE, account);
  }

  /// @dev Add an account to the user role. Restricted to admins.
  function addUser(address account)
    internal virtual onlyAdmin
  {
    grantRole(USER_ROLE, account);
  }
  

    /// @dev Add an account to the merchant role. Restricted to admins.
  function addMerchant(address account)
    internal virtual onlyAdmin
  {
    grantRole(MERCHANT_ROLE, account);
  }

  /// @dev Remove an account from the user role. Restricted to admins.
  function removeUser(address account)
    internal virtual onlyAdmin
  {
    revokeRole(USER_ROLE, account);
  }

   /// @dev Remove an account from the merchant role. Restricted to admins.
  function removeMerchant(address account)
    internal virtual onlyAdmin
  {
    revokeRole(MERCHANT_ROLE, account);
  }

    /// @dev Remove oneself from the admin role.
    function renounceAdmin()
        internal virtual
    {
        renounceRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

   /// @dev Remove oneself from the admin role.
  function changeAdmin(address _admin)
    internal virtual ifNotExists(_admin)
  {
    require(msg.sender != _admin,"The new admin cannot be the existing one");
    addAdmin(_admin);
    renounceAdmin();
  }
}