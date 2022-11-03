import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;
console.log('ETH', ethereum);

// Fetch ethereum contract
const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionsContract;
}

export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const checkIfWalletIsConnected = async () => {

        try {
            if (!ethereum) return alert('Please Install metamask!');

            const accounts = await ethereum.request({ method: 'eth_accounts' });
            console.log('ACCOUNTS', accounts);

            if (accounts.length) {
                setConnectedAccount(accounts[0]);

                // get_All_transactions();
            }
            else {
                console.log('No accounts found!');
            }

            console.log('Accounts =====>:', accounts);
        } catch (error) {
            console.log('ERROR CHECKING Wallet connection ===>: ', error);
            throw new Error('No Ethereum Object!');
        }

    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert('Please Install metamask!');

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setConnectedAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error('No Ethereum Object!');
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert('Please Install metamask!');

            //form data
            const { addressTo, amount, keyword, message } = formData;
            //converting amount into hex
            const parsedAmount = ethers.utils.parseEther(amount);

            const transactionsContract = createEthereumContract();

            //send ethereum
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: connectedAccount,
                    to: addressTo,
                    gas: '0x5208', // 21000 GWEI
                    value: parsedAmount._hex,

                }]
            });

            //storing our transactions
            const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();

            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            //getting the count
            const transactionCount = await transactionsContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            console.log('ERROR CHECKING sending Transaction ===>: ', error);
            throw new Error('No Ethereum Object!');
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, connectedAccount, formData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}