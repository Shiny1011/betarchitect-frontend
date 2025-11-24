import { z } from 'zod';

export const phoneValidationSchema = z
  .string()
  .nonempty('Phone number is required')
  .refine((phone) => {
    // Should start with +
    if (!phone.startsWith('+')) {
      return false;
    }

    // After + should be only digits
    const afterPlus = phone.slice(1);
    if (!/^\d+$/.test(afterPlus)) {
      return false;
    }

    // Length after + must be greater than 8
    if (afterPlus.length <= 8) {
      return false;
    }

    return true;
  }, 'Please enter a valid phone number: + followed by more than 8 digits');
