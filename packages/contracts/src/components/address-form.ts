/**
 * AddressForm Component Contract
 *
 * Platform-agnostic interface for the address form component.
 * Used for adding/editing delivery addresses with type selection and default toggle.
 */

/**
 * Address type classification
 */
export type AddressFormType = 'home' | 'work' | 'other';

/**
 * Address form field values
 */
export interface AddressFormValues {
  /** Full name of the recipient */
  fullName: string;
  /** Street address */
  street: string;
  /** Apartment, suite, unit, etc. */
  apartment?: string;
  /** City name */
  city: string;
  /** State or province */
  state: string;
  /** ZIP or postal code */
  zip: string;
  /** Country */
  country: string;
  /** Phone number */
  phone?: string;
  /** Address type (home, work, other) */
  type: AddressFormType;
  /** Whether this is the default address */
  isDefault: boolean;
}

/** Overridable text labels for i18n support */
export interface AddressFormLabels {
  fullName?: string;
  street?: string;
  apartment?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  home?: string;
  work?: string;
  other?: string;
  setAsDefault?: string;
  saveButton?: string;
  savingButton?: string;
  cancelButton?: string;
}

/**
 * AddressForm component props contract
 */
export interface AddressFormPropsBase {
  /** Form title @default 'Add New Address' */
  title?: string;

  /** Initial values to pre-populate the form */
  initialValues?: Partial<AddressFormValues>;

  /** Callback when the form is submitted with valid values */
  onSubmit?: (values: AddressFormValues) => void;

  /** Callback when the cancel/close action is triggered */
  onCancel?: () => void;

  /** Whether the form is in a loading/submitting state */
  isLoading?: boolean;

  /** Overridable text labels for i18n */
  labels?: AddressFormLabels;

  /** Additional CSS class (web only) */
  className?: string;

  /** Test ID for testing */
  testID?: string;
}
