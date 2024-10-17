import React, { useState } from 'react';

const parameters = [
  { name: 'formats', label: 'Formatos', description: 'Total de formatos requeridos (Ejemplo: 20)' },
  { name: 'audiences', label: 'Audiencias / CTA / contenido diferente', description: 'Volumen de audiencias deseado (Ejemplo: 3 audiencias - Jóvenes, Familias, Parejas)' },
  { name: 'products', label: 'Producto/servicio', description: 'Número de productos por campaña (Ejemplo: 1)' },
  { name: 'approach', label: 'Enfoque de campaña', description: 'Enfoques creativos que se desean testear (Ejemplo: Un único enfoque)' },
  { name: 'languages', label: 'Idiomas', description: 'Idiomas requeridos (Ejemplo: Castellano y catalán)' },
  { name: 'retargeting', label: 'Retargeting', description: 'Definición de retargeting (2 si se realiza, 1 si no; Ejemplo: campaña con retargeting)' },
];

function CampaignForm({ campaign, updateCampaign, removeCampaign }) {
  const [name, setName] = useState(campaign.name);
  const [values, setValues] = useState(campaign.parameters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    updateCampaign(campaign.id, { parameters: { ...values, [name]: value } });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    updateCampaign(campaign.id, { name: e.target.value });
  };

  const resetForm = () => {
    const resetValues = Object.fromEntries(parameters.map(param => [param.name, '1']));
    setValues(resetValues);
    updateCampaign(campaign.id, { parameters: resetValues });
  };

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 bg-transparent"
        />
        <div className="flex space-x-2">
          <button onClick={resetForm} className="text-gray-500 hover:text-indigo-600 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button onClick={() => removeCampaign(campaign.id)} className="text-red-500 hover:text-red-600 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      {parameters.map((param) => (
        <div key={param.name} className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={param.name}>
            {param.label}
          </label>
          <div className="flex items-center">
            <input
              className="input-field flex-grow"
              id={param.name}
              type="number"
              name={param.name}
              value={values[param.name] || ''}
              onChange={handleChange}
              min="1"
            />
            <span className="ml-2 text-gray-500">{param.name === 'retargeting' ? (values[param.name] === '2' ? 'Sí' : 'No') : ''}</span>
          </div>
          <p className="text-gray-500 text-xs mt-1">{param.description}</p>
        </div>
      ))}
    </div>
  );
}

export default CampaignForm;