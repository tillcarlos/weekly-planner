import React from 'react';
import { MainNav } from '../components/MainNav';
import { DailyTaskCard } from '../components/DailyTaskCard';
import { CheckCircle, Circle, Trophy } from 'lucide-react';

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
  netWorkTime?: string;
}

interface DailyData {
  [memberId: string]: {
    [day: string]: {
      tasks: Task[];
      hasCheckedOut: boolean;
      checkoutMessage?: CheckoutMessage;
      netWorkTime?: string;
    };
  };
}

const mockTeamData: TeamMember[] = [
  {
    id: '1',
    name: 'Till',
    goals: [
      { id: '1', title: 'Ship user auth system', htmlContent: 'Ship <b>user auth system</b> with OAuth integration', isCompleted: true },
      { id: '2', title: 'Weekly planner MVP', htmlContent: 'Complete <u>weekly planner MVP</u> frontend', isCompleted: false }
    ],
    tasks: [],
    hasCheckedOut: false,
    avatarColor: 'bg-cyan-500',
    loginTime: '08:45',
    loginTimeAgo: '7h ago'
  },
  {
    id: '2',
    name: 'Abel',
    goals: [
      { id: '3', title: 'Database optimization', htmlContent: '<b>Database optimization</b> for team queries', isCompleted: true },
      { id: '4', title: 'API rate limiting', htmlContent: 'Implement <u>API rate limiting</u> system', isCompleted: false }
    ],
    tasks: [],
    hasCheckedOut: false,
    avatarColor: 'bg-emerald-400',
    loginTime: '09:15',
    loginTimeAgo: '6h ago'
  },
  {
    id: '3',
    name: 'Fred',
    goals: [
      { id: '5', title: 'Deploy monitoring setup', htmlContent: 'Setup <b>monitoring</b> with Grafana + Prometheus', isCompleted: false },
      { id: '6', title: 'CI/CD pipeline', htmlContent: 'Implement <u>CI/CD pipeline</u> for automated testing', isCompleted: true }
    ],
    tasks: [],
    hasCheckedOut: false,
    avatarColor: 'bg-purple-400',
    loginTime: '07:30',
    loginTimeAgo: '8h ago'
  },
  {
    id: '4',
    name: 'Jo',
    goals: [
      { id: '7', title: 'UX research interviews', htmlContent: 'Conduct <b>5 user interviews</b> for planner app', isCompleted: false },
      { id: '8', title: 'Design system updates', htmlContent: 'Update <u>design system</u> components', isCompleted: false }
    ],
    tasks: [],
    hasCheckedOut: false,
    avatarColor: 'bg-orange-400',
    loginTime: '10:20',
    loginTimeAgo: '5h ago'
  }
];

