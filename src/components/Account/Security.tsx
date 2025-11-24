'use client';

import { useRef, useState, useCallback, useMemo } from 'react';

import { useTranslations } from 'next-intl';

import SessionDetailsModal from '@/components/Account/Modal/SessionDetailsModal';
import { useKycUploadMutation } from '@/components/features';
import FloatingInput from '@/components/UI/FloatingInput';
import { AndroidIcon, AppleIcon, GoogleIcon, PDFFileIcon } from '@/Icons';
import SpinnerIcon from '@/Icons/SpinnerIcon';
import { DocVerificationKind, DocVerificationType, IconProps } from '@/lib/schema';

interface SessionItem {
  id: string;
  device: string;
  date: string;
  ip: string;
  accent?: string;
  Icon?: React.FC<IconProps>;
}

interface KycDocFormData {
  files: File[];
  documentType: DocVerificationType;
}

const sessions: SessionItem[] = [
  { id: 's1', device: 'Chrome', date: '21.08.2025, 15:40', ip: '93.86.192.47 RS', Icon: GoogleIcon },
  { id: 's2', device: 'iPhone', date: '21.08.2025, 15:40', ip: '93.86.192.47 RS', Icon: AppleIcon },
  { id: 's3', device: 'Huawei', date: '21.08.2025, 15:40', ip: '93.86.192.47 RS', Icon: AndroidIcon },
];

