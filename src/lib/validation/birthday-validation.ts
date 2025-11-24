import z from 'zod';

import { MAX_AGE, MIN_AGE } from '@/constants';
import { calculateAge, parseDateDigits } from '@/lib/utils';

export const birthdayValidation = z
  .string()
  .min(8, 'Date of birth is required')
  .refine((digits) => {
    return /^\d{8}$/.test(digits);
  }, 'Please enter a complete date')
  .refine((digits) => {
    const date = parseDateDigits(digits);
    return date !== null;
  }, 'Invalid date')
  .refine((digits) => {
    const date = parseDateDigits(digits);
    if (!date) return false;
    return date < new Date();
  }, 'Date cannot be in the future')
  .refine((digits) => {
    const date = parseDateDigits(digits);
    if (!date) return false;
    const age = calculateAge(date);
    return age >= MIN_AGE;
  }, `You must be at least ${MIN_AGE} years old to register`)
  .refine((digits) => {
    const date = parseDateDigits(digits);
    if (!date) return false;
    const age = calculateAge(date);
    return age <= MAX_AGE;
  }, 'Please enter a valid date of birth');
