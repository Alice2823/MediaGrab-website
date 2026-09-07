/**
 * MediaGrab Website Configuration
 * 
 * Update this file with your actual GitHub Release URL and project links.
 */

// IMPORTANT: Replace this placeholder with your direct GitHub Release .exe URL
// Example: "https://github.com/your-username/mediagrab/releases/download/v1.0.0/MediaGrab-Setup-1.0.0.exe"
export const DOWNLOAD_URL: string = "REPLACE_WITH_GITHUB_RELEASE_URL";

// Application Metadata
export const APP_CONFIG = {
  name: "MediaGrab",
  tagline: "Download. Convert. Enjoy.",
  subHeadline: "Your simple, powerful desktop media downloader and converter.",
  version: "v1.0.0",
  targetPlatform: "Windows 10 / 11 (64-bit)",
  fileType: ".exe Installer / Standalone",
  releaseDate: "2026",
  license: "Free Desktop Utility",
  githubRepoUrl: "https://github.com", // Will be updated by repository owner
  
  // Helper to check if a real download link has been configured
  isDownloadConfigured(): boolean {
    const url = String(DOWNLOAD_URL).trim();
    return (
      url.length > 0 &&
      url !== "REPLACE_WITH_GITHUB_RELEASE_URL" &&
      !url.includes("REPLACE_WITH")
    );
  }
};
