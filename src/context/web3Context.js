import { createContext, useContext } from "react";
import { useSigningWeb3Client } from './web3Hook';

const Web3Context = createContext(null);

export const useSigningClient = () => {
  const {
    web3,
    loading,
    pending,
    chainID,
    walletAddress,
    balance,

    loadWeb3,
    connectWallet,
    disconnect,
    checkNetwork,
    updateBalances,

    getTotalPresaleAmount,
    getMaxPresaleCap,
    getMinPresaleCap,
    getStartPresaleTime,
    getEndPresaleTime,
    getpTokenPriceForBUSD,
    getBNBForBUSD,
    getBUSDForBNB,
    getUserPaidBUSD,
    getETRPriceInWeb3,
    getRebaseFrequency,
    getNextRebase,
    getMarketCap,
    getTotalEarned,

    buy_pToken,

    setPresaleStartTime,
    setPresaleEndTime,
    setFeesOnNormalTransfer,
    setInitialDistributionFinished,
    setMaxCap,
    setMinCap,
    setFeeReceivers,
    setFees
  } = useContext(Web3Context)
  return {
    web3,
    loading,
    pending,
    chainID,
    walletAddress,
    balance,

    loadWeb3,
    connectWallet,
    disconnect,
    checkNetwork,
    updateBalances,

    getTotalPresaleAmount,
    getMaxPresaleCap,
    getMinPresaleCap,
    getStartPresaleTime,
    getEndPresaleTime,
    getpTokenPriceForBUSD,
    getBNBForBUSD,
    getBUSDForBNB,
    getUserPaidBUSD,
    getETRPriceInWeb3,
    getRebaseFrequency,
    getNextRebase,
    getMarketCap,
    getTotalEarned,

    buy_pToken,

    setPresaleStartTime,
    setPresaleEndTime,
    setFeesOnNormalTransfer,
    setInitialDistributionFinished,
    setMaxCap,
    setMinCap,
    setFeeReceivers,
    setFees
  }
}

export const SingingWeb3Provider = ({ children }) => {
  const value = useSigningWeb3Client();
  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}