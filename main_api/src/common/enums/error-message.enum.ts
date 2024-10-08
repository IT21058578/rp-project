const ErrorMessage = {
  // Not Found
  USER_NOT_FOUND: 'User not found',
  PREDICTION_NOT_FOUND: 'Prediction not found',
  FEEDBACK_NOT_FOUND: 'Feedback not found',
  TOKEN_NOT_FOUND: 'Token not found',
  FILE_NOT_FOUND: 'File not found',
  NEWS_SOURCE_NOT_FOUND: 'News source not found',
  PAYMENT_STRATEGY_NOT_FOUND: 'Payment strategy not found',
  CREDENTIALS_NOT_FOUND: 'Credentials not found',

  // Payments
  SESSION_URL_INVALID: 'Session URL invalid',
  CUSTOMER_DELETED: 'Customer deleted',

  // Already exists
  USER_ALREADY_EXISTS: 'User already exists',
  FEEDBACK_ALREADY_EXISTS: 'Feedback already exists',
  NEWS_SOURCE_ALREADY_EXISTS: 'News source already exists',

  // Authoriztion
  OWNERSHIP_NOT_VERIFIED: 'Ownership not verified',
  INVALID_CREDENTIALS: 'Invalid credentials',
  INSUFFICIENT_PERMISSIONS: 'Insufficient permissions',
  NOT_AUTHENTICATED: 'Not authenticated',
  INVALID_TOKEN: 'Invalid token',
  EMAIL_NOT_VERIFIED: 'Email not verified',
  OAUTH_CLIENT_ID_NOT_FOUND: 'OAuth client ID not found',

  // Misc
  INVALID_FILE_NAME: 'Invalid file name',
  USER_ALREADY_IN_ROOM: 'User already in room',
  USER_NOT_IN_ROOM: 'User not in room',
  USER_ALREADY_ADMIN: 'User already admin',
  USER_NOT_ADMIN: 'User not admin',
  INVALID_OPERATOR_OR_VALUE_FOR_FIELD: 'Invalid operator or value for field',
  CONFIG_ERROR: 'Config error',
  PREDICTION_TEXT_TOO_SHORT: 'Prediction text too short',
  PREDICTION_QUOTA_EXCEEDED: 'Prediction quota exceeded',
  INVALID_OPERATOR: 'Invalid operator',
  ACTIVE_SUBSCRIPTION_EXISTS: 'Active subscription exists',
} as const;

export default ErrorMessage;
