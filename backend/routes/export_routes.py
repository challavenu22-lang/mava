from flask import Blueprint, jsonify, send_file
from app import db
from models.report import Report
from services.pdf_service import create_pdf
from utils.auth import login_required

export_bp = Blueprint('export', __name__)

@export_bp.route('/export/pdf/<string:report_id>', methods=['GET'])
@login_required
def export_pdf(current_user, report_id):
    report = Report.query.filter_by(id=report_id, user_id=current_user.id).first()
    if not report:
        return jsonify({'error': 'Report not found'}), 404
        
    try:
        pdf_buffer = create_pdf(report)
        return send_file(
            pdf_buffer,
            as_attachment=True,
            download_name=f"Summary_Report_{report.id}.pdf",
            mimetype='application/pdf'
        )
    except Exception as e:
        return jsonify({'error': f"Failed to generate PDF: {str(e)}"}), 500
