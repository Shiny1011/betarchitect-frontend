import AccountSidebar from '@/components/Layout/AccountSidebar';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative mb-[30px] flex h-full gap-6'>
      <AccountSidebar />
      <div className='max-w-[1010px] flex-1'>{children}</div>
    </div>
  );
}
