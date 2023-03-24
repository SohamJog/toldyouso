import "./App.css";
import React, { useState, useEffect } from "react";
import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth'
import { ethers } from 'ethers';
import * as polybase_auth from "@polybase/auth";
import Landing from "./Components/Landing.js";
import Dashboard from "./Components/Dashboard.js";
import contractABI from "./contractABI.json";
import umaABI from "./umaABI.json";
const { keccak256 } = require("@ethersproject/keccak256");
const { toUtf8Bytes } = require("@ethersproject/strings");

//TODOS:
//Smart contract: commit hunch with commit time 0
    //Polybase: add hunch to user's unreleased hunches
    //Make sure that only the user can read this data
    //In unreleased hunches component, show the hunch and a button to release it


const contractAddress = "0xCc22175aeC868a7A2e8DD00a6E848F78C51971FB"; // contract address
//const umaContractAddress = "0x42CFe88D21ad6537198Ab3e732f6Cd99f3d50411"; // uma's contract address
const umaContractAddress = "0x42cfe88d21ad6537198ab3e732f6cd99f3d50411"; // uma's contract address

// const provider = new ethers.providers.Web3Provider(window.ethereum);

// const signer = provider.getSigner();

// const contract = new ethers.Contract(contractAddress, contractABI, signer);






export const App = () => {
  
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const polybase = new Polybase({
    defaultNamespace: "pk/0xef0bffa8495694673bf3c1c01413e5ffe987b2fdc47a37b594f5688953c2d53dfc2d2f0a10b91d96354eaac73f6644702b0d7dfbc387dfa632938854eefcf3ef/test_app",
  });
  
  useEffect(() => {
    // if (window.ethereum) {
    //   // Create a new Web3Provider with the window.ethereum object
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   setProvider(provider);

    //   // Get the signer from the provider
    //   const signer = provider.getSigner();
    //   setSigner(signer);

    //   // Create a new Contract with the contract address, ABI, and signer
    //   const contract = new ethers.Contract(contractAddress, contractABI, signer);
    //   setContract(contract);
    //   console.log(signer);
    // } else {
    //   console.log('Please install a wallet to use this app.');
    // }
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setWallet(JSON.parse(savedUser).data.wallet);
    }
  }, []);

  //function to getname from wallet 
  async function getNameFromWallet(walletAddress) {
    let records = await polybase.collection("User").where("wallet", "==", walletAddress).get();
    return records.data[0].data.name;
  } /* getNameFromWallet() */

  /*
  * Verifies a message with UMA
  */
  async function verifyWithUma(message) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(umaContractAddress, umaABI, signer);
      await contract.assertTruth(message);
    }
    catch (e) {
      console.log(e);
    }
  } /* verifyWithUma() */

  /*
  * Sets up the app
  */
  function setEverything() {
    if (window.ethereum) {
      // Create a new Web3Provider with the window.ethereum object
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      // Get the signer from the provider
      const signer = provider.getSigner();
      setSigner(signer);

      // Create a new Contract with the contract address, ABI, and signer
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contract);
      console.log(signer);
    } else {
      console.log('Please install a wallet to use this app.');
    }
  } /* setEverything() */

  /*
  * Creates a random id
  */
  function randomString() {
    var length = 32;
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  } /* randomString() */


  /**
   * 
   * creates a question. Future functionality. 
   */
  async function createQuestion(name) {
    let tag = randomString();
    try {
      
      await polybase.collection("Question").create([tag, name, wallet]);
    }
    catch (e) {
      //console.log(e);
    }
  } /* createQuestion() */

  /*
  * Logs in. Populates local storage. Sets up polybase signer.
  */
  async function login() {

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const walletTemp = await signer.getAddress();
  
      setWallet(walletTemp);
      //console.log("wallet: ", walletTemp);
      //console.log("wallet:");
     // console.log(walletTemp);
      polybase.signer(async (data) => {
        return {
          h: 'eth-personal-sign',
          sig: await signer.signMessage(data),
        };
      });
     // console.log("logged in");
      let records = await polybase.collection("User").where("wallet", "==", walletTemp).get();
     // console.log(records);
      //check if records is empty
      
      if (records.data == null || records.data.length == 0) {
        //console.log("creating user...");
        await createUser(walletTemp);
      }
      records = await polybase.collection("User").where("wallet", "==", walletTemp).get();
  
      setUser(records.data[0]);
      localStorage.setItem("user", JSON.stringify(records.data[0]));
    }
    catch {
      console.log("error");
    }
   
  } /* login() */


  /*
  * Logout
  */
  async function logout() {
    //console.log(user)
    polybase.signer(null);
    setUser(null);
    localStorage.removeItem("user");
    console.log("logged out");
  } /* logout() */


  /*
  * Create a user
  */
  async function createUser(walletAddress) {
    let tag = randomString();
    try {

      await polybase.collection("User").create([tag, walletAddress]);
      //const data = await polybase.collection("User").record(tag).get();
      //console.log(data)
    }
    catch (e) {
      console.log(e);
    }
  } /* createUser() */



  /*
  * Delete a user, currently hardcoded 
  */
  async function deleteUser() {
    try {
      await polybase.collection("User").record("sMBLR1g4Li8fcyiutINpKwO3LuTc3UQE").call("deleteUser");
      console.log("deleted user")
    }
    catch (e) {
      console.log(e);
    }
  } /* deleteUser() */


  /*
  * Delete all questions 
  */
  async function clearQuestions() {
    let records = await polybase.collection("Question").get();
    //console.log(records.data)

    for (let i = 0; i < records.data.length; i++) {
      //delete the record
      //console.log(records.data[i])
      await polybase.collection("Question").record(records.data[i].data.id).call("deleteQuestion");
    }
  } /* clearQuestions() */

  /*
  * Commit a hunch to the blockchain. Polybase functionality is commented out for now
  */
  async function commitHunch(statement) {
    try {
      /*
      USER: 
      {"data":{"friends":["0x6ea5CB879208496D27aCfc6319eCD3Dad31fd717"],"id":"tRzjTFIn0QzME9VCo1tisOSlxcejbvms","name":"Amod","publicKey":{"alg":"ES256K","crv":"secp256k1","kty":"EC","use":"sig","x":"9XliR0PkZ3gU5AipzqjKVz_GAaV9Jd1-24VYqcw80tI=","y":"4zgOwfYXY5ixPcRBrwmC0iKpNT1mygle_cZaF3Ikg9Q="},"wallet":"0x918e61236aC6FbB5EAa57a88709E2Fa43E932DE1"},"block":{"hash":"0x0000000000000000000000000000000000000000000000000000000000000000"}}
      */
     console.log("committing hunch");
     await login();
      const random  = randomString();
      const pubkey = JSON.parse(localStorage.getItem("user")).data.publicKey;
      const name = statement;
      const created = Math.floor(Date.now() / 1000);
      let msgId = await contract.messageCount();
      msgId = msgId.toNumber();
      
      console.log("msgId: ", msgId)
      
      //add the hash to the blockchain, comment out for now

      const commitment = keccak256(
        toUtf8Bytes(statement + random)
      );
      await contract.commitMessage(commitment, 0);

      //add it to polybase
      await polybase.collection("Prediction").create([random, pubkey, name, created, msgId]);
      
      console.log("created prediction");
      //await polybase.collection("Hunch").create([random, statement, revealDate, pubkey]);
    }
    catch (e) {
      console.log(e);
    }  

  } /* commitHunch() */

