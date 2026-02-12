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

export interface AddressFormProps extends AddressFormPropsBase {
  className?: string;
}

const DEFAULT_ADDRESS_LABELS = {
  fullName: 'Full Name',
  street: 'Street Address',
  apartment: 'Apt / Suite / Floor (Optional)',
  city: 'City',
  state: 'State',
  zip: 'Zip Code',
  phone: 'Phone Number',
  home: 'Home',
  work: 'Work',
  other: 'Other',
  setAsDefault: 'Set as default address',
  saveButton: 'Save Address',
  savingButton: 'Saving...',
  cancelButton: 'Cancel',
};

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
      labels: labelsProp,
      className,
      testID,
    },
    ref
  ) => {
    const fl = { ...DEFAULT_ADDRESS_LABELS, ...labelsProp };
    const addressTypes: { value: AddressFormType; label: string }[] = [
      { value: 'home', label: fl.home },
      { value: 'work', label: fl.work },
      { value: 'other', label: fl.other },
    ];
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
          <Input
            label={fl.fullName}
            value={values.fullName}
            onChangeText={(text) => updateField('fullName', text)}
            placeholder={fl.fullName}
            size="sm"
            fullWidth
            name="fullName"
            testID={testID ? `${testID}-fullName` : undefined}
          />

          <Input
            label={fl.street}
            value={values.street}
            onChangeText={(text) => updateField('street', text)}
            placeholder={fl.street}
            size="sm"
            fullWidth
            name="street"
            testID={testID ? `${testID}-street` : undefined}
          />

          <Input
            label={fl.apartment}
            value={values.apartment ?? ''}
            onChangeText={(text) => updateField('apartment', text)}
            placeholder={fl.apartment}
            size="sm"
            fullWidth
            name="apartment"
            testID={testID ? `${testID}-apartment` : undefined}
          />

          {/* City + State row */}
          <div className={styles.row}>
            <Input
              label={fl.city}
              value={values.city}
              onChangeText={(text) => updateField('city', text)}
              placeholder={fl.city}
              size="sm"
              fullWidth
              name="city"
              className={styles.flexField}
              testID={testID ? `${testID}-city` : undefined}
            />
            <Input
              label={fl.state}
              value={values.state}
              onChangeText={(text) => updateField('state', text)}
              placeholder={fl.state}
              size="sm"
              fullWidth
              name="state"
              className={styles.fixedField}
              testID={testID ? `${testID}-state` : undefined}
            />
          </div>

          {/* ZIP + Phone row */}
          <div className={styles.row}>
            <Input
              label={fl.zip}
              value={values.zip}
              onChangeText={(text) => updateField('zip', text)}
              placeholder={fl.zip}
              size="sm"
              fullWidth
              name="zip"
              className={styles.flexField}
              testID={testID ? `${testID}-zip` : undefined}
            />
            <Input
              label={fl.phone}
              type="tel"
              value={values.phone ?? ''}
              onChangeText={(text) => updateField('phone', text)}
              placeholder={fl.phone}
              size="sm"
              fullWidth
              name="phone"
              className={styles.flexField}
              testID={testID ? `${testID}-phone` : undefined}
            />
          </div>
        </div>

        {/* Address Type Chips */}
        <div className={styles.typeChips} role="radiogroup" aria-label="Address type">
          {addressTypes.map(({ value, label }) => (
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
            label={fl.setAsDefault}
            size="sm"
            testID={testID ? `${testID}-default` : undefined}
          />
        </div>

        {/* Actions */}
        <Button
          type="submit"
          variant="solid"
          size="sm"
          fullWidth
          loading={isLoading}
          loadingText={fl.savingButton}
          testID={testID ? `${testID}-submit` : undefined}
        >
          {fl.saveButton}
        </Button>

        {onCancel && (
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={isLoading}
          >
            {fl.cancelButton}
          </button>
        )}
      </form>
    );
  }
);

AddressForm.displayName = 'AddressForm';
export default AddressForm;
