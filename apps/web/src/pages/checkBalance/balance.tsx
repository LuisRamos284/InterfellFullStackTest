import { WalletEventType, WalletWithEventsResponse } from "commons";
import React from "react";

export const Balance: React.FC<{ wallet?: WalletWithEventsResponse }> = ({
  wallet,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

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

      <div>
        <h3 className="text-lg font-semibold text-blue-800 mb-4">
          Transaction History
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-blue-200 rounded-lg overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-blue-800">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-blue-800">
                  Amount
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-blue-800">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {wallet.events.map(
                ({ createdAt, transactionAmount, id, walletEventType }) => (
                  <tr key={id} className="hover:bg-blue-50">
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {formatDate(createdAt)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      ${transactionAmount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          walletEventType === WalletEventType.CREDIT
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {walletEventType}
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
