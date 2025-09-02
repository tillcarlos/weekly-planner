import React from 'react';
import { CheckCircle, Circle, MessageSquare, Trophy } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  htmlContent?: string;
  isCompleted: boolean;
}

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

interface TeamMember {
  id: string;
  name: string;
  goals: Goal[];
  tasks: Task[];
  checkoutMessage?: CheckoutMessage;
  hasCheckedOut: boolean;
  avatarColor: string;
  loginTime: string;
  loginTimeAgo: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const goallessTasks = member.tasks.filter(task => !task.goalId);
  
  const isGoalCompleted = (goalId: string) => {
    const goalTasks = member.tasks.filter(task => task.goalId === goalId);
    return goalTasks.length > 0 && goalTasks.every(task => task.isCompleted);
  };

  return (
    <div className="bg-gray-950 rounded-lg p-6 border border-gray-800 relative">
      <div className="absolute top-4 right-4 text-right">
        <div className="text-xs text-gray-400">{member.loginTime}</div>
        <div className="text-xs text-gray-500">{member.loginTimeAgo}</div>
      </div>
      
      <div className="flex items-center mb-4 pr-16">
        <div className={`w-10 h-10 rounded-full ${member.avatarColor} flex items-center justify-center text-black font-bold mr-3`}>
          {member.name.charAt(0)}
        </div>
        <h3 className="text-xl font-bold text-white">{member.name}</h3>
      </div>
      
      {member.hasCheckedOut ? (
        <div className="space-y-3">
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 text-cyan-400 mr-2" />
            <span className="text-sm font-medium text-cyan-400">CHECKOUT</span>
            <span className="text-xs text-gray-500 ml-auto">{member.checkoutMessage?.timestamp}</span>
          </div>
          <p className="text-sm text-gray-300">{member.checkoutMessage?.message}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {member.goals.map((goal) => {
            const goalTasks = member.tasks.filter(task => task.goalId === goal.id);
            const completed = isGoalCompleted(goal.id);
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 
                    className={`text-sm font-medium ${completed ? 'text-yellow-400' : 'text-gray-300'}`}
                    dangerouslySetInnerHTML={{ __html: goal.htmlContent || goal.title }}
                  />
                  {completed && <Trophy className="h-4 w-4 text-yellow-400" />}
                </div>
                
                <div className="ml-4 space-y-1">
                  {goalTasks.map((task) => (
                    <div key={task.id} className="flex items-center text-xs">
                      {task.isCompleted ? (
                        <CheckCircle className="h-3 w-3 text-lime-400 mr-2" />
                      ) : (
                        <Circle className="h-3 w-3 text-gray-600 mr-2" />
                      )}
                      <span 
                        className={`${task.isCompleted ? 'text-lime-400 line-through' : 'text-gray-500'}`}
                        dangerouslySetInnerHTML={{ __html: task.htmlContent || task.title }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {goallessTasks.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-400">Other Tasks</h4>
              <div className="ml-4 space-y-1">
                {goallessTasks.map((task) => (
                  <div key={task.id} className="flex items-center text-xs">
                    {task.isCompleted ? (
                      <CheckCircle className="h-3 w-3 text-lime-400 mr-2" />
                    ) : (
                      <Circle className="h-3 w-3 text-gray-600 mr-2" />
                    )}
                    <span 
                      className={`${task.isCompleted ? 'text-lime-400 line-through' : 'text-gray-500'}`}
                      dangerouslySetInnerHTML={{ __html: task.htmlContent || task.title }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="text-center text-gray-500 py-2 text-sm border-t border-gray-800 mt-4">
            Not checked out yet
          </div>
        </div>
      )}
    </div>
  );
};