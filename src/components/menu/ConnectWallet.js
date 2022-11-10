import { useEffect } from "react";
import { useSigningClient } from "../../context/web3Context";
import { isEmpty } from "../../utils";

const ConnectWallet = () => {
  const {
    web3,
    walletAddress,
    loadWeb3,
    connectWallet,
    disconnect,
    updateBalances
  } = useSigningClient();

  const handleConnect = async () => {
    await connectWallet();
  }

  const handleDisconnect = () => {
    disconnect();
  }

  const loadWallet = async () => {
    await loadWeb3();
    const account = localStorage.getItem('address');
    if (!isEmpty(account)) {
      await connectWallet();
    }
  }

  useEffect(() => {
    loadWallet();
  }, []);

  useEffect(() => {
    if (web3) {
      updateBalances();
    }
  }, [web3]);

  return (
    <div className='connect-wallet'>
      {isEmpty(walletAddress) ? (
        <button className='btn-main2' onClick={handleConnect}>Connect Wallet</button>
      ) : (
        <div className="flex items-center btn-main !px-[20px] !py-[10px]">
          <img alt='' className='w-5 h-5 text-white mr-2' src={'/images/icons/wallet.png'} />
          <span className="text-[14px]" onClick={handleDisconnect}>{walletAddress.slice(0, 4) + "..." + walletAddress.slice(38)}</span>
        </div>
      )}
    </div>
  )
}

export default ConnectWallet;