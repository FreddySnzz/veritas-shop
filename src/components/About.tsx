import { PhraseNSFatima } from "./Phrases";

export default function About() {
  return (
    <section 
      id={'about'} 
      className="w-auto h-auto"
    >
      <div className="flex flex-col font-medium">
        <div>
          <h1 className="font-playfair-display text-secondary dark:text-zinc-200 font-bold text-2xl">
            Sobre nós
          </h1>
        </div>
        <div className="mt-4">
          <span className="font-playfair-display text-secondary ">
            {`O Veritas Ateliê nasceu do desejo profundo de evangelizar pela simplicidade, 
            tornando cada terço mais do que um trabalho manual: `} 
            <strong>{`É uma oração silenciosa, tecida com fé, amor e devoção.`}</strong>
          </span>
        </div>

        <div className="mt-12">
          <h1 className="font-playfair-display text-secondary dark:text-zinc-200 font-bold text-2xl">
            O significado do nome
          </h1>
        </div>
        <div className="mt-4">
          <span className="font-playfair-display text-secondary">
            {`Veritas, em latim, significa Verdade, símbolo de Cristo e da vida autêntica em Deus. 
            É Ele quem nos diz: “Eu sou o Caminho, a Verdade e a Vida.” (Jo 14, 6).`}<br/><br/>

            {`A Verdade também se reflete em Maria, chamada Espelho da Justiça e Mãe da Verdade, 
            porque sua vida pura e silenciosa irradiava a luz divina. 
            Suas virtudes inspiram cada detalhe deste ateliê!`}<br/><br/>

            {`Por isso, na simplicidade, a verdade florece!`}
          </span>
        </div>

        <div className="mt-12">
          <h1 className="font-playfair-display text-secondary dark:text-zinc-200 font-bold text-2xl">
            Os benefícios de meditar o Santo Rosário
          </h1>
        </div>
        <div className="mt-4">
          <span className="font-playfair-display text-secondary">
            {`Crescimento na fé, maior intimidade com Jesus e Maria, e proteção contra o mal, 
            sendo uma arma espiritual silenciosa e poderosa.`}<br/><br/>
          </span>
        </div>

        <div className="flex justify-end mt-8 p-2">
          <div className="xl:w-8/10">
            <PhraseNSFatima className="text-end text-xl font-black text-secondary dark:text-zinc-200" />
          </div>
        </div>
      </div>
    </section>
  );
}