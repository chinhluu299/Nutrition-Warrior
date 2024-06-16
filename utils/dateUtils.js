export const CalculateDateAgo = (postDate) => {
  const now = new Date();
  const secondsPast = Math.floor((now - new Date(postDate)) / 1000);

  if (secondsPast < 60) {
    return "Just a second";
  }

  const minutesPast = Math.floor(secondsPast / 60);
  if (minutesPast < 60) {
    return `${minutesPast} minutes ago`;
  }

  const hoursPast = Math.floor(minutesPast / 60);
  if (hoursPast < 24) {
    return `${hoursPast} hours ago`;
  }

  const daysPast = Math.floor(hoursPast / 24);
  if (daysPast < 7) {
    return `${daysPast} days ago`;
  }

  const weeksPast = Math.floor(daysPast / 7);
  if (weeksPast < 4) {
    return `${weeksPast} weeks ago`;
  }

  const monthsPast = Math.floor(weeksPast / 4);
  if (monthsPast < 12) {
    return `${monthsPast} months ago`;
  }

  const yearsPast = Math.floor(monthsPast / 12);
  return `${yearsPast} years ago`;
}