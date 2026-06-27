import React from 'react';
import { FileCheck, FileText } from 'lucide-react';

export const REPORT_STATUSES = {
  AVERAGE: 'average',
  GOOD: 'good',
  EXCELLENT: 'excellent'
};

export const STATUS_LABEL_MAP = {
  [REPORT_STATUSES.AVERAGE]: 'Average',
  [REPORT_STATUSES.GOOD]: 'Good',
  [REPORT_STATUSES.EXCELLENT]: 'Excellent'
};

export const STATUS_STYLE_MAP = {
  [REPORT_STATUSES.EXCELLENT]: {
    badgeClass: 'badge-excellent',
    dashboardBadgeClass: 'excellent',
    icon: <FileCheck size={20} />,
    iconColor: '#10b981',
    iconBg: '#ecfdf5',
    btnBorderColor: '#10b981',
    btnTextColor: '#10b981',
    btnHoverBg: '#ecfdf5',
    borderColor: '#10b981', // for Templates page border
    previewBg: '#ecfdf5',    // for Templates page preview bg
    btnBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' // for Templates page button gradient
  },
  [REPORT_STATUSES.GOOD]: {
    badgeClass: 'badge-good',
    dashboardBadgeClass: 'good',
    icon: <FileText size={20} />,
    iconColor: '#3b82f6',
    iconBg: '#eff6ff',
    btnBorderColor: '#3b82f6',
    btnTextColor: '#3b82f6',
    btnHoverBg: '#eff6ff',
    borderColor: '#bfdbfe',
    previewBg: '#eff6ff',
    btnBg: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
  },
  [REPORT_STATUSES.AVERAGE]: {
    badgeClass: 'badge-average',
    dashboardBadgeClass: 'average',
    icon: <FileText size={20} />,
    iconColor: '#f59e0b',
    iconBg: '#fff7ed',
    btnBorderColor: '#f59e0b',
    btnTextColor: '#f59e0b',
    btnHoverBg: '#fff7ed',
    borderColor: '#fed7aa',
    previewBg: '#fff7ed',
    btnBg: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
  }
};
