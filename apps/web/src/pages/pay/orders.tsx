import { ClientPurchaseAttributes } from "commons";
import React from "react";

export const OrdersHistory: React.FC<{
  orders: Omit<ClientPurchaseAttributes, "token">[];
}> = ({ orders }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (!orders.length) return <></>;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">
        Orders History
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-blue-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-blue-800">
                Date
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-blue-800">
                Product
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            {orders.map(({ createdAt, id, productId }) => (
              <tr key={id} className="hover:bg-blue-50">
                <td className="py-3 px-4 text-sm text-gray-700">
                  {formatDate(createdAt)}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">{productId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