/*
  * Reveals a hunch to the blockchain
*/
  async function revealHunch(message, random) {
    try {
      
      await login();
      await polybase.collection("Prediction").record(random).call("release");
      const msgId = await polybase.collection("Prediction").record(random).get();
      
      console.log(msgId);
      const storedCommitment = await contract.revealMessage(
        msgId.data.msgId,
        message,
        random,
        //{ from: account }
      );
      console.log("revealed hunch");
      const id = randomString();
      //polybase functionality
      await polybase.collection("RevealedHunch").create([id, msgId.data.name, wallet, msgId.data.created]);
    }
    catch (e) {
      console.log(e);
    }
  } /* revealHunch() */
 
  /*
  * Returns the message count from contract. Use only for testing purposes
  */
  async function test () {
    const messageCount = await contract.messageCount();
    console.log('Message count:', messageCount.toNumber());
  } /* test() */


  /*
  * Sets the name of the user
  */
 async function setName (name) {
  ////console.log(user.data.id);
    await polybase.collection("User").record(user.data.id).call("setName", [name]);
 } /* setName() */

 /*
 * Adds a friend 
 */
  async function addFriend (friend) {
    await polybase.collection("User").record(user.data.id).call("addFriend", [friend]);
  } /* addFriend() */ 


  return (
    <div className="bg-teal-100">
      {user? <Dashboard 
      setEverything = {setEverything}
      createQuestion = {createQuestion} polybase = {polybase} logout = {logout} setName = {setName} user = {user} addFriend = {addFriend} wallet = {wallet} login = {login}
        commitHunch = {commitHunch} revealHunch = {revealHunch}
        getNameFromWallet = {getNameFromWallet} verifyWithUma = {verifyWithUma}
        /> :<Landing
        login = {login}
        
        />}

        
      </div>
      );
    };


{/* 
      <button onClick={()=>login()}>
         Login!
       </button> */}
      
        {/* <button onClick={() => addFriend("0x918e61236aC6FbB5EAa57a88709E2Fa43E932DE1")}>Add friend!</button>
        
        

       <button onClick={()=>deleteUser()}>
          Delete User!
        </button>
        <button onClick={()=>logout()}>Logout!</button>

        <button onClick={()=>createQuestion("Whats in a name?")}>
         Create Question!
       </button>
        <button onClick={()=>clearQuestions()}>
          Clear Questions!
        </button>
        <button onClick={()=>test()}>
          Test!
        </button>
        <button onClick={()=>commitHunch("Brandom")}>
          Generate Hunch!
        
        
        </button> */}

    
  

export default App;


