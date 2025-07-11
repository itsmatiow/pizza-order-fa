export function formatCurrency(value) {
  return new Intl.NumberFormat("fa-IR").format(value) + "تومن";
}

// export function formatDate(dateStr) {
//   return new Intl.DateTimeFormat("fa-IR", {
//     // day: "numeric",
//     // month: "short",
//     // hour: "2-digit",
//     // minute: "2-digit",
//     dateStyle: "medium",
//     timeStyle: "short",
//   }).format(new Date(dateStr));
// }

export function formatDate(dateStr) {
  // 1. رشته ورودی رو بررسی کنید که خالی یا نامعتبر نباشه
  if (!dateStr || typeof dateStr !== "string" || dateStr.trim() === "") {
    console.error("Invalid date string provided to formatDate:", dateStr);
    return "تاریخ نامشخص"; // یا هر پیام خطای دیگری که مناسب است
  }

  const date = new Date(dateStr);

  // 2. بررسی کنید که آیا new Date یک تاریخ معتبر برگردانده است یا خیر
  // !isNaN(date.getTime()) بهترین راه برای بررسی اعتبار یک شیء Date است.
  if (isNaN(date.getTime())) {
    console.error(
      "Failed to parse date string into a valid Date object:",
      dateStr,
    );
    return "تاریخ نامعتبر"; // یا "Invalid Date"
  }

  // 3. حالا که مطمئنیم تاریخ معتبر است، آن را فرمت می‌کنیم
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

// export function formatDate(dateStr) {
//   // موقتاً از یک رشته ثابت و صحیح استفاده کنید
//   const testDateStr = "2025-07-15T12:00:00Z"; // مثال یک تاریخ استاندارد ISO 8601

//   const date = new Date(testDateStr); // از رشته ثابت استفاده می‌کنیم

//   if (isNaN(date.getTime())) {
//     console.error(
//       "This should not happen with a valid string! Problem with Intl or environment:",
//       testDateStr,
//     );
//     return "تاریخ نامعتبر";
//   }

//   return new Intl.DateTimeFormat("fa-IR", {
//     dateStyle: "medium",
//     timeStyle: "short",
//   }).format(date);
// }

export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}
