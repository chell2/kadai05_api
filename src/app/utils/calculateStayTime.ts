// 滞在時間を表示
const calculateStayTime = (startTime: number) => {
  if (startTime === 0) return 'N/A';
  const elapsed = Date.now() - startTime;
  const minutes = Math.floor((elapsed / 60000) % 60);
  const hours = Math.floor(elapsed / 3600000);
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
};

export { calculateStayTime };
