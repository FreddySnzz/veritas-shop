export default function TermsAndConditionsLayout() {
  return (
    <section 
      id={'terms-and-conditions'} 
      className="w-full h-full font-sans pb-8"
    >
      <h1 className="font-bold text-secondary text-3xl">
        {`Termos e Condições de Uso - Veritas Ateliê`}
      </h1>
      <p className="font-medium text-gray-500 pt-4">
        {`Bem-vindo(a) à Veritas Ateliê. Ao acessar nosso site e realizar uma compra, você concorda com os Termos e Condições descritos abaixo. Recomendamos a leitura cuidadosa antes de finalizar qualquer pedido de produto personalizado.`}
      </p>

      <h2 className="font-bold text-secondary text-2xl pt-8">
        1. Aceitação dos Termos
      </h2>
      <p className="font-medium text-gray-500 pt-2">
        {`Ao utilizar nosso site e adquirir nossos produtos, você confirma que leu, compreendeu e concorda em ficar vinculado a estes Termos e Condições. Caso não concorde com alguma parte destes termos, solicitamos que não utilize nossos serviços.`}
      </p>

      <h2 className="font-bold text-secondary text-2xl pt-8">
        2. Propriedade Intelectual e Material Enviado pelo Usuário
      </h2>
      <div className="font-medium text-gray-500 pt-2">
        <span>
          {`Como nossa loja produz itens baseados em designs, fotos ou textos enviados por você, as seguintes regras se aplicam:`}
        </span>
        <ul className="list-disc pl-8 pt-2 text-sm">
          <li className="pt-2">
            <span className="font-bold">{`Direitos Autorais: `}</span>
            <span>{`Você declara e garante que possui todos os direitos, licenças e autorizações necessárias sobre qualquer imagem, logotipo, texto ou design enviado para personalização.`}</span>
          </li>
          <li className="pt-2">
            <span className="font-bold">{`Isenção de Responsabilidade: `}</span>
            <span>{`A Veritas Ateliê não se responsabiliza por infrações de direitos autorais ou uso indevido de marcas registradas presentes nos arquivos enviados pelos clientes. Toda a responsabilidade legal recai sobre o usuário que enviou o material.`}</span>
          </li>
          <li className="pt-2">
            <span className="font-bold">{`Direito de Recusa: `}</span>
            <span>{`Reservamo-nos o direito de recusar a produção de itens que contenham materiais ofensivos, discursos de ódio, violência, pornografia ou que violem flagrantemente os direitos de terceiros.`}</span>
          </li>
        </ul>
      </div>

      <h2 className="font-bold text-secondary text-2xl pt-8">
        3. Processo de Personalização e Aprovação
      </h2>
      <div className="font-medium text-gray-500 pt-2">
        <span>
          {`Para garantir que seu produto fique exatamente como você deseja, pedimos atenção aos seguintes pontos:`}
        </span>
        <ul className="list-disc pl-8 pt-2 text-sm">
          <li className="pt-2">
            <span className="font-bold">
              {`Revisão de Textos e Informações: `}
            </span>
            <span>{`É de inteira responsabilidade do cliente revisar nomes, datas, frases e qualquer texto enviado para personalização. `}</span>
            <span className="font-bold">
              {`Não nos responsabilizamos por erros de digitação, ortografia ou gramática `}
            </span>
            <span>{`presentes no material fornecido no momento do pedido.`}</span>
          </li>
          <li className="pt-2">
            <span className="font-bold">{`Qualidade da Imagem: `}</span>
            <span>{`A qualidade da impressão final depende diretamente da resolução da imagem enviada. Imagens em baixa resolução poderão resultar em impressões pixeladas ou embaçadas.`}</span>
          </li>
        </ul>
      </div>

      <h2 className="font-bold text-secondary text-2xl pt-8">
        4. Política de Cancelamento, Trocas e Devoluções
      </h2>
      <div className="font-medium text-gray-500 pt-2">
        <span>
          {`Devido à natureza exclusiva e sob medida dos nossos produtos, nossa política de devolução difere da de produtos padronizados:`}
        </span>
        <ul className="list-disc pl-8 pt-2 text-sm">
          <li className="pt-2">
            <span className="font-bold">
              {`Arrependimento ou Erro do Cliente: `}
            </span>
            <span>{`Como os produtos são fabricados de forma exclusiva, `}</span>
            <span className="font-bold">
              {`não aceitamos devoluções ou cancelamentos por arrependimento `}
            </span>
            <span>{`após a conclusão da produção do mesmo, nem por erros cometidos pelo cliente no envio das informações (como tamanho errado ou erro de digitação).`}</span>
          </li>
        </ul>
      </div>

      <h2 className="font-bold text-secondary text-2xl pt-8">
        5. Privacidade e Proteção de Dados
      </h2>
      <div className="font-medium text-gray-500 pt-2">
        <span>
          {`As imagens e dados pessoais fornecidos por você serão utilizados exclusivamente para a produção do seu pedido e entrega. Não compartilhamos, vendemos ou utilizamos suas fotos para fins publicitários sem a sua autorização prévia e expressa.`}
        </span>
      </div>
    </section>
  );
};