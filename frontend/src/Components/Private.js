import React, { useState, useEffect } from 'react';

function Private(props) {
  const user = props.user.data;
  const [hunch, setHunch] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.commitHunch(hunch);
    console.log(`Submitting hunch: ${hunch}`);
    setHunch('');
  };
 
  /*
  * Reveal a hunch to the blockchain.
  */
  async function revealHunch(reveal) {
    const name = reveal.data.name;
    const random = reveal.data.random;
    await props.revealHunch(name, random);
  } /* revealHunch() */


  return (
    <div className="max-w-2xl mx-auto mt-12">

      <h1 className="text-3xl font-bold mb-4">What's on your mind?</h1>
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
          <button
              type="submit"
              className="py-2 px-4 rounded-md font-bold bg-teal-500 text-white"
            >
              Commit!
            </button>
          
        </form>

        

        <div className='py-12'>
          <h2 className="text-2xl font-bold mb-4">Your unreleased predictions:</h2>
        </div>


        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col space-y-4 w-full lg:w-1/2">
            {props.hunches.map((_hunch, index) => (
              _hunch.data.released == 0 && (
              <div key={index} className="bg-white shadow-lg rounded-md p-4 w-full">
                <div className="flex items-start">
                  <div>
                    <p className="text-xs text-gray-500">{new Date(_hunch.data.created * 1000).toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-normal text-gray-800">{_hunch.data.name}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <button onClick={() => revealHunch(_hunch)} className="py-1 px-2 rounded-md font-bold bg-teal-500 text-white text-xs">Reveal Now</button>
                </div>
              </div>
              )
            ))}
          </div>
        </div>


          {/**  ///////////////////////////////   */}
        <div className='py-12'>
          <h2 className="text-2xl font-bold mb-4">Your released predictions:</h2>
        </div>


        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col space-y-4 w-full lg:w-1/2">
            {props.hunches.map((_hunch, index) => (
              _hunch.data.released == 1 && (
              <div key={index} className="bg-white shadow-lg rounded-md p-4 w-full">
                <div className="flex items-start">
                  <div>
                    <p className="text-xs text-gray-500">{new Date(_hunch.data.created * 1000).toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-normal text-gray-800">{_hunch.data.name}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <button onClick={()=>props.verifyWithUma(_hunch.data.name)} className="py-1 px-2 rounded-md font-bold bg-teal-500 text-white text-xs">Verify with UMA!</button>
                </div>
              </div>
              )
            ))}
          </div>
        </div>        




      </div>
    </div>
  );
}

export default Private;
