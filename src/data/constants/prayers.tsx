import ItemCollapse from "@/components/ItemCollapse";
import ItemContent from "@/components/ItemContent";
import Link from "next/link";

export const commonPrayers = [
  {
    title: 'Sinal da Cruz',
    href: '/sinal-da-cruz',
    description: 'Deve-se fazer 3 (três) cruzes. Uma na testa, uma na boca e uma no peito (com o polegar direito).',
    prayer: (
      <div className="flex flex-col">
        <span>{`Pelo sinal da Santa Cruz, livrai-nos, Deus nosso Senhor, dos nossos inimigos.`}</span>
        <span className="font-medium mt-4">
          Em nome do Pai, e do Filho e do Espírito Santo. <br/> Amém.
        </span>
      </div>
    )
  },
  {
    title: 'Vinde Espírito Santo',
    href: '/vinde-espirito-santo',
    prayer: (
      <div className="flex flex-col">
        <span>{`Vinde Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do Vosso Amor. 
          Enviai, Senhor, o Vosso Santo Espírito e tudo será criado e renovareis a face da terra.`}
        </span>
        <span className="mt-4">
          {`Oremos: Ó Deus que instruíste os corações dos vossos fiéis, com a luz do Espírito Santo, 
          fazei que apreciemos retamente todas as coisas segundo o mesmo Espírito e gozemos da sua consolação.`}
        </span>
        <span className="font-medium mt-4">
          Por Cristo Senhor Nosso. <br/> Amém.
        </span>
      </div>
    )
  },
  {
    title: 'Credo',
    href: '/credo',
    prayer: (
      <div className="flex flex-col">
        <span>
          {`Creio em Deus Pai todo-poderoso, criador do céu e da terra; e em Jesus Cristo, seu único Filho, Nosso Senhor; 
          que foi concebido pelo poder do Espírito Santo; nasceu na Virgem Maria, padeceu sob Pôncio Pilatos, 
          foi crucificado morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus, 
          está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos;`}
        </span>
        <span>
          {`Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos Santos, na remissão dos pecados, 
          na ressurreição da carne, na vida eterna.`}
        </span>
        <span className="font-medium mt-4">
          Amém.
        </span>
      </div>
    )
  },
  {
    title: 'Pai Nosso',
    href: '/pai-nosso',
    prayer: (
      <div className="flex flex-col">
        <span>
          {`Pai Nosso que estais nos Céus, santificado seja o Vosso Nome, venha a nós o Vosso Reino, 
          seja feita a vossa vontade assim na terra como no Céu.`}
        </span>
        <span>
          {`O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido, 
          e não nos deixeis cair em tentação, mas livrai-nos do Mal.`}
        </span>
        <span className="font-medium mt-4">
          Amém.
        </span>
      </div>
    )
  },
  {
    title: 'Ave Maria',
    href: '/ave-maria',
    prayer: (
      <div className="flex flex-col">
        <span>
          {`Ave Maria, cheia de graça, o Senhor é convosco, 
          bendita sois Vós entre as mulheres e bendito é o fruto do Vosso ventre, Jesus.`}
        </span>
        <span>
          {`Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora da nossa morte.`}
        </span>
        <span className="font-medium mt-4">
          Amém.
        </span>
      </div>
    )
  },
  {
    title: 'Glória ao Pai',
    href: '/gloria-ao-pai',
    prayer: (
      <div className="flex flex-col">
        <span>
          {`Glória ao Pai e ao Filho e ao Espírito Santo. 
          Assim como era, no princípio, agora e sempre, e por todos os séculos dos séculos.`}
        </span>
        <span className="font-medium mt-4">
          Amém.
        </span>
      </div>
    )
  },
  {
    title: 'Jaculatória de Fátima (Oração de Fátima)',
    href: '/jaculatoria-fatima',
    prayer: (
      <div className="flex flex-col">
        <span>
          {`Ó, meu Jesus, perdoai-nos e livrai-nos do fogo do inferno, 
          levai as almas todas para o céu, e socorrei principalmente 
          as que mais precisarem da Vossa misericórdia!`}
        </span>
      </div>
    )
  },
  {
    title: 'Salve Rainha',
    href: '/salve-rainha',
    prayer: (
      <div className="flex flex-col">
        <span>
          {`Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! 
          A Vós bradamos, os degredados filhos de Eva; 
          a Vós suspiramos, gemendo e chorando neste vale de lágrimas.`}
        </span>
        <span>
          {`Eia, pois Advogada nossa, esses Vossos olhos misericordiosos a nós volvei; 
          e depois deste desterro, nos mostrai Jesus, bendito fruto do Vosso ventre, 
          ó clemente, ó piedosa, ó doce sempre Virgem Maria.`}
        </span>
        <span className="mt-4">
          {`Rogai por nós, Santa Mãe de Deus.`}
        </span>
        <span className="font-medium">
          {`R: Para que sejamos dignos das promessas de Cristo.`}
        </span>
      </div>
    )
  },
  {
    title: 'Santo Anjo',
    href: '/santo-anjo',
    prayer: (
      <div className="flex flex-col">
        <span>
          {`Santo Anjo do Senhor, meu zeloso guardador, se a Ti me confiou a piedade divina, sempre me rege, me guarda, me governa me ilumina.`}
        </span>
        <span className="font-medium mt-4">
          Amém.
        </span>
        <div className="flex flex-col mt-4 text-xs text-gray-400">
          <span>{`Padre Aírton de Maria nos ensinou uma breve extensão da oração...`}</span>
          <span>
            {`R: Eu Te dou a minha mão, e prometo de coração, que por Ti me deixo guiar com docilidade, para no céu alcançar a eterna felicidade.`}
          </span>
          <span className="mt-2">
            Assim seja.
          </span>
        </div>
      </div>
    )
  },
];

