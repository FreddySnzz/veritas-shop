interface PhraseSloganProps {
  className?: string;
  divClassName?: string;
}

export function PhraseVerse({ className }: PhraseSloganProps) {
  return (
    <div className={`flex items-center justify-center h-[10vh] ${className}`}>
      <h1 className="text-center text-secondary text-lg font-bold italic">
        &quot;Eu sou o Caminho, a Verdade e a Vida.&quot;<br/>
        (Jo 14, 6).
      </h1>
    </div>
  );
}

export function PhraseSloganAlternative({ className, divClassName }: PhraseSloganProps) {
  return (
    <div className={`${divClassName}`}>
      <span className={`font-playfair-display font-medium text-2xl ${className}`}>
        &quot;Na simplicidade, a verdade florece!&quot;
      </span>
    </div>
  );
}

export function PhraseSloganAlternative2({ className, divClassName }: PhraseSloganProps) {
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

export function PhraseNSFatima({ className }: PhraseSloganProps) {
  return (
    <div className={`text-center ${className}`}>
      <span className="font-playfair-display italic">
        &quot;{`Rezai o Terço todos os dias, rezai, rezai muito! E fazei sacrifícios pelos pecadores, que vão muitas almas para o Inferno, por não haver quem se sacrifique e peça por elas.`}&quot;
      </span>
      <br />
      <br />
      <span className="font-playfair-display font-medium">
        {`Nossa Senhora, em Fátima - Portugal, 1917.`}
      </span>
    </div>
  );
}