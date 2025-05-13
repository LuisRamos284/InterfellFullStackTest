import { WalletWithEventsResponse } from "commons";
import React from "react";
import { BalanceHistory } from "./history";

export const Balance: React.FC<{ wallet: WalletWithEventsResponse | null }> = ({
  wallet,
}) => {
  if (!wallet) return <></>;

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          Current Balance
        </h3>
        <p className="text-3xl font-bold text-blue-700">
          ${wallet.balance.toFixed(2)}
        </p>
      </div>

      <BalanceHistory events={wallet.events} />
    </div>
  );
};
