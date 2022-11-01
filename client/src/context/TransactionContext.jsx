import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

// Fetch ethereum contract
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    })
}

export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState('');

    const checkIfWalletIsConnected = async () => {

        try {
            if (!ethereum) return alert('Please Install metamask!');

            const accounts = await ethereum.request({ method: 'eth_accounts' });

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

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, connectedAccount }}>
            {children}
        </TransactionContext.Provider>
    )
}