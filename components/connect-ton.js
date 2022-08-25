import { useState, useEffect } from "react";
import Callout from "nextra-theme-docs/callout";

export default () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const connect = async () => {
    const provider = window.ton;

    console.log("isTonMask=", provider.isTonMask);
    try {
      const accounts = await provider.send("ton_requestAccounts");
      const account = accounts[0];
      setAddress(account);

      const balance = await provider.send("ton_getBalance");
      setBalance(String(Number(balance) / 1000000000));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <div className="py-8">
      <button
        onClick={connect}
        className="py-3 px-5 mb-3 bg-[#88d3ff] text-black text-lg"
      >
        Connect TonMask
      </button>
      {address && (
        <Callout emoji="✅">
          {address}
          <br />
          {balance} TON
        </Callout>
      )}
    </div>
  );
};
