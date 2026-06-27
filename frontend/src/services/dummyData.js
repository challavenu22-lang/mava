const INITIAL_DUMMY_DATA = {
  dashboard: {
    stats: {
      totalReports: 124,
      averageRating: 4.8,
      monthlyReports: 12,
      mostUsedTemplate: 'Risk Assessment'
    },
    recentReports: [
      { id: 'R-1021', title: 'June 2026 Fleet Maintenance', date: '2026-06-25', status: 'GOOD', rating: 4.5 },
      { id: 'R-1020', title: 'Q2 Driver Satisfaction', date: '2026-06-20', status: 'EXCELLENT', rating: 5.0 },
      { id: 'R-1019', title: 'Fuel Expense Analysis', date: '2026-06-15', status: 'OK', rating: 2.1 },
      { id: 'R-1018', title: 'Customer Feedback - May', date: '2026-06-10', status: 'AVERAGE', rating: 3.5 }
    ]
  },
  templates: [
    { id: 'T-1', name: 'Good', description: 'Template for highly rated monthly feedback.', icon: 'star', color: 'success' },
    { id: 'T-2', name: 'Average', description: 'Analyze impact and propose recruitment strategies.', icon: 'users', color: 'warning' },
    { id: 'T-3', name: 'Excellent', description: 'Breakdown of route efficiency and fuel costs.', icon: 'trending-down', color: 'danger' },
    { id: 'T-4', name: 'OK', description: 'Action plan for increasing seasonal bookings.', icon: 'alert-circle', color: 'secondary' }
  ],
  history: [
    { id: 'H-100', title: 'May 2026 Operations', date: '2026-05-31', status: 'GOOD', preview: 'Operations were smooth despite minor delays in...' },
    { id: 'H-99', title: 'April 2026 Operations', date: '2026-04-30', status: 'AVERAGE', preview: 'Fuel costs rose by 12% due to global market...' },
    { id: 'H-98', title: 'March 2026 Operations', date: '2026-03-31', status: 'EXCELLENT', preview: 'Highest booking rate achieved in Q1 with 98%...' },
    { id: 'H-97', title: 'February 2026 Operations', date: '2026-02-28', status: 'OK', preview: 'Driver shortage impacted 5 major routes...' },
    { id: 'H-96', title: 'January 2026 Operations', date: '2026-01-31', status: 'GOOD', preview: 'Stable start to the year. Minor fleet repairs...' }
  ],
  analytics: {
    monthlyReports: [
      { name: 'Jan', reports: 8 },
      { name: 'Feb', reports: 12 },
      { name: 'Mar', reports: 15 },
      { name: 'Apr', reports: 10 },
      { name: 'May', reports: 14 },
      { name: 'Jun', reports: 18 }
    ],
    averageQuality: [
      { name: 'Jan', quality: 4.2 },
      { name: 'Feb', quality: 3.8 },
      { name: 'Mar', quality: 4.8 },
      { name: 'Apr', quality: 4.1 },
      { name: 'May', quality: 4.5 },
      { name: 'Jun', quality: 4.7 }
    ],
    commonRisks: [
      { name: 'Fuel', value: 400 },
      { name: 'Drivers', value: 300 },
      { name: 'Maintenance', value: 300 },
      { name: 'Weather', value: 200 }
    ],
    topRecommendations: [
      'Implement Eco-driving training program',
      'Renegotiate fuel vendor contracts',
      'Launch seasonal driver recruitment campaign',
      'Optimize Route 4 and Route 7 schedules'
    ]
  },
  drivers: [
    { id: 'D-1', name: 'Rajesh Kumar', age: 28, rating: 4.0 },
    { id: 'D-2', name: 'Amit Patel', age: 32, rating: 5.0 },
    { id: 'D-3', name: 'Suresh Yadav', age: 45, rating: 4.0 },
    { id: 'D-4', name: 'Vikram Singh', age: 30, rating: 4.0 },
    { id: 'D-5', name: 'Manoj Das', age: 29, rating: 3.0 },
  ],
  vehicles: [
    { id: 'V-1', name: 'Tempo Traveller', registration: 'TN 01 AB 1234', rating: 5.0 },
    { id: 'V-2', name: 'Innova Crysta', registration: 'TN 01 CD 5678', rating: 4.0 },
    { id: 'V-3', name: 'Bus', registration: 'TN 01 EF 9012', rating: 4.0 },
    { id: 'V-4', name: 'Mini Bus', registration: 'TN 01 GH 3456', rating: 3.0 },
    { id: 'V-5', name: 'Innova', registration: 'TN 01 IJ 7890', rating: 5.0 },
  ]
};

const STORAGE_KEY = 'appDummyData';

const getInitialData = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing stored dummy data', e);
    }
  }
  return INITIAL_DUMMY_DATA;
};

export const dummyData = getInitialData();

export const saveDummyData = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));
};
