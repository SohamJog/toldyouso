const { expect } = require("chai");
const { ethers } = require("hardhat");
const { getAccount, deployContract } =  require("@nomicfoundation/hardhat-network-helpers");

const { keccak256 } = require("@ethersproject/keccak256");
const { toUtf8Bytes } = require("@ethersproject/strings");

describe("Tys", function () {
  let tys;
  let account;

  beforeEach(async () => {
    // Deploy the contract
    const Tys = await ethers.getContractFactory("Tys");
    tys = await Tys.deploy();

    // Get the account
    const accounts = await ethers.getSigners();
    account = accounts[0];

  });

  it("Should deploy the contract", async function () {
    expect(tys.address).to.not.equal(0);
  });

  describe("commitMessage()", function () {
    it("Should commit the message", async function () {
      // Prepare the inputs
      const message = "Hello";
      const random = "chocolatepipe";
      const revealDate = 1678821630;

      // Create the commitment
      const commitment = keccak256(
        toUtf8Bytes(message + random)
      );

      // Commit the message
      await tys.commitMessage(commitment, revealDate 
      //   {
      //   from: account,
      // }
      );

      // Get the event log
      const event = (
        await tys.queryFilter("MessageCommitted", 0)
      )[0];

      // Check that the event is emitted
      expect(event).to.not.be.undefined;

      // Check that the sender is correct
      expect(event.args.sender).to.equal(account.address);
    });
  });

  describe("revealMessage()", function () {
    it("Should reveal the message", async function () {
      // Prepare the inputs
      const message = "Hello";
      const random = "chocolatepipe";
      const revealDate = 1678821630;

      // Create the commitment
      const commitment = keccak256(
        toUtf8Bytes(message + random)
      );

      // Commit the message
      await tys.commitMessage(commitment, revealDate,
      //    {
      //   from: account,
      // }
      );

      // Get the event log
      const event = (
        await tys.queryFilter("MessageCommitted", 0)
      )[0];

      // Get the message ID
      const msgId = event.args.messageCount;

      // Reveal the message
      const storedCommitment = await tys.revealMessage(
        msgId,
        message,
        random,
        //{ from: account }
      );

      // Check that the stored commitment matches the computed one
      expect(storedCommitment).to.equal(commitment);
    });
  });
});
