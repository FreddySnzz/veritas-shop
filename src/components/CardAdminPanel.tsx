type ActionCardProps = {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  highlight?: boolean;
};

export default function ActionCard({
  title,
  icon,
  onClick,
  disabled,
  highlight = false,
}: ActionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        'flex min-h-32 w-full flex-col items-center justify-center gap-3 rounded-2xl border ',
        'p-5 text-center cursor-pointer transition-colors',
        'bg-white dark:bg-input/50 hover:bg-gray-50 dark:hover:bg-zinc-700',
        'dark:border-zinc-700',
        'disabled:cursor-not-allowed disabled:opacity-60',
        highlight ? 'border-primary/20 ring-1 ring-primary/10' : 'border-gray-200',
      ].join(' ')}
    >
      <div className="text-secondary">{icon}</div>
      <span className="font-semibold text-secondary">{title}</span>
    </button>
  );
}