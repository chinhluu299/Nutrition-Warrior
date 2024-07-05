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
};

export const thisWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - dayOfWeek);
  firstDayOfWeek.setHours(0, 0, 0, 0); // Đặt thời gian là 00:00:00.000
  return firstDayOfWeek;
};

export const thisMonth = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  return firstDayOfMonth;
}

export const lastSixMonths = () => {
  const today = new Date();
  const firstDayOfSixMonthsAgo = new Date(
    today.getFullYear(),
    today.getMonth() - 6,
    today.getDate()
  );
  return firstDayOfSixMonthsAgo;
}
export const thisYear = () => {
  const today = new Date();
  const firstDayOfYear = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  ); // Tháng 0 là tháng 1
  return firstDayOfYear;
}
