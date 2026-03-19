import Link from "next/link";
import ItemCollapse from "./ItemCollapse";
import ItemContent from "./ItemContent";
import { SupportButton } from "./buttons/SupportButton";

interface HelpLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  whatsappNumber?: string;
};

export default function HelpLayout({ whatsappNumber }: HelpLayoutProps) {
  return (
    <section 
      id={'help'} 
      className="w-full h-full font-sans"
    >
      <div className="flex flex-col">
        <section id="faq">
          <h1 className="font-bold text-secondary text-2xl md:text-3xl">
            Dúvidas Frequentes (FAQ)
          </h1>

          <div className="flex flex-col mt-4 gap-4">
            <ItemCollapse 
              title="Como realizar uma compra no site?"
              titleClassName="md:text-lg text-start"
            >
              <ItemContent className="mt-1 mb-4">
                <div className="flex flex-col text-gray-500 text-xs md:text-sm gap-2">
                  <span>
                    {`É muito simples realizar uma compra na loja online Veritas Ateliê. Basta seguir os passos abaixo:`}
                  </span>
                  <span>
                    {`1. Acesse a página inicial;`}
                  </span>
                  <span>
                    {`2. Encontre o produto desejado por meio do nosso catálogo na Página Inicial, ou use a barra de busca;`}
                  </span>
                  <span>
                    {`3. Na tela do produto haverá duas opções dependendo do tipo de produto: "Personalizar Agora" ou "Adicionar ao Carrinho". 
                    Cada produto é único, podendo ser personalizável (ou não) com diferentes itens conforme seu interesse;`}
                  </span>
                  <span className="ml-3">
                    {`3.1. Se o produto for personalizável, na tela de personalização será possível escolher os itens de acordo com o que o produto permite. 
                    Cada item de personalização terá uma breve descrição e uma imagem. Após escolher os itens obrigatórios - marcados com (*), 
                    e finalizar os passos necessários, clique em "Adicionar ao Carrinho" para adicionar o produto personalizado ao seu carrinho;`}
                  </span>
                  <span className="ml-3">
                    {`3.2. Caso opte por mudar apenas alguns itens de personalização, você pode voltar aos passos anteriores e selecionar os itens de sua preferência.`}
                  </span>
                  <span className="ml-3">
                    {`3.3. Caso tenha optado por um item que aceite imagem personalizada, você pode informar qual imagem deseja ao suporte na finalização do pedido, 
                    ou enviar o arquivo de imagem pelo WhatsApp.`}
                  </span>
                  <span>
                    {`4. Quando estiver satisfeito com seu carrinho, você pode finalizar a compra clicando no botão "Finalizar Pedido no WhatsApp", 
                    para que o pedido seja revisado pelo nosso suporte, confirmado e enviado para nossa fase de produção.`}
                  </span>
                  <span className="ml-3">
                    {`4.1. Caso não tenha WhatsApp, entre em contato com o suporte diretamente pelo número ${whatsappNumber}.`}
                  </span>
                  <span>
                    {`5. Agora é só aguardar a produção do produto! :)`}
                  </span>
                </div>
              </ItemContent>
            </ItemCollapse>

            <ItemCollapse 
              title="Escolhi um produto que aceita imagem personalizada. Como enviar a imagem?"
              titleClassName="md:text-lg text-start mb-1"
            >
              <ItemContent className="mt-1 mb-4">
                <span className="flex text-gray-500 text-xs md:text-sm">
                  {`Caso tenha escolhido por um produto ou personalização que aceite imagem personalizada, 
                  você pode informar o nome da imagem desejada ao suporte, na finalização do pedido, 
                  ou enviar o arquivo de imagem no chat pelo WhatsApp ou no nosso Direct do Instagram (@veritas_atelie).`}
                </span>
              </ItemContent>
            </ItemCollapse>

            <ItemCollapse 
              title="É possível alterar um pedido após o fechamento?"
              titleClassName="md:text-lg text-start mb-1"
            >
              <ItemContent className="mt-1 mb-4">
                <span className="flex text-gray-500 text-xs md:text-sm">
                  {`Como os produtos são fabricados de forma exclusiva, 
                  não aceitamos devoluções ou cancelamentos por arrependimento após a conclusão da produção do mesmo, 
                  nem por erros cometidos pelo cliente no envio das informações (como tamanho errado ou erro de digitação).`}
                </span>
              </ItemContent>
            </ItemCollapse>

            <ItemCollapse 
              title="Não tenho WhatsApp. Como faço para entrar em contato com o suporte?"
              titleClassName="md:text-lg text-start mb-1"
            >
              <ItemContent className="mt-1 mb-4 overflow-hidden">
                <p className="text-gray-500 text-xs md:text-sm">
                  Caso não tenha WhatsApp, você pode entrar em contato pela nossa
                  <Link 
                    href={`https://ig.me/m/veritas_atelie`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ir para a Direct no Instagram do Veritas Ateliê"
                    title="Ir para a Direct no Instagram do Veritas Ateliê"
                    className="font-medium hover:underline hover:italic px-1"
                  >
                    direct do Instagram (@veritas_atelie)
                  </Link> 
                  ou diretamente pelo número {whatsappNumber}.
                </p>
              </ItemContent>
            </ItemCollapse>

            <ItemCollapse 
              title="Por que os valores mostrados no carrinho não são exatos?"
              titleClassName="md:text-lg text-start mb-1"
            >
              <ItemContent className="mt-1 mb-4">
                <span className="flex text-gray-500 text-xs md:text-sm">
                  {`Os valores mostrados no carrinho são apenas uma estimativa, mas só para produtos que podem ser personalizados. 
                  Ao finalizar o pedido, nossa equipe irá validar manualmente os itens que você escolheu e calcular o valor final com base nas informações fornecidas.
                  Assim que confirmado, o valor real será informado para você no CHAT DE ATENDIMENTO (WhatsApp ou Instagram).`}
                </span>
              </ItemContent>
            </ItemCollapse>
          </div>
        </section>

        <div className="flex flex-col mt-12 gap-4">
          <Link
            aria-label="Orações"
            title="Orações"
            href={`/ajuda/oracoes`}
          >
            <span className="font-bold text-2xl hover:underline">
              Aprenda a Rezar
            </span>
          </Link>
          <Link
            aria-label="Termos e Condições"
            title="Termos e Condições"
            href={`/ajuda/termos-e-condicoes`}
          >
            <span className="font-bold text-2xl hover:underline">
              Termos e Condições
            </span>
          </Link>
          
          <SupportButton
            title="Relatar problema ou falar com suporte"
            messageToSupport={`Olá, gostaria de informar um problema que encontrei na Veritas Ateliê!`}
          />
        </div>
      </div>
    </section>
  );
};