import React from 'react';

function CampaignComparison({ campaigns }) {
  const calculateAdaptations = (parameters) => {
    return Object.values(parameters).reduce((total, value) => total * (parseInt(value) || 1), 1);
  };

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Comparativa de Campañas</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-indigo-100">
              <th className="px-4 py-2 text-left text-indigo-800">Campaña</th>
              <th className="px-4 py-2 text-left text-indigo-800">Adaptaciones</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-2">{campaign.name}</td>
                <td className="px-4 py-2">{calculateAdaptations(campaign.parameters)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CampaignComparison;