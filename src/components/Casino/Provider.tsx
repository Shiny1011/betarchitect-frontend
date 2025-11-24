import { BGamingIcon, RelaGamingIcon, EvolutionIcon, NetEntIcon, PragmaticPlayIcon, RightArrowIcon } from '@/Icons';

export default function Provider({ onViewAllClick }: { onViewAllClick: () => void }) {
  const providers = [PragmaticPlayIcon, EvolutionIcon, BGamingIcon, NetEntIcon, RelaGamingIcon];

  return (
    <div className='w-full space-y-[18px]'>
      <div className='flex w-full justify-between'>
        <div className='text-[22px] font-bold'>Providers</div>
        <button
          onClick={onViewAllClick}
          className='text-lemon-yellow/50 flex cursor-pointer items-center space-x-2 text-sm font-semibold transition-colors'
        >
          <span>All (320)</span>
          <RightArrowIcon size={14} color='#7C9224' />
        </button>
      </div>
      <div className='flex items-center justify-between'>
        {providers.map((ProviderIcon, index) => (
          <div
            key={index}
            className='bg-dark-indigo flex h-[93px] w-[210px] items-center justify-center rounded-[20px]'
          >
            <ProviderIcon key={ProviderIcon.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