const mockDailyData: DailyData = {
  '1': { // Till
    'Monday': {
      tasks: [
        { id: '1', title: 'Review PR #142', htmlContent: 'Review <a href="#" class="text-cyan-400 underline">PR #142</a> authentication flow', isCompleted: true, goalId: '1' },
        { id: '2', title: 'Deploy to staging', htmlContent: 'Deploy auth system to <i>staging environment</i>', isCompleted: true, goalId: '1' }
      ],
      hasCheckedOut: true,
      checkoutMessage: { id: '1', message: 'PR reviewed and deployed to staging successfully.', timestamp: '17:30' },
      netWorkTime: '8.5h'
    },
    'Tuesday': {
      tasks: [
        { id: '3', title: 'Finalize auth system', htmlContent: 'Finalize <b>user auth system</b>', isCompleted: true, goalId: '1' },
        { id: '4', title: 'Build team overview page', htmlContent: 'Create <b>team overview</b> dashboard', isCompleted: true, goalId: '2' }
      ],
      hasCheckedOut: true,
      checkoutMessage: { id: '2', message: 'Auth system complete! Started on team dashboard.', timestamp: '18:00' },
      netWorkTime: '9.2h'
    },
    'Wednesday': {
      tasks: [
        { id: '5', title: 'Fix login redirect bug', htmlContent: 'Fix <i>login redirect</i> bug in Safari', isCompleted: false, goalId: '2' },
        { id: '6', title: 'Weekly view component', htmlContent: 'Build weekly planner view', isCompleted: true, goalId: '2' }
      ],
      hasCheckedOut: false
    },
    'Thursday': {
      tasks: [
        { id: '7', title: 'Finalize weekly planner', htmlContent: 'Complete <b>weekly planner MVP</b>', isCompleted: false, goalId: '2' }
      ],
      hasCheckedOut: false
    },
    'Friday': {
      tasks: [],
      hasCheckedOut: false
    },
    'Saturday': {
      tasks: [],
      hasCheckedOut: false
    }
  },
  '2': { // Abel
    'Monday': {
      tasks: [
        { id: '8', title: 'Index team_memberships table', htmlContent: 'Add index to <code>team_memberships</code> table', isCompleted: true, goalId: '3' },
        { id: '9', title: 'Test query performance', htmlContent: 'Benchmark <i>query performance</i> improvements', isCompleted: true, goalId: '3' }
      ],
      hasCheckedOut: true,
      checkoutMessage: { id: '3', message: 'Database indexing complete, <b>40% performance improvement</b>.', timestamp: '16:45' },
      netWorkTime: '7.5h'
    },
    'Tuesday': {
      tasks: [
        { id: '10', title: 'Finalize DB optimization', htmlContent: 'Finalize <b>database optimization</b>', isCompleted: true, goalId: '3' },
        { id: '11', title: 'Design rate limiting', htmlContent: 'Design <b>rate limiting</b> with Redis', isCompleted: true, goalId: '4' }
      ],
      hasCheckedOut: true,
      checkoutMessage: { id: '4', message: 'DB optimization done! Rate limiting architecture ready.', timestamp: '17:15' },
      netWorkTime: '8.0h'
    },
    'Wednesday': {
      tasks: [
        { id: '12', title: 'Implement rate limiting', htmlContent: 'Build <b>API rate limiting</b> system', isCompleted: false, goalId: '4' },
        { id: '13', title: 'Load testing', htmlContent: 'Run load tests on new system', isCompleted: true, goalId: '4' }
      ],
      hasCheckedOut: false
    },
    'Thursday': {
      tasks: [
        { id: '14', title: 'Finalize rate limiting', htmlContent: 'Complete <b>API rate limiting</b>', isCompleted: false, goalId: '4' }
      ],
      hasCheckedOut: false
    },
    'Friday': {
      tasks: [],
      hasCheckedOut: false
    },
    'Saturday': {
      tasks: [],
      hasCheckedOut: false
    }
  },
  '3': { // Fred
    'Monday': {
      tasks: [
        { id: '15', title: 'GitHub Actions workflow', htmlContent: 'Create <i>GitHub Actions</i> test workflow', isCompleted: true, goalId: '6' },
        { id: '16', title: 'Deploy pipeline setup', htmlContent: 'Setup deployment pipeline', isCompleted: true, goalId: '6' }
      ],
      hasCheckedOut: true,
      checkoutMessage: { id: '5', message: 'CI/CD pipeline setup complete and deployed.', timestamp: '18:15' },
      netWorkTime: '10.8h'
    },
    'Tuesday': {
      tasks: [
        { id: '17', title: 'Finalize CI/CD', htmlContent: 'Finalize <b>CI/CD pipeline</b>', isCompleted: true, goalId: '6' },
        { id: '18', title: 'Grafana setup', htmlContent: 'Setup <a href="#" class="text-cyan-400 underline">Grafana dashboards</a>', isCompleted: true, goalId: '5' }
      ],
      hasCheckedOut: true,
      checkoutMessage: { id: '6', message: 'Pipeline live! Grafana dashboards configured.', timestamp: '17:45' },
      netWorkTime: '9.5h'
    },
    'Wednesday': {
      tasks: [
        { id: '19', title: 'Prometheus alerts', htmlContent: 'Configure monitoring alerts', isCompleted: false, goalId: '5' },
        { id: '20', title: 'Dashboard testing', htmlContent: 'Test all monitoring dashboards', isCompleted: true, goalId: '5' }
      ],
      hasCheckedOut: false
    },
    'Thursday': {
      tasks: [
        { id: '21', title: 'Finalize monitoring', htmlContent: 'Complete <b>monitoring setup</b>', isCompleted: false, goalId: '5' }
      ],
      hasCheckedOut: false
    },
    'Friday': {
      tasks: [],
      hasCheckedOut: false
    },
    'Saturday': {
      tasks: [],
      hasCheckedOut: false
    }
  },
  '4': { // Jo
    'Monday': {
      tasks: [
        { id: '22', title: 'Button component variants', htmlContent: 'Design <a href="#" class="text-cyan-400 underline">button variants</a> in Figma', isCompleted: true, goalId: '8' },
        { id: '23', title: 'Schedule interviews', htmlContent: 'Book <i>user interviews</i> this week', isCompleted: true, goalId: '7' }
      ],
      hasCheckedOut: true,
      checkoutMessage: { id: '7', message: 'Button variants designed, 3 interviews scheduled.', timestamp: '16:30' },
      netWorkTime: '6.5h'
    },
    'Tuesday': {
      tasks: [
        { id: '24', title: 'Conduct interviews', htmlContent: 'Run <b>user interviews</b> sessions', isCompleted: true, goalId: '7' },
        { id: '25', title: 'Update color tokens', htmlContent: 'Update <i>color tokens</i> in design system', isCompleted: false, goalId: '8' }
      ],
      hasCheckedOut: true,
      checkoutMessage: { id: '8', message: 'Completed 2 user interviews, great insights gathered.', timestamp: '15:45' },
      netWorkTime: '5.8h'
    },
    'Wednesday': {
      tasks: [
        { id: '26', title: 'Interview analysis', htmlContent: 'Analyze user feedback', isCompleted: false, goalId: '7' },
        { id: '27', title: 'Design system docs', htmlContent: 'Update design system documentation', isCompleted: false, goalId: '8' }
      ],
      hasCheckedOut: false
    },
    'Thursday': {
      tasks: [
        { id: '28', title: 'Final interview', htmlContent: 'Complete last <b>user interview</b>', isCompleted: false, goalId: '7' }
      ],
      hasCheckedOut: false
    },
    'Friday': {
      tasks: [
        { id: '29', title: 'Finalize research', htmlContent: 'Complete <b>UX research report</b>', isCompleted: false, goalId: '7' }
      ],
      hasCheckedOut: false
    },
    'Saturday': {
      tasks: [],
      hasCheckedOut: false
    }
  }
};

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getDayWithDate = (dayName: string, dayIndex: number) => {
  // Sept 2-7, 2024 week
  const startDate = 2; // Monday Sept 2
  const dayAbbr = dayName.substring(0, 3);
  const date = startDate + dayIndex;
  return `${dayAbbr}, Sept ${date}`;
};

