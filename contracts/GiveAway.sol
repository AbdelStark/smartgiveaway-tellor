// contracts/GiveAway.sol
// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.6.0 <0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "../node_modules/usingtellor/contracts/UsingTellor.sol";
import "./TellorPlayground.sol";

contract GiveAway is Ownable, Pausable, UsingTellor{
    uint public constant RETWEET_INDEX = 0;
    uint public constant LIKE_INDEX = 1;
    struct Rules {
        uint256 scoreRetweet;
        uint256 scoreLike;
    }
    struct Participant {
        bytes id;
        uint[2] status;
    }
    string public _name;
    uint256 public _maxParticipants;
    Rules public _rules;
    address [] _listParticipants;
    mapping(address => Participant) public _participants;
    mapping(uint256 => uint256) public participantsScores;
    string public _tweetLink;

    uint256[] public winnersCandidates;
    uint256 public winnerIndex;
    uint256 tellorEthRequestId = 1;
    bool public tellorDidGet;
    uint public tellorTimestamp;
    uint public tellorEthPrice;
    TellorPlayground tellorPlayground;

    modifier onlyRegisteredUser()
    {
        require(keccak256(_participants[msg.sender].id) != keccak256(bytes("")), "You need to validate your participation");
        _;
    }
    constructor (address payable _tellorContract, string memory name, string memory tweetLink, uint256 maxParticipants, uint256 scoreRetweet, uint256 scoreLike) UsingTellor(_tellorContract) public payable {
        require(msg.value>0);
        _maxParticipants = maxParticipants;
        _name = name;
        _rules = Rules(scoreRetweet, scoreLike);
        _tweetLink = tweetLink;
        tellorPlayground = TellorPlayground(_tellorContract);
        tellorPlayground.submitValue(tellorEthRequestId, 423);
    }
    function participate(string memory id) public payable whenNotPaused{
        require(_listParticipants.length < _maxParticipants, "The maximum number of participants is reached");
        require(keccak256(_participants[msg.sender].id) == keccak256(bytes("")), "You have already validated your participation");
        _listParticipants.push(msg.sender);
        _participants[msg.sender].id = bytes(id) ;
    }
    function retweet() public payable onlyRegisteredUser whenNotPaused{
        require(_participants[msg.sender].status[RETWEET_INDEX] == 0, "You can only retweet once");
        _participants[msg.sender].status[RETWEET_INDEX] = 1;
    }
    function like() public payable onlyRegisteredUser whenNotPaused {
        require(_participants[msg.sender].status[LIKE_INDEX] == 0, "You can only like once");
        _participants[msg.sender].status[LIKE_INDEX] = 1;
    }
    function getMyScore() public view returns (uint256) {
        return getScore(msg.sender);
    }
    function getScore(address participant) public view returns (uint256) {
        return _participants[participant].status[RETWEET_INDEX] * _rules.scoreRetweet
        + _participants[participant].status[LIKE_INDEX] * _rules.scoreLike;
    }
    function isUserParticipating(address participant) public view returns (bool){
        return keccak256(_participants[participant].id) != keccak256(bytes(""));
    }
    function amIParticipating() public view returns (bool){
        return isUserParticipating(msg.sender);
    }
    function numberOfParticipants() public view returns (uint256){
        return _listParticipants.length;
    }
    function close() public payable onlyOwner whenNotPaused {
        uint256 seed = block.number;
        uint256 scoreWinner = 0;
        for (uint i = 0; i < _listParticipants.length; i++) {
            uint currentScore = getScore(_listParticipants[i]);
            participantsScores[i] = currentScore;
            if(currentScore > scoreWinner){
                scoreWinner = currentScore;
            }
        }
        for (uint i = 0; i < _listParticipants.length; i++) {
            if(participantsScores[i]==scoreWinner){
                winnersCandidates.push(i);
            }
        }
        winnerIndex = winnersCandidates[seed%winnersCandidates.length];

        _pause();
    }
    function getWinnerId() public view whenPaused returns(string memory){
        require(numberOfParticipants()>0, "No found participant");
        return string(_participants[_listParticipants[winnerIndex]].id);
    }
    function getWinnerAddress() public view whenPaused returns(address){
        require(numberOfParticipants()>0, "No found participant");
        return _listParticipants[winnerIndex];
    }

    function refreshUsingOracle() public{
        bool _didGet;
        uint _timestamp;
        uint _value;
        (_didGet, _value, _timestamp) = getCurrentValue(tellorEthRequestId);
        tellorDidGet = _didGet;
        tellorEthPrice = _value;
        tellorTimestamp = _timestamp;
    }

    function callOracle(uint requestId) public view returns(bool, uint, uint){
        bool _didGet;
        uint _timestamp;
        uint _value;
        (_didGet, _value, _timestamp) = getCurrentValue(requestId);
        return (_didGet, _value, _timestamp);
    }

    function getTellorDidGet() public view returns (bool){
        return tellorDidGet;
    }

    function getTellorEthPrice() public view returns (uint){
        return tellorEthPrice;
    }

    function getTellorTimestamp() public view returns (uint){
        return tellorTimestamp;
    }

    function submitValue(uint256 _requestId,uint256 _value) public{
        tellorPlayground.submitValue(_requestId, _value);
    }

}
