import { ethers } from "ethers";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import { container } from "tsyringe";
import ApplicantView from "../components/applicantView";
import OwnerView from "../components/ownerView";
import RecruiterView from "../components/recruiterView";
import UnregisteredView from "../components/unregisteredView";
import { JobApplicationService } from "../services/JobApplicationService";
import { JobPostService } from "../services/JobPostService";

export default function Home() {

  //get the service instance
  const jobApplicationServiceInstance = container.resolve(JobApplicationService);
  const jobPostServiceInstance = container.resolve(JobPostService);
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [provider, setProvider] = useState(undefined);
  const [isSupportedNetwork, setIsSupportedNetwork] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [isApplicant, setIsApplicant] = useState(false);
  const [hasMetaMask, setHasMetaMask]= useState(true);


  const onChainChanged = (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    setIsConnected(false);
    window.location.reload();
  }

  const onaAccountsChanged = (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    setIsConnected(false);
    window.location.reload();
  }

  async function connect() {
    
    if(!window?.ethereum?.isMetaMask) setHasMetaMask(false);

    console.info("connecting to metamask");
    if (typeof window.ethereum !== "undefined") {
      try {
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        const supportedNetwork = chainId === "0x5"; //Goerli
        setIsSupportedNetwork(supportedNetwork);
        if (supportedNetwork) {
          await ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setIsConnected(true);
          setProvider(provider);
          setSigner(provider.getSigner());
          // TODO logic to identify the role of the user
          // setIsOwner(await jobApplicationServiceInstance.isOwner(provider.getSigner()));
        }

        ethereum.on('accountsChanged', onaAccountsChanged);

        ethereum.on('chainChanged', onChainChanged);

      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  useEffect(() => {
    connect();
    return () => {
      ethereum.removeListener('accountsChanged', onaAccountsChanged);
      ethereum.removeListener('chainChanged', onChainChanged);
    };
  }, []);

  return (
    <Container className="md-container">
      <Head>
        <title>Web3 Jobs</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Container>
        <h1>
          Welcome to <a href="#"> Web3 Jobs</a>
        </h1>
        {isConnected && <>
          {isOwner && isSupportedNetwork ? <OwnerView signer={signer} jobApplicationServiceInstance={jobApplicationServiceInstance} jobPostServiceInstance={jobPostServiceInstance} /> :
            isRecruiter && isSupportedNetwork ? <RecruiterView signer={signer} jobApplicationServiceInstance={jobApplicationServiceInstance} jobPostServiceInstance={jobPostServiceInstance} /> :
            isApplicant && isSupportedNetwork ? <ApplicantView signer={signer} jobApplicationServiceInstance={jobApplicationServiceInstance} jobPostServiceInstance={jobPostServiceInstance} /> :
            isSupportedNetwork && <UnregisteredView signer={signer} jobApplicationServiceInstance={jobApplicationServiceInstance} jobPostServiceInstance={jobPostServiceInstance} />}
        </>}
        {!hasMetaMask && <div className="alert alert-danger" role="alert"> You need Metamask to use this app.</div>}
        {!isSupportedNetwork && <div className="alert alert-danger" role="alert"> Web3 jobs is currently in beta. Only available on Goerli Tesnet. Change your metamask network!</div>}
      </Container>
      <footer className="cntr-footer">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className="text-secondary">Group 2 - Solidity Bootcamp</span>
        </a>
      </footer>
    </Container>
  );
}
