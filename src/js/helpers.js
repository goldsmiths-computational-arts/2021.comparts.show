import { timeFormat } from "d3-time-format";

export const slugify = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-z]+/g, " ")
    .trim()
    .replace(/ /g, "-");
};

export function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

export function trackEvent(category, action, label) {
  ga("send", "event", category, action, label);
}

export const formatDate = timeFormat("%A %d %b");
export const formatDay = timeFormat("%A");
export const formatTime = timeFormat("%H.%M");
export const formatFullTime = timeFormat("%A %d %b %H.%M");
