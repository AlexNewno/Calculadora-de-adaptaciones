import React from 'react';

function TotalCost({ totalAdaptations, totalCost }) {
  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Resumen de Costos</h2>
      <div className="mb-4">
        <p className="text-lg">Total de Adaptaciones: <span className="font-bold text-indigo-600">{totalAdaptations}</span></p>
      </div>
      <div>
        <p className="text-lg">Costo Total: <span className="font-bold text-indigo-600">{totalCost.toFixed(2)} €</span></p>
      </div>
    </div>
  );
}

export default TotalCost;