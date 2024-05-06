export const FORM_STATUS = {
  ERROR: "error",
  SUCCESS: "success",
} as const;

export type FORM_STATUS_TYPE = (typeof FORM_STATUS)[keyof typeof FORM_STATUS];
