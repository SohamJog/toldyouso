import React, { useState, useEffect } from "react";
import logo from '../Assets/logo_2.png';
import Profile from './Profile.js';
import Private from "./Private.js";

function Dashboard(props) {
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    getAllQuestions();
    console.log(questions);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createQuestion(question);
    setQuestion(""); // Clear the input after submit
  };

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };
  
  async function getAllQuestions() {
    let records = await props.polybase.collection("Question").get();
    console.log(records.data)
    //console.log(records.data)
    setQuestions(records.data);
  }

  return (
    <div>

    <Private
     user = {props.user}
    />

     <Profile setName = {props.setName}
      user = {props.user}
      addFriend = {props.addFriend}
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
