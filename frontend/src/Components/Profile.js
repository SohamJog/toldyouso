import React, { useState } from 'react';
//import index.css
import '../index.css';

function Profile(props) {
  const user = props.user.data;
  const [newFriend, setNewFriend] = useState('');
  const [newUsername, setNewUsername] = useState('');

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
    <div className="bg-teal-100 min-h-screen">
      

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
      
    </div>
  );
}

export default Profile;
