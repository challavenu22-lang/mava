export const mockAnalytics = {
  totalReports: 24,
  averageRating: 4.6,
  thisMonthReports: 3,
  mostUsedTemplate: 'Driver Shortage Issue',
  qualityTrend: [
    { month: 'Jan', score: 4.2 },
    { month: 'Feb', score: 4.5 },
    { month: 'Mar', score: 4.4 },
    { month: 'Apr', score: 4.7 },
    { month: 'May', score: 4.8 },
    { month: 'Jun', score: 4.9 }
  ],
  reportActivity: [
    { month: 'Jan', count: 3 },
    { month: 'Feb', count: 4 },
    { month: 'Mar', count: 5 },
    { month: 'Apr', count: 3 },
    { month: 'May', count: 6 },
    { month: 'Jun', count: 3 }
  ],
  topRisks: [
    { name: 'Fuel Costs', percentage: 35 },
    { name: 'Driver Shortage', percentage: 25 },
    { name: 'Vehicle Maintenance', percentage: 20 },
    { name: 'Low Retail Demand', percentage: 15 },
    { name: 'Other', percentage: 5 }
  ],
  topActions: [
    { name: 'Optimize Routes', value: 8 },
    { name: 'Hire Contract Drivers', value: 6 },
    { name: 'Expand Corporate Sales', value: 5 },
    { name: 'Delay Non-essential Maintenance', value: 3 }
  ]
};