export default function Security() {
  const [docType, setDocType] = useState<DocVerificationType>('passport');
  const [docNames, setDocNames] = useState<Partial<Record<DocVerificationKind, string>>>({});
  const [docFiles, setDocFiles] = useState<Partial<Record<DocVerificationKind, File>>>({});
  const [kycSubmitError, setKycSubmitError] = useState<string | null>(null);

  const [password, setPassword] = useState('••••••••');
  const [changingPwd, setChangingPwd] = useState(false);
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  // Session details modal state
  const [sessionOpen, setSessionOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<{
    id: string;
    device: string;
    date: string;
    os?: string;
    ip?: string;
    location?: string;
    loginTime?: string;
    lastActivity?: string;
    duration?: string;
    Icon?: React.FC<IconProps>;
  } | null>(null);

  const passportInputRef = useRef<HTMLInputElement | null>(null);
  const addressInputRef = useRef<HTMLInputElement | null>(null);
  const idFrontInputRef = useRef<HTMLInputElement | null>(null);
  const idBackInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: submitKycFiles, isLoading } = useKycUploadMutation();
  const t = useTranslations();

  const buildKycFormData = ({ files, documentType }: KycDocFormData): FormData => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file, file.name);
    });
    formData.append('documentType', documentType);
    return formData;
  };

  // Function for group sending of all selected documents.
  const submitKycDocuments = useCallback(async () => {
    const requiredKinds: DocVerificationKind[] =
      docType === 'passport' ? ['passport', 'address'] : ['id_front', 'id_back', 'address'];

    const filesToSubmit: File[] = [];
    let allRequiredFilesAttached = true;

    requiredKinds.forEach((kind) => {
      const file = docFiles[kind];
      const name = docNames[kind];

      if (file) filesToSubmit.push(file);
      else if (!name) allRequiredFilesAttached = false;
    });

    if (!allRequiredFilesAttached) {
      console.error('Error: All required documents must be selected before submission.');
      setKycSubmitError('Attach all required documents to enable sending.');
      return;
    }

    setKycSubmitError(null);

    if (filesToSubmit.length === 0) {
      console.log('Info: All necessary documents are already attached. Nothing new to submit.');
      setKycSubmitError('Documents attached.');
      return;
    }

    const formData = buildKycFormData({ files: filesToSubmit, documentType: docType });

    await submitKycFiles(formData, {
      onSuccess: () => {
        const updatedNames = { ...docNames };
        requiredKinds.forEach((kind) => {
          if (docFiles[kind]) {
            updatedNames[kind] = docFiles[kind]!.name;
          }
        });
        setDocNames(updatedNames);
        setDocFiles({});
        setKycSubmitError('Documents successfully submitted. Awaiting verification.');
      },
      onError: (error) => {
        console.log('error.message', error.message);
        error.message.includes('KYC documents already submitted and pending review')
          ? setKycSubmitError('Documents are already submitted and pending review. No action needed.')
          : setKycSubmitError('Error submitting documents. Please try again later.');
      },
    });
  }, [docType, docFiles, docNames, submitKycFiles]);

  // Helper to update local state when selecting a file.
  const handleFileChange = useCallback((kind: DocVerificationKind, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocNames((prev) => ({ ...prev, [kind]: file.name }));
      setDocFiles((prev) => ({ ...prev, [kind]: file }));
    } else {
      setDocFiles((prev) => ({ ...prev, [kind]: undefined }));
    }
  }, []);

  const onAttachPassport = () => {
    const input = passportInputRef.current;
    if (input) {
      input.value = '';
      input.click();
    }
  };
  const onAttachAddress = () => {
    const input = addressInputRef.current;
    if (input) {
      input.value = '';
      input.click();
    }
  };
  const onAttachIdFront = () => {
    const input = idFrontInputRef.current;
    if (input) {
      input.value = '';
      input.click();
    }
  };
  const onAttachIdBack = () => {
    const input = idBackInputRef.current;
    if (input) {
      input.value = '';
      input.click();
    }
  };

  const passwordValid = oldPwd.length > 0 && newPwd.length > 0 && confirmPwd === newPwd;

  const openSessionModal = (s: SessionItem) => {
    setSelectedSession({
      id: s.id,
      device: s.device,
      date: s.date,
      os: 'Windows 10, Chrome',
      ip: s.ip,
      location: 'Belgrade, Serbia',
      loginTime: 'Aug 22, 2025, 10:15 AM',
      lastActivity: 'Aug 22, 2025, 10:47 AM',
      duration: '32 minutes',
      Icon: s.Icon,
    });
    setSessionOpen(true);
  };

  // JSX helpers
  const getDocName = (kind: DocVerificationKind) => docNames[kind] ?? '';
  const isFilePresent = (kind: DocVerificationKind) => !!docNames[kind];

  // useMemo helpers for controling "Send" button logic
  const displayedDocumentKinds = useMemo(() => {
    const common: DocVerificationKind[] = ['address'];
    return docType === 'passport' ? [...common, 'passport'] : [...common, 'id_front', 'id_back'];
  }, [docType]);

  const isAllRequiredAttached = useMemo(() => {
    return displayedDocumentKinds.every(
      (kind) =>
        docNames[kind as DocVerificationKind] !== undefined || docFiles[kind as DocVerificationKind] !== undefined
    );
  }, [displayedDocumentKinds, docNames, docFiles]);

  // Is any files (in docFiles) for sending
  const hasNewFiles = useMemo(() => {
    return displayedDocumentKinds.some((kind) => docFiles[kind as DocVerificationKind] !== undefined);
  }, [displayedDocumentKinds, docFiles]);

  // "Send" botton state
  const isSendButtonActive = isAllRequiredAttached && hasNewFiles && !isLoading;

  // helper for rendering doc ui
  const renderDocumentInput = (kind: DocVerificationKind) => {
    const fileName = getDocName(kind);
    const labelMap: Record<DocVerificationKind, string> = {
      passport: t('page.account.title.attachPassport'),
      id_front: t('page.account.title.attachIDFront'),
      id_back: t('page.account.title.attachIDBack'),
      address: t('page.account.title.attachAddress'),
    };

    const attachedSuffix = t('page.account.title.attached');

    const refMap: Record<DocVerificationKind, React.RefObject<HTMLInputElement | null>> = {
      passport: passportInputRef,
      id_front: idFrontInputRef,
      id_back: idBackInputRef,
      address: addressInputRef,
    };
    const attachMap: Record<DocVerificationKind, () => void> = {
      passport: onAttachPassport,
      id_front: onAttachIdFront,
      id_back: onAttachIdBack,
      address: onAttachAddress,
    };

    const isNewFileSelected = !!docFiles[kind];

    return (
      <div key={kind}>
        <FloatingInput
          label={fileName ? `${labelMap[kind]} ${attachedSuffix}` : labelMap[kind]}
          type='text'
          value={fileName}
          readOnly
          className='text-lemon-yellow'
          inputClassName='pointer-events-none !text-lemon-yellow'
          rightPaddingClass='pr-24'
          leftAdornment={isFilePresent(kind) || isNewFileSelected ? <PDFFileIcon /> : undefined}
          rightAdornment={
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                attachMap[kind]();
              }}
              disabled={isLoading}
              className='text-blue-indigo bg-lavander h-8 rounded-full border px-4 text-sm'
            >
              {t('buttons.attach')}
            </button>
          }
        />
        <input
          ref={refMap[kind]}
          type='file'
          className='hidden'
          onChange={(e) => handleFileChange(kind, e)}
          accept='image/*,.pdf'
        />
      </div>
    );
  };

  const displayedStatusMessage = useMemo(() => {
    // 1. If there is an error/success message (set after submit/error)
    if (kycSubmitError) return kycSubmitError;
    // 2. If not all files are attached (hint needed)
    if (!isAllRequiredAttached) return t('page.account.text.kycAttachHint');
    // 3. If everything is attached
    return hasNewFiles ? t('page.account.text.kycReadyToSend') : t('page.account.text.kycAttached');
  }, [kycSubmitError, isAllRequiredAttached, hasNewFiles, t]);

  return (
    <>
      <SessionDetailsModal
        open={sessionOpen}
        onClose={() => setSessionOpen(false)}
        session={selectedSession}
        onTerminate={() => setSessionOpen(false)}
      />

      <div className='w-full space-y-6'>
        <section className='bg-dark-indigo rounded-2xl p-4 md:p-6'>
          <div className='mb-4 flex items-center justify-between'>
            <div>
              <h2 className='text-lemon-yellow text-[20px] font-semibold'>{t('page.account.title.verification')}</h2>
              <p className='text-lemon-yellow/50 mt-0.5 text-[14px]'>{t('page.account.text.verificationSubtitle')}</p>
            </div>
          </div>

          <div className='mb-4 flex items-center gap-4'>
            <span className={`${docType === 'passport' ? 'text-lavander' : 'text-lavander/50'} font-medium`}>
              {t('page.account.title.docTypePassport')}
            </span>
            <input
              className="checked:bg-primary checked:after:bg-primary checked:focus:border-primary checked:focus:bg-primary dark:checked:bg-primary dark:checked:after:bg-primary bg-lavander/30 after:bg-lavander mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:ring-0 focus:outline-none focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              type='checkbox'
              role='switch'
              onChange={() => setDocType((prev) => (prev === 'passport' ? 'id_card' : 'passport'))}
              checked={docType === 'id_card'}
            />
            <span className={`${docType === 'id_card' ? 'text-lavander' : 'text-lavander/50'}`}>
              {t('page.account.title.docTypeID')}
            </span>
          </div>

          <div className='mb-6 space-y-4'>
            {docType === 'passport' ? (
              <>{renderDocumentInput('passport')}</>
            ) : (
              <>
                {renderDocumentInput('id_front')}
                {renderDocumentInput('id_back')}
              </>
            )}
            {renderDocumentInput('address')}
          </div>

          <div className='mt-6 flex items-center justify-between'>
            <div className='text-sm'>
              <p className='text-lemon-yellow'>{displayedStatusMessage}</p>
            </div>

            <button
              onClick={submitKycDocuments}
              disabled={!isSendButtonActive}
              className={`flex h-10 w-[88px] items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                isSendButtonActive
                  ? 'bg-lemon-yellow text-dark-indigo hover:bg-lemon-yellow/80'
                  : 'bg-lavander/30 text-lavander/60 cursor-not-allowed'
              } `}
            >
              {isLoading ? (
                <SpinnerIcon className='text-dark-indigo h-5 w-5 animate-spin' />
              ) : (
                <span>{t('buttons.send')}</span>
              )}
            </button>
          </div>
        </section>

        {/* Password Management */}
        <section className='bg-dark-indigo rounded-2xl p-4 md:p-6'>
          <div className='mb-6'>
            <h2 className='text-lemon-yellow text-[20px] font-semibold'>{t('page.account.title.password')}</h2>
            <p className='text-lemon-yellow/50 mt-0.5 text-sm'>{t('page.account.text.passwordSubtitle')}</p>
          </div>
          {changingPwd ? (
            <>
              <div className='space-y-[18px]'>
                <FloatingInput
                  label={t('page.account.title.oldPassword')}
                  type='password'
                  value={oldPwd}
                  onChange={(e) => setOldPwd(e.target.value)}
                />
                <FloatingInput
                  label={t('page.account.title.newPassword')}
                  type='password'
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                />
                <FloatingInput
                  label={t('form.fields.confirmPassword')}
                  type='password'
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                />
              </div>
              <div className='mt-[24px] flex items-center justify-end gap-3'>
                <button
                  type='button'
                  disabled={!passwordValid}
                  className={`h-8 rounded-full border px-6 text-sm ${
                    passwordValid
                      ? 'bg-blue-indigo text-lavander border-lavander hover:bg-blue-indigo/90'
                      : 'bg-blue-indigo/40 text-lavander/60 border-lavander/40 cursor-not-allowed'
                  }`}
                >
                  {t('buttons.save')}
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setChangingPwd(false);
                    setOldPwd('');
                    setNewPwd('');
                    setConfirmPwd('');
                  }}
                  className='bg-lemon-yellow text-dark-indigo hover:bg-lemon-yellow/90 h-8 rounded-full px-6 text-sm'
                >
                  {t('buttons.cancel')}
                </button>
              </div>
            </>
          ) : (
            <div>
              <FloatingInput
                label={t('page.account.title.password')}
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightPaddingClass='pr-28'
                rightAdornment={
                  <button
                    type='button'
                    onClick={() => setChangingPwd(true)}
                    className='text-blue-indigo bg-lavander h-8 rounded-full border px-4 text-sm'
                  >
                    {t('buttons.change')}
                  </button>
                }
              />
            </div>
          )}
        </section>

        {/* Active Sessions */}
        <section className='bg-dark-indigo rounded-2xl p-4 md:p-6'>
          <div className='mb-6'>
            <h2 className='text-lemon-yellow text-[20px] font-semibold'>{t('page.account.title.activeSessions')}</h2>
            <p className='text-lemon-yellow/50 mt-0.5 text-sm'>{t('page.account.text.sessionsSubtitle')}</p>
          </div>

          <div className='flex flex-wrap gap-3'>
            {sessions.map((s) => (
              <div
                key={s.id}
                onClick={() => openSessionModal(s)}
                className='text-lemon-yellow flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-200'
              >
                <div className='bg-lemon-yellow flex h-12 w-12 items-center justify-center rounded-[14px]'>
                  {s.Icon && <s.Icon className='h-8 w-8' />}
                </div>
                <div className='space-y-1'>
                  <div className='text-lavander text-sm font-medium'>
                    {s.date} / {s.device}
                  </div>
                  <div className='text-lavander/50 text-xs'>{s.ip}</div>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-4'>
            <button
              type='button'
              className='cursor-pointer rounded-full border border-[#FE2D08] px-4 py-2 text-sm text-white'
            >
              {t('page.account.title.terminateAllSessions')}
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
