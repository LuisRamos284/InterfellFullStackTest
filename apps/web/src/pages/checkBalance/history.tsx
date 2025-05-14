import { WalletEventAttributes, WalletEventType } from "commons";
import React from "react";
import { formatMoney } from "../../utils/formatMoney";

export const BalanceHistory: React.FC<{ events: WalletEventAttributes[] }> = ({
  events,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (!events.length) return <></>;

  return (
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
              <th className="py-3 px-4 text-left text-sm font-semibold text-blue-800">
                Final balance
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            {events.map(
              ({
                createdAt,
                transactionAmount,
                id,
                walletEventType,
                balance,
              }) => (
                <tr key={id} className="hover:bg-blue-50">
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {formatDate(createdAt)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {formatMoney(transactionAmount)}
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
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {formatMoney(balance)}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
