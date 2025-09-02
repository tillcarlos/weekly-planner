import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  className = ''
}) => {
  return (
    <div className={`text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 ${className}`}>
      <Icon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
      <h4 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h4>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};