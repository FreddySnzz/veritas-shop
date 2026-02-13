import Link from "next/link";
import ItemCollapse from "./ItemCollapse";
import ItemContent from "./ItemContent";

export default function HelpLayout() {
  return (
    <section 
      id={'about'} 
      className="w-full h-full font-sans"
    >
      <div className="flex flex-col">
        <section id="faq">
          <h1 className="font-bold text-secondary text-3xl">
            Dúvidas Frequentes (FAQ)
          </h1>

          <div className="flex flex-col mt-4 gap-4">
            <ItemCollapse 
              title="Pergunta 1"
              titleClassName="text-lg"
            >
              <ItemContent>
                <span className="text-gray-500 text-sm">
                  Resposta 1
                </span>
              </ItemContent>
            </ItemCollapse>
            <ItemCollapse 
              title="Pergunta 1"
              titleClassName="text-lg"
            >
              <ItemContent>
                <span className="text-gray-500 text-sm">
                  Resposta 1
                </span>
              </ItemContent>
            </ItemCollapse>
            <ItemCollapse 
              title="Pergunta 1"
              titleClassName="text-lg"
            >
              <ItemContent>
                <span className="text-gray-500 text-sm">
                  Resposta 1
                </span>
              </ItemContent>
            </ItemCollapse>
            <ItemCollapse 
              title="Pergunta 1"
              titleClassName="text-lg"
            >
              <ItemContent>
                <span className="text-gray-500 text-sm">
                  Resposta 1
                </span>
              </ItemContent>
            </ItemCollapse>
            <ItemCollapse 
              title="Pergunta 1"
              titleClassName="text-lg"
            >
              <ItemContent>
                <span className="text-gray-500 text-sm">
                  Resposta 1
                </span>
              </ItemContent>
            </ItemCollapse>
            <ItemCollapse 
              title="Pergunta 1"
              titleClassName="text-lg"
            >
              <ItemContent>
                <span className="text-gray-500 text-sm">
                  Resposta 1
                </span>
              </ItemContent>
            </ItemCollapse>
          </div>
        </section>

        <div className="mt-12">
          <Link
            aria-label="Termos e Condições"
            title="Termos e Condições"
            href={`/ajuda/termos-e-condicoes`}
          >
            <span className="font-bold text-lg hover:underline">
              Termos e Condições
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};