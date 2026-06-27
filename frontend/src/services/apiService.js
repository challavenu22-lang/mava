import { dummyData, saveDummyData } from './dummyData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getDashboardStats = async () => {
  await delay(500); // Simulate network latency
  
  // Calculate dynamic average rating based on all drivers and vehicles
  let totalRating = 0;
  let count = 0;
  
  dummyData.drivers.forEach(d => {
    const rating = parseFloat(d.rating);
    if (!isNaN(rating)) { totalRating += rating; count++; }
  });
  
  dummyData.vehicles.forEach(v => {
    const rating = parseFloat(v.rating);
    if (!isNaN(rating)) { totalRating += rating; count++; }
  });
  
  const avgRating = count > 0 ? (totalRating / count).toFixed(1) : "0.0";

  return {
    ...dummyData.dashboard.stats,
    averageRating: parseFloat(avgRating),
    totalReports: dummyData.history.length,
    monthlyReports: dummyData.history.length > 0 ? dummyData.history.length : 0,
    totalDrivers: dummyData.drivers.length,
    totalVehicles: dummyData.vehicles.length
  };
};

export const getRecentReports = async () => {
  await delay(500);
  // Derive recent reports directly from the history array so they stay in perfect sync
  return dummyData.history.slice(0, 5).map(item => ({
    id: item.id,
    title: item.title,
    date: item.date,
    status: item.status,
    rating: 4.5
  }));
};

export const getHistory = async () => {
  await delay(800);
  return dummyData.history;
};

export const getTemplates = async () => {
  await delay(400);
  return dummyData.templates;
};

export const getAnalytics = async () => {
  await delay(1000);
  return dummyData.analytics;
};

export const generateSummary = async (payload) => {
  await delay(2000); // Simulate AI generation delay
  
  const dateStr = new Date().toISOString().split('T')[0];
  const title = payload.title || 'Custom Generated Summary';
  
  // Create dynamic content based on user inputs
  const wins = payload.wins ? payload.wins : 'maintained steady operations';
  const risks = payload.risks ? payload.risks : 'standard operational overhead';
  const actions = payload.actions ? payload.actions : 'continue monitoring metrics';

  const previewText = `For the period ending ${dateStr}, operations focused on "${title}". The identified key wins highlight that we ${wins}. However, the risks mentioned (${risks}) require immediate strategic alignment. Moving forward, we intend to ${actions} to ensure continued stability and growth.`;
  
  // Determine status based on the title (which comes from template name)
  let determinedStatus = 'OK';
  const upperTitle = title.toUpperCase();
  if (upperTitle.includes('GOOD')) determinedStatus = 'GOOD';
  else if (upperTitle.includes('EXCELLENT')) determinedStatus = 'EXCELLENT';
  else if (upperTitle.includes('AVERAGE')) determinedStatus = 'AVERAGE';
  else if (upperTitle.includes('OK')) determinedStatus = 'OK';
  
  // Only update history (Dashboard stats/recent reports are now derived dynamically from history)
  
  dummyData.history.unshift({
    id: `H-${Math.floor(Math.random() * 10000)}`,
    title: title,
    date: dateStr,
    status: determinedStatus,
    preview: previewText
  });
  saveDummyData();

  // Create dynamic bullet points
  const keyInsights = [
    `Performance overview: Successfully ${wins.substring(0, 50)}...`,
    `Identified bottleneck: ${risks.substring(0, 60)}...`,
    `Strategic alignment with current operational capabilities looks positive.`
  ];

  const recommendations = [
    `Immediate Action: ${actions.substring(0, 50)}...`,
    `Monitor the identified risks on a weekly basis to prevent escalation.`,
    `Share these specific findings (${title}) with the regional transport managers.`
  ];

  return {
    executiveSummary: previewText,
    keyInsights: keyInsights,
    recommendations: recommendations,
    qualityScore: (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1), // Random score between 4.2 and 5.0
    status: determinedStatus
  };
};

export const deleteReport = async (id) => {
  await delay(300);
  
  // Remove from history
  const historyIndex = dummyData.history.findIndex(item => item.id === id);
  if (historyIndex > -1) {
    dummyData.history.splice(historyIndex, 1);
    saveDummyData();
  }
  
  // Since dashboard and stats are now derived dynamically from history, we don't need to manually update them here.
  
  return true;
};

// Driver CRUD
export const getDrivers = async () => {
  await delay(300);
  return [...dummyData.drivers];
};

export const addDriver = async (driver) => {
  await delay(300);
  const newDriver = {
    id: `D-${Math.floor(Math.random() * 10000)}`,
    name: driver.name,
    age: parseInt(driver.age, 10) || 0,
    rating: parseFloat(driver.rating) || 5.0
  };
  dummyData.drivers.push(newDriver);
  saveDummyData();
  return newDriver;
};

export const updateDriver = async (id, updatedData) => {
  await delay(300);
  const index = dummyData.drivers.findIndex(d => d.id === id);
  if (index > -1) {
    dummyData.drivers[index] = {
      ...dummyData.drivers[index],
      name: updatedData.name,
      age: parseInt(updatedData.age, 10) || 0,
      rating: parseFloat(updatedData.rating) || 5.0
    };
    saveDummyData();
    return dummyData.drivers[index];
  }
  throw new Error("Driver not found");
};

export const deleteDriver = async (id) => {
  await delay(300);
  dummyData.drivers = dummyData.drivers.filter(d => d.id !== id);
  saveDummyData();
  return true;
};

// Vehicle CRUD
export const getVehicles = async () => {
  await delay(300);
  return [...dummyData.vehicles];
};

export const addVehicle = async (vehicle) => {
  await delay(300);
  const newVehicle = {
    id: `V-${Math.floor(Math.random() * 10000)}`,
    name: vehicle.name,
    registration: vehicle.registration,
    rating: parseFloat(vehicle.rating) || 5.0
  };
  dummyData.vehicles.push(newVehicle);
  saveDummyData();
  return newVehicle;
};

export const updateVehicle = async (id, updatedData) => {
  await delay(300);
  const index = dummyData.vehicles.findIndex(v => v.id === id);
  if (index > -1) {
    dummyData.vehicles[index] = {
      ...dummyData.vehicles[index],
      name: updatedData.name,
      registration: updatedData.registration,
      rating: parseFloat(updatedData.rating) || 5.0
    };
    saveDummyData();
    return dummyData.vehicles[index];
  }
  throw new Error("Vehicle not found");
};

export const deleteVehicle = async (id) => {
  await delay(300);
  dummyData.vehicles = dummyData.vehicles.filter(v => v.id !== id);
  saveDummyData();
  return true;
};
