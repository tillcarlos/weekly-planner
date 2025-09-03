import React from 'react';
import { CheckCircle, Circle, MessageSquare, AlertTriangle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  htmlContent?: string;
  isCompleted: boolean;
  goalId?: string;
}

interface CheckoutMessage {
  id: string;
  message: string;
  timestamp: string;
}

interface DailyTaskCardProps {
  tasks: Task[];
  hasCheckedOut: boolean;
  checkoutMessage?: CheckoutMessage;
  netWorkTime?: string;
  day: string;
}

export const DailyTaskCard: React.FC<DailyTaskCardProps> = ({ 
  tasks, 
  hasCheckedOut, 
  checkoutMessage, 
  netWorkTime,
  day 
}) => {
  if (tasks.length === 0 && hasCheckedOut && !checkoutMessage) {
    return <div className="text-xs text-gray-500 p-2">No tasks planned</div>;
  }

  if (tasks.length === 0 && !hasCheckedOut) {
    return <div className="text-xs text-gray-500 p-2">No tasks planned</div>;
  }

  const completedTasks = tasks.filter(task => task.isCompleted);
  const incompleteTasks = tasks.filter(task => !task.isCompleted);

  return (
    <div className="space-y-2">
      {!hasCheckedOut && tasks.length > 0 && day === 'Wednesday' && (
        <div className="flex items-center mb-2">
          <AlertTriangle className="h-3 w-3 text-red-400 mr-1" />
          <span className="text-xs text-red-400">Missed Checkout</span>
        </div>
      )}

      {hasCheckedOut && checkoutMessage ? (
        <div className="space-y-2">
          <div>
            <div className="flex items-center mb-1">
              <MessageSquare className="h-3 w-3 text-cyan-400 mr-1" />
              <span className="text-xs font-medium text-cyan-400">CHECKOUT</span>
              <span className="text-xs text-gray-500 ml-auto">
                {netWorkTime && <span className="text-green-400 font-medium">{netWorkTime}</span>} {checkoutMessage.timestamp}
              </span>
            </div>
            <p 
              className="text-xs text-gray-300 mb-2"
              dangerouslySetInnerHTML={{ __html: checkoutMessage.message }}
            />
          </div>
          
          {completedTasks.length > 0 && (
            <div className="space-y-1">
              {completedTasks.map((task) => (
                <div key={task.id} className="flex items-center text-xs">
                  <CheckCircle className="h-2.5 w-2.5 text-lime-400 mr-1.5 flex-shrink-0" />
                  <span 
                    className="text-lime-400 line-through text-xs"
                    dangerouslySetInnerHTML={{ __html: task.htmlContent || task.title }}
                  />
                </div>
              ))}
            </div>
          )}
          
          {incompleteTasks.length > 0 && (
            <div className="space-y-1">
              {incompleteTasks.map((task) => (
                <div key={task.id} className="flex items-center text-xs">
                  <Circle className="h-2.5 w-2.5 text-gray-600 mr-1.5 flex-shrink-0" />
                  <span 
                    className="text-gray-300 text-xs"
                    dangerouslySetInnerHTML={{ __html: task.htmlContent || task.title }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        tasks.length > 0 && (
          <div className="space-y-1">
            {completedTasks.map((task) => (
              <div key={task.id} className="flex items-center text-xs">
                <CheckCircle className="h-2.5 w-2.5 text-lime-400 mr-1.5 flex-shrink-0" />
                <span 
                  className="text-lime-400 line-through text-xs"
                  dangerouslySetInnerHTML={{ __html: task.htmlContent || task.title }}
                />
              </div>
            ))}
            {incompleteTasks.map((task) => (
              <div key={task.id} className="flex items-center text-xs">
                <Circle className="h-2.5 w-2.5 text-gray-600 mr-1.5 flex-shrink-0" />
                <span 
                  className="text-gray-300 text-xs"
                  dangerouslySetInnerHTML={{ __html: task.htmlContent || task.title }}
                />
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};