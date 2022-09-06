// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
/**
 * @title DGTPoints
 */
 
 contract DGT is Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable {
    struct Score{
        bytes32 root;
        bytes32[] proof;
    }
    mapping (bytes32 => uint256) private latestPoint;
    mapping (bytes32 => uint256[]) private timeStamps;
    mapping (bytes32 => mapping (uint256 => Score)) private userBalance;
    
    constructor() initializer {
         __Ownable_init();
        __ReentrancyGuard_init();
    }

    /**
    * @dev Reverts if there is no historical data associated with this account
    */
    modifier ifExist(bytes32 _beneficiary)
    {
        require(timeStamps[_beneficiary].length > 0, "User Info Not Found");
        _;
    }

    /**
     * @dev Updates the Points for a user
     * @param _beneficiary bytes32 id of the user
     * @param _root root hash of the merkle tree generated
     * @param _proof bytes32 array of the merkle proof
     * @param _timestamp timestamp for the balance updation
     */
    function updatePoints(bytes32 _beneficiary ,bytes32 _root, bytes32[] memory _proof, uint256 _timestamp)
        external
        onlyOwner
       {
        require(_timestamp > latestPoint[_beneficiary], "Time Mismatch. Could not update previous points");

        userBalance[_beneficiary][_timestamp].root = _root;
        userBalance[_beneficiary][_timestamp].proof = _proof;
        timeStamps[_beneficiary].push(_timestamp);
        latestPoint[_beneficiary] = _timestamp;
    }

    /**
    * @dev Verifies the Current DGT Balance for a given account.
    * @return the verification status
    */
    function verifyCurrentBalance(bytes32 _beneficiary, uint256 _points) 
    external 
    view 
    ifExist(_beneficiary)
    returns (bool){
        uint256 previousTime = latestPoint[_beneficiary];
        bytes32 leaf = keccak256(abi.encodePacked(_points));
        return (MerkleProofUpgradeable.verify(userBalance[_beneficiary][previousTime].proof, userBalance[_beneficiary][previousTime].root, leaf));
    }

    /**
    * @dev Verifies the Historical DGT Balance for a given account for any historical time period.
    * @return the verification status
    */
    function verifyHistoricalBalance(bytes32 _beneficiary, uint256 _timestamp, uint256 _points) 
    external 
    view 
    ifExist(_beneficiary)
    returns (bool){
        uint256 previousTime = getPreviousTime(timeStamps[_beneficiary],_timestamp);
        bytes32 leaf = keccak256(abi.encodePacked(_points));
        return (MerkleProofUpgradeable.verify(userBalance[_beneficiary][previousTime].proof, userBalance[_beneficiary][previousTime].root, leaf));
    }

    /**
    * @dev Gives the total numbers of historical datas for a user
    * @return Historical DGT counts
    */
    function getBeneficiariesHistoryCount(bytes32 _beneficiary)
    external
    view
    returns(uint256){
        return timeStamps[_beneficiary].length;
    }

    function isAfter (uint256 _current, uint256 _previous)
     pure
     private
     returns (bool){
        if(_current >= _previous) return true;
        return false;
    }

    function getLargest(uint256[] memory _timeStampArray) 
    pure
    private 
    returns(uint256){
       uint store_var = 0;
       uint i;
       for(i=0;i<_timeStampArray.length;i++){
           if(store_var<_timeStampArray[i]){
               store_var = _timeStampArray[i];
           }
       }
       return store_var;
   }

    function getPreviousTime (uint256[] memory _timeStampArray, uint256 _inputTime)
     pure
     private
     returns (uint256 previousTime){
        uint256[] memory tempTimeArray = new uint[](_timeStampArray.length);
        uint count = 0;
        for(uint i=0; i<_timeStampArray.length; i++){
            if(isAfter(_inputTime,_timeStampArray[i])){
                tempTimeArray[count] = _timeStampArray[i];
                count ++;
            }
        }
        previousTime = getLargest(tempTimeArray);
    } 
 }
