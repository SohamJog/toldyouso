# Told You So

Have you ever made a prediction that you knew was going to come true, but nobody believed you? With our new social media platform, you can store your predictions on the blockchain and reveal them to the world when the time is right. Don't just make predictions, prove that you called it first with our secure and innovative platform. Check out version 1 here: https://sunny-sable-203f43.netlify.app/

## Table of Contents


- [Prerequisites](#prerequisites)
- [Installing](#installing)
- [Deployment](#deployment)
- [Built With](#built-with)
- [Contributing](#contributing)



## Prerequisites

You should have Metamask connected to the Scroll Alpha TestNet and the Goerli TestNet. Here are a few links to help you get started:

https://goerlifaucet.com/

https://scroll.io/alpha/bridge

You'll find all the dependencies in package.json. Run `npm install` and `cd frontend npm install` to install all the dependencies.

## Installing
Clone the project repository locally.

`git clone <repository link>`

## Deployment

Run `cd frontend` and `npm start` to start the project locally. 

## Built With

1. Polybase: I used Polybase as a database for the app. Polybase is a web3 based secure database. You can find a copy of the Polybase schema in schema.txt
2. Uma: Uma is an oracle to prove human-verifiable statements. The functionality using uma is still not complete. You can, however call contract functions from your Told You So profile.
3. Scroll: The TYS contract is deployed on the Scroll Alpha TestNet. Scroll guarantees lower costs, and higher throughput per second. 
4. Hardhat: I used Hardhat for testing the contracts. You can find the contracts as well as detailed tests in the `contracts` folder.
5. React.js: I built the front-end using React.js. You can find most of the app functions in `frontend/App.js`. You may also find all the React components in `frontend/components`.

## Contributing

Feel free to suggest any features. You may also fork this project and add your own functionality.



