// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract PlanetXTimelockController is
    TimelockControllerUpgradeable,
    ERC721Holder,
    ERC1155Holder
{
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors
    ) public initializer {
        __TimelockController_init(minDelay, proposers, executors);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(TimelockControllerUpgradeable, ERC1155Receiver, onERC721Received, onERC1155BatchReceived, onERC1155Received)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
