export const getAssistanceName = (assistanceTypeId = 1) => {
  const assistTanceList = [
    {
      id: 1,
      label: 'Wheels and Tires',
    },
    {
      id: 2,
      label: 'Battery Inspection (Jump Start)',
    },
    {
      id: 3,
      label: 'Overheating',
    },
    {
      id: 4,
      label: 'Engine Inspection',
    },
    {
      id: 5,
      label: 'Towing',
    },
    {
      id: 6,
      label: 'Vehicle Lockout',
    },
    {
      id: 7,
      label: 'Fuel Delivery',
    },
    {
      id: 8,
      label: 'General Inspection',
    },
  ];
  const assistanceTypeName = assistTanceList.find((service) => service.id === assistanceTypeId).label || '';
  return assistanceTypeName || 'ERROR GETTING TYPE';
};
