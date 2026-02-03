//READ ENV VAR
const READ_ONLY_MODE = process.env.EXPO_PUBLIC_READONLY === 'TRUE';

export const featureFlags: { [key: string]: boolean } = {
  // Read-only mode
  isReadOnly: READ_ONLY_MODE,
};

// Helper function to check features
export const isFeatureEnabled = (feature: string) => {
  return featureFlags[feature] ?? false;
};
