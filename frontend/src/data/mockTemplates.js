export const mockTemplates = [
  {
    id: 't_average',
    title: 'Average Performance',
    description: 'Typical month with steady revenue but minor operational delays and rising fuel costs.',
    status: 'average',
    data: {
      title: 'Monthly Summary - Typical Operations',
      keyWins: 'Maintained all major corporate shuttle contracts.\nZero safety incidents reported.\nCompleted routine maintenance on the bus fleet.',
      risks: 'Fuel costs increased by 10%, impacting general profit margins.\nMinor delays on inter-city routes due to driver call-outs.',
      recommendedActions: 'Implement eco-driving training for all staff.\nEstablish a backup driver pool for emergency coverage.\nReview pricing structure for retail routes.'
    }
  },
  {
    id: 't_good',
    title: 'Good Performance',
    description: 'Strong corporate contract retention, positive feedback, and minor scheduling or staffing issues.',
    status: 'good',
    data: {
      title: 'Monthly Summary - Steady Progress',
      keyWins: 'Renewed 3 annual corporate contracts successfully.\nSuccessfully implemented the new route planning software.\nOnboarded 2 new qualified drivers.',
      risks: 'Competition from local airport transfer providers is increasing.\nSlight increase in customer support tickets regarding delays.',
      recommendedActions: 'Launch a loyalty program for corporate clients.\nAudit route schedules to resolve frequent customer transfer delays.\nIncrease digital ad spend on airport transfer services.'
    }
  },
  {
    id: 't_excellent',
    title: 'Excellent Performance',
    description: 'Record booking volume, fully utilized fleet, and high client satisfaction.',
    status: 'excellent',
    data: {
      title: 'Monthly Summary - Record Month',
      keyWins: 'Achieved record high booking volume for group tours.\n100% vehicle utilization rate achieved during weekends.\nReceived positive reviews from 95% of retail tourists.',
      risks: 'Drivers working near maximum hours, posing a risk of fatigue.\nSlightly longer wait times for ad-hoc vehicle servicing.',
      recommendedActions: 'Hire 3 additional contract drivers to ease the schedule.\nNegotiate a SLA with a local workshop for priority vehicle servicing.\nPurchase one new passenger van to meet excess weekend demand.'
    }
  }
];