export const specificPrayers = [
  {
    title: 'Ato de Contrição',
    href: '/ato-de-contricao',
    description: (
      <>
        <span>{`Antes de ir para o confessionário, é recomendável que tenha feito uma `}</span>
        <Link 
          href="/ajuda/oracoes/preparacao-confissao" 
          className="font-bold italic md:not-italic hover:underline"
        >
          boa preparação.
        </Link>
      </>
    ),
    prayer: (
      <div className="flex flex-col">
        <span>
          {`Meu Deus, eu me arrependo, de todo coração de todos meus pecados e os detesto, 
          porque pecando não só mereci as penas que justamente estabelecestes, 
          mas principalmente porque Vos ofendi a Vós, sumo bem e digno de ser amado sobre todas as coisas.`}
        </span>
        <span>
          {`Por isso, proponho firmemente, com a ajuda da Vossa graça, não mais pecar e fugir das ocasiões próximas de pecar.`}
        </span>
        <span className="font-medium mt-4">
          Amém.
        </span>
      </div>
    )
  },
  {
    title: 'Ato de Desagravo',
    href: '/ato-de-desagravo',
    description: (
      <span>
        {`O ato de desagravo é um tipo de oração para consolar a Deus pelos nossos pecados. 
        As orações abaixo foram ensinadas pelo Anjo da Paz às crianças de Fátima a quem apareceu Nossa Senhor. 
        Reze na frente do sacrário da Igreja, onde está Jesus na Hóstia Santa.`}
      </span>
    ),
    prayer: (
      <div className="flex flex-col">
        <span>
          {`Meu Deus eu creio, adoro, espero e amo-vos!`}
        </span>
        <span>
          {`E peço-vos perdão por todos os que não creêm, não adoram, não esperam e não vos amam! (3x)`}
        </span>

        <span className="font-medium mt-4">
          {`Santíssima Trindade: `}
        </span>
        <span>
          {`Deus Pai, Filho e Espírito Santo, eu vos adoro profundamente, 
          e vos ofereço o preciosíssimo Corpo, Sangue, Alma e Divindade de Jesus Cristo, 
          presente em todos os Sacrários do mundo inteiro, em reparação pelas inúmeras ofensas, 
          sacrilégios e indiferenças com que é todos os dias ofendido.`}
        </span>

        <span className="font-medium mt-4">
          {`- E pelos infinitos merecimentos do Seu Santíssimo Coração e do Coração Imaculado de Maria, peço-vos a conversão dos pobres pecadores! (3x)`}
        </span>
      </div>
    )
  },
  {
    title: 'Angelus (O Anjo do Senhor)',
    href: '/angelus',
    description: "Normalmente rezado às 00h, 6h, 12h ou 18h.",
    prayer: (
      <div className="flex flex-col">
        <span>{`O Anjo do Senhor anunciou a Maria.`}</span>
        <span className="font-medium">
          {`R: e ela concebeu do Espírito Santo.`}
        </span>
        <Link
          href="/ajuda/oracoes/ave-maria"
          title="Ir para Ave Maria"
          className="italic hover:underline"
        >
          Ave Maria...
        </Link>

        <span className="mt-2">
          {`Eis aqui a serva do Senhor.`}
        </span>
        <span className="font-medium">
          {`R: Faça-se em mim segundo a vossa palavra.`}
        </span>
        <Link
          href="/ajuda/oracoes/ave-maria"
          title="Ir para Ave Maria"
          className="italic hover:underline"
        >
          Ave Maria...
        </Link>

        <span className="mt-2">
          {`e o Verbo se fez carne.`}
        </span>
        <span className="font-medium">
          {`R: E habitou entre nós.`}
        </span>
        <Link
          href="/ajuda/oracoes/ave-maria"
          title="Ir para Ave Maria"
          className="italic hover:underline"
        >
          Ave Maria...
        </Link>

        <span className="mt-4">
          {`Rogai por nós, Santa Mãe de Deus.`}
        </span>
        <span className="font-medium">
          {`R: Para que sejamos dignos das promessas de Cristo.`}
        </span>

        <span className="mt-4">
          {`Oremos: Derramai, ó Deus, a vossa graça em nossos corações, para que, conhecendo, pela mensagem do Anjo, 
          a encarnação do Cristo, vosso Filho, cheguemos, por sua paixão e cruz, 
          à glória da ressurreição pela intercessão da Virgem Maria.`}
        </span>
        <span className="font-medium mt-2">
          Pelo mesmo Cristo, Senhor Nosso. <br/> Amém.
        </span>
      </div>
    )
  },
  {
    title: 'Jaculatória da Medalha Milagrosa (Oração de Nossa Senhora das Graças)',
    href: '/jaculatoria-medalha-milagrosa',
    prayer: (
      <div className="flex flex-col">
        <span>{`Ó Maria concebida sem pecado, rogai por nós que recorremos a Vós.`}</span>
      </div>
    )
  },
  {
    title: 'Magnificat',
    href: '/magnificat',
    prayer: (
      <div className="flex flex-col">
        <span>
          {`Minha alma glorifica ao Senhor, meu espírito; exulta de alegria em Deus, meu Salvador, 
            porque olhou para sua pobre serva. Por isto, desde agora, me proclamarão bem-aventurada todas as gerações, 
            porque realizou em mim maravilhas aquele que é poderoso e cujo nome é Santo. 
            Sua misericórdia se estende, de geração em geração, sobre os que o temem.
          `}
        </span>
        <span className="mt-4">
          {`Manifestou o poder do seu braço: desconcertou os corações dos soberbos. 
            Derrubou do trono os poderosos e exaltou os humildes. Saciou de bens os indigentes e despediu de mãos vazias os ricos. 
            Acolheu a Israel, seu servo, lembrado da sua misericórdia, conforme prometera a nossos pais, em favor de Abraão e sua posteridade, para sempre.
          `}
        </span>
        <span className="font-medium mt-4"
        >
          Amém.
        </span>
      </div>
    )
  },
  {
    title: 'São Bento',
    href: '/sao-bento',
    prayer: (
      <div className="flex flex-col">
        <h1 className="font-medium">Oração da Medalha de São Bento</h1>
        <span className="mt-2">
          A Cruz sagrada seja minha Luz, <br/>
          Não seja o Dragão meu guia, <br/>
          Retira-te Satanás, <br/>
          Nunca me aconse-lhes coisas vãs, <br/>
          É mal o que tu me ofereces, <br/>
          Bebe tu mesmo do teu veneno.
        </span>
        <span className="font-medium mt-2">
          Assim seja.
        </span>

        <h1 className="font-medium mt-6">Oração a São Bento</h1>
        <span className="mt-2">
          {`Ó Deus, vós que vos dignastes derramar sobre o bem-aventurado confessor o Patriarca São Bento
          o espírito de todos os justos concedei a nós, vossos servos e servas a graça de nos revestirmos 
          deste mesmo espírito para que possamos, com o vosso auxílio, fielmente cumprir o que temos prometido.`}
        </span>
        <span className="font-medium mt-2">
          Por Jesus Cristo Nosso Senhor. <br/> Amém.
        </span>
      </div>
    )
  },
  {
    title: 'São Miguel Arcanjo',
    href: '/sao-miguel-arcanjo',
    prayer: (
      <div className="flex flex-col">
        <span>
          {`São Miguel Arcanjo, defendei-nos no combate, sede o nosso refúgio contra as maldades e ciladas do demônio. 
          Ordene-lhe Deus, instantemente o pedimos, e vós, príncipe da milícia celeste, pela virtude divina, 
          precipitai no inferno a satanás e a todos os espíritos malignos, que andam pelo mundo para perder as almas.`}
        </span>
        <span className="font-medium mt-4">
          Amém.
        </span>
      </div>
    )
  },
  {
    title: 'Sub Tuum',
    href: '/sub-tuum',
    prayer: (
      <div className="flex flex-col">
        <span>
          {`À vossa proteção recorremos, santa Mãe de Deus; não desprezeis as nossas súplicas em nossas necessidades; 
          mas livrai-nos sempre de todos os perigos, ó Virgem gloriosa e bendita.`}
        </span>
      </div>
    )
  },
  {
    title: 'Súplica da Chama de Amor',
    href: '/suplicao-da-chama-de-amor',
    prayer: (
      <div className="flex flex-col">
        <span>
          {`Santa Mãe de Deus, derramai sobre a humanidade inteira as graças 
          eficazes da vossa Chama de Amor, agora e na hora de nossa morte.`}
        </span>
        <span className="font-medium mt-4">
          Amém.
        </span>
      </div>
    )
  },
];

