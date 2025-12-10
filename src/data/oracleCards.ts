export interface OracleCard {
  id: number;
  name: string;
  hebrew: string;
  color: string;
  message: string;
  affirmation: string;
  guidance: string;
}

export const oracleCards: OracleCard[] = [
  {
    id: 1,
    name: "Kether — A Coroa",
    hebrew: "כתר",
    color: "bg-gradient-to-br from-white to-gray-100",
    message: "Um novo ciclo espiritual começa.",
    affirmation: "Eu me alinho com meu caminho mais elevado.",
    guidance: "Você está entrando em uma fase de consciência expandida. O chakra coronário se abre, convidando a luz divina para sua consciência. Confie nos começos que surgem agora — eles carregam a semente do seu propósito mais elevado. Este é um tempo de iniciação espiritual e puro potencial."
  },
  {
    id: 2,
    name: "Chokmah — Sabedoria",
    hebrew: "חכמה",
    color: "bg-gradient-to-br from-gray-400 to-gray-600",
    message: "A sabedoria divina flui através de você.",
    affirmation: "Eu confio no meu conhecimento interior.",
    guidance: "A força primordial da criação se agita dentro de você. Chokmah representa o primeiro lampejo de inspiração, o momento antes do pensamento tomar forma. Preste atenção a insights súbitos e flashes intuitivos. O universo fala com você através de símbolos, sincronicidades e sonhos."
  },
  {
    id: 3,
    name: "Binah — Entendimento",
    hebrew: "בינה",
    color: "bg-gradient-to-br from-slate-700 to-slate-900",
    message: "O entendimento vem através da quietude.",
    affirmation: "Eu abraço a sabedoria da paciência.",
    guidance: "A Grande Mãe recebe e dá forma a todas as coisas. Este é um tempo para contemplação, para permitir que as ideias se gestam. Não tenha pressa. O entendimento que você busca virá quando você criar espaço para ele. Honre a escuridão como o útero da criação."
  },
  {
    id: 4,
    name: "Chesed — Misericórdia",
    hebrew: "חסד",
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    message: "A abundância flui para aqueles que dão livremente.",
    affirmation: "Eu sou um canal para o amor divino.",
    guidance: "A misericórdia ilimitada do universo se derrama. Chesed pede que você incorpore generosidade, compaixão e bondade amorosa. Onde você pode ser mais generoso? Como você pode estender graça a si mesmo e aos outros? Este é um tempo de expansão e recebimento através do dar."
  },
  {
    id: 5,
    name: "Geburah — Força",
    hebrew: "גבורה",
    color: "bg-gradient-to-br from-red-500 to-red-700",
    message: "A verdadeira força está no discernimento.",
    affirmation: "Eu honro meus limites com amor.",
    guidance: "A espada do discernimento corta o que não serve mais. Geburah chama você para estabelecer limites firmes, dizer não quando necessário e honrar seus limites. Isso não é dureza — é o amor protetor que cria espaço saudável para o crescimento. Libere com gratidão."
  },
  {
    id: 6,
    name: "Tiphareth — Beleza",
    hebrew: "תפארת",
    color: "bg-gradient-to-br from-yellow-400 to-amber-500",
    message: "Seu coração é o centro da transformação.",
    affirmation: "Eu irradio minha luz autêntica.",
    guidance: "O sol dourado da alma brilha no centro da Árvore. Tiphareth representa equilíbrio, beleza e o coração desperto. Você é chamado a integrar todos os aspectos de si mesmo — luz e sombra — em uma totalidade harmoniosa. Seu eu autêntico está pronto para brilhar."
  },
  {
    id: 7,
    name: "Netzach — Vitória",
    hebrew: "נצח",
    color: "bg-gradient-to-br from-emerald-400 to-green-600",
    message: "A paixão guia você em direção à vitória.",
    affirmation: "Eu confio nos meus desejos como guias sagrados.",
    guidance: "A força da natureza, do desejo e da paixão criativa move-se através de você. Netzach celebra a beleza da emoção e o poder da atração. O que você verdadeiramente deseja? Siga o anseio do seu coração — ele conhece o caminho. Arte, beleza e natureza são seus aliados agora."
  },
  {
    id: 8,
    name: "Hod — Esplendor",
    hebrew: "הוד",
    color: "bg-gradient-to-br from-orange-400 to-orange-600",
    message: "As palavras têm o poder de criar a realidade.",
    affirmation: "Eu me comunico com clareza e verdade.",
    guidance: "O reino do pensamento, linguagem e comunicação aguarda sua atenção. Hod convida você a examinar suas crenças e as palavras que você fala. Elas estão alinhadas com sua visão mais elevada? Este é um tempo para estudo, aprendizado e refinamento da sua paisagem mental."
  },
  {
    id: 9,
    name: "Yesod — Fundamento",
    hebrew: "יסוד",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    message: "Seus sonhos revelam verdades ocultas.",
    affirmation: "Eu confio na orientação do meu subconsciente.",
    guidance: "O reino lunar dos sonhos, intuição e subconsciente chama por você. Yesod é o portal entre os mundos espiritual e material. Preste muita atenção aos seus sonhos, seus padrões emocionais e às imagens que surgem na meditação. O véu está fino."
  },
  {
    id: 10,
    name: "Malkuth — Reino",
    hebrew: "מלכות",
    color: "bg-gradient-to-br from-amber-700 to-stone-600",
    message: "O sagrado vive no cotidiano.",
    affirmation: "Eu honro o divino em todas as coisas.",
    guidance: "O reino terreno da manifestação e realidade física te acolhe. Malkuth lembra que a jornada espiritual culmina no mundo material. Ancore-se. Cuide do seu corpo, da sua casa, do seu trabalho. O divino está presente em cada momento da vida comum."
  }
];

export const getRandomCard = (): OracleCard => {
  const randomIndex = Math.floor(Math.random() * oracleCards.length);
  return oracleCards[randomIndex];
};
