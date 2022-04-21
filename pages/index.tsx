import { useState, useEffect } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [mood, setMood] = useState();
  const [signer, setSigner] = useState();
  const [moodContract, setMoodContract] = useState();

  const MoodContractAddress = "0xB8d6D87b409336c6A262EF1c7c033Ba9BE9E18a6";
  const MoodContractABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_mood",
          "type": "string"
        }
      ],
      "name": "setMood",
      "outputs": [],
      "stateMutability": "nonpayable",
      "payable": false,
      "type": "function",
      "constant": false
    },
    {
      "inputs": [],
      "name": "getMood",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "payable": false,
      "type": "function",
      "constant": true
    }
  ];

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "ropsten");
    provider.send("eth_requestAccounts", []).then(() => {
      provider.listAccounts().then((accounts) => {
        setSigner(provider.getSigner(accounts[0]));
        setMoodContract(new ethers.Contract(
          MoodContractAddress,
          MoodContractABI,
          signer
        ));
      });
    });
  }, []);

  return (
    <div className="main-div">
      <Head>
        <title>Learn Web 3 - Freshman - DApp</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main>
        <h1>This is my dApp!</h1>
        <p>Here we can set or get the mood:</p>
        <label htmlFor="mood">Input Mood:</label> <br />
        {mood}
        <button className="mood-button" onClick={() => setMood()}>Set Mood</button>
        <input type="text" id="mood" />
      </main>
    </div>
  );
};

export default Home;