export const various = [
  {
    title: 'Coroinha de Nossa Senhora',
    href: '/coroinha-nossa-senhora',
    prayer: (
      <div className="flex flex-col">
        <span>{`V. Concedei-me que Vos louve, Virgem Sagrada.`}</span>
        <span className="font-medium">
          {`R. Dai-me valor contra os vossos inimigos.`}
        </span>
        <Link
          href="/ajuda/oracoes/credo"
          title="Ir para o Credo"
          className="italic hover:underline"
        >
          Credo...
        </Link>

        <div className="flex flex-col mt-4">
          <h1 className="font-bold">I - Coroa de Excelência</h1>
          <Link
            href="/ajuda/oracoes/pai-nosso"
            title="Ir para Pai Nosso"
            className="italic hover:underline"
          >
            Pai Nosso...
          </Link>
          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline"
          >
            Ave Maria...
          </Link>

          <span className="mt-2">
            {`Sois Bem-aventurada, Virgem Maria, que levastes em Vosso seio o Senhor, Criador do mundo; 
            destes à luz a Quem Vos formou, e Sois Virgem perpétua.`}
          </span>
          <span className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </span>
          <span className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </span>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <span>
            {`Ó Santa e imaculada virgindade, não sei com que louvores Vos possa exaltar; 
            pois quem os céus não puderam conter, Vós O levastes em Vosso seio.`}
          </span>
          <span className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </span>
          <span className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </span>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <span>
            {`Sois toda formosa, Virgem Maria, e não há mancha original em vós.`}
          </span>
          <span className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </span>
          <span className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </span>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <span>
            {`Possuís, ó Virgem Maria, tantos privilégios, quantas são as estrelas no céu.`}
          </span>
          <span className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </span>
          <span className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </span>

          <Link
            href="/ajuda/oracoes/gloria-ao-pai"
            title="Ir para Gloria ao Pai"
            className="italic hover:underline mt-2"
          >
            Glória ao Pai...
          </Link>
        </div>

        <div className="flex flex-col mt-8">
          <h1 className="font-bold">II - Coroa de Poder</h1>
          <Link
            href="/ajuda/oracoes/pai-nosso"
            title="Ir para Pai Nosso"
            className="italic hover:underline"
          >
            Pai Nosso...
          </Link>
          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline"
          >
            Ave Maria...
          </Link>

          <span className="mt-2">
            {`Glória a Vós, imperatriz do céu, conduzi-nos convosco aos gozos do paraíso.`}
          </span>
          <span className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </span>
          <span className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </span>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <span>
            {`Glória a Vós, tesoureira das graças do Senhor, dai-nos parte no Vosso tesouro.`}
          </span>
          <span className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </span>
          <span className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </span>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <span>
            {`Glória a Vós, medianeira entre Deus e os homens, tornai-nos propício o Todo-poderoso.`}
          </span>
          <span className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </span>
          <span className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </span>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <span>
            {`Glória a Vós, que esmagais as heresias e o demônio: sede nossa guia piedosa.`}
          </span>
          <span className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </span>
          <span className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </span>

          <Link
            href="/ajuda/oracoes/gloria-ao-pai"
            title="Ir para Gloria ao Pai"
            className="italic hover:underline mt-2"
          >
            Glória ao Pai...
          </Link>
        </div>

        <div className="flex flex-col mt-8">
          <h1 className="font-bold">III - Coroa de Bondade</h1>
          <Link
            href="/ajuda/oracoes/pai-nosso"
            title="Ir para Pai Nosso"
            className="italic hover:underline"
          >
            Pai Nosso...
          </Link>
          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline"
          >
            Ave Maria...
          </Link>

          <span className="mt-2">
            {`Glória a Vós, refúgio dos pecadores; intercedei por nós junto do Senhor.`}
          </span>
          <span className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </span>
          <span className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </span>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <span>
            {`Glória a Vós, Mãe dos órfãos; fazei que nos seja propício o Pai Todo-Poderoso.`}
          </span>
          <span className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </span>
          <span className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </span>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <span>
            {`Glória a Vós, alegria dos justos; conduzi-nos convosco às alegrias do céu.`}
          </span>
          <span className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </span>
          <span className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </span>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <span>
            {`Glória a Vós, nossa auxiliadora mui prestimosa na vida e na morte; conduzi-nos convosco para o reino do céu.`}
          </span>
          <span className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </span>
          <span className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </span>

          <Link
            href="/ajuda/oracoes/gloria-ao-pai"
            title="Ir para Gloria ao Pai"
            className="italic hover:underline mt-2"
          >
            Glória ao Pai...
          </Link>
        </div>

        <span className="mt-4">
          Oremos: <br/> Ave, Maria, Filha de Deus Pai; <br/>
          Ave, Maria, Mãe de Deus Filho; <br/>
          Ave, Maria, Esposa do Espírito Santo; <br/>
          Ave, Maria, templo da Santíssima Trindade; <br/>
          Ave, Maria, Senhora minha, meu bem, meu amor, Rainha do meu coração, 
          Mãe, vida, doçura e esperança minha mui querida, meu coração e minha alma. <br/><br/>
          Sou todo vosso, e tudo o que possuo é vosso, ó Virgem sobre todos bendita. 
          Esteja, pois, a mim a vossa alma para engrandecer o Senhor; 
          esteja em mim vosso espírito para rejubilar em Deus. <br/>
          Colocai-Vos, ó Virgem fiel, como selo sobre o meu coração, para que, em Vós e por Vós, seja eu achado fiel a Deus. <br/>
          Concedei, ó Mãe de misericórdia, que me encontre no número daqueles que amais, 
          ensinais, guiais, sustentais e protegeis como filhos. <br/>
          Fazei que, por vosso amor, despreze todas as consolações da terra e aspire só as celestes; 
          até que, para glória do Pai, Jesus Cristo, Vosso Filho, seja formado em mim, pelo Espírito Santo, 
          vosso Esposo fidelíssimo, e por Vós, sua Esposa mui fiel.
        </span>

        <span className="font-medium mt-4">
          Assim seja.
        </span>

        <Link
          href="/ajuda/oracoes/sub-tuum"
          title="Ir para Sub Tuum"
          className="italic hover:underline mt-4"
        >
          À vossa proteção...
        </Link>
      </div>
    )
  },
  {
    title: 'Preparação para Confissão',
    href: '/preparacao-confissao',
    prayer: (
      <div className="flex flex-col">
        <div className="flex flex-col">
          <h1 className="font-bold">
            1. Orações para infundir na alma o arrependimento necessário para a confissão
          </h1>
          <span>{`- Em nome do Pai, do Filho, e do Espírito Santo, Amém.`}</span>

          <h1 className="font-bold mt-4">
            a. Vinde, Espírito Santo
          </h1>
          <Link
            href="/ajuda/oracoes/vinde-espirito-santo"
            title="Ir para o Vinde Espírito Santo"
            className="italic hover:underline"
          >
            Vinde Espírito Santo...
          </Link>

          <h1 className="font-bold mt-4">
            b. Pai Nosso, Ave Maria e Glória
          </h1>
          <Link
            href="/ajuda/oracoes/pai-nosso"
            title="Ir para o Pai Nosso"
            className="italic hover:underline"
          >
            Pai Nosso...
          </Link>
          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para o Ave Maria"
            className="italic hover:underline"
          >
            Ave Maria...
          </Link>
          <Link
            href="/ajuda/oracoes/gloria-ao-pai"
            title="Ir para o Glória ao Pai"
            className="italic hover:underline"
          >
            Glória ao Pai...
          </Link>
          <Link
            href="/ajuda/oracoes/jaculatoria-fatima"
            title="Ir para a Jaculatória de Fátima"
            className="italic hover:underline"
          >
            Ó, meu Jesus...
          </Link>
        </div>
        
        <div className="flex flex-col">
          <h1 className="font-bold mt-6">
            2. Condições para a boa confissão
          </h1>
          <span className="text-xs text-gray-400">
            {`O conhecimento dos próprios pecados, sem o necessário arrependimento, 
            em vez de diminuir, só aumenta a gravidade das nossas culpas. 
            E arrepender-se sem pedir perdão agrava ainda mais o erro. 
            É necessário reconhecer que erramos, arrepender-se dos erros, e pedir perdão por esses erros.`}
          </span>

          <div className="flex flex-col">
            <h1 className="font-bold mt-4">
              a. Exame de Consciência
            </h1>
            <span className="text-xs text-gray-400">
              {`Os mandamentos são uma exigência do amor. Deus nos pede para o amarmos e nos amarmos. 
              Será que o fazemos?`}
            </span>
            <span className="mt-2 text-sm">
              <span className="font-medium">
                {`1º Amando a Deus acima de tudo: `}
                <br/>
              </span>
              {`Neguei a fé? Duvidei da existência de Deus? Escarneci da religião? 
              Deixei de rezar por muito tempo? 
              Declarei que o matrimônio, o sacerdócio, a confissão, a missa estão utrapassados?`}
            </span>
            <span className="mt-2 text-sm">
              <span className="font-medium">
                {`2º Não tomando o seu Santo Nome em vão: `}
                <br/>
              </span>
              {`Cantei músicas blasfemas? Zombei da Igreja, das cerimônias religiosas ou de seus representantes? 
              Falei mal do Santo Padre, o Papa? Acusei a Igreja de ser falsa, ou desonesta? 
              Acusei Deus de injusto? Roguei pragas? 
              Contei piadas em que Deus aparece como personagem, rindo dEle? 
              Jurei em falso, ou à toa?`}
            </span>
            <span className="mt-2 text-sm">
              <span className="font-medium">
                {`3º Guardando os dias santificados: `}
                <br/>
              </span>
              {`Passei o Domingo na frente da televisão? Faltei na missa nesse mesmo dia? 
              Fiz piada com a Santa Missa? Disse que "já assisti missas que chega"? 
              Fui na missa para "cumprir a obrigação"? 
              Dediquei uma parte do meu tempo a Deus, lendo a Bíblia e rezando?`}
            </span>
            <span className="mt-2 text-sm">
              <span className="font-medium">
                {`4º Honrando pai e mãe: `}
                <br/>
              </span>
              {`Fui desobediente aos pais, autoridades ou superiores? 
              Desejei-lhes algum mal, talvez a morte? 
              Obedeci-lhes em coisas contrárias à lei de Deus? 
              Negligenciei como pai e mãe ou irmão mais velho, os deveres de educação e instrução religiosa?`}
            </span>
            <span className="mt-2 text-sm">
              <span className="font-medium">
                {`5º Não matando: `}
                <br/>
              </span>
              {`Tive ódio? Recusei o perdão a quem me pediu? Desejei a morte para mim ou para outros? 
              Ensinei a praticar pecados? Seduzi alguém ao pecado? 
              Defendi o assassínio de bebês através do aborto? 
              Desejei a guerra, ou me entusiasmei por ela? 
              Falei que "a terra tá cheia demais, e precisa mesmo morrer gente"?`}
            </span>
            <span className="mt-2 text-sm">
              <span className="font-medium">
                {`6º Guardando a castidade; 9º Não cobiçando a mulher (ou marido) do próximo: `}
                <br/>
              </span>
              {`Tenho visto revistas e filmes pornográficos? 
              Faço ou aprovo o sexo sem o matrimônio ou fora do matrimônio? 
              Defendi ou propaguei a sua leitura? 
              Acaso me divirto observando na rua o corpo das pessoas, e fazendo gracejos com elas, 
              ou em conversas indecentes sobre as pessoas que passam? 
              Tenho me vestido de maneira sensual? Provoquei os outros com meu comportamento? 
              Fiz intriga para acabar namoros ou casamentos que eu não aprovava, ou cobiçava? 
              Aprovo a prostituição? Sou promíscuo? Zombei da virgindade de alguém? 
              Me envergonhei da minha virgindade, rejeitando-a?`}
            </span>
            <span className="mt-2 text-sm">
              <span className="font-medium">
                {`7º Não roubando; 10º Não cobiçando as coisas alheias: `}
                <br/>
              </span>
              {`Prejudiquei alguém ou tive desejo de prejudicar, enganando no troco, nos pesos e nas medidas, ou roubando? 
              Fiz dívidas desnecessárias à subsistência? Paguei as minhas dívidas? 
              Comprei bebidas ou cigarros a fiado, sem ter como pagar? 
              Gastei meu salário com outras coisas, faltando em casa para a comida? 
              Recusei a dar esmolas, nem que seja de comida? 
              Roubei de Deus o dinheiro que devia dar a Ele para o sustento da Igreja? 
              Deixei de devolver algo que não me pertence? Paguei com justiça os meus empregados?`}
            </span>
            <span className="mt-2 text-sm">
              <span className="font-medium">
                {`8º Não mentindo: `}
                <br/>
              </span>
              {`Falei mal dos outros pelas costas? Fui fiel à verdade ao comentar acontecimentos passados? 
              Exagerei ou inventei qualidades para ganhar um emprego ou subir no emprego?
              Prejudiquei alguém com minhas palavras? Fiz alguém perder o emprego? 
              Fiz juízo errado das pessoas? Duvidei da honestidade de alguém? 
              Acusei algum mendigo ou pedinte de desonestidade? Revelei faltas ocultas dos outros? 
              Ridicularizei ou humilhei alguém na frente dos outros? Fui fingido? 
              Digo aos outros que sou católico mas não frequento a Igreja? 
              Caluniei os sacerdotes e religiosas?`}
            </span>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold mt-6">
              b. Tenho sido um bom cristão?
            </h1>
            <span className="text-xs text-gray-400">
              {`(Os mandamentos da lei de Deus nos mostram como evitar o caminho errado. 
              E o caminho certo? Será que o seguimos?)`}
            </span>
            <span className="mt-2 text-sm">
              <span className="font-medium">
                {`- Dando de comer a quem tem fome e de beber a quem tem sede: `}
                <br/>
              </span>
              {`Dei esmolas em dinheiro ou comida para os pedintes? 
              Ajudei os amigos, parentes ou vizinhos desempregados? 
              Paguei um salário justo aos empregados? 
              Tenho ajudado meus pais idosos com comida ou remédios?`}
            </span>
            <span className="mt-2 text-sm">
              <span className="font-medium">
                {`- Vestindo os que estão nus: `}
                <br/>
              </span>
              {`Tenho roupas demais? Tenho o armário cheio de roupas e digo "não tenho o que vestir"? 
              Me visto só com roupas da moda? Já dei uma roupa nova e bonita a alguém que precisava dela? 
              O que faço com as roupas que me sobram?`}
            </span>
            <span className="mt-2 text-sm">
              <span className="font-medium">
                {`- Visitar os enfermos e cativos: `}
                <br/>
              </span>
              {`Sou doador de sangue? Visito os meus parentes e amigos doentes? 
              Sei se na minha rua tem alguém doente? Visito meus pais idosos?`}
            </span>
            <span className="mt-2 text-sm">
              <span className="font-medium">
                {`- Dar pousada aos peregrinos: `}
                <br/>
              </span>
              {`Cobro um preço justo pelo aluguel? Expulsei um filho de casa? 
              Recusei morada a algum parente? Ajudo os desabrigados nas enchentes e enchurradas? 
              Tenho bons sentimentos para com os imigrantes de outras cidades e estados?`}
            </span>
            <span className="mt-2 text-sm">
              <span className="font-medium">
                {`- Remir os cativos e oprimidos: `}
                <br/>
              </span>
              {`Ajudo os drogados a largar o vício e os prostituídos a mudar de vida? 
              Tenho vontade de ajudar a Igreja nas visitas que faz ao presídio, 
              indo lá ou colaborando com doações?`}
            </span>
            <span className="mt-2 text-sm">
              <span className="font-medium">
                {`- Enterrar os mortos: `}
                <br/>
              </span>
              {`Evito de ir a velórios e enterros? Vou só por obrigação social? 
              Concedi um enterro cristão aos meus parentes, chamando um sacerdote?`}
            </span>
            <span className="mt-2 text-sm">
              <span className="font-medium">
                {`- Dar bons conselhos; Ensinar aos ignorantes; Consolar os aflitos: `}
                <br/>
              </span>
              {`Tenho conversado com meus filhos, ensinando-os a moral cristã? 
              Tenho ensinado eles ou os outros a não pecar, por amor a Deus? 
              Tenho aconselhado os pais a batizar os filhos, e os pecadores a se confessar? 
              Aconselhei alguém a evitar o suicídio, ou a não usar drogas? 
              Me ofereço para dar catequese? Perdoar as injúrias; Sofrer com paciência as fraquezas do próximo;`}
            </span>
            <span className="mt-2 text-sm">
              <span className="font-medium">
                {`- Corrigir os que erram: `}
                <br/>
              </span>
              {`Tenho tido paciência com os erros dos outros? Tenho perdoado com facilidade a quem me ofendeu? 
              Tenho alertado às pessoas de vida errada? Tenho alertado aos jovens promíscuos sobre o seu erro? 
              Tenho corrigido meus filhos quando erram?`}
            </span>
            <span className="mt-2 text-sm">
              <span className="font-medium">
                {`- Rogar a Deus pelos vivos e pelos defuntos: `}
                <br/>
              </span>
              {`Lembro dos meus parentes e amigos falecidos nas minhas orações? 
              Quando rezo peço mais para mim do que para os outros? 
              Rezo pelos problemas dos outros? 
              Ofereço missas pelas necessidades dos vivos e pelas almas dos falecidos?`}
            </span>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold mt-6">
              c. Ato de Contrição
            </h1>
            <Link
              href="/ajuda/oracoes/ato-de-contricao"
              title="Ir para o Ato de Contrição"
              className="italic hover:underline"  
            >
              Meu Deus, eu me arrependo...
            </Link>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold mt-6">
              d. Ato de fé, esperança e caridade
            </h1>
            <span className="text-xs text-gray-400">
              {`(Quando pecamos, quebramos o laço de amor, confiança e esperança que nos liga com a parte ofendida e com Deus. 
              Por isso, devemos renovar nosso amor, confiança e esperança em Deus.)`}
            </span>
            <span className="flex flex-col mt-2 text-sm">
              {`- Meu Deus, eu vos amo acima de tudo, porque só vós sois bom. 
              Creio em vós porque sois a própria verdade. 
              Espero receber de vós a salvação e o perdão dos meus pecados, 
              porque sei que só Vós sois bom e misericordioso.`}
              <span className="font-medium mt-2">
                Amém.
              </span>
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold mt-6">
            3. Depois da confissão
          </h1>
          <span className="text-xs text-gray-400">
            {`Volte para o banco da Igreja, de preferência perto do altar, 
            de onde possa ver o Sacrário onde está Jesus na Hóstia Santa, e a Cruz. 
            Agradeça a Deus pelo dom da Salvação, pois hoje você ressuscitou com Cristo! 
            Aleluia! Festa no céu para cada pecador que se converta!`}
          </span>

          <div className="flex flex-col">
            <h1 className="font-bold mt-4">
              a. Agradeça rezando o Salmo 29
            </h1>
            <span className="text-sm">
              {`1. Eu vos exaltarei, Senhor, porque me livrastes. Não permitistes que exultassem sobre mim meus inimigos!`}
            </span>
            <span className="text-sm">
              {`2. Senhor, meu Deus, clamei a vós e foi curado,`}
            </span>
            <span className="text-sm">
              {`3. Senhor, minha alma foi tirada por vós da habitação dos mortos, dentre os que descem para o túmulo vós me salvastes!`}
            </span>
            <span className="text-sm">
              {`4. Ó vós, fiéis do Senhor, cantai a sua glória; dai graças ao seu Santo Nome.`}
            </span>
            <span className="text-sm">
              {`5. Porque a sua indignação dura apenas um momento, enquanto sua benevolência é para toda a vida. 
              Pela tarde vem o pranto, mas de manhã retorna a alegria.`}
            </span>
            <span className="text-sm">
              {`6. Eu porém, disse, seguro de mim: "Não serei jamais abalado".`}
            </span>
            <span className="text-sm">
              {`7. Senhor, foi por favor que me destes honra e poder, mas quando escondestes vossa face, fiquei aterrado.`}
            </span>
            <span className="text-sm">
              {`8. A vós, Senhor, eu clamo, e imploro a misericórdia do meu Deus!`}
            </span>
            <span className="text-sm">
              {`9. Que proveito vos resultará de retomar-me a vida, de minha descida ao túmulo?`}
            </span>
            <span className="text-sm">
              {`10. Porventura vos luvará o meu pó? Apregoará ele a vossa fidelidade?`}
            </span>
            <span className="text-sm">
              {`11. Ouvi-me, Senhor, e tende piedade de mim; Senhor, vinde em minha ajuda.`}
            </span>
            <span className="text-sm">
              {`12. Vós convertestes o meu pranto em prazer, tirastes meus farrapos de penitência e me destes roupas de festa.`}
            </span>
            <span className="text-sm">
              {`13. Assim, minha alma vos louvará sem calar jamais. Senhor, meu Deus, eu vos bendirei eternamente.`}
            </span>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold mt-4">
              b. Reze pelo Santo Padre, o Papa
            </h1>
            <Link
              href="/ajuda/oracoes/pai-nosso"
              title="Ir para o Pai Nosso"
              className="italic hover:underline"
            >
              Pai Nosso...
            </Link>
            <Link
              href="/ajuda/oracoes/ave-maria"
              title="Ir para o Ave Maria"
              className="italic hover:underline"
            >
              Ave Maria...
            </Link>
            <Link
              href="/ajuda/oracoes/gloria-ao-pai"
              title="Ir para o Glória ao Pai"
              className="italic hover:underline"
            >
              Glória ao Pai...
            </Link>
            <Link
              href="/ajuda/oracoes/ato-de-desagravo"
              title="Ir para o Ato de Desagravo"
              className="italic hover:underline"
            >
              Ato de Desagravo...
            </Link>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold mt-4">
              c. Faz um firme propósito
            </h1>
            <span className="text-xs text-gray-400">
              {`Reze olhando para a cruz`}
            </span>
            <span className="mt-2">
              - Jesus, tu fizeste tudo isto por mim, <br/>
              o que posso fazer por ti? (3x)
            </span>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold mt-4">
              d. A disposição de fazer penitência
            </h1>
            <span className="text-sm">
              {`Quando causamos prejuízo a alguém, não basta pedir desculpas. 
              É preciso consertar o estrago. E para oferecer a Deus uma satisfação pelo mal que causamos, 
              fazemos a penitência, especialmente na quaresma. A penitência que mais agrada a Deus é que 
              dividamos o nosso pão com o faminto, e que façamos "um jejum da língua", deixando de falar mal dos outros. 
              O jejum e a esmola também são para Deus uma satisfação agradável por nossas culpas, pois nos desapega dos bens materiais.`}
            </span>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold mt-4">
              e. Oração a Jesus Crucificado
            </h1>
            <span className="text-sm">
              {`Eis-me aqui, meu bom e doce Jesus! De joelhos me prostro em tua Santa presença, 
              e te suplico que te dignes a gravar em meu coração os mais vivos sentimentos de fé, 
              esperança e caridade, verdadeiro arrependimento dos meus pecados e firme propósito de conversão, 
              enquanto contemplo, com vivo afeto e dor, as tuas cinco chagas, tendo diante dos olhos 
              o que o profeta Davi já dizia de ti, ó meu bom Jesus: "Perfuraram minhas mãos e os meus pés, 
              e posso contar todos os meus ossos".`}
            </span>
            <span className="mt-4 font-medium text-sm">
              Em nome do Pai, e do Filho e do Espírito Santo. 
              <br/> Amém.
            </span>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Terço Mariano',
    href: '/terco-mariano',
    prayer: (
      <div className="flex flex-col">
        <Link
          href="/ajuda/oracoes/sinal-da-cruz"
          title="Ir para Sinal da Cruz"
          className="italic hover:underline"
        >
          Sinal da Cruz...
        </Link>
        <Link
          href="/ajuda/oracoes/vinde-espirito-santo"
          title="Ir para Vinde Espírito Santo"
          className="italic hover:underline"
        >
          Vinde Espírito Santo...
        </Link>

        <div className="flex flex-col mt-4">
          <span>
            {`Divino Jesus, nós Vos oferecemos este terço que vamos rezar, meditando nos mistérios da Vossa Redenção. 
            Concedei-nos, por intercessão da Virgem Maria, Mãe de Deus e nossa Mãe, 
            as virtudes que nos são necessárias para bem rezá-lo e a graça de ganharmos as indulgências desta santa devoção.`}
          </span>

          <div className="flex flex-col mt-4">
            <Link
              href="/ajuda/oracoes/credo"
              title="Ir para o Credo"
              className="italic hover:underline"
            >
              Credo...
            </Link>
            <Link
              href="/ajuda/oracoes/pai-nosso"
              title="Ir para o Pai Nosso"
              className="italic hover:underline"
            >
              Pai Nosso...
            </Link>
            <Link
              href="/ajuda/oracoes/ave-maria"
              title="Ir para o Ave Maria"
              className="italic hover:underline"
            >
              Ave Maria... (3x)
            </Link>
            <Link
              href="/ajuda/oracoes/gloria-ao-pai"
              title="Ir para o Glória ao Pai"
              className="italic hover:underline"
            >
              Glória ao Pai...
            </Link>
            <Link
              href="/ajuda/oracoes/jaculatoria-fatima"
              title="Ir para a Jaculatória de Fátima"
              className="italic hover:underline"
            >
              Ó, meu Jesus...
            </Link>
          </div>
        </div>

        <div className="flex flex-col mt-4 gap-2">
          <ItemCollapse 
            title="Mistérios Gozosos (Segundas, Sábados e Domingos do Advento)"
            collapseClassName="text-start"
          >
            <ItemContent className="flex flex-col">
              <div className="flex flex-col">
                <span>No <strong>Primeiro Mistério</strong> Gozoso contemplamos a Anunciação do Anjo a Nossa Senhora.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>

              <div className="flex flex-col">
                <span>No <strong>Segundo Mistério</strong> Gozoso contemplamos a Visitação de Nossa Senhora a sua prima Santa Isabel.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>

              <div className="flex flex-col">
                <span>No <strong>Terceiro Mistério</strong> Gozoso contemplamos o Nascimento de Nosso Senhor Jesus Cristo em Belém.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>

              <div className="flex flex-col">
                <span>No <strong>Quarto Mistério</strong> Gozoso contemplamos a Apresentação do Menino Jesus no Templo e a Purificação de Nossa Senhora.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>

              <div className="flex flex-col">
                <span>No <strong>Quinto Mistério</strong> Gozoso contemplamos a perda e o encontro do Menino Jesus.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>
            </ItemContent>
          </ItemCollapse>

          <ItemCollapse 
            title="Mistérios Dolorosos (Terças, Sextas e Domingos da Quaresma até a Páscoa)"
            collapseClassName="text-start"
          >
            <ItemContent className="flex flex-col">
              <div className="flex flex-col">
                <span>No <strong>Primeiro Mistério</strong> Doloroso contemplamos a Agonia de Jesus no Horto das Oliveiras.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>

              <div className="flex flex-col">
                <span>No <strong>Segundo Mistério</strong> Doloroso contemplamos a Flagelação de Nosso Senhor Jesus Cristo.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>

              <div className="flex flex-col">
                <span>No <strong>Terceiro Mistério</strong> Doloroso contemplamos a Coroação de espinhos de Nosso Senhor.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>

              <div className="flex flex-col">
                <span>No <strong>Quarto Mistério</strong> Doloroso contemplamos Nosso Senhor carregando penosamente a Cruz até o alto do Calvário.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>

              <div className="flex flex-col">
                <span>No <strong>Quinto Mistério</strong> Doloroso contemplamos a Crucifixão e morte de Nosso Senhor Jesus Cristo.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>
            </ItemContent>
          </ItemCollapse>

          <ItemCollapse 
            title="Mistérios Gloriosos (Quartas e Domingos da Páscoa até ao Advento)"
            collapseClassName="text-start"
          >
            <ItemContent className="flex flex-col">
              <div className="flex flex-col">
                <span>No <strong>Primeiro Mistério</strong> Glorioso contemplamos a Ressurreição de Jesus Cristo.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>

              <div className="flex flex-col">
                <span>No <strong>Segundo Mistério</strong> Glorioso contemplamos a Ascensão de Jesus aos Céus.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>

              <div className="flex flex-col">
                <span>No <strong>Terceiro Mistério</strong> Glorioso contemplamos a descida do Espírito Santo sobre Nossa Senhora e os Apóstolos no Cenáculo.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>

              <div className="flex flex-col">
                <span>No <strong>Quarto Mistério</strong> Glorioso contemplamos a Assunção de Nossa Senhora aos Céus.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>

              <div className="flex flex-col">
                <span>No <strong>Quinto Mistério</strong> Glorioso contemplamos a gloriosa coroação de Maria Santíssima como Rainha do Céu e da Terra.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>
            </ItemContent>
          </ItemCollapse>

          <ItemCollapse 
            title="Mistérios Luminosos (Quinta-feira)"
            collapseClassName="text-start"
          >
            <ItemContent className="flex flex-col">
              <div className="flex flex-col">
                <span>No <strong>Primeiro Mistério</strong> Luminoso contemplamos o Batismo de Jesus.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>

              <div className="flex flex-col">
                <span>No <strong>Segundo Mistério</strong> Luminoso contemplamos a auto-revelação nas Bodas de Caná.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>

              <div className="flex flex-col">
                <span>No <strong>Terceiro Mistério</strong> Luminoso contemplamos o Anúncio do Reino de Deus convidando à conversão.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>

              <div className="flex flex-col">
                <span>No <strong>Quarto Mistério</strong> Luminoso contemplamos a Transfiguração de Jesus.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>

              <div className="flex flex-col">
                <span>No <strong>Quinto Mistério</strong> Luminoso contemplamos a instituição da Eucaristia.</span>
                <div className="flex flex-col mt-2 mb-4">
                  <Link
                    href="/ajuda/oracoes/pai-nosso"
                    title="Ir para o Pai Nosso"
                    className="italic hover:underline"
                  >
                    Pai Nosso...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/ave-maria"
                    title="Ir para o Ave Maria"
                    className="italic hover:underline"
                  >
                    Ave Maria... (10x)
                  </Link>
                  <Link
                    href="/ajuda/oracoes/gloria-ao-pai"
                    title="Ir para o Glória ao Pai"
                    className="italic hover:underline"
                  >
                    Glória ao Pai...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-fatima"
                    title="Ir para a Jaculatória de Fátima"
                    className="italic hover:underline"
                  >
                    Ó, meu Jesus...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/jaculatoria-medalha-milagrosa"
                    title="Ir para a Jaculatória da Medalha Milagrosa"
                    className="italic hover:underline"
                  >
                    Ó Maria...
                  </Link>
                  <Link
                    href="/ajuda/oracoes/suplicao-da-chama-de-amor"
                    title="Ir para a Súplica da Chama de Amor"
                    className="italic hover:underline"
                  >
                    Santa Mãe de Deus...
                  </Link>
                </div>
              </div>
            </ItemContent>
          </ItemCollapse>
        </div>

        <div className="flex flex-col mt-4">
          <span>
            {`Infinitas graças vos damos, soberana Rainha, 
            pelos benefícios que recebemos todos os dias de vossas mãos liberais, 
            dignai-vos agora e para sempre tomar-nos debaixo de vosso poderoso amparo, 
            e para mais vos alegrar vos saudamos com uma Salve-Rainha:`}
          </span>
          <Link
            href="/ajuda/oracoes/salve-rainha"
            title="Ir para a Salve Rainha"
            className="italic hover:underline mt-2"  
          >
            Salve Rainha...
          </Link>
        </div>
      </div>
    )
  },
  {
    title: 'Terço da Divina Misericórdia',
    href: '/terco-divina-misericordia',
    prayer: (
      <div className="flex flex-col">
        <Link
          href="/ajuda/oracoes/sinal-da-cruz"
          title="Ir para Sinal da Cruz"
          className="italic hover:underline"
        >
          Sinal da Cruz...
        </Link>
        <Link
          href="/ajuda/oracoes/vinde-espirito-santo"
          title="Ir para Vinde Espírito Santo"
          className="italic hover:underline"
        >
          Vinde Espírito Santo...
        </Link>

        <div className="flex flex-col mt-4">
          <span className="font-bold">
            {`Oração de Santa Faustina pelos Pecadores`}
          </span>
          <span>
            {`Ó Jesus, Verdade eterna, nossa Vida, clamo a Ti e imploro Tua misericórdia para os pobres pecadores. 
            Ó Coração dulcíssimo do meu Senhor, cheio de piedade e misericórdia insondável, rogo a Ti pelos pecadores. 
            Ó Sacratíssimo Coração, Fonte de Misericórdia, 
            de onde jorram raios de graças inconcebíveis sobre toda a humanidade, suplico luz para os pobres pecadores. 
            Ó Jesus, lembra-Te da Tua amarga Paixão e não permitas a perda das almas resgatadas a tão alto preço de Teu Preciosíssimo Sangue. 
            Ó Jesus, ao considerar o grande preço do Teu Sangue, rejubilo-me com sua imensidão, 
            pois uma única gota seria suficiente para a salvação de todos os pecadores. 
            Embora o pecado seja um abismo de maldade e ingratidão, o preço pago por nós jamais poderá ser superado. 
            Por isso, que cada alma confie na Tua Paixão e coloque sua esperança em Tua misericórdia. 
            Deus não negará Sua misericórdia a ninguém. Céu e terra podem mudar, mas a misericórdia de Deus jamais se esgotará. 
            Oh, que imensa alegria arde em meu coração quando contemplo Tua bondade incompreensível, ó Jesus! 
            Desejo levar todos os pecadores aos Teus pés, para que glorifiquem Tua misericórdia por toda a eternidade.`}
          </span>

          <span className="font-bold mt-4">
            {`Oração a Jesus Misericordioso`}
          </span>
          <span>
            {`Tu expiraste, Jesus, mas a fonte de vida jorrou para as almas, e o oceano de misericórdia abriu-se para o mundo inteiro. 
            Ó Fonte de Vida, insondável Misericórdia Divina, envolve o mundo inteiro e derrama-te sobre nós.`}
          </span>

          <span className="mt-4">
            {`Ó Sangue e Água, que jorraste do Coração de Jesus como fonte de misericórdia para nós, eu confio em Vós! (3x)`}
          </span>

          <div className="flex flex-col mt-4">
            <Link
              href="/ajuda/oracoes/pai-nosso"
              title="Ir para o Pai Nosso"
              className="italic hover:underline"
            >
              Pai Nosso...
            </Link>

            <Link
              href="/ajuda/oracoes/ave-maria"
              title="Ir para o Ave Maria"
              className="italic hover:underline"
            >
              Ave Maria...
            </Link>

            <Link
              href="/ajuda/oracoes/credo"
              title="Ir para o Credo"
              className="italic hover:underline"
            >
              Credo...
            </Link>
          </div>

          <span className="font-bold mt-4">
            {`Nas contas grandes:`}
          </span>
          <span>
            {`Eterno Pai, eu vos ofereço o Corpo, Sangue, Alma e Divindade de vosso diletíssimo Filho, 
            Nosso Senhor Jesus Cristo, em expiação de nossos pecados e os do mundo inteiro.`}
          </span>

          <span className="font-bold mt-4">
            {`Nas contas pequenas:`}
          </span>
          <span>
            {`Pela sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro. (10x)`}
          </span>

          <span className="font-bold mt-4">
            {`Ao final de cada mistério rezar:`}
          </span>
          <span>
            {`Ó Sangue e Água que jorrastes do Coração de Jesus, como fonte de misericórdia para nós, eu confio em Vós.`}
          </span>

          <span className="font-bold mt-4">
            {`Ao final do terço, rezar três vezes:`}
          </span>
          <span>
            {`Deus Santo, Deus Forte, Deus Imortal, tende piedade de nós e do mundo inteiro.`}
          </span>

          <span className="font-bold mt-4">
            {`Oração final:`}
          </span>
          <span>
            {`Deus, Pai Misericordioso, que revelou Teu amor em Teu Filho Jesus Cristo, 
            e o derramou sobre nós no Espírito Santo, confiamos-Te hoje o destino do mundo e de cada homem. 
            Dobre-se sobre nós pecadores, cure nossa fraqueza, vença todo o mal, deixe que todos os habitantes 
            da Terra experimentem a Tua misericórdia, para que em Ti, o Deus Trino, possam sempre encontrar a fonte da esperança. 
            Pai Eterno, pela dolorosa Paixão e Ressurreição de Teu Filho, tende piedade de nós e do mundo inteiro.`}
            <br/><br/>
            {`Amém.`}
          </span>
        </div>
      </div>
    )
  },
  {
    title: 'Terço da Divina Providência',
    href: '/terco-divina-providencia',
    prayer: (
      <div className="flex flex-col">
        <span>
          {`Minha alma glorifica ao Senhor, meu espírito; exulta de alegria em Deus, meu Salvador, 
            porque olhou para sua pobre serva. Por isto, desde agora, me proclamarão bem-aventurada todas as gerações, 
            porque realizou em mim maravilhas aquele que é poderoso e cujo nome é Santo. 
            Sua misericórdia se estende, de geração em geração, sobre os que o temem.
          `}
        </span>
        <span className="mt-4">
          {`Manifestou o poder do seu braço: desconcertou os corações dos soberbos. 
            Derrubou do trono os poderosos e exaltou os humildes. Saciou de bens os indigentes e despediu de mãos vazias os ricos. 
            Acolheu a Israel, seu servo, lembrado da sua misericórdia, conforme prometera a nossos pais, em favor de Abraão e sua posteridade, para sempre.
          `}
        </span>
        <span className="font-medium mt-4"
        >
          Amém.
        </span>
      </div>
    )
  },
  {
    title: 'Terço de São Miguel Arcanjo',
    href: '/terco-sao-miguel-arcanjo',
    prayer: (
      <div className="flex flex-col">
        <span>
          {`Minha alma glorifica ao Senhor, meu espírito; exulta de alegria em Deus, meu Salvador, 
            porque olhou para sua pobre serva. Por isto, desde agora, me proclamarão bem-aventurada todas as gerações, 
            porque realizou em mim maravilhas aquele que é poderoso e cujo nome é Santo. 
            Sua misericórdia se estende, de geração em geração, sobre os que o temem.
          `}
        </span>
        <span className="mt-4">
          {`Manifestou o poder do seu braço: desconcertou os corações dos soberbos. 
            Derrubou do trono os poderosos e exaltou os humildes. Saciou de bens os indigentes e despediu de mãos vazias os ricos. 
            Acolheu a Israel, seu servo, lembrado da sua misericórdia, conforme prometera a nossos pais, em favor de Abraão e sua posteridade, para sempre.
          `}
        </span>
        <span className="font-medium mt-4"
        >
          Amém.
        </span>
      </div>
    )
  },
];