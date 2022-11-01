// COMMAND to deploy: npx hardhat run scripts/deploy.js --network goerli
const main = async () => {

  // Generate Instances of contracts.
  const Transactions = await hre.ethers.getContractFactory("Transactions");

  // instance of transactions
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log(
    `Transactions ${transactions} deployed to: ${transactions.address}`
  );
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error('Error at runMain function ===>', error);
    process.exit(1);
  }
}

runMain();