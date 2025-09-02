// Types for signup and onboarding data stored in accounts.signupData JSONB field

export interface SlackTeamInfo {
  teamId: string;
  teamName: string;
  teamDomain: string;
}

export interface CompanyInfo {
  teamName: string;
  companySize: string;
  teamSize?: string;
  otherTools: string[];
  problemStatement: string;
}

export interface FeedbackRequest {
  otherChatApp: string;
  comment: string;
}

export interface SurveyData {
  teamName: string;
  companySize: string;
  tools: string[];
  otherTools: string[];
  problemStatement: string;
  completedAt?: string;
}

export interface SignupData {
  // Existing fields
  plan?: string;
  selectedIntegrations?: string[];
  
  // New fields for enhanced onboarding
  entryPoint?: 'website' | 'slack_marketplace';
  selectedPlatform?: string;
  slackTeamInfo?: SlackTeamInfo;
  companyInfo?: CompanyInfo;
  feedbackRequest?: FeedbackRequest;
  survey?: SurveyData;
  
  // Onboarding progress tracking
  completedSteps?: number[];
  currentStep?: number;
}

// Request/response types for API endpoints
export interface CompanySetupRequest {
  companyName: string;
  selectedIntegrations: string[];
}

export interface CompanyInfoRequest {
  teamName: string;
  companySize: string;
  teamSize?: string;
  otherTools: string[];
  problemStatement: string;
}

export interface FeedbackSubmissionRequest {
  otherChatApp: string;
  comment: string;
}