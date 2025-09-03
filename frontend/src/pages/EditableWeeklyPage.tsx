import React, { useState } from 'react';
import { MainNav } from '../components/MainNav';
import { CheckCircle, Circle, MessageSquare, AlertTriangle, Plus, X, Edit3 } from 'lucide-react';

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

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getDayWithDate = (dayName: string, dayIndex: number) => {
  const startDate = 2;
  const dayAbbr = dayName.substring(0, 3);
  const date = startDate + dayIndex;
  return `${dayAbbr}, Sept ${date}`;
};

const InlineGoalCreator: React.FC<{
  onAdd: (title: string) => void;
  onCancel: () => void;
}> = ({ onAdd, onCancel }) => {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim()) {
      onAdd(value.trim());
      setValue('');
      onCancel();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New goal title..."
        className="flex-1 bg-gray-800 text-white text-sm px-2 py-1 rounded border border-gray-600 focus:outline-none focus:border-cyan-400"
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <button onClick={onCancel} className="text-gray-400 hover:text-gray-300 cursor-pointer">
        <X className="h-3 w-3" />
      </button>
    </div>
  );
};

const InlineTaskCreator: React.FC<{
  onAdd: (title: string) => void;
  onCancel: () => void;
}> = ({ onAdd, onCancel }) => {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim()) {
      onAdd(value.trim());
      setValue('');
      onCancel();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <Circle className="h-2.5 w-2.5 text-gray-600 mr-1.5 flex-shrink-0" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New task..."
        className="flex-1 bg-gray-800 text-white text-xs px-2 py-1 rounded border border-gray-600 focus:outline-none focus:border-cyan-400"
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <button onClick={onCancel} className="text-gray-400 hover:text-gray-300 cursor-pointer">
        <X className="h-3 w-3" />
      </button>
    </div>
  );
};

