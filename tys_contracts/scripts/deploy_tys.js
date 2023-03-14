const { ethers } = require('hardhat');
const hre = require('hardhat');

async function main() {
  const signer = (await ethers.getSigners())[0];
  const tysArtifact = await hre.artifacts.readArtifact('Tys');
  const tysFactory = new ethers.ContractFactory(
    tysArtifact.abi,
    tysArtifact.bytecode,
    signer
  );
  
  const tys = await tysFactory.deploy();
  await tys.deployed();

  console.log(`Tys deployed to ${tys.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}
);
