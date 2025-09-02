// Shared BuildInfo types
export interface BuildInfo {
  appname: string;
  version: string;
  fullVersion: string;
  message: string;
  author: string;
  branch: string;
  environment: string;
  deploymentTime: string;
  pipelineUrl: string | null;
}

export interface SystemInfo {
  buildInfo: BuildInfo | null;
  serverTime: string;
  environment: string;
}