'use client';

import { forwardRef, useState, useCallback, type FormEvent } from 'react';
import type {
  AddressFormPropsBase,
  AddressFormValues,
  AddressFormType,
} from '@groxigo/contracts/components/address-form';
import { Input } from '@groxigo/ui-elements-web';
import { Switch } from '@groxigo/ui-elements-web';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './AddressForm.module.css';

export type { AddressFormValues, AddressFormType };

export interface AddressFormProps extends AddressFormPropsBase {}

const ADDRESS_TYPES: { value: AddressFormType; label: string }[] = [
  { value: 'home', label: 'Home' },
  { value: 'work', label: 'Work' },
  { value: 'other', label: 'Other' },
];

const DEFAULT_VALUES: AddressFormValues = {
  fullName: '',
  street: '',
  apartment: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  phone: '',
  type: 'home',
  isDefault: false,
};

export const AddressForm = forwardRef<HTMLFormElement, AddressFormProps>(
  (
    {
      title = 'Add New Address',
      initialValues,
      onSubmit,
      onCancel,
      isLoading = false,
      className,
      testID,
    },
    ref
  ) => {
    const [values, setValues] = useState<AddressFormValues>({
      ...DEFAULT_VALUES,
      ...initialValues,
    });

    const updateField = useCallback(
      <K extends keyof AddressFormValues>(field: K, value: AddressFormValues[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));
      },
      []
    );

    const handleSubmit = useCallback(
      (e: FormEvent) => {
        e.preventDefault();
        onSubmit?.(values);
      },
      [onSubmit, values]
    );

    return (
      <form
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Title */}
        <h2 className={styles.title}>{title}</h2>

        {/* Form Fields */}
        <div className={styles.fields}>
          {/* Full Name */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Full Name</label>
            <Input
              value={values.fullName}
              onChangeText={(text) => updateField('fullName', text)}
              placeholder="Full Name"
              fullWidth
              testID={testID ? `${testID}-fullName` : undefined}
            />
          </div>

          {/* Street Address */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Street Address</label>
            <Input
              value={values.street}
              onChangeText={(text) => updateField('street', text)}
              placeholder="Street Address"
              fullWidth
              testID={testID ? `${testID}-street` : undefined}
            />
          </div>

          {/* Apartment */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Apt / Suite / Floor (Optional)</label>
            <Input
              value={values.apartment ?? ''}
              onChangeText={(text) => updateField('apartment', text)}
              placeholder="Apt, Suite, Floor"
              fullWidth
              testID={testID ? `${testID}-apartment` : undefined}
            />
          </div>

          {/* City + State row */}
          <div className={styles.row}>
            <div className={styles.fieldGroupFlex}>
              <label className={styles.label}>City</label>
              <Input
                value={values.city}
                onChangeText={(text) => updateField('city', text)}
                placeholder="City"
                fullWidth
                testID={testID ? `${testID}-city` : undefined}
              />
            </div>
            <div className={styles.fieldGroupFixed}>
              <label className={styles.label}>State</label>
              <Input
                value={values.state}
                onChangeText={(text) => updateField('state', text)}
                placeholder="State"
                fullWidth
                testID={testID ? `${testID}-state` : undefined}
              />
            </div>
          </div>

          {/* ZIP + Phone row */}
          <div className={styles.row}>
            <div className={styles.fieldGroupFlex}>
              <label className={styles.label}>Zip Code</label>
              <Input
                value={values.zip}
                onChangeText={(text) => updateField('zip', text)}
                placeholder="Zip Code"
                fullWidth
                testID={testID ? `${testID}-zip` : undefined}
              />
            </div>
            <div className={styles.fieldGroupFlex}>
              <label className={styles.label}>Phone Number</label>
              <Input
                type="tel"
                value={values.phone ?? ''}
                onChangeText={(text) => updateField('phone', text)}
                placeholder="Phone Number"
                fullWidth
                testID={testID ? `${testID}-phone` : undefined}
              />
            </div>
          </div>
        </div>

        {/* Address Type Chips */}
        <div className={styles.typeChips} role="radiogroup" aria-label="Address type">
          {ADDRESS_TYPES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={values.type === value}
              className={clsx(
                styles.typeChip,
                values.type === value ? styles.typeChipActive : styles.typeChipInactive
              )}
              onClick={() => updateField('type', value)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Default Address Toggle */}
        <div className={styles.defaultToggle}>
          <Switch
            checked={values.isDefault}
            onChange={(checked) => updateField('isDefault', checked)}
            label="Set as default address"
            size="sm"
            testID={testID ? `${testID}-default` : undefined}
          />
        </div>

        {/* Actions */}
        <Button
          type="submit"
          variant="solid"
          size="lg"
          fullWidth
          loading={isLoading}
          loadingText="Saving..."
          testID={testID ? `${testID}-submit` : undefined}
        >
          Save Address
        </Button>

        {onCancel && (
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
        )}
      </form>
    );
  }
);

AddressForm.displayName = 'AddressForm';
export default AddressForm;
