import React, { useState, useEffect } from "react";
import { PolybaseProvider, usePolybase, useDocument } from "@polybase/react";
import { Polybase } from "@polybase/client";
import { ethPersonalSign } from '@polybase/eth'
import { ethers } from 'ethers';
import * as polybase_auth from "@polybase/auth";
import Landing from "./Components/Landing.js";
import Dashboard from "./Components/Dashboard.js";
import contractABI from "./contractABI.json";
const { keccak256 } = require("@ethersproject/keccak256");
const { toUtf8Bytes } = require("@ethersproject/strings");



const contractAddress = "0xCc22175aeC868a7A2e8DD00a6E848F78C51971FB"; // Replace with your contract address
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractABI, signer);



const polybase = new Polybase({
  defaultNamespace: "pk/0xef0bffa8495694673bf3c1c01413e5ffe987b2fdc47a37b594f5688953c2d53dfc2d2f0a10b91d96354eaac73f6644702b0d7dfbc387dfa632938854eefcf3ef/test_app",
  // signer: (data) => {
  //   return (
  //     {
  //     h: 'eth-personal-sign',
  //     sig: ethPersonalSign(wallet.privateKey(), data),
  //     })
  // }
});




export const App = () => {
  
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);

  
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setWallet(JSON.parse(savedUser).data.wallet);
    }
  }, []);


  // create a function for random string for a tag
  function randomString() {
    var length = 32;
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }


  /**
   * 
   * @param {*} name
   */
  async function createQuestion(name) {
    let tag = randomString();
    try {
      
      await polybase.collection("Question").create([tag, name, wallet]);
    }
    catch (e) {
      console.log(e);
    }
  } /* createQuestion() */

  /*
  *
  */
  async function login() {

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const walletTemp = await signer.getAddress();

    setWallet(walletTemp);
    console.log("wallet: ", walletTemp);
    //console.log("wallet:");
   // console.log(walletTemp);
    polybase.signer(async (data) => {
      return {
        h: 'eth-personal-sign',
        sig: await signer.signMessage(data),
      };
    });
    console.log("logged in");
    let records = await polybase.collection("User").where("wallet", "==", walletTemp).get();
    console.log(records);
    //check if records is empty
    
    if (records.data == null || records.data.length == 0) {
      console.log("creating user...");
      createUser(walletTemp);
    }
    records = await polybase.collection("User").where("wallet", "==", walletTemp).get();

    setUser(records.data[0]);
    localStorage.setItem("user", JSON.stringify(records.data[0]));
  } /* login() */


  /*
  *
  */
  async function logout() {
    console.log(user)
    polybase.signer(null);
    setUser(null);
    localStorage.removeItem("user");
    console.log("logged out");
  } /* logout() */


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


  //deletes a specific record currently hardcoded
  async function deleteUser() {
    try {
      await polybase.collection("User").record("Ubqzl2RhmfEYgwHLxzI1yWfA3We5eMf9").call("deleteUser");
      console.log("deleted user")
    }
    catch (e) {
      console.log(e);
    }
  } /* deleteUser() */



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
  * Commit a hunch to the blockchain
  */
  async function commitHunch(statement, revealDate) {
    const random  = randomString();
    try {
      //console log all 4 parameters in one line 
      console.log("random: ", random, "statement: ", statement, "revealDate: ", revealDate, "wallet: ", wallet);

      let pubkey = (wallet) 
      if (!wallet){
       pubkey = (JSON.parse(localStorage.getItem("user")).data.wallet);
      }
      console.log(JSON.parse(localStorage.getItem("user")));
      await polybase.collection("Hunch").create([random, statement, revealDate, pubkey]);
    }
    catch (e) {
      console.log(e);
    }
    const commitment = keccak256(
      toUtf8Bytes(statement + random)
    );
    await contract.commitMessage(commitment, revealDate 
      //   {
      //   from: account,
      // }
      );
  } /* commitHunch() */
 
  /*
  *
  */
  async function test () {
    const messageCount = await contract.messageCount();
    console.log('Message count:', messageCount);
  } /* test() */
  
  return (
    <div>
      //add props to dashboard like createQuestion
      {user? <Dashboard 
      createQuestion = {createQuestion} polybase = {polybase}  /> :<Landing/>}
      <button onClick={()=>login()}>
         Login!
       </button>
       
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
        <button onClick={()=>commitHunch("Brownies", 110000)}>
          Generate Hunch
        </button>
        {/* <button onClick={()=>printAll()}>Get all questions</button> */}
      </div>
    
    
    // <div>
    //   <h1>Polybase React Demo</h1>
    //   <button onClick={()=>createQuestion("Whats in a name?")}>
    //     Create Question!
    //   </button>
    //   <button onClick={()=>login()}>
    //     Login!
    //   </button>
    //   <button onClick={()=>logout()}>
    //     Logout!
    //   </button>
    //   <button onClick={()=>createUser()}>
    //     Create User!
    //   </button>
    //   <button onClick={()=>deleteUser()}>
    //     Delete User!
    //   </button>
    // </div>
  );
};

export default App;


