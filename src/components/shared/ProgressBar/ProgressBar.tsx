interface ProgressBarProps {
  value: number;
  total: number;
  variant: 'default' | 'danger';
}

export function ProgressBar({ value, total, variant }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / total) * 100));

  return (
    <div className='space-y-1'>
      <div className='h-2 w-full rounded-full bg-black/30'>
        <div
          className={`h-2 rounded-full ${variant === 'danger' ? 'bg-red-500' : 'bg-lavander'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
