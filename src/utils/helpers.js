export function formatCurrency(value) {
  return new Intl.NumberFormat("fa-IR").format(value) + "تومن";
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("fa-IR", {
    // day: "numeric",
    // month: "short",
    // hour: "2-digit",
    // minute: "2-digit",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateStr));
}

export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}
