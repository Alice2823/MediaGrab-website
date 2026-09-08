/**
 * MediaGrab Website Configuration
 * 
 * Update this file with your actual GitHub Release URL and project links.
 */

// Official Windows Release Direct Download URL
export const DOWNLOAD_URL =
  "https://github.com/Alice2823/MediaGrab-software/releases/download/v1.0.10/MediaGrab.Setup.1.0.10.exe";

// Application Metadata
export const APP_CONFIG = {
  name: "MediaGrabs",
  tagline: "Download. Convert. Enjoy.",
  subHeadline: "Your simple, powerful desktop media downloader and converter.",
  version: "v1.0.10",
  targetPlatform: "Windows 10 / 11 (64-bit)",
  fileType: ".exe Installer / Standalone",
  releaseDate: "2026",
  license: "Free Desktop Utility",
  githubRepoUrl: "https://github.com/Alice2823/MediaGrab-software",
  
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
