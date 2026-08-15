const hre = require("hardhat");

async function main() {
  console.log("Deploying TrustVerseAnchor contract to Polygon Amoy Testnet...");

  const TrustVerseAnchor = await hre.ethers.getContractFactory("TrustVerseAnchor");
  const anchor = await TrustVerseAnchor.deploy();

  await anchor.waitForDeployment();

  const address = await anchor.getAddress();
  console.log(`TrustVerseAnchor deployed successfully to Polygon Amoy at address: ${address}`);

  // Register demo issuer
  const tx = await anchor.registerIssuer(
    "did:trustverse:org:pccoer",
    "Pimpri Chinchwad College of Engineering & Research",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );
  await tx.wait();
  console.log("Registered PCCOER University Issuer on-chain.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
