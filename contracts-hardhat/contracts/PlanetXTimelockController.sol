// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

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
        override(TimelockControllerUpgradeable, ERC1155Receiver)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function onERC1155BatchReceived(address, address, uint256[] memory, uint256[] memory, bytes memory) public view virtual override(TimelockControllerUpgradeable, ERC1155Holder)
        returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    function onERC1155Received(address, address, uint256, uint256, bytes memory) public view virtual override(ERC1155Holder, TimelockControllerUpgradeable) returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC721Received(address, address, uint256, bytes memory) public view virtual override(ERC721Holder, TimelockControllerUpgradeable) returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
