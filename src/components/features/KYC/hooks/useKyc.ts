import { createSpecificMutationHook } from '@/lib/hooks';

interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    documentFrontUrl?: string;
    documentBackUrl?: string;
    addressProofUrl?: string;
  };
}

export const useKycUploadMutation = createSpecificMutationHook<UploadResponse, FormData>({
  endpoint: '/kyc/submit',
  method: 'POST',
  isFormData: true,
});
