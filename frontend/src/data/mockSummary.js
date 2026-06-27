/**
 * Simulates an AI generating a business health summary based on input points.
 */
export const generateAISummary = async (inputs) => {
  const { title, keyWins, risks, recommendedActions } = inputs;
  
  // Simulate network delay for AI generation
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Heuristic to determine health status based on text length/keywords
  let status = 'average';
  const riskStr = risks.toLowerCase();
  const winStr = keyWins.toLowerCase();
  
  if (winStr.length > riskStr.length * 1.5 || winStr.includes('record') || winStr.includes('surge')) {
    status = 'excellent';
  } else if (winStr.length > riskStr.length) {
    status = 'good';
  } else if (riskStr.includes('shortage') || riskStr.includes('cost') || riskStr.includes('delay') || riskStr.includes('down')) {
    status = 'average';
  }

  // Generate Executive Summary
  const executiveSummary = `This executive summary for "${title || 'the current period'}" highlights the operational and financial performance of Manivtha Tours & Travels. Based on the provided inputs, the business health is currently categorized as ${status}. While there are notable successes, strategic management of upcoming risks will be vital for sustained growth.`;

  // Parse bullet points
  const parseLines = (text) => text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  return {
    executiveSummary,
    wins: parseLines(keyWins).length > 0 ? parseLines(keyWins) : ['No specific wins recorded.'],
    risks: parseLines(risks).length > 0 ? parseLines(risks) : ['No major risks identified.'],
    recommendations: parseLines(recommendedActions).length > 0 ? parseLines(recommendedActions) : ['Maintain current operational strategies.'],
    status,
    timestamp: new Date().toISOString()
  };
};
