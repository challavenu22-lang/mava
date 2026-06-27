import os
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable

def create_pdf(report):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter,
                            rightMargin=72, leftMargin=72,
                            topMargin=72, bottomMargin=18)
    
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name='CenterTitle', alignment=1, fontSize=18, spaceAfter=20, fontName='Helvetica-Bold'))
    styles.add(ParagraphStyle(name='SectionHeader', fontSize=14, spaceAfter=10, spaceBefore=15, fontName='Helvetica-Bold', textColor=colors.HexColor('#5B5CEB')))
    
    Story = []
    
    # Title
    Story.append(Paragraph(f"AI Business Health Summary", styles['CenterTitle']))
    Story.append(Paragraph(f"Report: {report.title}", styles['Heading2']))
    Story.append(Paragraph(f"Date: {report.created_at.strftime('%Y-%m-%d') if report.created_at else 'N/A'}", styles['Normal']))
    Story.append(Paragraph(f"Status: {report.status}", styles['Normal']))
    
    Story.append(Spacer(1, 12))
    Story.append(HRFlowable(width="100%", thickness=1, color=colors.lightgrey, spaceBefore=1, spaceAfter=1))
    Story.append(Spacer(1, 12))
    
    # Executive Summary
    Story.append(Paragraph("Executive Summary", styles['SectionHeader']))
    Story.append(Paragraph(report.executive_summary, styles['Normal']))
    
    # Key Insights
    Story.append(Paragraph("Key Insights", styles['SectionHeader']))
    for insight in report.key_insights:
        Story.append(Paragraph(f"• {insight}", styles['Normal']))
        Story.append(Spacer(1, 4))
        
    # Recommendations
    Story.append(Paragraph("Recommendations", styles['SectionHeader']))
    for rec in report.recommendations:
        Story.append(Paragraph(f"• {rec}", styles['Normal']))
        Story.append(Spacer(1, 4))
        
    doc.build(Story)
    buffer.seek(0)
    return buffer
