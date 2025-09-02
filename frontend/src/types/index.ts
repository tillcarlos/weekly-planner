// src/types/index.ts

import { SignupData } from './signup';

// Database entity types matching the schema
export interface Account {
  id: string;
  name: string;
  isActive: boolean;
  maxPeople?: number;
  signupData?: SignupData;
  createdAt: string;
  updatedAt: string;
}

export interface Integration {
  id: string;
  accountId: string;
  name: string;
  config: Record<string, any>;
  configSchema?: Record<string, any>; // Config schema from service
  color?: string; // Hex color for events (e.g., '#fc6d26')
  apiKey?: string; // API key for the integration
  status?: string; // Integration status (active, paused, etc.)
  provider?: string | null; // Integration provider
  personIntegrationsCount?: number; // Count of person integrations
  lastConnectedAt?: string | null; // When integration was last connected
  lastRunAt?: string | null; // When integration last ran
  lastRunStatus?: string | null; // Status of last run (success, failed, running)
  isStale?: boolean; // Whether integration hasn't run in the last hour
  archivedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  apiCalls?: ApiCall[];
  totalApiCalls?: number;
  service?: {
    id: string;
    name: string;
    provider: string;
    description?: string;
    enabled: boolean;
    configSchema?: Record<string, any>;
    [key: string]: any;
  } | null;
}

export interface User {
  id: string;
  accountId: string;
  email: string;
  role: 'none' | 'disabled' | 'user' | 'manager' | 'superadmin';
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
  account: {
    id: string;
    name: string;
    status: 'pending' | 'active' | 'terminated';
  };
}

export interface ActivityPrediction {
  id: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  timezoneAtStart?: string | null;
  confidence: number;
  isOngoing: boolean;
}

export interface Person {
  id: string;
  accountId: string;
  name?: string;
  details: Record<string, any>;
  email?: string;
  personIdentifier?: string; // Added for backward compatibility
  timezone?: string;
  color?: string; // Hex color for person visualization
  archivedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  status?: 'active' | 'unassigned' | 'ignored'; // Person status
  activityBlocks?: ActivityBlock[];
  activityEvents?: ActivityEvent[];
  activityPredictions?: ActivityPrediction[];
  isOnline?: boolean; // Computed from recent activity
}

export interface PersonIntegration {
  id: string;
  personId: string;
  integrationId: string;
  externalId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityBlock {
  id: string;
  personIntegrationId: string;
  kind: string;
  startTime: string;
  endTime?: string | null;
  durationMinutes?: number | null;
  timezoneAtStart?: string | null;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  isOngoing?: boolean; // Computed from endTime being null
  integrationId?: string; // Integration ID for linking
  integrationName?: string; // Integration display name
  integrationProvider?: string; // Provider type (slack, gitlab, etc)
}
export interface ActivityEvent {
  id: string;
  kind: string;
  timestamp: string;
  title?: string | null;
  externalId?: string | null;
  url?: string | null;
  metadata: Record<string, any>;
  integrationName?: string;
  integrationProvider?: string;
  integrationColor?: string; // Color from the integration
  createdAt?: string;
}

export interface ApiCall {
  id: string;
  integrationId: string;
  endpoint: string;
  method: string;
  payload: Record<string, any>;
  response?: Record<string, any> | null;
  statusCode?: number | null;
  duration?: number | null;
  createdAt: string;
}

// API Response types
export interface ApiResponse {
  date: string;
  people: Person[];
}

export interface AccountWithIntegrations extends Account {
  integrations: Integration[];
  integrationHealth?: {
    staleCount: number;
    hasStaleIntegrations: boolean;
    staleIntegrationNames: string[];
  };
}

// UI types
export interface SessionPosition {
  left: string;
  width: string;
}

export interface TimePosition {
  slotIndex: number;
  position: number;
}

export interface UnassignedUser {
  id: string;
  name?: string;
  email?: string;
  personIdentifier: string; // Added missing field
  createdAt: string;
  personIntegrations: Array<{
    id: string;
    externalId?: string;
    personIdentifier: string; // Added missing field
    integration: {
      id: string;
      name: string;
      provider: string;
    };
    metadata?: Record<string, any>;
  }>;
  activityCount: number;
}

export interface UnassignedApiResponse {
  unassigned: UnassignedUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PersonsApiResponse {
  people: Person[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Integration runs and statistics types
export interface IntegrationRun {
  id: string;
  startedAt: string;
  completedAt?: string | null;
  status: 'running' | 'success' | 'failed';
  peopleFound: number;
  eventsCreated: number;
  durationMs?: number | null;
  errorMessage?: string | null;
  createdAt: string;
}

export interface DailyStats {
  date: string;
  runs: number;
  successfulRuns: number;
  totalPeopleFound: number;
  totalEventsCreated: number;
  avgDurationMs: number;
  lastRunAt: string;
}

export interface IntegrationRunsResponse {
  integrationId: string;
  integrationName: string;
  runs: IntegrationRun[];
}

export interface IntegrationStatisticsResponse {
  integrationId: string;
  integrationName: string;
  statistics: DailyStats[];
}

// Debug events and run details
export interface DebugEvent {
  timestamp: string;
  event: string;
  duration?: number;
  details?: Record<string, any>;
}

export interface IntegrationRunDetail extends IntegrationRun {
  debugEvents: DebugEvent[];
}

export interface IntegrationRunDetailResponse {
  integrationId: string;
  integrationName: string;
  run: IntegrationRunDetail;
}

// Export BuildInfo types
export * from './buildInfo';
