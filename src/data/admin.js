export const QUOTE_STATUSES = [
  { value: "new", label: "New" },
  { value: "quoted", label: "Quoted" },
  { value: "booked", label: "Booked" },
  { value: "completed", label: "Completed" },
  { value: "closed", label: "Closed" },
];

export const REVIEW_STATUSES = [
  { value: "pending", label: "Waiting" },
  { value: "approved", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
];

export const formatDateTime = (date) =>
  new Date(date).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/London" });
