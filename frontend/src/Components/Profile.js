


import React, { useEffect, useState } from 'react';
//import index.css
import '../index.css';

function Profile(props) {
  const user = props.user.data;
  const friendsHunch = props.friendsHunch;

  const [newFriend, setNewFriend] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [ownerNames, setOwnerNames] = useState({});

  useEffect(() => {
    async function getNamesFromWallets() {
      const names = {};
      for (const hunch of friendsHunch) {
        const walletAddress = hunch.data.owner;
        if (!names[walletAddress]) {
          const name = await props.getNameFromWallet(walletAddress);
          if (names !== undefined) {
            names[walletAddress] = name;
          }
          else {
            names[walletAddress] = walletAddress;
          }
        }
      }
      console.log(names);
      setOwnerNames(names);
    }
    getNamesFromWallets();
  }, [friendsHunch]);

  const handleAddFriend = () => {
    // Add newFriend to user's friend list
    // Code here to update user's friend list in database
    props.addFriend(newFriend);
    setNewFriend('');
  };

  const handleChangeUsername = () => {
    // Change user's username to newUsername
    // Code here to update user's username in database
    props.setName(newUsername);
    setNewUsername('');
  };

  return (
    <div className="bg-teal-100 min-h-screen justify-center">
      <div className="container mx-auto px-10 py-12">
        <div className="flex flex-col items-center justify-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Hello {user.name}</h2>
          <p className="text-lg text-gray-800 mb-4">{props.user.data.address}</p>
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-between w-full">
              <input 
                type="text" 
                placeholder="Enter friend's address" 
                value={newFriend} 
                onChange={(e) => setNewFriend(e.target.value)} 
                className="px-4 py-2 rounded-md font-bold bg-white text-gray-800 mr-2" 
              />
              <button 
                onClick={handleAddFriend} 
                className="px-4 py-2 rounded-md font-bold bg-cyan-600 text-white"
              >
                Add Friend
              </button>
            </div>
            <div className="flex flex-row items-center justify-between w-full mt-4">
              <input 
                type="text" 
                placeholder="Enter new username" 
                value={newUsername} 
                onChange={(e) => setNewUsername(e.target.value)} 
                className="px-4 py-2 rounded-md font-bold bg-white text-gray-800 mr-2" 
              />
              <button 
                onClick={handleChangeUsername} 
                className="px-4 py-2 rounded-md font-bold bg-cyan-600 text-white"
              >
                Change Username
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-10 ">
        <div className="flex flex-col items-center justify-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Here's what your friends predicted!</h2>
        </div>
       </div>


      <div className="flex justify-center mt-4">
        <div className="flex flex-col space-y-4">
        {props.friendsHunch.map((hunch, index) => (
           <div key={index} className="bg-white shadow-lg rounded-md p-4 text-center">
              <div className="flex items-start">
                <div>
                  <p className="text-xs text-gray-500">{new Date(hunch.data.created * 1000).toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-2">
               <p className="text-sm font-normal text-gray-800">{hunch.data.name}</p>
               <p className="text-xs text-gray-500">{ownerNames[hunch.data.owner]}</p>
             </div>
           </div>
          ))}
        </div>
      </div>

     </div>
   );
 }

 export default Profile;