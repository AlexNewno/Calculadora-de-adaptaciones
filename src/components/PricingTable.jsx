import React from 'react';

const pricingTiers = [
  { range: '1-10', price: 90, discount: 0 },
  { range: '11-25', price: 80, discount: 5 },
  { range: '26-50', price: 65, discount: 10 },
  { range: '51-100', price: 55, discount: 15 },
  { range: '101-250', price: 45, discount: 20 },
  { range: '251-500', price: 35, discount: 25 },
  { range: '501+', price: 25, discount: 30 },
];

function PricingTable() {
  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Tarifario Escalonado</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-indigo-100">
              <th className="px-4 py-2 text-left text-indigo-800">Adaptaciones</th>
              <th className="px-4 py-2 text-left text-indigo-800">Precio/Adaptación</th>
              <th className="px-4 py-2 text-left text-indigo-800">Descuento</th>
            </tr>
          </thead>
          <tbody>
            {pricingTiers.map((tier, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-2">{tier.range}</td>
                <td className="px-4 py-2">{tier.price} €</td>
                <td className="px-4 py-2">{tier.discount}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PricingTable;