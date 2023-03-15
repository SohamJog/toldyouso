import React, { useState, useEffect } from "react";

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
      <h1>Hello user</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input type="text" name="question" value={question} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      {questions.length > 0 && (
        <div>
          <h2>Questions</h2>
          //also add an option to answer the question
          <ul>
            {questions.map((question) => (
              //display the question, and add a form to answer the question
              <li key={question.data.id}>{question.data.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
