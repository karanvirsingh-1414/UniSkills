// When served from the same domain (like on Render), use empty string for relative paths
// Otherwise, fallback to localhost for local development
const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8080');
export default API_BASE;
