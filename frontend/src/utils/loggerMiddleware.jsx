export const logEvent = (eventName, payload = {}) => {
  const timestamp = new Date().toISOString();
  const log = { timestamp, eventName, ...payload };
  const existing = JSON.parse(localStorage.getItem('appLogs') || '[]');
  existing.push(log);
  localStorage.setItem('appLogs', JSON.stringify(existing));
};