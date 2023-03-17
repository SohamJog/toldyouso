import React, { useState, useEffect } from "react";
import logo from '../Assets/logo_2.png';
import Profile from './Profile.js';
import Private from "./Private.js";

function Dashboard(props) {
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [hunches, setHunches] = useState([]);
  const [friendsHunch, setFriendsHunch] = useState([]);


  useEffect(() => {
    getAllQuestions();
    getHunch();
    getFriendsHunch();
    //console.log(questions);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createQuestion(question);
    setQuestion(""); // Clear the input after submit
  };

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };
  
  /*
  * Return all questions temporary might delete
  */
  async function getAllQuestions() {
    let records = await props.polybase.collection("Question").get();
    console.log(records.data)
    //console.log(records.data)
    setQuestions(records.data);
  } /* getAllQuestions() */

  /*
  * Get all the revealed predictions of friends
  */
  async function getFriendsHunch() {
    let friends = await props.polybase.collection("User").record(props.user.data.id).get();
    friends = friends.data.friends;
    //for every element in friends array
    let final = [];
    for (let i = 0; i < friends.length; i++) {
      //get the revealed hunches of the friend
      let record = await props.polybase.collection("RevealedHunch").where("owner", "==", friends[i]).get();
      //append all elements of record to final
      final = final.concat(record.data);
    }
    console.log(final);
    setFriendsHunch(final);




  } /* getFriendsHunch() */
  /*
  * Return all hunches(revealed or unrevealed)
  */
    async function getHunch() {
      await props.login();
      const prediction = await props.polybase.collection("Prediction").get();
      //console.log(prediction);
      //set hunches if not null
      if (prediction.data.length > 0){
        setHunches(prediction.data);
      }
      return prediction;
    } /* getHunch() */
  


  return (
    <div>

    <Private
     user = {props.user}
     hunches = {hunches}
     commitHunch = {props.commitHunch}
     revealHunch = {props.revealHunch}
    />

     <Profile setName = {props.setName}
      user = {props.user}
      addFriend = {props.addFriend}
      friendsHunch = {friendsHunch}
      />

    <div className="bg-teal-200 flex justify-between items-center snap-start">
    <div className="flex items-center">
      <img className="w-64 h-20 mr-2" src={logo} alt="Toldyouso Logo"/>
    </div>
    <button onClick={()=>props.logout()} className="px-4 py-2 rounded-md font-bold bg-white text-cyan-600 mx-10 my-6 ">Logout</button>
  </div>
    <div className="bg-teal-100 text-black min-h-screen py-8 px-4">
     
    <h1 className="text-4xl font-bold mb-8">Hello user</h1>
    <form onSubmit={handleSubmit} className="mb-8">
      <label className="block mb-4">
        <span className="font-bold">Question:</span>
        <input type="text" name="question" value={question} onChange={handleChange} className="block w-full rounded-md py-2 px-3 mt-2 bg-white text-gray-800"/>
      </label>
      <button type="submit" className="py-2 px-4 rounded-md font-bold bg-white text-teal-500">Submit</button>
    </form>

    {questions.length > 0 && (
      <div>
        <h2 className="text-2xl font-bold mb-4">Questions</h2>
        {questions.map((question) => (
          <div key={question.data.id} className="bg-white rounded-md mb-4 py-4 px-6">
            <p className="font-bold text-black">{question.data.name}</p>
            <form>
              <label className="block my-4">
                <span className="font-bold">Answer:</span>
                <textarea className="block w-full rounded-md py-2 px-3 mt-2 bg-gray-100 text-gray-800" rows="3"></textarea>
              </label>
              <button type="submit" className="py-2 px-4 rounded-md font-bold bg-teal-500 text-white">Submit Answer</button>
            </form>
          </div>
        ))}

        <div className="bg-cyan-600 px-10 py-6 flex justify-between items-center">
          <p className="text-white">&copy; 2023 Toldyouso. All rights reserved.</p>
          <div className="flex items-center">
            <p className="text-white mr-4">Follow us:</p>
            <img className="w-6 h-6" src="../Assets/twitter.svg" alt="Twitter"/>
        </div>
      </div>
      </div>
    )}
  </div>
  </div>
  );
}

export default Dashboard;
