//https://eth-goerli.g.alchemy.com/v2/lxQWBQd0xOFvHdvffQ-_ekOTZ7nFG4zI

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks:{
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/lxQWBQd0xOFvHdvffQ-_ekOTZ7nFG4zI',
      accounts: ['******************************************']
    }
  }
}