import ItemCollapse from "@/components/ItemCollapse";
import ItemContent from "@/components/ItemContent";
import Image from "next/image";
import Link from "next/link";

const misteriousImages = [
  {
    alt: "1º Mistério Gozoso",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781213182/1-crop_gnr5rs.png",
    verse: "Lc 1, 26-38",
  },
  {
    alt: "2º Mistério Gozoso",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781213183/2-crop_lfpe4p.png",
    verse: "Lc 1, 39-56",
  },
  {
    alt: "3º Mistério Gozoso",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781213183/3-crop_nhjzzg.png",
    verse: "Lc 2, 1-20",
  },
  {
    alt: "4º Mistério Gozoso",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781213183/4-crop_yifrsa.png",
    verse: "Lc 2, 22-30",
  },
  {
    alt: "5º Mistério Gozoso",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781213182/5-crop_makc8b.png",
    verse: "Lc 2, 41-50",
  },
  {
    alt: "1º Mistério Doloroso",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781237461/6-crop_mcaqtc.png",
    verse: "Lc 22, 39-42",
  },
  {
    alt: "2º Mistério Doloroso",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781237462/7-crop_tmv9rw.png",
    verse: "Mc 15, 1-15",
  },
  {
    alt: "3º Mistério Doloroso",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781237462/8-crop_jncuxv.png",
    verse: "Mc 15, 16-20",
  },
  {
    alt: "4º Mistério Doloroso",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781237462/9-crop_rpw5bu.png",
    verse: "Lc 23, 26-32",
  },
  {
    alt: "5º Mistério Doloroso",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781237460/10-crop_l1laqq.png",
    verse: "Lc 23, 33-46",
  },
  {
    alt: "1º Mistério Glorioso",
    verse: "Mt 28, 1-7",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781237437/11-crop_fizvvu.png",
  },
  {
    alt: "2º Mistério Glorioso",
    verse: "At 1, 6-11",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781237437/12-crop_pqtacy.png",
  },
  {
    alt: "3º Mistério Glorioso",
    verse: "At 2, 1-11",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781237437/13-crop_qrtpwb.png",
  },
  {
    alt: "4º Mistério Glorioso",
    verse: "Assunção da bem-aventurada Virgem Maria, in: Jacopo de Varazze, Legenda Aurea; CIC 966",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781237438/14-crop_juigcc.png",
  },
  {
    alt: "5º Mistério Glorioso",
    verse: "Ap 12, 1",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781237436/15-crop_ayhsnj.png",
  },
  {
    alt: "1º Mistério Luminoso",
    verse: "Mt 3, 16-17",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781237421/16-crop_kxq0un.png",
  },
  {
    alt: "2º Mistério Luminoso",
    verse: "Jo 2, 1-5; CIC 1613",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781237421/17-crop_vrbk8t.png",
  },
  {
    alt: "3º Mistério Luminoso",
    verse: "Mc 1, 15",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781237421/18-crop_hadgbj.png",
  },
  {
    alt: "4º Mistério Luminoso",
    verse: "Mt 17, 1-2",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781237421/19-crop_pi4sqf.png",
  },
  {
    alt: "5º Mistério Luminoso",
    verse: "Mt 26, 26; CIC 1340",
    src: "https://res.cloudinary.com/ddr7pqjmz/image/upload/v1781237421/20-crop_w500ah.png",
  },
];

export const commonPrayers = [
  {
    title: 'Sinal da Cruz',
    href: '/sinal-da-cruz',
    description: 'Deve-se fazer 3 (três) cruzes. Uma na testa, uma na boca e uma no peito (com o polegar direito).',
    prayer: (
      <div className="flex flex-col">
        <p className="whitespace-pre-line">
          {`Pelo sinal da Santa Cruz, livrai-nos, Deus nosso Senhor, dos nossos inimigos.
          Em nome do Pai, e do Filho e do Espírito Santo.`}
        </p>
        <p className="font-medium mt-4">Amém.</p>
      </div>
    )
  },
  {
    title: 'Vinde Espírito Santo',
    href: '/vinde-espirito-santo',
    prayer: (
      <div className="flex flex-col">
        <p>{`Vinde Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do Vosso Amor. 
          Enviai, Senhor, o Vosso Santo Espírito e tudo será criado e renovareis a face da terra.`}
        </p>
        <p className="mt-4">
          {`Oremos: Ó Deus que instruíste os corações dos vossos fiéis, com a luz do Espírito Santo, 
          fazei que apreciemos retamente todas as coisas segundo o mesmo Espírito e gozemos da sua consolação.`}
        </p>
        <p className="font-medium mt-4">
          Por Cristo Senhor Nosso. <br/> Amém.
        </p>
      </div>
    )
  },
  {
    title: 'Credo',
    href: '/credo',
    prayer: (
      <div className="flex flex-col">
        <p>
          {`Creio em Deus Pai todo-poderoso, criador do céu e da terra; e em Jesus Cristo, seu único Filho, Nosso Senhor; 
          que foi concebido pelo poder do Espírito Santo; nasceu na Virgem Maria, padeceu sob Pôncio Pilatos, 
          foi crucificado morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus, 
          está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos;`}
        </p>
        <p>
          {`Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos Santos, na remissão dos pecados, 
          na ressurreição da carne, na vida eterna.`}
        </p>
        <p className="font-medium mt-4">
          Amém.
        </p>
      </div>
    )
  },
  {
    title: 'Pai Nosso',
    href: '/pai-nosso',
    prayer: (
      <div className="flex flex-col">
        <p>
          {`Pai Nosso que estais nos Céus, santificado seja o Vosso Nome, venha a nós o Vosso Reino, 
          seja feita a vossa vontade assim na terra como no Céu.`}
        </p>
        <p>
          {`O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido, 
          e não nos deixeis cair em tentação, mas livrai-nos do Mal.`}
        </p>
        <p className="font-medium mt-4">
          Amém.
        </p>
      </div>
    )
  },
  {
    title: 'Ave Maria',
    href: '/ave-maria',
    prayer: (
      <div className="flex flex-col">
        <p>
          {`Ave Maria, cheia de graça, o Senhor é convosco, 
          bendita sois Vós entre as mulheres e bendito é o fruto do Vosso ventre, Jesus.`}
        </p>
        <p>
          {`Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora da nossa morte.`}
        </p>
        <p className="font-medium mt-4">
          Amém.
        </p>
      </div>
    )
  },
  {
    title: 'Glória ao Pai',
    href: '/gloria-ao-pai',
    prayer: (
      <div className="flex flex-col">
        <p>
          {`Glória ao Pai e ao Filho e ao Espírito Santo. 
          Assim como era, no princípio, agora e sempre, e por todos os séculos dos séculos.`}
        </p>
        <p className="font-medium mt-4">
          Amém.
        </p>
      </div>
    )
  },
  {
    title: 'Jaculatória de Fátima (Oração de Fátima)',
    href: '/jaculatoria-fatima',
    prayer: (
      <div className="flex flex-col">
        <p>
          {`Ó, meu Jesus, perdoai-nos e livrai-nos do fogo do inferno, 
          levai as almas todas para o céu, e socorrei principalmente 
          as que mais precisarem da Vossa misericórdia!`}
        </p>
      </div>
    )
  },
  {
    title: 'Salve Rainha',
    href: '/salve-rainha',
    prayer: (
      <div className="flex flex-col">
        <p>
          {`Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! 
          A Vós bradamos, os degredados filhos de Eva; 
          a Vós suspiramos, gemendo e chorando neste vale de lágrimas.`}
        </p>
        <p>
          {`Eia, pois Advogada nossa, esses Vossos olhos misericordiosos a nós volvei; 
          e depois deste desterro, nos mostrai Jesus, bendito fruto do Vosso ventre, 
          ó clemente, ó piedosa, ó doce sempre Virgem Maria.`}
        </p>
        <p className="mt-4">
          {`Rogai por nós, Santa Mãe de Deus.`}
        </p>
        <p className="font-medium">
          {`R: Para que sejamos dignos das promessas de Cristo.`}
        </p>
      </div>
    )
  },
  {
    title: 'Santo Anjo',
    href: '/santo-anjo',
    prayer: (
      <div className="flex flex-col">
        <p>
          {`Santo Anjo do Senhor, meu zeloso guardador, se a Ti me confiou a piedade divina, sempre me rege, me guarda, me governa me ilumina.`}
        </p>
        <p className="font-medium mt-4">
          Amém.
        </p>
        <div className="flex flex-col mt-4 text-xs text-gray-400">
          <p>{`Padre Aírton de Maria nos ensinou uma breve extensão da oração...`}</p>
          <p>
            {`R: Eu Te dou a minha mão, e prometo de coração, que por Ti me deixo guiar com docilidade, para no céu alcançar a eterna felicidade.`}
          </p>
          <p className="mt-2">
            Assim seja.
          </p>
        </div>
      </div>
    )
  },
];

