// Environment type detection
export const isDevelopmentEnvironment = import.meta.dev;
export const isProductionEnvironment = !import.meta.dev;

// Runtime context detection
export const isServerEnvironment = import.meta.server;
export const isClientEnvironment = !import.meta.server;