const EditableTask: React.FC<{
  task: Task;
  day: string;
  onToggle: () => void;
  onEdit: (newTitle: string) => void;
  onDelete: () => void;
  canEdit: boolean;
}> = ({ task, day, onToggle, onEdit, onDelete, canEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleSave = () => {
    onEdit(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(task.title);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center text-xs space-x-1">
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="flex-1 bg-gray-800 text-white text-xs px-2 py-1 rounded border border-gray-600 focus:outline-none focus:border-cyan-400"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
          autoFocus
        />
        <button onClick={handleSave} className="text-green-400 hover:text-green-300 cursor-pointer">
          ✓
        </button>
        <button onClick={handleCancel} className="text-gray-400 hover:text-gray-300 cursor-pointer">
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center text-xs group">
      <button
        onClick={onToggle}
        disabled={!canEdit}
        className={`mr-1.5 flex-shrink-0 ${!canEdit ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {task.isCompleted ? (
          <CheckCircle className="h-2.5 w-2.5 text-lime-400" />
        ) : (
          <Circle className="h-2.5 w-2.5 text-gray-600" />
        )}
      </button>
      <span 
        className={`flex-1 text-xs ${task.isCompleted ? 'text-lime-400 line-through' : 'text-gray-300'}`}
        dangerouslySetInnerHTML={{ __html: task.htmlContent || task.title }}
      />
      {canEdit && (
        <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1 ml-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-gray-300 cursor-pointer"
          >
            <Edit3 className="h-3 w-3" />
          </button>
          <button
            onClick={onDelete}
            className="text-gray-500 hover:text-red-400 cursor-pointer"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
};

const EditableGoal: React.FC<{
  goal: Goal;
  onEdit: (newTitle: string) => void;
  onDelete: () => void;
  isCompleted: boolean;
}> = ({ goal, onEdit, onDelete, isCompleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(goal.title);

  const handleSave = () => {
    onEdit(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(goal.title);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center text-xs space-x-1">
        <div className={`w-2.5 h-2.5 rounded-full mr-1.5 flex-shrink-0 ${isCompleted ? 'bg-yellow-400' : 'bg-gray-600'}`}></div>
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="flex-1 bg-gray-800 text-white text-xs px-2 py-1 rounded border border-gray-600 focus:outline-none focus:border-cyan-400"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
          autoFocus
        />
        <button onClick={handleSave} className="text-green-400 hover:text-green-300 cursor-pointer">
          ✓
        </button>
        <button onClick={handleCancel} className="text-gray-400 hover:text-gray-300 cursor-pointer">
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center text-xs group">
      <div className={`w-2.5 h-2.5 rounded-full mr-1.5 flex-shrink-0 ${isCompleted ? 'bg-yellow-400' : 'bg-gray-600'}`}></div>
      <span 
        className={`flex-1 text-xs ${isCompleted ? 'text-yellow-400' : 'text-gray-300'} cursor-pointer`}
        onClick={() => setIsEditing(true)}
        dangerouslySetInnerHTML={{ __html: (goal.htmlContent || goal.title) + (isCompleted ? ' 🏆' : '') }}
      />
      <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1 ml-2">
        <button
          onClick={onDelete}
          className="text-gray-500 hover:text-red-400 cursor-pointer"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

const EditableDailyCard: React.FC<{
  tasks: Task[];
  day: string;
  hasCheckedOut: boolean;
  checkoutMessage?: CheckoutMessage;
  netWorkTime?: string;
  onTaskToggle: (taskId: string) => void;
  onTaskEdit: (taskId: string, newTitle: string) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskAdd: (title: string) => void;
}> = ({ 
  tasks, 
  day, 
  hasCheckedOut, 
  checkoutMessage, 
  netWorkTime,
  onTaskToggle,
  onTaskEdit,
  onTaskDelete,
  onTaskAdd
}) => {
  const canEdit = true; // In /me view, all days are editable
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

      {hasCheckedOut && checkoutMessage && (
        <div className="space-y-2 mb-4">
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
      )}

      <div className="space-y-1">
        {completedTasks.map((task) => (
          <div key={task.id} className="flex items-center text-xs">
            <CheckCircle className="h-3 w-3 text-lime-400 mr-2" />
            <span 
              className="text-lime-400 line-through"
              dangerouslySetInnerHTML={{ __html: task.htmlContent || task.title }}
            />
          </div>
        ))}
        {incompleteTasks.map((task) => (
          <div key={task.id} className="flex items-center text-xs">
            <Circle className="h-3 w-3 text-gray-600 mr-2" />
            <span 
              className="text-gray-300"
              dangerouslySetInnerHTML={{ __html: task.htmlContent || task.title }}
            />
          </div>
        ))}
        
        {canEdit && <AddTaskButton onTaskAdd={onTaskAdd} />}
      </div>
    </div>
  );
};

const AddTaskButton: React.FC<{ onTaskAdd: (title: string) => void }> = ({ onTaskAdd }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (title: string) => {
    onTaskAdd(title);
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <InlineTaskCreator
        onAdd={handleAdd}
        onCancel={() => setIsAdding(false)}
      />
    );
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className="flex items-center text-xs text-gray-500 hover:text-gray-300 transition w-full justify-start cursor-pointer"
    >
      <Plus className="h-2.5 w-2.5 mr-1.5" />
      <span>Add task</span>
    </button>
  );
};

const AddGoalButton: React.FC<{ onGoalAdd: (title: string) => void }> = ({ onGoalAdd }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (title: string) => {
    onGoalAdd(title);
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <InlineGoalCreator
        onAdd={handleAdd}
        onCancel={() => setIsAdding(false)}
      />
    );
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className="flex items-center text-sm text-gray-500 hover:text-gray-300 transition w-full justify-start cursor-pointer"
    >
      <Plus className="h-3 w-3 mr-2" />
      <span>Add goal</span>
    </button>
  );
};

export const EditableWeeklyPage: React.FC = () => {
  const currentWeek = 'Sept 2-7, 2024';

  // Single user data - "me"
  const [userData, setUserData] = useState<TeamMember>({
    id: 'me',
    name: 'You',
    goals: [
      { id: '1', title: 'Ship user auth system', htmlContent: 'Ship <b>user auth system</b> with OAuth integration', isCompleted: true },
      { id: '2', title: 'Weekly planner MVP', htmlContent: 'Complete <u>weekly planner MVP</u> frontend', isCompleted: false },
      { id: '3', title: 'Setup deployment pipeline', htmlContent: 'Configure <i>CI/CD pipeline</i> with automated testing', isCompleted: false }
    ],
    tasks: [],
    hasCheckedOut: false,
    avatarColor: 'bg-cyan-500',
    loginTime: '08:45',
    loginTimeAgo: '7h ago'
  });

  const [dailyData, setDailyData] = useState<DailyData>({
    'me': {
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
    }
  });

  const [nextTaskId, setNextTaskId] = useState(100);
  const [nextGoalId, setNextGoalId] = useState(100);

  const addGoal = (title: string) => {
    const newGoal: Goal = {
      id: `goal-${nextGoalId}`,
      title: title,
      isCompleted: false
    };

    setUserData(prev => ({ ...prev, goals: [...prev.goals, newGoal] }));
    setNextGoalId(prev => prev + 1);
  };

  const editGoal = (goalId: string, newTitle: string) => {
    setUserData(prev => ({
      ...prev,
      goals: prev.goals.map(goal =>
        goal.id === goalId ? { ...goal, title: newTitle, htmlContent: newTitle } : goal
      )
    }));
  };

  const deleteGoal = (goalId: string) => {
    setUserData(prev => ({ ...prev, goals: prev.goals.filter(goal => goal.id !== goalId) }));
  };

  const addTask = (day: string, title: string, goalId?: string) => {
    const newTask: Task = {
      id: `task-${nextTaskId}`,
      title: title,
      isCompleted: false,
      goalId: goalId
    };

    setDailyData(prev => ({
      ...prev,
      me: {
        ...prev.me,
        [day]: {
          ...prev.me?.[day],
          tasks: [...(prev.me?.[day]?.tasks || []), newTask],
          hasCheckedOut: prev.me?.[day]?.hasCheckedOut || false
        }
      }
    }));
    setNextTaskId(prev => prev + 1);
  };

  const editTask = (day: string, taskId: string, newTitle: string) => {
    setDailyData(prev => ({
      ...prev,
      me: {
        ...prev.me,
        [day]: {
          ...prev.me[day],
          tasks: prev.me[day].tasks.map(task =>
            task.id === taskId ? { ...task, title: newTitle, htmlContent: newTitle } : task
          )
        }
      }
    }));
  };

  const toggleTask = (day: string, taskId: string) => {
    setDailyData(prev => ({
      ...prev,
      me: {
        ...prev.me,
        [day]: {
          ...prev.me[day],
          tasks: prev.me[day].tasks.map(task =>
            task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
          )
        }
      }
    }));
  };

  const deleteTask = (day: string, taskId: string) => {
    setDailyData(prev => ({
      ...prev,
      me: {
        ...prev.me,
        [day]: {
          ...prev.me[day],
          tasks: prev.me[day].tasks.filter(task => task.id !== taskId)
        }
      }
    }));
  };

  const isGoalCompleted = (goalId: string) => {
    const allGoalTasks = [];
    for (const day of weekDays) {
      const dayData = dailyData.me?.[day];
      if (dayData) {
        const goalTasks = dayData.tasks.filter(task => task.goalId === goalId);
        allGoalTasks.push(...goalTasks);
      }
    }
    return allGoalTasks.length > 0 && allGoalTasks.every(task => task.isCompleted);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNav />
      <div className="max-w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Weekly Planner</h1>
          <div className="text-gray-300">
            <div className="text-xl">Edit Mode</div>
            <div className="text-lg">{currentWeek}</div>
          </div>
        </div>
        
        {/* Goals Section - Top Priority */}
        <div className="mb-6 border-b border-gray-800 pb-4">
          <h2 className="text-base font-bold text-white mb-4">My Weekly Goals</h2>
          
          <div className="flex gap-8">
            {userData.goals.map((goal) => {
              const completed = isGoalCompleted(goal.id);
              const goalTasks = Object.values(dailyData.me || {}).flatMap(dayData => 
                dayData.tasks.filter(task => task.goalId === goal.id)
              );
              
              return (
                <div key={goal.id} className="w-80 space-y-2">
                  <EditableGoal
                    goal={goal}
                    onEdit={(newTitle) => editGoal(goal.id, newTitle)}
                    onDelete={() => deleteGoal(goal.id)}
                    isCompleted={completed}
                  />
                  
                  {/* Tasks for this goal */}
                  <div className="ml-4 space-y-1">
                    {goalTasks.filter(task => task.isCompleted).map((task) => (
                      <div key={task.id} className="flex items-center text-xs">
                        <CheckCircle className="h-2.5 w-2.5 text-lime-400 mr-1.5" />
                        <span 
                          className="text-lime-400 line-through"
                          dangerouslySetInnerHTML={{ __html: task.htmlContent || task.title }}
                        />
                      </div>
                    ))}
                    {goalTasks.filter(task => !task.isCompleted).map((task) => (
                      <div key={task.id} className="flex items-center text-xs">
                        <Circle className="h-2.5 w-2.5 text-gray-600 mr-1.5" />
                        <span 
                          className="text-gray-300"
                          dangerouslySetInnerHTML={{ __html: task.htmlContent || task.title }}
                        />
                      </div>
                    ))}
                    
                    <button
                      onClick={() => {
                        const taskTitle = prompt('Enter task title:');
                        if (taskTitle) {
                          // Add to current day (Wednesday for now) with goalId
                          addTask('Wednesday', taskTitle, goal.id);
                        }
                      }}
                      className="flex items-center text-xs text-gray-500 hover:text-gray-300 transition cursor-pointer"
                    >
                      <Plus className="h-2.5 w-2.5 mr-1.5" />
                      <span>Add task</span>
                    </button>
                  </div>
                </div>
              );
            })}
            
            <div className="w-80 space-y-2">
              <AddGoalButton onGoalAdd={addGoal} />
              
              {/* Goalless tasks */}
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-400">Other Tasks</h3>
                <div className="ml-4 space-y-1">
                  {Object.values(dailyData.me || {}).flatMap(dayData => 
                    dayData.tasks.filter(task => !task.goalId)
                  ).filter(task => task.isCompleted).map((task) => (
                    <div key={task.id} className="flex items-center text-xs">
                      <CheckCircle className="h-2.5 w-2.5 text-lime-400 mr-1.5" />
                      <span 
                        className="text-lime-400 line-through"
                        dangerouslySetInnerHTML={{ __html: task.htmlContent || task.title }}
                      />
                    </div>
                  ))}
                  {Object.values(dailyData.me || {}).flatMap(dayData => 
                    dayData.tasks.filter(task => !task.goalId)
                  ).filter(task => !task.isCompleted).map((task) => (
                    <div key={task.id} className="flex items-center text-xs">
                      <Circle className="h-2.5 w-2.5 text-gray-600 mr-1.5" />
                      <span 
                        className="text-gray-300"
                        dangerouslySetInnerHTML={{ __html: task.htmlContent || task.title }}
                      />
                    </div>
                  ))}
                  
                  <button
                    onClick={() => {
                      const taskTitle = prompt('Enter task title:');
                      if (taskTitle) {
                        addTask('Wednesday', taskTitle);
                      }
                    }}
                    className="flex items-center text-xs text-gray-500 hover:text-gray-300 transition cursor-pointer"
                  >
                    <Plus className="h-2.5 w-2.5 mr-1.5" />
                    <span>Add task</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Tasks Section */}
        <div className="overflow-hidden">
          <div>
            {/* User header with day labels */}
            <div className="flex border-b border-gray-800">
              <div className="w-80 py-1 px-4">
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full ${userData.avatarColor} flex items-center justify-center text-black font-bold text-xs mr-2`}>
                    {userData.name.charAt(0)}
                  </div>
                  <h3 className="text-base font-bold text-white">{userData.name}</h3>
                </div>
              </div>
              
              {/* Day headers with names */}
              {weekDays.map((day, index) => {
                return (
                  <div key={day} className="flex-1 min-w-48 py-1 px-3 flex justify-end items-end">
                    <span className="text-xs text-gray-500 font-medium">
                      {getDayWithDate(day, index)}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Row content */}
            <div className="flex">
              {/* Goals column - empty for now, goals are above */}
              <div className="w-80 border-r border-gray-800 p-4">
              </div>
              
              {/* Day columns */}
              {weekDays.map((day) => {
                const dayData = dailyData.me?.[day];
                return (
                  <div key={day} className="flex-1 min-w-48 border-r border-gray-800 p-3">
                    <EditableDailyCard
                      tasks={dayData?.tasks || []}
                      day={day}
                      hasCheckedOut={dayData?.hasCheckedOut || false}
                      checkoutMessage={dayData?.checkoutMessage}
                      netWorkTime={dayData?.netWorkTime}
                      onTaskToggle={(taskId) => toggleTask(day, taskId)}
                      onTaskEdit={(taskId, newTitle) => editTask(day, taskId, newTitle)}
                      onTaskDelete={(taskId) => deleteTask(day, taskId)}
                      onTaskAdd={(title) => addTask(day, title)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};