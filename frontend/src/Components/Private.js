import React, { useState } from 'react';

function Private(props) {
  const user = props.user.data;
  const [hunch, setHunch] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Submit hunch to backend
    //Smart contract: commit hunch with commit time 0
    //Polybase: add hunch to user's unreleased hunches
    //Make sure that only the user can read this data
    //In unreleased hunches component, show the hunch and a button to release it
    console.log(`Submitting hunch: ${hunch}`);
    setHunch('');
  };

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <div className="border border-gray-300 rounded-lg px-4 py-6">
        <div className="flex items-center mb-4">
          <div>
            <h2 className="text-lg font-medium">{user.name}</h2>
            <p className="text-sm text-gray-600">{`${user.wallet}`}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={hunch}
            onChange={(event) => setHunch(event.target.value)}
            className="rounded-lg w-full border-0 resize-none focus:outline-none focus:ring-0"
            rows="3"
            placeholder="What's your hunch?"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-3">
            
            </div>
            <button
              type="submit"
              className="py-2 px-4 rounded-md font-bold bg-teal-500 text-white"
            >
              Commit!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Private;
