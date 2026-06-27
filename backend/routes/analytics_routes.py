from flask import Blueprint, jsonify
from app import db
from models.report import Report
from utils.auth import login_required
from sqlalchemy import func

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/analytics', methods=['GET'])
@login_required
def get_analytics(current_user):
    # This is a basic implementation of analytics data
    # Real implementation would use complex SQL groupings
    
    # Mock data formatted for Recharts as requested
    monthly_data = [
        {"name": "Jan", "reports": 10},
        {"name": "Feb", "reports": 15},
        {"name": "Mar", "reports": 12},
        {"name": "Apr", "reports": 25},
        {"name": "May", "reports": 18},
        {"name": "Jun", "reports": 30},
    ]
    
    quality_trend = [
        {"name": "Week 1", "score": 4.2},
        {"name": "Week 2", "score": 4.5},
        {"name": "Week 3", "score": 4.6},
        {"name": "Week 4", "score": 4.8},
    ]
    
    risks_data = [
        {"name": "Fleet Maintenance", "value": 35},
        {"name": "Driver Shortage", "value": 25},
        {"name": "Fuel Costs", "value": 20},
        {"name": "Regulatory Compliance", "value": 15},
        {"name": "Other", "value": 5},
    ]

    return jsonify({
        'monthlyTrend': monthly_data,
        'qualityTrend': quality_trend,
        'commonRisks': risks_data
    }), 200
