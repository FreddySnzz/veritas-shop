interface PhraseSloganAlternativeProps {
  className?: string;
  divClassName?: string;
}

export function PhraseSloganAlternative({ className }: PhraseSloganAlternativeProps) {
  return (
    <div className={`flex items-center justify-center h-[10vh] ${className}`}>
      <h1 className="text-center text-secondary text-lg font-bold italic">
        "Cada terço, uma oração em forma de arte."
      </h1>
    </div>
  );
}

export function PhraseSloganAlternative2({ className, divClassName }: PhraseSloganAlternativeProps) {
  return (
    <div className={`${divClassName}`}>
      <span className={`font-playfair-display font-medium text-2xl ${className}`}>
        {`Cada terço é preparado com cuidado, fé e oração,`} <br />
        {`para que chegue até você como um`} <br />
        {`verdadeiro sinal de devoção e amor a Deus.`}
      </span>
    </div>
  );
}

export function PhraseNSFatima({ className }: PhraseSloganAlternativeProps) {
  return (
    <div className={`text-center ${className}`}>
      <span className="font-playfair-display italic">
        {`"Rezai o Terço todos os dias, rezai, rezai muito! E fazei sacrifícios pelos pecadores, que vão muitas almas para o Inferno, por não haver quem se sacrifique e peça por elas."`}
      </span>
      <br />
      <br />
      <span className="font-playfair-display font-medium">
        {`Nossa Senhora, em Fátima - Portugal, 1917.`}
      </span>
    </div>
  );
}