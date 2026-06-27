import os
from google import genai
from google.genai import types
import json

SYSTEM_PROMPT = """
You are an expert business analyst for transport and tourism companies.
You are tasked with generating a monthly business health summary based on provided inputs.

Generate a comprehensive report containing:
1. Executive Summary (a well-written paragraph summarizing the health)
2. Key Wins (a list of 3-5 positive insights)
3. Risks (a list of 3-5 potential issues or risks)
4. Recommended Actions (a list of 3-5 actionable recommendations)
5. Overall Business Health Score: Must be exactly one of: "EXCELLENT", "GOOD", "AVERAGE", "OK"

You must strictly output ONLY valid JSON matching this exact structure:
{
    "executive_summary": "string",
    "key_insights": ["string"],
    "recommendations": ["string"],
    "status": "string"
}
"""

def generate_ai_summary(title, key_wins, risks, recommended_actions):
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not configured")
        
    client = genai.Client(api_key=api_key)
    
    prompt = f"""
    Report Title: {title}
    Inputs provided by user:
    - Key Wins: {key_wins}
    - Risks: {risks}
    - Recommended Actions: {recommended_actions}
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-pro',
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                response_mime_type="application/json",
                temperature=0.2
            )
        )
        
        # Parse the JSON response
        result = json.loads(response.text)
        
        # Ensure status matches expected enum exactly, default to OK if parsing fails
        valid_statuses = ["EXCELLENT", "GOOD", "AVERAGE", "OK"]
        if result.get("status") not in valid_statuses:
            result["status"] = "OK"
            
        return result
        
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        # Return fallback data in case of failure or quota limits
        return {
            "executive_summary": f"Failed to generate summary via AI. Using fallback data based on: {key_wins}. The main risks identified are {risks}.",
            "key_insights": ["System fallback insight 1", "System fallback insight 2"],
            "recommendations": ["Ensure API keys are valid", "Check AI service limits"],
            "status": "OK"
        }
