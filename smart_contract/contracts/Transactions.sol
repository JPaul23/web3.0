// SPDX-Licence-Identifier: UNLICENSED

pragma solidity ^0.8.0;

//CONTRACT
contract Transactions {
    uint256 transactionCount;

    /// Create event
    /// address is a type
    /// @param from a variable name
    /// @param timestamp: when the transfer happened.

    event Transfer(
        address from,
        address reciever,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    // Creating a struct
    /// @param address is a type
    /// @param sender name of the property

    struct TransferStruct {
        address sender;
        address reciever;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    // Array of different transactions
    //transactions is a valiable
    TransferStruct[] transactions;

    function addToBlockchain(
        address payable reciever,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        transactionCount += 1;
        //pushing the transactions
        transactions.push(
            TransferStruct(
                msg.sender,
                reciever,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );
        //emitting the transfer
        emit Transfer(
            msg.sender,
            reciever,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
