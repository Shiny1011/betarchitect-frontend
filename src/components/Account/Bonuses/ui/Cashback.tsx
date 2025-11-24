export const Cashback = () => {
  return (
    <div className=''>
      <div className='flex w-full gap-5'>
        <div className='bg-dark-indigo flex flex-1 flex-col rounded-[16px] border border-solid border-[#22355A] px-6 py-[41px]'>
          <div className='text-[20px] leading-tight font-bold'>Cashback</div>
          <div className='text-lemon-yellow/50 mt-0.5 text-[14px] leading-tight font-light'>
            Earn back a percentage of the rake/fees from your play
          </div>

          <div className='border-lemon-yellow mt-6 border-l-[3px] border-solid pl-3'>
            <div className='text-lemon-yellow/50 text-sm leading-tight'>You’re eligible for Cashback</div>
            <div className='text-lavander mt-1 text-[22px] leading-tight font-bold'>245.00 €</div>
          </div>

          <button className='bg-lavander text-blue-indigo mt-3 flex items-center justify-center rounded-full py-2.5 text-[14px] font-medium'>
            Activate Cashback
          </button>
        </div>

        <div className='bg-dark-indigo flex flex-1 rounded-[16px] border border-solid border-[#22355A] p-6'>
          <div className='flex w-full flex-col'>
            <div className='text-[20px] leading-tight font-bold'>Bonus Details</div>

            <div className='mt-6 space-y-[15px]'>
              <div className='flex items-center justify-between'>
                <span className='text-lemon-yellow/50 leading-full text-[14px]'>Available to Claim:</span>
                <span className='text-lemon-yellow leading-full text-[14px]'>12.50 USD</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-lemon-yellow/50 leading-full text-[14px]'>Pending:</span>
                <span className='text-lemon-yellow leading-full text-[14px]'>3.20 USD</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-lemon-yellow/50 leading-full text-[14px]'>Total Earned:</span>
                <span className='text-lemon-yellow leading-full text-[14px]'>254.75 USD</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-lemon-yellow/50 leading-full text-[14px]'>Award Type:</span>
                <span className='text-lemon-yellow leading-full text-[14px]'>Weekly</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-lemon-yellow/50 leading-full text-[14px]'>Next Payout:</span>
                <span className='text-lemon-yellow leading-full text-[14px]'>Oct 14, 2025</span>
              </div>
            </div>

            <div className='text-lavander/50 mt-3 text-sm font-light'>
              Your cashback is automatically credited every Monday
            </div>
          </div>
        </div>
      </div>

      <div className='bg-dark-indigo mt-5 rounded-[16px] border border-solid border-[#22355A] p-6'>
        <div className='flex items-center gap-2'>
          <div className='text-lemon-yellow text-[20px] leading-tight font-bold'>History</div>
          <div className='text-lemon-yellow/50 mt-1 leading-tight'>(Last 10 entries)</div>
        </div>

        <table className='mt-6 w-full table-fixed text-[12px]'>
          <thead>
            <tr className='text-left'>
              <th className='text-lemon-yellow/50 py-2 font-normal'>DATE &amp; TIME</th>
              <th className='text-lemon-yellow/50 py-2 font-normal'>PERIOD</th>
              <th className='text-lemon-yellow/50 py-2 font-normal'>AMOUNT</th>
              <th className='text-lemon-yellow/50 py-2 font-normal'>TYPE</th>
              <th className='text-lemon-yellow/50 py-2 font-normal'>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='text-lemon-yellow py-2'>25 AUG 2025, 12:34</td>
              <td className='text-lemon-yellow py-2'>DAILY</td>
              <td className='text-lemon-yellow py-2'>2.50 USD</td>
              <td className='text-lemon-yellow py-2'>AUTO</td>
              <td className='text-lemon-yellow py-2'>CREDITED</td>
            </tr>
            <tr>
              <td className='text-lemon-yellow py-2'>24 AUG 2025, 18:09</td>
              <td className='text-lemon-yellow py-2'>DAILY</td>
              <td className='text-lemon-yellow py-2'>2.50 USD</td>
              <td className='text-lemon-yellow py-2'>MANUAL</td>
              <td className='text-lemon-yellow py-2'>CREDITED</td>
            </tr>
            <tr>
              <td className='text-lemon-yellow py-2'>23 AUG 2025, 09:47</td>
              <td className='text-lemon-yellow py-2'>DAILY</td>
              <td className='text-lemon-yellow py-2'>2.50 USD</td>
              <td className='text-lemon-yellow py-2'>AUTO</td>
              <td className='text-lemon-yellow py-2'>CREDITED</td>
            </tr>
            <tr>
              <td className='text-lemon-yellow py-2'>23 AUG 2025, 17:55</td>
              <td className='text-lemon-yellow py-2'>WEEKLY</td>
              <td className='text-lemon-yellow py-2'>2.50 USD</td>
              <td className='text-lemon-yellow py-2'>MANUAL</td>
              <td className='text-lemon-yellow py-2'>CREDITED</td>
            </tr>
            <tr>
              <td className='text-lemon-yellow py-2'>23 AUG 2025, 17:55</td>
              <td className='text-lemon-yellow py-2'>DAILY</td>
              <td className='text-lemon-yellow py-2'>3.10 USD</td>
              <td className='text-lemon-yellow py-2'>MANUAL</td>
              <td className='text-lemon-yellow py-2'>CREDITED</td>
            </tr>
            <tr>
              <td className='text-lemon-yellow py-2'>23 AUG 2025, 17:55</td>
              <td className='text-lemon-yellow py-2'>DAILY</td>
              <td className='text-lemon-yellow py-2'>2.50 USD</td>
              <td className='text-lemon-yellow py-2'>MANUAL</td>
              <td className='text-lemon-yellow py-2'>CREDITED</td>
            </tr>
            <tr>
              <td className='text-lemon-yellow py-2'>23 AUG 2025, 17:55</td>
              <td className='text-lemon-yellow py-2'>DAILY</td>
              <td className='text-lemon-yellow py-2'>10.25 USD</td>
              <td className='text-lemon-yellow py-2'>AUTO</td>
              <td className='text-lemon-yellow py-2'>CREDITED</td>
            </tr>
            <tr>
              <td className='text-lemon-yellow py-2'>23 AUG 2025, 17:55</td>
              <td className='text-lemon-yellow py-2'>DAILY</td>
              <td className='text-lemon-yellow py-2'>2.50 USD</td>
              <td className='text-lemon-yellow py-2'>MANUAL</td>
              <td className='text-lemon-yellow py-2'>CREDITED</td>
            </tr>
            <tr>
              <td className='text-lemon-yellow py-2'>23 AUG 2025, 17:55</td>
              <td className='text-lemon-yellow py-2'>DAILY</td>
              <td className='text-lemon-yellow py-2'>10.25 USD</td>
              <td className='text-lemon-yellow py-2'>AUTO</td>
              <td className='text-lemon-yellow py-2'>CREDITED</td>
            </tr>
            <tr>
              <td className='text-lemon-yellow py-2'>23 AUG 2025, 17:55</td>
              <td className='text-lemon-yellow py-2'>DAILY</td>
              <td className='text-lemon-yellow py-2'>3.10 USD</td>
              <td className='text-lemon-yellow py-2'>MANUAL</td>
              <td className='text-lemon-yellow py-2'>CREDITED</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
