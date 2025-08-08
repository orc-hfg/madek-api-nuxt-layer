// Environment type detection
export const isDevelopmentEnvironment = import.meta.dev;
export const isProductionEnvironment = !isDevelopmentEnvironment;

// Runtime context detection
export const isServerEnvironment = import.meta.server;
export const isClientEnvironment = !isServerEnvironment;
