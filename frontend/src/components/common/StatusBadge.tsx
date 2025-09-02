// src/components/common/StatusBadge.tsx
import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

type AccountStatus = 'pending' | 'active' | 'suspended' | 'terminated' | 'inactive' | 'error';

interface StatusBadgeProps {
  status: AccountStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const configs = {
    pending: { 
      color: 'bg-yellow-100 text-yellow-800', 
      icon: Clock,
      label: 'Pending'
    },
    active: { 
      color: 'bg-green-100 text-green-800', 
      icon: CheckCircle,
      label: 'Active'
    },
    suspended: { 
      color: 'bg-red-100 text-red-800', 
      icon: XCircle,
      label: 'Suspended'
    },
    terminated: { 
      color: 'bg-gray-100 text-gray-800', 
      icon: XCircle,
      label: 'Terminated'
    },
    inactive: { 
      color: 'bg-gray-100 text-gray-600', 
      icon: XCircle,
      label: 'Inactive'
    },
    error: { 
      color: 'bg-red-100 text-red-800', 
      icon: XCircle,
      label: 'Error'
    }
  };
  
  const config = configs[status] || configs.pending;
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.color} ${className}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
};

export default StatusBadge;
