interface RosaryIconProps extends React.HTMLAttributes<HTMLElement> {
  size?: number;
  color?: string, 
  strokeWidth?: number, 
  className?: string,
};

export function RosaryIcon({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 1.5, 
  className = "",
}: RosaryIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-rosary ${className}`}
    >
      {/* Corrente (colar) que desce ao redor do pescoço */}
      <path d="M5 3a7 7 0 0 0 14 0" />
      
      {/* Entremeio / Medalha */}
      <circle cx="12" cy="11" r="1" />

      {/* Conta Direita */}
      <circle cx="5" cy="1" r="0.5" />
      <circle cx="5" cy="4" r="0.5" />
      <circle cx="6" cy="7" r="0.5" />
      <circle cx="8.5" cy="9" r="0.5" />
      
      {/* Conta Esquerda */}
      <circle cx="19" cy="1" r="0.5" />
      <circle cx="19" cy="4" r="0.5" />
      <circle cx="18" cy="7" r="0.5" />
      <circle cx="15.5" cy="9" r="0.5" />
      
      {/* Elo de ligação */}
      <path d="M12 12v1" />
      
      {/* Cruz - Haste Vertical */}
      <path d="M12 15v6" />
      
      {/* Cruz - Haste Horizontal */}
      <path d="M10 17h4" />
    </svg>
  );
}