const UserRow: React.FC<{ member: TeamMember; isFirst: boolean }> = ({ member, isFirst }) => {
  const isGoalCompleted = (goalId: string) => {
    const allGoalTasks = [];
    for (const day of weekDays) {
      const dayData = mockDailyData[member.id]?.[day];
      if (dayData) {
        const goalTasks = dayData.tasks.filter(task => task.goalId === goalId);
        allGoalTasks.push(...goalTasks);
      }
    }
    return allGoalTasks.length > 0 && allGoalTasks.every(task => task.isCompleted);
  };

  return (
    <div>
      {/* User name header with day labels */}
      <div className="flex border-b border-gray-800">
        <div className="w-80 py-1 px-4">
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded-full ${member.avatarColor} flex items-center justify-center text-black font-bold text-xs mr-2`}>
              {member.name.charAt(0)}
            </div>
            <h3 className="text-base font-bold text-white">{member.name}</h3>
          </div>
        </div>
        
        {/* Day headers with names */}
        {weekDays.map((day, index) => {
          return (
            <div key={day} className="flex-1 min-w-48 py-1 px-3 flex justify-end items-end">
              <span className="text-xs text-gray-500 font-medium">
                {isFirst ? getDayWithDate(day, index) : ''}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Row content */}
      <div className="flex">
        {/* Goals column */}
        <div className="w-80 border-r border-gray-800 p-4">
          <div className="space-y-3">
            {member.goals.map((goal) => {
              const completed = isGoalCompleted(goal.id);
              
              // Find unassigned, incomplete tasks for this goal
              const unassignedIncompleteTasks = [];
              for (const day of weekDays) {
                const dayData = mockDailyData[member.id]?.[day];
                if (dayData) {
                  const goalTasks = dayData.tasks.filter(task => 
                    task.goalId === goal.id && !task.isCompleted
                  );
                  unassignedIncompleteTasks.push(...goalTasks);
                }
              }
              
              return (
                <div key={goal.id} className="space-y-1">
                  <h4 
                    className={`text-sm font-medium ${completed ? 'text-yellow-400' : 'text-gray-300'}`}
                    dangerouslySetInnerHTML={{ __html: (goal.htmlContent || goal.title) + (completed ? ' 🏆' : '') }}
                  />
                  
                  {unassignedIncompleteTasks.length > 0 && (
                    <div className="ml-2 space-y-1">
                      {unassignedIncompleteTasks.slice(0, 3).map((task) => (
                        <div key={task.id} className="flex items-center text-xs">
                          <Circle className="h-2 w-2 text-gray-600 mr-1 flex-shrink-0" />
                          <span 
                            className="text-gray-400 text-xs"
                            dangerouslySetInnerHTML={{ __html: task.htmlContent || task.title }}
                          />
                        </div>
                      ))}
                      {unassignedIncompleteTasks.length > 3 && (
                        <div className="text-xs text-gray-500 ml-3">
                          +{unassignedIncompleteTasks.length - 3} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Day columns */}
        {weekDays.map((day) => {
          const dayData = mockDailyData[member.id]?.[day];
          return (
            <div key={day} className="flex-1 min-w-48 border-r border-gray-800 p-3">
              <DailyTaskCard
                tasks={dayData?.tasks || []}
                hasCheckedOut={dayData?.hasCheckedOut || false}
                checkoutMessage={dayData?.checkoutMessage}
                netWorkTime={dayData?.netWorkTime}
                day={day}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const WeeklyOverviewPage: React.FC = () => {
  const currentWeek = 'Sept 2-7, 2024';

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNav />
      <div className="max-w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Weekly Overview</h1>
          <div className="text-gray-300">
            <div className="text-xl">Week View</div>
            <div className="text-lg">{currentWeek}</div>
          </div>
        </div>
        
        <div className="overflow-hidden">
          {/* User rows */}
          <div className="space-y-6">
            {mockTeamData.map((member, index) => (
              <UserRow key={member.id} member={member} isFirst={index === 0} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};