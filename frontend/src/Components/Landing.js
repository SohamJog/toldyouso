import React from 'react';
import logo from '../Assets/logo_2.png';
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

      <div className="container mx-auto px-10 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-20">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-4xl font-bold mb-4">Make predictions, keep them secret</h2>
            <p className="text-lg text-gray-800">With Toldyouso, you can make predictions on anything, from sports matches to politics, and keep them secret until it's time to reveal. Our blockchain-based system ensures that your prediction is immutable and trustworthy.</p>
          </div>

          <div className="lg:w-1/2">
            <img className="w-full rounded-full" src={prediction} alt="Prediction"/>
          </div>




        </div>
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between mb-20">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-4xl font-bold mb-4">Verify with the UMA protocol</h2>
            <p className="text-lg text-gray-800">Our app uses the UMA protocol to ensure that the prediction outcome is verified and indisputable. You can trust that the truth will always prevail with Toldyouso.</p>
          </div>
          <div className="lg:w-1/2">
            <img className="w-80 h-80 rounded-full" src={tick} alt="Verification"/>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-4xl font-bold mb-4">Store your predictions on the blockchain</h2>
            <p className="text-lg text-gray-800">With our smart contract deployed on Scroll, your prediction is securely stored on the blockchain and cannot be altered. You can prove that you called it first with Toldyouso.</p>
          </div>
          <div className="lg:w-1/2">
            <img className="w-full rounded-full" src={blockchain} alt="Blockchain"/>
          </div>
        </div>

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
          <p className="text-white mr-4">Follow us:</p>
          <img className="w-6 h-6" src="../Assets/twitter.svg" alt="Twitter"/>
        </div>
      </div>
    </div>
  );
}

export default Landing;