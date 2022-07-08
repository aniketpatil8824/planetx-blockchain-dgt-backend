//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol";

contract Merkle {
    struct Score{
        bytes32 root;
        bytes32[] proof;
    }
    mapping (address => uint256[]) private timeStamps;
    mapping (address=> mapping (uint256 => Score) ) private userBalance;

   
    modifier ifExist(address _beneficiary)
    {
        require(timeStamps[_beneficiary].length > 0, "User Info Not Found");
        _;
    }

     function updatePoints(address beneficiary ,bytes32 root, bytes32[] memory proof, uint256 timestamp)
        external
       {
        // only owner function   
        // uint256 currentCount = block.timestamp
        // check if timestamp > prvious times
        userBalance[beneficiary][timestamp].root = root;
        userBalance[beneficiary][timestamp].proof = proof;
        timeStamps[beneficiary].push(timestamp);
       }


    function checkBalance(address beneficiary, uint256 timestamp, uint256 points) 
    public 
    view 
    ifExist(beneficiary)
    returns (bool){
        uint256 previousTime = getPreviousTime(timeStamps[beneficiary],timestamp);
        bytes32 leaf = keccak256(abi.encodePacked(points));
        return (MerkleProofUpgradeable.verify(userBalance[beneficiary][previousTime].proof, userBalance[beneficiary][previousTime].root, leaf));
    }

    function getBeneficiariesTotalCount(address _beneficiary)
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

    function getLargest(uint256[] memory timeStampArray) 
    private 
    pure 
    returns(uint256){
       uint store_var = 0;
       uint i;
       for(i=0;i<timeStampArray.length;i++){
           if(store_var<timeStampArray[i]){
               store_var = timeStampArray[i];
           }
       }
       return store_var;
   }

    function getPreviousTime (uint256[] memory timeStampArray, uint256 inputTime)
     pure
     private
     returns (uint256 previousTime){
        uint256[] memory tempTimeArray = new uint[](timeStampArray.length);
        uint count = 0;
        for(uint i=0; i<timeStampArray.length; i++){
            if(isAfter(inputTime,timeStampArray[i])){
                tempTimeArray[count] = timeStampArray[i];
                count ++;
            }
        }
        previousTime = getLargest(tempTimeArray);
    }    
}
