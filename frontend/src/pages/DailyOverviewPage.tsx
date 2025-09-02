import React from 'react';
import { TeamMemberCard } from '../components/TeamMemberCard';
import { MainNav } from '../components/MainNav';

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
  goalId?: string; // Link to goal, or null for goal-less tasks
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

const mockTeamData: TeamMember[] = [
  {
    id: '1',
    name: 'Till',
    goals: [
      { id: '1', title: 'Ship user auth system', htmlContent: 'Ship <b>user auth system</b> with OAuth integration', isCompleted: false },
      { id: '2', title: 'Weekly planner MVP', htmlContent: 'Complete <u>weekly planner MVP</u> frontend', isCompleted: false }
    ],
    tasks: [
      { id: '1', goalId: '1', title: 'Review PR #142', htmlContent: 'Review <a href="#" class="text-cyan-400 underline">PR #142</a> authentication flow', isCompleted: true },
      { id: '2', goalId: '1', title: 'Deploy to staging', htmlContent: 'Deploy auth system to <i>staging environment</i>', isCompleted: true },
      { id: '3', goalId: '1', title: 'Finalize goal', htmlContent: 'Finalize <b>user auth system</b>', isCompleted: true },
      { id: '4', goalId: '2', title: 'Build team overview page', htmlContent: 'Create <b>team overview</b> dashboard', isCompleted: true },
      { id: '5', goalId: '2', title: 'Fix login redirect bug', htmlContent: 'Fix <i>login redirect</i> bug in Safari', isCompleted: false },
      { id: '6', goalId: '2', title: 'Finalize goal', htmlContent: 'Finalize <b>weekly planner MVP</b>', isCompleted: false },
      { id: '7', title: 'Update CLAUDE.md', htmlContent: 'Update <u>CLAUDE.md</u> with new architecture', isCompleted: false }
    ],
    checkoutMessage: { id: '1', message: 'Auth system deployed to staging. Found Safari redirect issue, will fix tomorrow.', timestamp: '17:30' },
    hasCheckedOut: true,
    avatarColor: 'bg-cyan-500',
    loginTime: '08:45',
    loginTimeAgo: '7h ago'
  },
  {
    id: '2',
    name: 'Abel',
    goals: [
      { id: '3', title: 'Database optimization', htmlContent: '<b>Database optimization</b> for team queries', isCompleted: false },
      { id: '4', title: 'API rate limiting', htmlContent: 'Implement <u>API rate limiting</u> system', isCompleted: false }
    ],
    tasks: [
      { id: '8', goalId: '3', title: 'Index team_memberships table', htmlContent: 'Add index to <code>team_memberships</code> table', isCompleted: true },
      { id: '9', goalId: '3', title: 'Test query performance', htmlContent: 'Benchmark <i>query performance</i> improvements', isCompleted: true },
      { id: '10', goalId: '3', title: 'Finalize goal', htmlContent: 'Finalize <b>database optimization</b>', isCompleted: true },
      { id: '11', goalId: '4', title: 'Design rate limit architecture', htmlContent: 'Design <b>rate limiting</b> with Redis', isCompleted: false },
      { id: '12', goalId: '4', title: 'Finalize goal', htmlContent: 'Finalize <b>API rate limiting</b>', isCompleted: false },
      { id: '13', title: 'Daily standup notes', htmlContent: 'Prepare <i>standup notes</i> for team sync', isCompleted: true }
    ],
    checkoutMessage: { id: '2', message: 'DB optimization complete - 40% faster queries. Starting rate limiting implementation.', timestamp: '16:45' },
    hasCheckedOut: true,
    avatarColor: 'bg-emerald-400',
    loginTime: '09:15',
    loginTimeAgo: '6h ago'
  },
  {
    id: '3',
    name: 'Fred',
    goals: [
      { id: '5', title: 'Deploy monitoring setup', htmlContent: 'Setup <b>monitoring</b> with Grafana + Prometheus', isCompleted: false },
      { id: '6', title: 'CI/CD pipeline', htmlContent: 'Implement <u>CI/CD pipeline</u> for automated testing', isCompleted: false }
    ],
    tasks: [
      { id: '14', goalId: '5', title: 'Configure Grafana dashboards', htmlContent: 'Setup <a href="#" class="text-cyan-400 underline">Grafana dashboards</a>', isCompleted: false },
      { id: '15', goalId: '5', title: 'Finalize goal', htmlContent: 'Finalize <b>monitoring setup</b>', isCompleted: false },
      { id: '16', goalId: '6', title: 'GitHub Actions workflow', htmlContent: 'Create <i>GitHub Actions</i> test workflow', isCompleted: true },
      { id: '17', goalId: '6', title: 'Deploy pipeline to prod', htmlContent: 'Deploy <b>CI/CD pipeline</b> to production', isCompleted: true },
      { id: '18', goalId: '6', title: 'Finalize goal', htmlContent: 'Finalize <b>CI/CD pipeline</b>', isCompleted: true }
    ],
    checkoutMessage: { id: '3', message: 'CI/CD pipeline live! All tests passing. Grafana setup 80% done.', timestamp: '18:15' },
    hasCheckedOut: true,
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
    tasks: [
      { id: '19', goalId: '7', title: 'Schedule user interviews', htmlContent: 'Book <i>3 more interviews</i> this week', isCompleted: false },
      { id: '20', goalId: '7', title: 'Conduct interviews', htmlContent: 'Run <b>user interviews</b> sessions', isCompleted: false },
      { id: '21', goalId: '7', title: 'Finalize goal', htmlContent: 'Finalize <b>UX research</b>', isCompleted: false },
      { id: '22', goalId: '8', title: 'Button component variants', htmlContent: 'Design <a href="#" class="text-cyan-400 underline">button variants</a> in Figma', isCompleted: true },
      { id: '23', goalId: '8', title: 'Update color tokens', htmlContent: 'Update <i>color tokens</i> in design system', isCompleted: false },
      { id: '24', goalId: '8', title: 'Finalize goal', htmlContent: 'Finalize <b>design system</b> updates', isCompleted: false }
    ],
    hasCheckedOut: false,
    avatarColor: 'bg-orange-400',
    loginTime: '10:20',
    loginTimeAgo: '5h ago'
  },
  {
    id: '5',
    name: 'Sarah',
    goals: [
      { id: '9', title: 'Security audit completion', htmlContent: 'Complete <b>security audit</b> and fix issues', isCompleted: true },
      { id: '10', title: 'Documentation overhaul', htmlContent: 'Rewrite <u>API documentation</u> with examples', isCompleted: true }
    ],
    tasks: [
      { id: '25', goalId: '9', title: 'Fix SQL injection vulnerabilities', htmlContent: 'Patch <i>SQL injection</i> in user queries', isCompleted: true },
      { id: '26', goalId: '9', title: 'Finalize goal', htmlContent: 'Finalize <b>security audit</b>', isCompleted: true },
      { id: '27', goalId: '10', title: 'API docs with Swagger', htmlContent: 'Setup <a href="#" class="text-cyan-400 underline">Swagger docs</a>', isCompleted: true },
      { id: '28', goalId: '10', title: 'Finalize goal', htmlContent: 'Finalize <b>documentation overhaul</b>', isCompleted: true }
    ],
    checkoutMessage: { id: '4', message: 'Security audit complete - all critical issues resolved. API docs now live with interactive examples.', timestamp: '15:20' },
    hasCheckedOut: true,
    avatarColor: 'bg-pink-400',
    loginTime: '08:00',
    loginTimeAgo: '7h ago'
  },
  {
    id: '6',
    name: 'Alex',
    goals: [
      { id: '11', title: 'Mobile app foundation', htmlContent: 'Build <b>React Native</b> app foundation', isCompleted: false },
      { id: '12', title: 'Offline sync strategy', htmlContent: 'Design <u>offline sync</u> for mobile', isCompleted: false }
    ],
    tasks: [
      { id: '29', goalId: '11', title: 'Setup Expo project', htmlContent: 'Initialize <i>Expo project</i> with navigation', isCompleted: true },
      { id: '30', goalId: '11', title: 'Build core navigation', htmlContent: 'Create <b>core navigation</b> structure', isCompleted: false },
      { id: '31', goalId: '11', title: 'Finalize goal', htmlContent: 'Finalize <b>mobile app foundation</b>', isCompleted: false },
      { id: '32', goalId: '12', title: 'Research sync libraries', htmlContent: 'Evaluate <a href="#" class="text-cyan-400 underline">sync libraries</a> like WatermelonDB', isCompleted: false },
      { id: '33', goalId: '12', title: 'Finalize goal', htmlContent: 'Finalize <b>offline sync strategy</b>', isCompleted: false }
    ],
    hasCheckedOut: false,
    avatarColor: 'bg-teal-400',
    loginTime: '11:45',
    loginTimeAgo: '3h ago'
  },
  {
    id: '7',
    name: 'Maya',
    goals: [
      { id: '13', title: 'Customer onboarding flow', htmlContent: 'Design <b>customer onboarding</b> experience', isCompleted: true },
      { id: '14', title: 'A/B test checkout flow', htmlContent: 'Setup <u>A/B test</u> for subscription flow', isCompleted: false }
    ],
    tasks: [
      { id: '34', goalId: '13', title: 'Onboarding wireframes', htmlContent: 'Create <i>onboarding wireframes</i> in Figma', isCompleted: true },
      { id: '35', goalId: '13', title: 'Stakeholder approval', htmlContent: 'Get <b>stakeholder approval</b> for designs', isCompleted: true },
      { id: '36', goalId: '13', title: 'Finalize goal', htmlContent: 'Finalize <b>customer onboarding flow</b>', isCompleted: true },
      { id: '37', goalId: '14', title: 'Split test implementation', htmlContent: 'Implement <a href="#" class="text-cyan-400 underline">split testing</a> with LaunchDarkly', isCompleted: false },
      { id: '38', goalId: '14', title: 'Finalize goal', htmlContent: 'Finalize <b>A/B test checkout flow</b>', isCompleted: false }
    ],
    checkoutMessage: { id: '5', message: 'Onboarding flow designs approved by stakeholders. A/B test setup in progress.', timestamp: '14:30' },
    hasCheckedOut: true,
    avatarColor: 'bg-indigo-400',
    loginTime: '09:00',
    loginTimeAgo: '6h ago'
  },
  {
    id: '8',
    name: 'Chris',
    goals: [
      { id: '15', title: 'Performance optimization', htmlContent: 'Optimize <b>API response times</b> under 200ms', isCompleted: false },
      { id: '16', title: 'Error tracking setup', htmlContent: 'Integrate <u>error tracking</u> with Sentry', isCompleted: true }
    ],
    tasks: [
      { id: '39', goalId: '15', title: 'Profile slow database queries', htmlContent: 'Identify <i>slow queries</i> with pg_stat_statements', isCompleted: true },
      { id: '40', goalId: '15', title: 'Implement query caching', htmlContent: 'Add <a href="#" class="text-cyan-400 underline">Redis caching</a> layer', isCompleted: false },
      { id: '41', goalId: '15', title: 'Finalize goal', htmlContent: 'Finalize <b>performance optimization</b>', isCompleted: false },
      { id: '42', goalId: '16', title: 'Setup Sentry integration', htmlContent: 'Configure <i>Sentry</i> error tracking', isCompleted: true },
      { id: '43', goalId: '16', title: 'Test error reporting', htmlContent: 'Test <b>error reporting</b> pipeline', isCompleted: true },
      { id: '44', goalId: '16', title: 'Finalize goal', htmlContent: 'Finalize <b>error tracking setup</b>', isCompleted: true }
    ],
    hasCheckedOut: false,
    avatarColor: 'bg-red-400',
    loginTime: '12:30',
    loginTimeAgo: '2h ago'
  }
];

export const DailyOverviewPage: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Team Overview</h1>
          <div className="text-gray-300">
            <div className="text-xl">Today</div>
            <div className="text-lg">{currentDate}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockTeamData.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};