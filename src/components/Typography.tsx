import FlowerIcon from "./icons/FlowerIcon";

interface TypographyProps {
  flowerColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
}

const sizeMap = {
  xs: 0.5,
  sm: 0.75,
  md: 1,
  lg: 1.5,
  xl: 2,
};

export function Typography({ 
  flowerColor = "var(--color-primary)",
  titleColor = "text-secondary", 
  className,
  size = 'md'
}: TypographyProps) {
  const multiplier = typeof size === 'number' ? size : sizeMap[size];
  
  return (
    <div 
      className={`flex flex-col items-center justify-center ${className}`}
      style={{
        '--typography-multiplier': multiplier,
      } as React.CSSProperties}
    >
      <FlowerIcon 
        width={40 * multiplier} 
        height={60 * multiplier} 
        color={flowerColor} 
      />
      <div className={`flex flex-col text-center ${titleColor}`}>
        <span 
          className="mt-2"
          style={{ fontSize: `${3 * multiplier}rem` }}
        >
          VERITAS
        </span>
        <span 
          className="font-sans font-medium"
          style={{ fontSize: `${1.125 * multiplier}rem` }}
        >
          ATELIÊ
        </span>
      </div>
    </div>
  );
}

export function SlogganTypography({ 
  subtitleColor,
  className,
  size = 'md'
}: TypographyProps) {
  const multiplier = typeof size === 'number' ? size : sizeMap[size];
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`flex flex-col text-center text-secondary ${subtitleColor}`}>
        <span 
          className="font-sans font-medium"
          style={{ fontSize: `${1 * multiplier}rem` }}
        >
          Na simplicidade, a verdade florece!
        </span>
      </div>
    </div>
  );
}

export function LogoHorizontal() {
  return (
    <div className="relative flex gap-2">
      <div className="flex items-center gap-2">
        <FlowerIcon
          width={40} 
          height={40} 
          color="var(--color-secondary)"
        />
          <h1 className="text-2xl font-playfair-display font-black text-secondary">
            VERITAS
          </h1>
      </div>
      <div className="absolute top-[0.8rem] left-40 ">
        <h1 className="font-sans font-medium text-secondary">
          ATELIÊ
        </h1>
      </div>
    </div>
  )
}