/**
 * Time constants for usage throughout the application
 */

// Base time units
export const MILLISECONDS_IN_SECOND = 1000;
export const SECONDS_IN_MINUTE = 60;
export const MINUTES_IN_HOUR = 60;
export const HOURS_IN_DAY = 24;

// Derived time units (in seconds)
export const ONE_MINUTE_IN_SECONDS = SECONDS_IN_MINUTE;
export const ONE_HOUR_IN_SECONDS = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
export const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS * HOURS_IN_DAY;

// Cache duration factors (multipliers)
export const FIVE_MINUTES = 5;
export const TWELVE_HOURS = 12;

// Common cache durations (in seconds)
export const FIVE_MINUTES_IN_SECONDS = FIVE_MINUTES * SECONDS_IN_MINUTE;
export const TWELVE_HOURS_IN_SECONDS = TWELVE_HOURS * ONE_HOUR_IN_SECONDS;
export const TWENTY_FOUR_HOURS_IN_SECONDS = ONE_DAY_IN_SECONDS;
