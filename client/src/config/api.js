const isVercel = typeof window !== "undefined" && window.location.hostname.includes("vercel.app");
const API_BASE = isVercel ? "/api" : (process.env.REACT_APP_API_URL || "https://7f6bc3b5f18a3139-14-186-161-68.serveousercontent.com/api");
export default API_BASE;
