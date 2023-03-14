// SPDX-License-Identifier: MIT
//0xCc22175aeC868a7A2e8DD00a6E848F78C51971FB

pragma solidity >=0.7.0 <0.9.0;


contract Tys {
    // Create a global counter for the messages
    uint256 public messageCount;

    // Create an event to record the messages
    event MessageCommitted(
        uint256 indexed messageCount,
        address indexed sender
    );

    // Initialize the messageCount to 0
    constructor () {
        messageCount = 0;
    }

    // Create a struct to store the messages
    struct Message {
        uint256 messageId;
        bytes32 commitment;
        uint256 revealTimeStamp;
    }

    // Create a mapping to store the messages
    mapping(uint256 => Message) public messages;

    // Create a function to add a message
    function commitMessage(bytes32 _commitment, uint256 _revealTime) public {
        // Add message to the mapping
        messages[messageCount] = Message(
            messageCount,
            _commitment,
            _revealTime
        );

        // Emit the event
        emit MessageCommitted(messageCount, msg.sender);

        // Increment the messageCount
        messageCount++;
    }

    // Create a function to reveal a message
    function revealMessage(
        uint256 _messageId,
        string memory _message,
        string memory _randomness
    ) public view returns (bytes32) {
        // Check if the message exists
        require(
            messages[_messageId].messageId == _messageId,
            "Message does not exist"
        );

        // Check if it is time to reveal the message
        require(
            messages[_messageId].revealTimeStamp < block.timestamp,
            "It is not yet time to reveal the message"
        );

        // Check if the commitment matches
        require(
            keccak256(abi.encodePacked(_message, _randomness)) ==
                messages[_messageId].commitment,
            "Commitment does not match"
        );

        // Return the message
        return messages[_messageId].commitment;
    }
}