export const specificPrayers = [
  {
    title: 'Alma de Cristo',
    href: '/alma-de-cristo',
    prayer: (
      <div className="flex flex-col">
        <p className="whitespace-pre-line">
          {`Alma de Cristo, santificai-me.
          Corpo de Cristo, salvai-me.
          Sangue de Cristo, inebriai-me.
          Água do lado de Cristo, lavai-me.
          Paixão de Cristo, confortai-me.
          Ó bom Jesus, ouvi-me.
          Dentro de Vossas chagas, escondei-me.
          Não permitais que me separe de Vós.
          Do espírito maligno, defendei-me.
          Na hora da minha morte, chamai-me
          e mandai-me ir para Vós,
          para que com os vossos Santos Vos louve
          por todos os séculos dos séculos.`}
        </p>
        <p className="font-medium mt-4">Amém.</p>
      </div>
    )
  },
  {
    title: 'Ato de Contrição',
    href: '/ato-de-contricao',
    description: (
      <>
        <p>{`Antes de ir para o confessionário, é recomendável que tenha feito uma `}</p>
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
        <p>
          {`Meu Deus, eu me arrependo, de todo coração de todos meus pecados e os detesto, 
          porque pecando não só mereci as penas que justamente estabelecestes, 
          mas principalmente porque Vos ofendi a Vós, sumo bem e digno de ser amado sobre todas as coisas.`}
        </p>
        <p>
          {`Por isso, proponho firmemente, com a ajuda da Vossa graça, não mais pecar e fugir das ocasiões próximas de pecar.`}
        </p>
        <p className="font-medium mt-4">
          Amém.
        </p>
      </div>
    )
  },
  {
    title: 'Ato de Desagravo',
    href: '/ato-de-desagravo',
    description: (
      <p>
        {`O ato de desagravo é um tipo de oração para consolar a Deus pelos nossos pecados. 
        As orações abaixo foram ensinadas pelo Anjo da Paz às crianças de Fátima a quem apareceu Nossa Senhor. 
        Reze na frente do sacrário da Igreja, onde está Jesus na Hóstia Santa.`}
      </p>
    ),
    prayer: (
      <div className="flex flex-col">
        <p>
          {`Meu Deus eu creio, adoro, espero e amo-vos!`}
        </p>
        <p>
          {`E peço-vos perdão por todos os que não creêm, não adoram, não esperam e não vos amam! (3x)`}
        </p>

        <p className="font-medium mt-4">
          {`Santíssima Trindade: `}
        </p>
        <p>
          {`Deus Pai, Filho e Espírito Santo, eu vos adoro profundamente, 
          e vos ofereço o preciosíssimo Corpo, Sangue, Alma e Divindade de Jesus Cristo, 
          presente em todos os Sacrários do mundo inteiro, em reparação pelas inúmeras ofensas, 
          sacrilégios e indiferenças com que é todos os dias ofendido.`}
        </p>

        <p className="font-medium mt-4">
          {`- E pelos infinitos merecimentos do Seu Santíssimo Coração e do Coração Imaculado de Maria, peço-vos a conversão dos pobres pecadores! (3x)`}
        </p>
      </div>
    )
  },
  {
    title: 'Angelus (O Anjo do Senhor)',
    href: '/angelus',
    description: "Normalmente rezado às 00h, 6h, 12h ou 18h.",
    prayer: (
      <div className="flex flex-col">
        <p>{`O Anjo do Senhor anunciou a Maria.`}</p>
        <p className="font-medium">
          {`R: e ela concebeu do Espírito Santo.`}
        </p>
        <Link
          href="/ajuda/oracoes/ave-maria"
          title="Ir para Ave Maria"
          className="italic hover:underline"
        >
          Ave Maria...
        </Link>

        <p className="mt-2">
          {`Eis aqui a serva do Senhor.`}
        </p>
        <p className="font-medium">
          {`R: Faça-se em mim segundo a vossa palavra.`}
        </p>
        <Link
          href="/ajuda/oracoes/ave-maria"
          title="Ir para Ave Maria"
          className="italic hover:underline"
        >
          Ave Maria...
        </Link>

        <p className="mt-2">
          {`e o Verbo se fez carne.`}
        </p>
        <p className="font-medium">
          {`R: E habitou entre nós.`}
        </p>
        <Link
          href="/ajuda/oracoes/ave-maria"
          title="Ir para Ave Maria"
          className="italic hover:underline"
        >
          Ave Maria...
        </Link>

        <p className="mt-4">
          {`Rogai por nós, Santa Mãe de Deus.`}
        </p>
        <p className="font-medium">
          {`R: Para que sejamos dignos das promessas de Cristo.`}
        </p>

        <p className="mt-4">
          {`Oremos: Derramai, ó Deus, a vossa graça em nossos corações, para que, conhecendo, pela mensagem do Anjo, 
          a encarnação do Cristo, vosso Filho, cheguemos, por sua paixão e cruz, 
          à glória da ressurreição pela intercessão da Virgem Maria.`}
        </p>
        <p className="font-medium mt-2">
          Pelo mesmo Cristo, Senhor Nosso. <br/> Amém.
        </p>
      </div>
    )
  },
  {
    title: 'Jaculatória da Medalha Milagrosa (Oração de Nossa Senhora das Graças)',
    href: '/jaculatoria-medalha-milagrosa',
    prayer: (
      <div className="flex flex-col">
        <p>{`Ó Maria concebida sem pecado, rogai por nós que recorremos a Vós.`}</p>
      </div>
    )
  },
  {
    title: 'Magnificat',
    href: '/magnificat',
    prayer: (
      <div className="flex flex-col">
        <p>
          {`Minha alma glorifica ao Senhor, meu espírito; exulta de alegria em Deus, meu Salvador, 
            porque olhou para sua pobre serva. Por isto, desde agora, me proclamarão bem-aventurada todas as gerações, 
            porque realizou em mim maravilhas aquele que é poderoso e cujo nome é Santo. 
            Sua misericórdia se estende, de geração em geração, sobre os que o temem.
          `}
        </p>
        <p className="mt-4">
          {`Manifestou o poder do seu braço: desconcertou os corações dos soberbos. 
            Derrubou do trono os poderosos e exaltou os humildes. Saciou de bens os indigentes e despediu de mãos vazias os ricos. 
            Acolheu a Israel, seu servo, lembrado da sua misericórdia, conforme prometera a nossos pais, em favor de Abraão e sua posteridade, para sempre.
          `}
        </p>
        <p className="font-medium mt-4"
        >
          Amém.
        </p>
      </div>
    )
  },
  {
    title: 'São Bento',
    href: '/sao-bento',
    prayer: (
      <div className="flex flex-col">
        <h1 className="font-medium">Oração da Medalha de São Bento</h1>
        <p className="mt-2">
          A Cruz sagrada seja minha Luz, <br/>
          Não seja o Dragão meu guia, <br/>
          Retira-te Satanás, <br/>
          Nunca me aconse-lhes coisas vãs, <br/>
          É mal o que tu me ofereces, <br/>
          Bebe tu mesmo do teu veneno.
        </p>
        <p className="font-medium mt-2">
          Assim seja.
        </p>

        <h1 className="font-medium mt-6">Oração a São Bento</h1>
        <p className="mt-2">
          {`Ó Deus, vós que vos dignastes derramar sobre o bem-aventurado confessor o Patriarca São Bento
          o espírito de todos os justos concedei a nós, vossos servos e servas a graça de nos revestirmos 
          deste mesmo espírito para que possamos, com o vosso auxílio, fielmente cumprir o que temos prometido.`}
        </p>
        <p className="font-medium mt-2">
          Por Jesus Cristo Nosso Senhor. <br/> Amém.
        </p>
      </div>
    )
  },
  {
    title: 'São Miguel Arcanjo',
    href: '/sao-miguel-arcanjo',
    prayer: (
      <div className="flex flex-col">
        <p>
          {`São Miguel Arcanjo, defendei-nos no combate, sede o nosso refúgio contra as maldades e ciladas do demônio. 
          Ordene-lhe Deus, instantemente o pedimos, e vós, príncipe da milícia celeste, pela virtude divina, 
          precipitai no inferno a satanás e a todos os espíritos malignos, que andam pelo mundo para perder as almas.`}
        </p>
        <p className="font-medium mt-4">
          Amém.
        </p>
      </div>
    )
  },
  {
    title: 'Sub Tuum',
    href: '/sub-tuum',
    prayer: (
      <div className="flex flex-col">
        <p>
          {`À vossa proteção recorremos, santa Mãe de Deus; não desprezeis as nossas súplicas em nossas necessidades; 
          mas livrai-nos sempre de todos os perigos, ó Virgem gloriosa e bendita.`}
        </p>
      </div>
    )
  },
  {
    title: 'Súplica da Chama de Amor',
    href: '/suplicao-da-chama-de-amor',
    prayer: (
      <div className="flex flex-col">
        <p>
          {`Santa Mãe de Deus, derramai sobre a humanidade inteira as graças 
          eficazes da vossa Chama de Amor, agora e na hora de nossa morte.`}
        </p>
        <p className="font-medium mt-4">
          Amém.
        </p>
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
        <p>{`V. Concedei-me que Vos louve, Virgem Sagrada.`}</p>
        <p className="font-medium">
          {`R. Dai-me valor contra os vossos inimigos.`}
        </p>
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

          <p className="mt-2">
            {`Sois Bem-aventurada, Virgem Maria, que levastes em Vosso seio o Senhor, Criador do mundo; 
            destes à luz a Quem Vos formou, e Sois Virgem perpétua.`}
          </p>
          <p className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </p>
          <p className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </p>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <p>
            {`Ó Santa e imaculada virgindade, não sei com que louvores Vos possa exaltar; 
            pois quem os céus não puderam conter, Vós O levastes em Vosso seio.`}
          </p>
          <p className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </p>
          <p className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </p>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <p>
            {`Sois toda formosa, Virgem Maria, e não há mancha original em vós.`}
          </p>
          <p className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </p>
          <p className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </p>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <p>
            {`Possuís, ó Virgem Maria, tantos privilégios, quantas são as estrelas no céu.`}
          </p>
          <p className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </p>
          <p className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </p>

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

          <p className="mt-2">
            {`Glória a Vós, imperatriz do céu, conduzi-nos convosco aos gozos do paraíso.`}
          </p>
          <p className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </p>
          <p className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </p>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <p>
            {`Glória a Vós, tesoureira das graças do Senhor, dai-nos parte no Vosso tesouro.`}
          </p>
          <p className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </p>
          <p className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </p>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <p>
            {`Glória a Vós, medianeira entre Deus e os homens, tornai-nos propício o Todo-poderoso.`}
          </p>
          <p className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </p>
          <p className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </p>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <p>
            {`Glória a Vós, que esmagais as heresias e o demônio: sede nossa guia piedosa.`}
          </p>
          <p className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </p>
          <p className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </p>

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

          <p className="mt-2">
            {`Glória a Vós, refúgio dos pecadores; intercedei por nós junto do Senhor.`}
          </p>
          <p className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </p>
          <p className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </p>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <p>
            {`Glória a Vós, Mãe dos órfãos; fazei que nos seja propício o Pai Todo-Poderoso.`}
          </p>
          <p className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </p>
          <p className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </p>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <p>
            {`Glória a Vós, alegria dos justos; conduzi-nos convosco às alegrias do céu.`}
          </p>
          <p className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </p>
          <p className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </p>

          <Link
            href="/ajuda/oracoes/ave-maria"
            title="Ir para Ave Maria"
            className="italic hover:underline mt-2"
          >
            Ave Maria...
          </Link>

          <p>
            {`Glória a Vós, nossa auxiliadora mui prestimosa na vida e na morte; conduzi-nos convosco para o reino do céu.`}
          </p>
          <p className="mt-2">
            {`V. Alegrai-Vos, Virgem Maria.`}
          </p>
          <p className="font-medium">
            {`R. Alegrai-Vos mil vezes.`}
          </p>

          <Link
            href="/ajuda/oracoes/gloria-ao-pai"
            title="Ir para Gloria ao Pai"
            className="italic hover:underline mt-2"
          >
            Glória ao Pai...
          </Link>
        </div>

        <p className="mt-4">
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
        </p>

        <p className="font-medium mt-4">
          Assim seja.
        </p>

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
          <p>{`- Em nome do Pai, do Filho, e do Espírito Santo, Amém.`}</p>

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
          <p className="text-xs text-gray-400">
            {`O conhecimento dos próprios pecados, sem o necessário arrependimento, 
            em vez de diminuir, só aumenta a gravidade das nossas culpas. 
            E arrepender-se sem pedir perdão agrava ainda mais o erro. 
            É necessário reconhecer que erramos, arrepender-se dos erros, e pedir perdão por esses erros.`}
          </p>

          <div className="flex flex-col">
            <h1 className="font-bold mt-4">
              a. Exame de Consciência
            </h1>
            <p className="text-xs text-gray-400">
              {`Os mandamentos são uma exigência do amor. Deus nos pede para o amarmos e nos amarmos. 
              Será que o fazemos?`}
            </p>
            <p className="mt-2 text-sm">
              <p className="font-medium">
                {`1º Amando a Deus acima de tudo: `}
                <br/>
              </p>
              {`Neguei a fé? Duvidei da existência de Deus? Escarneci da religião? 
              Deixei de rezar por muito tempo? 
              Declarei que o matrimônio, o sacerdócio, a confissão, a missa estão utrapassados?`}
            </p>
            <p className="mt-2 text-sm">
              <p className="font-medium">
                {`2º Não tomando o seu Santo Nome em vão: `}
                <br/>
              </p>
              {`Cantei músicas blasfemas? Zombei da Igreja, das cerimônias religiosas ou de seus representantes? 
              Falei mal do Santo Padre, o Papa? Acusei a Igreja de ser falsa, ou desonesta? 
              Acusei Deus de injusto? Roguei pragas? 
              Contei piadas em que Deus aparece como personagem, rindo dEle? 
              Jurei em falso, ou à toa?`}
            </p>
            <p className="mt-2 text-sm">
              <p className="font-medium">
                {`3º Guardando os dias santificados: `}
                <br/>
              </p>
              {`Passei o Domingo na frente da televisão? Faltei na missa nesse mesmo dia? 
              Fiz piada com a Santa Missa? Disse que "já assisti missas que chega"? 
              Fui na missa para "cumprir a obrigação"? 
              Dediquei uma parte do meu tempo a Deus, lendo a Bíblia e rezando?`}
            </p>
            <p className="mt-2 text-sm">
              <p className="font-medium">
                {`4º Honrando pai e mãe: `}
                <br/>
              </p>
              {`Fui desobediente aos pais, autoridades ou superiores? 
              Desejei-lhes algum mal, talvez a morte? 
              Obedeci-lhes em coisas contrárias à lei de Deus? 
              Negligenciei como pai e mãe ou irmão mais velho, os deveres de educação e instrução religiosa?`}
            </p>
            <p className="mt-2 text-sm">
              <p className="font-medium">
                {`5º Não matando: `}
                <br/>
              </p>
              {`Tive ódio? Recusei o perdão a quem me pediu? Desejei a morte para mim ou para outros? 
              Ensinei a praticar pecados? Seduzi alguém ao pecado? 
              Defendi o assassínio de bebês através do aborto? 
              Desejei a guerra, ou me entusiasmei por ela? 
              Falei que "a terra tá cheia demais, e precisa mesmo morrer gente"?`}
            </p>
            <p className="mt-2 text-sm">
              <p className="font-medium">
                {`6º Guardando a castidade; 9º Não cobiçando a mulher (ou marido) do próximo: `}
                <br/>
              </p>
              {`Tenho visto revistas e filmes pornográficos? 
              Faço ou aprovo o sexo sem o matrimônio ou fora do matrimônio? 
              Defendi ou propaguei a sua leitura? 
              Acaso me divirto observando na rua o corpo das pessoas, e fazendo gracejos com elas, 
              ou em conversas indecentes sobre as pessoas que passam? 
              Tenho me vestido de maneira sensual? Provoquei os outros com meu comportamento? 
              Fiz intriga para acabar namoros ou casamentos que eu não aprovava, ou cobiçava? 
              Aprovo a prostituição? Sou promíscuo? Zombei da virgindade de alguém? 
              Me envergonhei da minha virgindade, rejeitando-a?`}
            </p>
            <p className="mt-2 text-sm">
              <p className="font-medium">
                {`7º Não roubando; 10º Não cobiçando as coisas alheias: `}
                <br/>
              </p>
              {`Prejudiquei alguém ou tive desejo de prejudicar, enganando no troco, nos pesos e nas medidas, ou roubando? 
              Fiz dívidas desnecessárias à subsistência? Paguei as minhas dívidas? 
              Comprei bebidas ou cigarros a fiado, sem ter como pagar? 
              Gastei meu salário com outras coisas, faltando em casa para a comida? 
              Recusei a dar esmolas, nem que seja de comida? 
              Roubei de Deus o dinheiro que devia dar a Ele para o sustento da Igreja? 
              Deixei de devolver algo que não me pertence? Paguei com justiça os meus empregados?`}
            </p>
            <p className="mt-2 text-sm">
              <p className="font-medium">
                {`8º Não mentindo: `}
                <br/>
              </p>
              {`Falei mal dos outros pelas costas? Fui fiel à verdade ao comentar acontecimentos passados? 
              Exagerei ou inventei qualidades para ganhar um emprego ou subir no emprego?
              Prejudiquei alguém com minhas palavras? Fiz alguém perder o emprego? 
              Fiz juízo errado das pessoas? Duvidei da honestidade de alguém? 
              Acusei algum mendigo ou pedinte de desonestidade? Revelei faltas ocultas dos outros? 
              Ridicularizei ou humilhei alguém na frente dos outros? Fui fingido? 
              Digo aos outros que sou católico mas não frequento a Igreja? 
              Caluniei os sacerdotes e religiosas?`}
            </p>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold mt-6">
              b. Tenho sido um bom cristão?
            </h1>
            <p className="text-xs text-gray-400">
              {`(Os mandamentos da lei de Deus nos mostram como evitar o caminho errado. 
              E o caminho certo? Será que o seguimos?)`}
            </p>
            <p className="mt-2 text-sm">
              <p className="font-medium">
                {`- Dando de comer a quem tem fome e de beber a quem tem sede: `}
                <br/>
              </p>
              {`Dei esmolas em dinheiro ou comida para os pedintes? 
              Ajudei os amigos, parentes ou vizinhos desempregados? 
              Paguei um salário justo aos empregados? 
              Tenho ajudado meus pais idosos com comida ou remédios?`}
            </p>
            <p className="mt-2 text-sm">
              <p className="font-medium">
                {`- Vestindo os que estão nus: `}
                <br/>
              </p>
              {`Tenho roupas demais? Tenho o armário cheio de roupas e digo "não tenho o que vestir"? 
              Me visto só com roupas da moda? Já dei uma roupa nova e bonita a alguém que precisava dela? 
              O que faço com as roupas que me sobram?`}
            </p>
            <p className="mt-2 text-sm">
              <p className="font-medium">
                {`- Visitar os enfermos e cativos: `}
                <br/>
              </p>
              {`Sou doador de sangue? Visito os meus parentes e amigos doentes? 
              Sei se na minha rua tem alguém doente? Visito meus pais idosos?`}
            </p>
            <p className="mt-2 text-sm">
              <p className="font-medium">
                {`- Dar pousada aos peregrinos: `}
                <br/>
              </p>
              {`Cobro um preço justo pelo aluguel? Expulsei um filho de casa? 
              Recusei morada a algum parente? Ajudo os desabrigados nas enchentes e enchurradas? 
              Tenho bons sentimentos para com os imigrantes de outras cidades e estados?`}
            </p>
            <p className="mt-2 text-sm">
              <p className="font-medium">
                {`- Remir os cativos e oprimidos: `}
                <br/>
              </p>
              {`Ajudo os drogados a largar o vício e os prostituídos a mudar de vida? 
              Tenho vontade de ajudar a Igreja nas visitas que faz ao presídio, 
              indo lá ou colaborando com doações?`}
            </p>
            <p className="mt-2 text-sm">
              <p className="font-medium">
                {`- Enterrar os mortos: `}
                <br/>
              </p>
              {`Evito de ir a velórios e enterros? Vou só por obrigação social? 
              Concedi um enterro cristão aos meus parentes, chamando um sacerdote?`}
            </p>
            <p className="mt-2 text-sm">
              <p className="font-medium">
                {`- Dar bons conselhos; Ensinar aos ignorantes; Consolar os aflitos: `}
                <br/>
              </p>
              {`Tenho conversado com meus filhos, ensinando-os a moral cristã? 
              Tenho ensinado eles ou os outros a não pecar, por amor a Deus? 
              Tenho aconselhado os pais a batizar os filhos, e os pecadores a se confessar? 
              Aconselhei alguém a evitar o suicídio, ou a não usar drogas? 
              Me ofereço para dar catequese? Perdoar as injúrias; Sofrer com paciência as fraquezas do próximo;`}
            </p>
            <p className="mt-2 text-sm">
              <p className="font-medium">
                {`- Corrigir os que erram: `}
                <br/>
              </p>
              {`Tenho tido paciência com os erros dos outros? Tenho perdoado com facilidade a quem me ofendeu? 
              Tenho alertado às pessoas de vida errada? Tenho alertado aos jovens promíscuos sobre o seu erro? 
              Tenho corrigido meus filhos quando erram?`}
            </p>
            <p className="mt-2 text-sm">
              <p className="font-medium">
                {`- Rogar a Deus pelos vivos e pelos defuntos: `}
                <br/>
              </p>
              {`Lembro dos meus parentes e amigos falecidos nas minhas orações? 
              Quando rezo peço mais para mim do que para os outros? 
              Rezo pelos problemas dos outros? 
              Ofereço missas pelas necessidades dos vivos e pelas almas dos falecidos?`}
            </p>
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
            <p className="text-xs text-gray-400">
              {`(Quando pecamos, quebramos o laço de amor, confiança e esperança que nos liga com a parte ofendida e com Deus. 
              Por isso, devemos renovar nosso amor, confiança e esperança em Deus.)`}
            </p>
            <p className="flex flex-col mt-2 text-sm">
              {`- Meu Deus, eu vos amo acima de tudo, porque só vós sois bom. 
              Creio em vós porque sois a própria verdade. 
              Espero receber de vós a salvação e o perdão dos meus pecados, 
              porque sei que só Vós sois bom e misericordioso.`}
              <p className="font-medium mt-2">
                Amém.
              </p>
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold mt-6">
            3. Depois da confissão
          </h1>
          <p className="text-xs text-gray-400">
            {`Volte para o banco da Igreja, de preferência perto do altar, 
            de onde possa ver o Sacrário onde está Jesus na Hóstia Santa, e a Cruz. 
            Agradeça a Deus pelo dom da Salvação, pois hoje você ressuscitou com Cristo! 
            Aleluia! Festa no céu para cada pecador que se converta!`}
          </p>

          <div className="flex flex-col">
            <h1 className="font-bold mt-4">
              a. Agradeça rezando o Salmo 29
            </h1>
            <p className="text-sm">
              {`1. Eu vos exaltarei, Senhor, porque me livrastes. Não permitistes que exultassem sobre mim meus inimigos!`}
            </p>
            <p className="text-sm">
              {`2. Senhor, meu Deus, clamei a vós e foi curado,`}
            </p>
            <p className="text-sm">
              {`3. Senhor, minha alma foi tirada por vós da habitação dos mortos, dentre os que descem para o túmulo vós me salvastes!`}
            </p>
            <p className="text-sm">
              {`4. Ó vós, fiéis do Senhor, cantai a sua glória; dai graças ao seu Santo Nome.`}
            </p>
            <p className="text-sm">
              {`5. Porque a sua indignação dura apenas um momento, enquanto sua benevolência é para toda a vida. 
              Pela tarde vem o pranto, mas de manhã retorna a alegria.`}
            </p>
            <p className="text-sm">
              {`6. Eu porém, disse, seguro de mim: "Não serei jamais abalado".`}
            </p>
            <p className="text-sm">
              {`7. Senhor, foi por favor que me destes honra e poder, mas quando escondestes vossa face, fiquei aterrado.`}
            </p>
            <p className="text-sm">
              {`8. A vós, Senhor, eu clamo, e imploro a misericórdia do meu Deus!`}
            </p>
            <p className="text-sm">
              {`9. Que proveito vos resultará de retomar-me a vida, de minha descida ao túmulo?`}
            </p>
            <p className="text-sm">
              {`10. Porventura vos luvará o meu pó? Apregoará ele a vossa fidelidade?`}
            </p>
            <p className="text-sm">
              {`11. Ouvi-me, Senhor, e tende piedade de mim; Senhor, vinde em minha ajuda.`}
            </p>
            <p className="text-sm">
              {`12. Vós convertestes o meu pranto em prazer, tirastes meus farrapos de penitência e me destes roupas de festa.`}
            </p>
            <p className="text-sm">
              {`13. Assim, minha alma vos louvará sem calar jamais. Senhor, meu Deus, eu vos bendirei eternamente.`}
            </p>
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
            <p className="text-xs text-gray-400">
              {`Reze olhando para a cruz`}
            </p>
            <p className="mt-2">
              - Jesus, tu fizeste tudo isto por mim, <br/>
              o que posso fazer por ti? (3x)
            </p>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold mt-4">
              d. A disposição de fazer penitência
            </h1>
            <p className="text-sm">
              {`Quando causamos prejuízo a alguém, não basta pedir desculpas. 
              É preciso consertar o estrago. E para oferecer a Deus uma satisfação pelo mal que causamos, 
              fazemos a penitência, especialmente na quaresma. A penitência que mais agrada a Deus é que 
              dividamos o nosso pão com o faminto, e que façamos "um jejum da língua", deixando de falar mal dos outros. 
              O jejum e a esmola também são para Deus uma satisfação agradável por nossas culpas, pois nos desapega dos bens materiais.`}
            </p>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold mt-4">
              e. Oração a Jesus Crucificado
            </h1>
            <p className="text-sm">
              {`Eis-me aqui, meu bom e doce Jesus! De joelhos me prostro em tua Santa presença, 
              e te suplico que te dignes a gravar em meu coração os mais vivos sentimentos de fé, 
              esperança e caridade, verdadeiro arrependimento dos meus pecados e firme propósito de conversão, 
              enquanto contemplo, com vivo afeto e dor, as tuas cinco chagas, tendo diante dos olhos 
              o que o profeta Davi já dizia de ti, ó meu bom Jesus: "Perfuraram minhas mãos e os meus pés, 
              e posso contar todos os meus ossos".`}
            </p>
            <p className="mt-4 font-medium text-sm">
              Em nome do Pai, e do Filho e do Espírito Santo. 
              <br/> Amém.
            </p>
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
          <p>
            {`Divino Jesus, nós Vos oferecemos este terço que vamos rezar, meditando nos mistérios da Vossa Redenção. 
            Concedei-nos, por intercessão da Virgem Maria, Mãe de Deus e nossa Mãe, 
            as virtudes que nos são necessárias para bem rezá-lo e a graça de ganharmos as indulgências desta santa devoção.`}
          </p>

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

        <div className="flex flex-col mt-4 gap-6">
          <ItemCollapse 
            title="Mistérios Gozosos (Segundas, Sábados e Domingos do Advento)"
            collapseClassName="text-start"
          >
            <ItemContent className="flex flex-col mt-4 gap-8 md:gap-16">
              <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-2 md:gap-4 md:mt-4">
                <Image
                  src={misteriousImages[0].src}
                  alt={misteriousImages[0].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-1 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-2 md:row-start-2">
                  No <strong>Primeiro Mistério</strong> Gozoso contemplamos a Anunciação do Anjo Gabriel à Nossa Senhora e a Encarnação do Verbo no seio Puríssimo de Maria. 
                </p>
                <p className="text-sm text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-2 md:row-start-3">
                  {misteriousImages[0].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-2 md:row-start-4 md:mt-0">
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

              <div className="flex flex-col md:grid md:grid-cols-[1fr] gap-2 md:gap-4">
                <Image
                  src={misteriousImages[1].src}
                  alt={misteriousImages[1].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-2 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-1 md:text-end md:row-start-2">
                  No <strong>Segundo Mistério</strong> Gozoso contemplamos a Visitação de Nossa Senhora a sua prima Santa Isabel.
                </p>
                <p className="text-sm text-end md:text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-1 md:row-start-3">
                  {misteriousImages[1].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-1 md:row-start-4 md:text-end md:mt-0">
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

              <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-2 md:gap-4">
                <Image
                  src={misteriousImages[2].src}
                  alt={misteriousImages[2].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-1 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-2 md:row-start-2">
                  No <strong>Terceiro Mistério</strong> Gozoso contemplamos o Nascimento de Nosso Senhor Jesus Cristo em Belém.
                </p>
                <p className="text-sm text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-2 md:row-start-3">
                  {misteriousImages[2].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-2 md:row-start-4 md:mt-0">
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

              <div className="flex flex-col md:grid md:grid-cols-[1fr] gap-2 md:gap-4">
                <Image
                  src={misteriousImages[3].src}
                  alt={misteriousImages[3].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-2 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-1 md:row-start-2 md:text-end">
                  No <strong>Quarto Mistério</strong> Gozoso contemplamos a Apresentação do Menino Jesus no Templo e a Purificação de Nossa Senhora.
                </p>
                <p className="text-sm text-end md:text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-1 md:row-start-3">
                  {misteriousImages[3].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-1 md:row-start-4 md:text-end md:mt-0">
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

              <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-2 md:gap-4">
                <Image
                  src={misteriousImages[4].src}
                  alt={misteriousImages[4].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-1 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-2 md:row-start-2">
                  No <strong>Quinto Mistério</strong> Gozoso contemplamos a perda e o encontro do Menino Jesus no templo, discutindo com os doutores da Lei.
                </p>
                <p className="text-sm text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-2 md:row-start-3">
                  {misteriousImages[4].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-2 md:row-start-4 md:mt-0">
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
            <ItemContent className="flex flex-col mt-4 gap-8 md:gap-16">
              <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-2 md:gap-4 md:mt-4">
                <Image
                  src={misteriousImages[5].src}
                  alt={misteriousImages[5].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-1 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-2 md:row-start-2">
                  No <strong>Primeiro Mistério</strong> Doloroso contemplamos a Oração e a Agonia de Jesus no Horto das Oliveiras.
                </p>
                <p className="text-sm text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-2 md:row-start-3">
                  {misteriousImages[5].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-2 md:row-start-4 md:mt-0">
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

              <div className="flex flex-col md:grid md:grid-cols-[1fr] gap-2 md:gap-4">
                <Image
                  src={misteriousImages[6].src}
                  alt={misteriousImages[6].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-2 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-1 md:text-end md:row-start-2">
                  No <strong>Segundo Mistério</strong> Doloroso contemplamos a Flagelação de Nosso Senhor Jesus Cristo.
                </p>
                <p className="text-sm text-end md:text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-1 md:row-start-3">
                  {misteriousImages[6].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-1 md:row-start-4 md:text-end md:mt-0">
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

              <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-2 md:gap-4">
                <Image
                  src={misteriousImages[7].src}
                  alt={misteriousImages[7].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-1 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-2 md:row-start-2">
                  No <strong>Terceiro Mistério</strong> Doloroso contemplamos a Coroação de espinhos de Nosso Senhor Jesus Cristo.
                </p>
                <p className="text-sm text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-2 md:row-start-3">
                  {misteriousImages[7].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-2 md:row-start-4 md:mt-0">
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

              <div className="flex flex-col md:grid md:grid-cols-[1fr] gap-2 md:gap-4">
                <Image
                  src={misteriousImages[8].src}
                  alt={misteriousImages[8].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-2 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-1 md:text-end md:row-start-2">
                  No <strong>Quarto Mistério</strong> Doloroso contemplamos Nosso Senhor Jesus Cristo carregando a Cruz nas costas até o alto do Calvário.
                </p>
                <p className="text-sm text-end md:text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-1 md:row-start-3">
                  {misteriousImages[8].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-1 md:row-start-4 md:text-end md:mt-0">
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

              <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-2 md:gap-4">
                <Image
                  src={misteriousImages[9].src}
                  alt={misteriousImages[9].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-1 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-2 md:row-start-2">
                  No <strong>Quinto Mistério</strong> Doloroso contemplamos a Crucifixão e morte de Nosso Senhor Jesus Cristo.
                </p>
                <p className="text-sm text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-2 md:row-start-3">
                  {misteriousImages[9].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-2 md:row-start-4 md:mt-0">
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
            <ItemContent className="flex flex-col mt-4 gap-8 md:gap-16">
              <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-2 md:gap-4 md:mt-4">
                <Image
                  src={misteriousImages[10].src}
                  alt={misteriousImages[10].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-1 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-2 md:row-start-2">
                  No <strong>Primeiro Mistério</strong> Glorioso contemplamos a Ressurreição de Nosso Senhor Jesus Cristo.
                </p>
                <p className="text-sm text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-2 md:row-start-3">
                  {misteriousImages[10].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-2 md:row-start-4 md:mt-0">
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

              <div className="flex flex-col md:grid md:grid-cols-[1fr] gap-2 md:gap-4">
                <Image
                  src={misteriousImages[11].src}
                  alt={misteriousImages[11].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-2 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-1 md:text-end md:row-start-2">
                  No <strong>Segundo Mistério</strong> Glorioso contemplamos a Ascensão de Nosso Senhor Jesus Cristo aos Céus.
                </p>
                <p className="text-sm text-end md:text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-1 md:row-start-3">
                  {misteriousImages[11].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-1 md:row-start-4 md:text-end md:mt-0">
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

              <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-2 md:gap-4">
                <Image
                  src={misteriousImages[12].src}
                  alt={misteriousImages[12].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-1 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-2 md:row-start-2">
                  No <strong>Terceiro Mistério</strong> Glorioso contemplamos a descida do Espírito Santo sobre Nossa Senhora e os Apóstolos no Santo Cenáculo.
                </p>
                <p className="text-sm text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-2 md:row-start-3">
                  {misteriousImages[12].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-2 md:row-start-4 md:mt-0">
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

              <div className="flex flex-col md:grid md:grid-cols-[1fr] gap-2 md:gap-4">
                <Image
                  src={misteriousImages[13].src}
                  alt={misteriousImages[13].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-2 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-1 md:text-end md:row-start-2">
                  No <strong>Quarto Mistério</strong> Glorioso contemplamos a Assunção de Nossa Senhora aos Céus de corpo e alma.
                </p>
                <p className="text-sm text-end md:text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-1 md:row-start-3">
                  {misteriousImages[13].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-1 md:row-start-4 md:text-end md:mt-0">
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

              <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-2 md:gap-4">
                <Image
                  src={misteriousImages[14].src}
                  alt={misteriousImages[14].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-1 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-2 md:row-start-2">
                  No <strong>Quinto Mistério</strong> Glorioso contemplamos a gloriosa coroação de Nossa Senhora Maria Santíssima como Rainha do Céu e da Terra dos Anjos e dos Homens.
                </p>
                <p className="text-sm text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-2 md:row-start-3">
                  {misteriousImages[14].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-2 md:row-start-4 md:mt-0">
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
            <ItemContent className="flex flex-col mt-4 gap-8 md:gap-16">
              <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-2 md:gap-4 md:mt-4">
                <Image
                  src={misteriousImages[15].src}
                  alt={misteriousImages[15].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-1 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-2 md:row-start-2">
                  No <strong>Primeiro Mistério</strong> Luminoso contemplamos o Batismo de Nosso Senhor Jesus Cristo no rio Jordão.
                </p>
                <p className="text-sm text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-2 md:row-start-3">
                  {misteriousImages[15].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-2 md:row-start-4 md:mt-0">
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

              <div className="flex flex-col md:grid md:grid-cols-[1fr] gap-2 md:gap-4">
                <Image
                  src={misteriousImages[16].src}
                  alt={misteriousImages[16].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-2 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-1 md:text-end md:row-start-2">
                  No <strong>Segundo Mistério</strong> Luminoso contemplamos o Primeiro milagre de Nosso Senhor Jesus Cristo transformando a água em vinho nas bodas de Caaná.
                </p>
                <p className="text-sm text-end md:text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-1 md:row-start-3">
                  {misteriousImages[16].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-1 md:row-start-4 md:text-end md:mt-0">
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

              <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-2 md:gap-4">
                <Image
                  src={misteriousImages[17].src}
                  alt={misteriousImages[17].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-1 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-2 md:row-start-2">
                  No <strong>Terceiro Mistério</strong> Luminoso contemplamos o Anúncio do Reino de Deus e o convite à conversão.
                </p>
                <p className="text-sm text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-2 md:row-start-3">
                  {misteriousImages[17].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-2 md:row-start-4 md:mt-0">
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

              <div className="flex flex-col md:grid md:grid-cols-[1fr] gap-2 md:gap-4">
                <Image
                  src={misteriousImages[18].src}
                  alt={misteriousImages[18].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-2 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-1 md:text-end md:row-start-2">
                  No <strong>Quarto Mistério</strong> Luminoso contemplamos a Transfiguração de Nosso Senhor Jesus Cristo no Monte Thabor.
                </p>
                <p className="text-sm text-end md:text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-1 md:row-start-3">
                  {misteriousImages[18].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-1 md:row-start-4 md:text-end md:mt-0">
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

              <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-2 md:gap-4">
                <Image
                  src={misteriousImages[19].src}
                  alt={misteriousImages[19].alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-cover shadow-lg order-2 md:col-start-1 md:row-start-1 md:row-span-5"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  objectFit="contain"
                  draggable="false"
                  priority
                />
                <p className="order-1 md:col-start-2 md:row-start-2">
                  No <strong>Quinto Mistério</strong> Luminoso contemplamos a Instituição da Eucaristia na Última Ceia.
                </p>
                <p className="text-sm text-end sm:text-start dark:text-zinc-200 italic font-bold order-3 md:col-start-2 md:row-start-3">
                  {misteriousImages[19].verse}
                </p>
                <div className="flex flex-col mt-2 order-4 md:col-start-2 md:row-start-4 md:mt-0">
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

        <div className="flex flex-col mt-8 dark:text-details dark:font-bold">
          <p>
            {`Infinitas graças vos damos, soberana Rainha, 
            pelos benefícios que recebemos todos os dias de vossas mãos liberais, 
            dignai-vos agora e para sempre tomar-nos debaixo de vosso poderoso amparo, 
            e para mais vos alegrar vos saudamos com uma Salve-Rainha:`}
          </p>
          <Link
            href="/ajuda/oracoes/salve-rainha"
            title="Ir para a Salve Rainha"
            className="italic hover:underline mt-2 dark:font-black"  
          >
            Salve Rainha...
          </Link>

          <p className="font-medium dark:font-bold mt-4">
            Amém.
          </p>
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
          <p className="font-bold">{`Oração de Santa Faustina pelos Pecadores`}</p>
          <p>
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
          </p>

          <p className="font-bold mt-4">{`Oração a Jesus Misericordioso`}</p>
          <p>
            {`Tu expiraste, Jesus, mas a fonte de vida jorrou para as almas, e o oceano de misericórdia abriu-se para o mundo inteiro. 
            Ó Fonte de Vida, insondável Misericórdia Divina, envolve o mundo inteiro e derrama-te sobre nós.`}
          </p>

          <p className="mt-4">
            {`Ó Sangue e Água, que jorraste do Coração de Jesus como fonte de misericórdia para nós, eu confio em Vós! (3x)`}
          </p>

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

          <p className="font-bold mt-4">{`Nas contas grandes:`}</p>
          <p>
            {`Eterno Pai, eu vos ofereço o Corpo, Sangue, Alma e Divindade de vosso diletíssimo Filho, 
            Nosso Senhor Jesus Cristo, em expiação de nossos pecados e os do mundo inteiro.`}
          </p>

          <p className="font-bold mt-4">{`Nas contas pequenas:`}</p>
          <p>{`Pela sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro. (10x)`}</p>

          <p className="font-bold mt-4">{`Ao final de cada mistério rezar:`}</p>
          <p>
            {`Ó Sangue e Água que jorrastes do Coração de Jesus, como fonte de misericórdia para nós, eu confio em Vós.`}
          </p>

          <p className="font-bold mt-4">{`Ao final do terço, rezar três vezes:`}</p>
          <p>{`Deus Santo, Deus Forte, Deus Imortal, tende piedade de nós e do mundo inteiro.`}</p>

          <p className="font-bold mt-4">{`Oração final:`}</p>
          <p>
            {`Deus, Pai Misericordioso, que revelou Teu amor em Teu Filho Jesus Cristo, 
            e o derramou sobre nós no Espírito Santo, confiamos-Te hoje o destino do mundo e de cada homem. 
            Dobre-se sobre nós pecadores, cure nossa fraqueza, vença todo o mal, deixe que todos os habitantes 
            da Terra experimentem a Tua misericórdia, para que em Ti, o Deus Trino, possam sempre encontrar a fonte da esperança. 
            Pai Eterno, pela dolorosa Paixão e Ressurreição de Teu Filho, tende piedade de nós e do mundo inteiro.`}
          </p>

          <p className="font-medium mt-4">Amém.</p>
        </div>
      </div>
    )
  },
  {
    title: 'Terço da Divina Providência',
    href: '/terco-divina-providencia',
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
          <Link
            href="/ajuda/oracoes/credo"
            title="Ir para o Credo"
            className="italic hover:underline"
          >
            Credo...
          </Link>

          <p className="font-bold mt-4">{`Nas contas grandes:`}</p>
          <p>{`Mãe da Divina Providência: Providenciai!`}</p>

          <p className="font-bold mt-4">{`Nas contas pequenas:`}</p>
          <p>{`Deus provê, Deus proverá, Sua misericórdia não faltará! (10x)`}</p>

          <p className="font-bold mt-4">{`Oração final:`}</p>
          <p>
            {`Vinde, Maria, chegou o momento. Valei-nos agora e em todo tormento. 
            Mãe da Providência, prestai-nos auxílio no sofrimento da terra e no exílio. 
            Mostrai que sois Mãe de Amor e de Bondade, agora que é grande a necessidade.`}
          </p>

          <p className="font-medium mt-4">Amém.</p>
        </div>
      </div>
    )
  },
  {
    title: 'Terço de São Miguel Arcanjo',
    href: '/terco-sao-miguel-arcanjo',
    prayer: (
      <div className="flex flex-col">
        <Link
          href="/ajuda/oracoes/sinal-da-cruz"
          title="Ir para Sinal da Cruz"
          className="italic hover:underline"
        >
          Sinal da Cruz...
        </Link>

        <div className="flex flex-col my-4">
          <p className="font-bold">{`Na medalha, reza-se:`}</p>
          <p>{`V. Deus, vinde em nosso auxílio`}</p>
          <p className="font-medium">{`R. Senhor, socorrei-nos e salvai-nos.`}</p>
        </div>

        <Link
          href="/ajuda/oracoes/gloria-ao-pai"
          title="Ir para Gloria ao Pai"
          className="italic hover:underline"
        >
          Glória ao Pai...
        </Link>

        <div className="flex flex-col mt-4">
          <div className="flex flex-col">
            <p className="font-bold">{`Primeira Saudação:`}</p>
            <p>
              {`Pela intercessão de São Miguel e do coro celeste dos Serafins, 
              para que o Senhor Jesus nos torne dignos de sermos abrasados de uma perfeita caridade.`}
            </p>
            <p className="font-medium mt-2">Amém.</p>

            <div className="flex flex-col mt-2">
              <Link
                href="/ajuda/oracoes/gloria-ao-pai"
                title="Ir para Gloria ao Pai"
                className="italic hover:underline"
              >
                Glória ao Pai...
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
              <p className="mt-2">{`... ao primeiro coro de Anjos.`}</p>
            </div>
          </div>

          <div className="flex flex-col mt-8">
            <p className="font-bold">{`Segunda Saudação:`}</p>
            <p>
              {`Pela intercessão de São Miguel e do coro celeste dos Querubins, 
              para que o Senhor Jesus nos conceda a graça de fugirmos do pecado e procurarmos a perfeição cristã.`}
            </p>
            <p className="font-medium mt-2">Amém.</p>

            <div className="flex flex-col mt-2">
              <Link
                href="/ajuda/oracoes/gloria-ao-pai"
                title="Ir para Gloria ao Pai"
                className="italic hover:underline"
              >
                Glória ao Pai...
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
              <p className="mt-2">{`... ao segundo coro de Anjos.`}</p>
            </div>
          </div>

          <div className="flex flex-col mt-8">
            <p className="font-bold">{`Terceira Saudação:`}</p>
            <p>
              {`Pela intercessão de São Miguel e do coro celeste dos Tronos, 
              para que Deus derrame em nossos corações o espírito de verdadeira e sincera humildade.`}
            </p>
            <p className="font-medium mt-2">Amém.</p>

            <div className="flex flex-col mt-2">
              <Link
                href="/ajuda/oracoes/gloria-ao-pai"
                title="Ir para Gloria ao Pai"
                className="italic hover:underline"
              >
                Glória ao Pai...
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
              <p className="mt-2">{`... ao terceiro coro de Anjos.`}</p>
            </div>
          </div>

          <div className="flex flex-col mt-8">
            <p className="font-bold">{`Quarta Saudação:`}</p>
            <p>
              {`Pela intercessão de São Miguel e do coro celeste das Dominações, 
              para que o Senhor nos conceda a graça de dominar nossos sentidos, e de nos corrigir das nossas más paixões.`}
            </p>
            <p className="font-medium mt-2">Amém.</p>

            <div className="flex flex-col mt-2">
              <Link
                href="/ajuda/oracoes/gloria-ao-pai"
                title="Ir para Gloria ao Pai"
                className="italic hover:underline"
              >
                Glória ao Pai...
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
              <p className="mt-2">{`... ao quarto coro de Anjos.`}</p>
            </div>
          </div>

          <div className="flex flex-col mt-8">
            <p className="font-bold">{`Quinta Saudação:`}</p>
            <p>
              {`Pela intercessão de São Miguel e do coro celeste das Potestades, 
              para que o Senhor Jesus se digne de proteger nossas almas contra as ciladas e as tentações de Satanás e dos demônios.`}
            </p>
            <p className="font-medium mt-2">Amém.</p>

            <div className="flex flex-col mt-2">
              <Link
                href="/ajuda/oracoes/gloria-ao-pai"
                title="Ir para Gloria ao Pai"
                className="italic hover:underline"
              >
                Glória ao Pai...
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
              <p className="mt-2">{`... ao quinto coro de Anjos.`}</p>
            </div>
          </div>

          <div className="flex flex-col mt-8">
            <p className="font-bold">{`Sexta Saudação:`}</p>
            <p>
              {`Pela intercessão de São Miguel e do coro admirável das Virtudes, 
              para que o Senhor não nos deixe cair em tentação, mas que nos livre de todo o mal.`}
            </p>
            <p className="font-medium mt-2">Amém.</p>

            <div className="flex flex-col mt-2">
              <Link
                href="/ajuda/oracoes/gloria-ao-pai"
                title="Ir para Gloria ao Pai"
                className="italic hover:underline"
              >
                Glória ao Pai...
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
              <p className="mt-2">{`... ao sexto coro de Anjos.`}</p>
            </div>
          </div>

          <div className="flex flex-col mt-8">
            <p className="font-bold">{`Sétima Saudação:`}</p>
            <p>
              {`Pela intercessão de São Miguel e do coro celeste dos Principados, 
              para que o Senhor encha nossas almas do espírito de uma verdadeira e sincera obediência.`}
            </p>
            <p className="font-medium mt-2">Amém.</p>

            <div className="flex flex-col mt-2">
              <Link
                href="/ajuda/oracoes/gloria-ao-pai"
                title="Ir para Gloria ao Pai"
                className="italic hover:underline"
              >
                Glória ao Pai...
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
              <p className="mt-2">{`... ao sétimo coro de Anjos.`}</p>
            </div>
          </div>

          <div className="flex flex-col mt-8">
            <p className="font-bold">{`Oitava Saudação:`}</p>
            <p>
              {`Pela intercessão de São Miguel e do coro celeste dos Arcanjos, 
              para que o Senhor nos conceda o dom da perseverança na fé e nas boas obras, 
              a fim de que possamos chegar a possuir a glória do Paraíso.`}
            </p>
            <p className="font-medium mt-2">Amém.</p>

            <div className="flex flex-col mt-2">
              <Link
                href="/ajuda/oracoes/gloria-ao-pai"
                title="Ir para Gloria ao Pai"
                className="italic hover:underline"
              >
                Glória ao Pai...
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
              <p className="mt-2">{`... ao oitavo coro de Anjos.`}</p>
            </div>
          </div>

          <div className="flex flex-col mt-8">
            <p className="font-bold">{`Nona Saudação:`}</p>
            <p>
              {`Pela intercessão de São Miguel e do coro celeste de todos os Anjos, 
              para que sejamos guardados por eles nesta vida mortal, 
              para sermos conduzidos por eles à glória eterna do Céu.`}
            </p>
            <p className="font-medium mt-2">Amém.</p>

            <div className="flex flex-col mt-2">
              <Link
                href="/ajuda/oracoes/gloria-ao-pai"
                title="Ir para Gloria ao Pai"
                className="italic hover:underline"
              >
                Glória ao Pai...
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
              <p className="mt-2">{`... ao nono coro de Anjos.`}</p>
            </div>
          </div>

          <div className="flex flex-col mt-8">
            <p className="font-bold">{`Ao final, reza-se:`}</p>
            <Link
              href="/ajuda/oracoes/pai-nosso"
              title="Ir para o Pai Nosso"
              className="italic hover:underline"
            >
              Pai Nosso... em honra de São Miguel Arcanjo.
            </Link>
            <Link
              href="/ajuda/oracoes/pai-nosso"
              title="Ir para o Pai Nosso"
              className="italic hover:underline"
            >
              Pai Nosso... em honra de São Gabriel.
            </Link>
            <Link
              href="/ajuda/oracoes/pai-nosso"
              title="Ir para o Pai Nosso"
              className="italic hover:underline"
            >
              Pai Nosso... em honra de São Rafael.
            </Link>
            <Link
              href="/ajuda/oracoes/pai-nosso"
              title="Ir para o Pai Nosso"
              className="italic hover:underline"
            >
              Pai Nosso... em honra de nosso Anjo da Guarda.
            </Link>
            <Link
              href="/ajuda/oracoes/pai-nosso"
              title="Ir para o Pai Nosso"
              className="italic hover:underline"
            >
              Pai Nosso... em honra ao Anjo da Guarda das pessoas que nós ofendemos.
            </Link>
          </div>

          <div className="flex flex-col mt-4">
            <p className="font-bold">{`Antífona:`}</p>
            <p>
              {`Gloriosíssimo São Miguel, chefe e príncipe dos exércitos celestes, fiel guardião das almas, 
              vencedor dos espíritos rebeldes, amado da casa de Deus, nosso admirável guia depois de Cristo; 
              vós, cuja excelência e virtudes são eminentíssimas, dignai-vos livrar-nos de todos os males, 
              nós todos que recorremos a vós com confiança, e fazei pela vossa incomparável proteção, 
              que adiantemos cada dia mais na fidelidade em servir a Deus.`}
            </p>
            <p className="font-medium mt-2">Amém.</p>
          </div> 

          <div className="flex flex-col mt-4">
            <p>{`V. Rogai por nós, ó bem-aventurado São Miguel, príncipe da Igreja de Cristo.`}</p>
            <p className="font-medium">{`R. Para que sejamos dignos de suas promessas.`}</p>
          </div> 

          <div className="flex flex-col mt-4">
            <p className="font-bold">{`Oremos:`}</p>
            <p>
              {`Deus, todo poderoso e eterno, que por um prodígio de bondade e misericórdia para a salvação dos homens, 
              escolhestes para príncipe de Vossa Igreja o gloriosíssimo Arcanjo São Miguel, tornai-nos dignos, nós vo-lo pedimos, 
              de sermos preservados de todos os nossos inimigos, a fim de que na hora da nossa morte nenhum deles nos possa inquietar, 
              mas que nos seja dado de sermos introduzidos por ele na presença da Vossa poderosa e augusta Majestade, 
              pelos merecimentos de Jesus Cristo, Nosso Senhor.`}
            </p>
            <p className="font-bold mt-4">Amém.</p>
          </div> 
        </div>
      </div>
    )
  },
];