import React, { useState, useEffect } from 'react';
import CampaignForm from './components/CampaignForm';
import PricingTable from './components/PricingTable';
import TotalCost from './components/TotalCost';
import CampaignComparison from './components/CampaignComparison';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

function App() {
  const [campaigns, setCampaigns] = useState([{ id: 1, name: 'Campaña 1', parameters: {} }]);
  const [totalAdaptations, setTotalAdaptations] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const addCampaign = () => {
    const newId = campaigns.length + 1;
    setCampaigns([...campaigns, { id: newId, name: `Campaña ${newId}`, parameters: {} }]);
  };

  const updateCampaign = (id, updatedCampaign) => {
    const updatedCampaigns = campaigns.map(campaign =>
      campaign.id === id ? { ...campaign, ...updatedCampaign } : campaign
    );
    setCampaigns(updatedCampaigns);
  };

  const removeCampaign = (id) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
  };

  useEffect(() => {
    calculateTotals(campaigns);
  }, [campaigns]);

  const calculateTotals = (updatedCampaigns) => {
    const totalAdapt = updatedCampaigns.reduce((sum, campaign) => sum + calculateAdaptations(campaign.parameters), 0);
    setTotalAdaptations(totalAdapt);
    setTotalCost(calculateCost(totalAdapt));
  };

  const calculateAdaptations = (parameters) => {
    return Object.values(parameters).reduce((total, value) => total * (parseInt(value) || 1), 1);
  };

  const calculateCost = (adaptations) => {
    const pricingTiers = [
      { max: 10, price: 90 },
      { max: 25, price: 80 },
      { max: 50, price: 65 },
      { max: 100, price: 55 },
      { max: 250, price: 45 },
      { max: 500, price: 35 },
      { max: Infinity, price: 25 }
    ];

    let remainingAdaptations = adaptations;
    let totalCost = 0;

    for (const tier of pricingTiers) {
      if (remainingAdaptations <= 0) break;
      const adaptationsInTier = Math.min(remainingAdaptations, tier.max);
      totalCost += adaptationsInTier * tier.price;
      remainingAdaptations -= adaptationsInTier;
    }

    return totalCost;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Add logo
    const logoUrl = "https://newno.marketing/wp-content/uploads/NewnoLab-Barbara.png";
    doc.addImage(logoUrl, 'PNG', 15, 10, 50, 20);
    
    // Add title
    doc.setFontSize(20);
    doc.text("Resumen de Adaptaciones de Campaña", 15, 50);
    
    // Add campaign details
    doc.setFontSize(12);
    let yPos = 60;
    campaigns.forEach((campaign, index) => {
      doc.text(`${campaign.name}:`, 15, yPos);
      yPos += 10;
      Object.entries(campaign.parameters).forEach(([key, value]) => {
        doc.text(`${key}: ${value}`, 20, yPos);
        yPos += 5;
      });
      yPos += 5;
    });
    
    // Add total adaptations and cost
    doc.setFontSize(14);
    doc.text(`Total de Adaptaciones: ${totalAdaptations}`, 15, yPos);
    yPos += 10;
    doc.text(`Costo Total: ${totalCost.toFixed(2)} €`, 15, yPos);
    
    // Save the PDF
    doc.save("resumen_campana.pdf");
  };

  return (
    <div className="min-h-screen gradient-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <img src="https://newno.marketing/wp-content/uploads/NewnoLab-Barbara.png" alt="Newno Lab Logo" className="mx-auto mb-6" style={{maxWidth: '250px'}} />
          <h1 className="text-4xl font-extrabold text-white mb-2">Calculadora de Adaptaciones de Campaña</h1>
          <p className="text-xl text-indigo-100">Optimiza tus costos de campaña con nuestra calculadora inteligente</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {campaigns.map(campaign => (
              <CampaignForm
                key={campaign.id}
                campaign={campaign}
                updateCampaign={updateCampaign}
                removeCampaign={removeCampaign}
              />
            ))}
            <button
              onClick={addCampaign}
              className="btn w-full"
            >
              Añadir Campaña
            </button>
          </div>
          <div className="space-y-6">
            <PricingTable />
            <TotalCost totalAdaptations={totalAdaptations} totalCost={totalCost} />
            <CampaignComparison campaigns={campaigns} />
            <button onClick={downloadPDF} className="btn w-full">
              Descargar Resumen PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;