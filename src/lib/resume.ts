// Single source of truth for the resume URL.
// Bump RESUME_VERSION whenever public/resume.pdf is replaced so browsers
// and CDNs are forced to fetch the new file instead of serving a stale copy.
export const RESUME_VERSION = "2026-07-17";
export const RESUME_URL = `/resume.pdf?v=${RESUME_VERSION}`;

// Public /cv route — mirrors resume.pdf as an editorial webpage.
export const CV_URL = "/cv";
