import React from 'react';
import logo from '../Assets/logo_2.jpeg';


//import index.css
import '../index.css';
import prediction from '../Assets/Prediction.jpeg';
import blockchain from '../Assets/blockchain.jpeg';
import tick from '../Assets/tick.jpeg';
import uma from '../Assets/uma.png';
import polylogo from '../Assets/polylogo.jpeg';
import scroll from '../Assets/scroll.jpeg';

function Landing(props) {
  return (
    <div className="bg-teal-100 min-h-screen">
      <div className="bg-teal-200 flex justify-between items-center snap-start">
        <div className="flex items-center">
          <img className="w-64 h-20 mr-2" src={logo} alt="Toldyouso Logo"/>
        </div>
        <button onClick={()=>props.login()} className="px-4 py-2 rounded-md font-bold bg-white text-cyan-600 mx-10 my-6 ">Connect Wallet</button>
      </div>

      {/* */}

      <div className="container mx-auto px-10 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-20">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-4xl font-bold mb-4">Share Your Prophetic Abilities with the World</h2>
            <p className="text-lg text-gray-800">Are you a natural at predicting the future? Showcase your prophetic abilities to the world with Toldyouso. Make predictions on anything, from sports matches to politics, and keep them secret until it's time to reveal. Our blockchain-based system ensures immutable and trustworthy predictions.</p>
          </div>

          <div className="lg:w-1/2">
            <img className="w-full rounded-full" src={prediction} alt="Prediction"/>
          </div>


        {/* */}

        </div>
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between mb-20">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-4xl font-bold mb-4">How Commit Reveal Schemes Work</h2>
            <p className="text-lg text-gray-800">
              <ul className='list-disc'>
                <li>Step 1. Post the hash of your opinion on-chain to timestamp it.</li>
                <li>Step 2. When the time is right, and if you are indeed right, reveal your commitment!</li>
                <li>Step 3. Share the fact that you totally called it, ages before it happened!</li>
              </ul>

            </p>
          </div>
          <div className="lg:w-1/2">
            <img className="w-80 h-80 rounded-full" src={tick} alt="Verification"/>
          </div>
        </div>

        {/* */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-4xl font-bold mb-4">Secure and Trustworthy Commitment with Blockchain</h2>
            <p className="text-lg text-gray-800">With our commitment schemes, your predictions are secure and trustworthy, backed by the power of blockchain technology.</p>
            <p className='text-lg text-gray-800'>Sign Up Now to Start Your Prophetic Portfolio!</p>
          </div>
          <div className="lg:w-1/2">
            <img className="w-full rounded-full" src={blockchain} alt="Blockchain"/>
          </div>
        </div>


        
        {/* */}

        <div className="py-20 text-center">
          <h2 className="text-4xl font-bold mb-4">Integrations</h2>
          <p className="text-lg text-gray-800 mb-4">We use a web3-native stack.</p>
          <div className="flex justify-center">
            <a href = "https://uma.xyz/">
            <img className="w-32 h-32 rounded-full mx-4" src={uma} alt="UMA Logo"/>
            </a>
            <a href = "https://polybase.xyz/"><img className="w-32 h-32 rounded-full mx-4" src={polylogo} alt="Polybase Logo"/></a>
            <a href = "https://scroll.io/"> <img className="w-32 h-32 rounded-full mx-4" src={scroll} alt="Skroll Logo"/></a>
            
           
          </div>
        </div>


      </div>
      <div className="bg-cyan-600 px-10 py-6 flex justify-between items-center">
        <p className="text-white">&copy; 2023 Toldyouso. All rights reserved.</p>
        <div className="flex items-center">
          {/* <p className="text-white mr-4">Follow us:</p>
          <img className="w-6 h-6" src={BsTwitter} alt="Twitter"/> */}
        </div>
      </div>
    </div>
  );
}

export default Landing;