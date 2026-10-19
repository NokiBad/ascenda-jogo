// ASCENDA — conteúdo narrativo: da ideia ao império.
const FLOORS = [
  {
    "name": "Área externa",
    "label": "00 · O começo",
    "sub": "Uma ideia pode mudar tudo"
  },
  {
    "name": "Térreo · Pessoas e negócio",
    "label": "01 · Descobrir",
    "sub": "Clientes, equipe, finanças e vendas"
  },
  {
    "name": "1º andar · Operação",
    "label": "02 · Organizar",
    "sub": "Processos, mercado, recursos e riscos"
  },
  {
    "name": "2º andar · Crescimento",
    "label": "03 · Evoluir",
    "sub": "Produto, estratégia, tecnologia e direção"
  }
];
const NPCS = [
  {
    "id": "recepcao",
    "name": "Maya",
    "floor": 1,
    "x": 230,
    "y": 280,
    "skin": "#e6ac85",
    "hair": "#342625",
    "shirt": "#82cabf",
    "style": 1,
    "role": "RECEPÇÃO & JORNADA DO CLIENTE",
    "room": "RECEPÇÃO",
    "concept": "O problema começa na experiência do cliente",
    "note": "Uma empresa existe para resolver um problema real de alguém. Entender o cliente é o primeiro passo antes de vender qualquer coisa.",
    "pages": [
      "Você chegou à Horizonte num dia difícil. A pequena empresa de soluções digitais perdeu dois clientes em um mês e o caixa está apertado. Marina, a diretora, acredita que a equipe ainda pode virar o jogo — mas precisa de alguém que enxergue o negócio por inteiro.",
      "Sou Maya, da recepção. Parece simples, mas sou a primeira pessoa com quem muitos clientes falam. Ontem, uma cliente esperou três dias por uma resposta e disse que talvez não volte. Nosso problema não é só vender: é entender o que as pessoas precisam e cumprir o que prometemos.",
      "Antes de criar um produto, descubra qual problema merece ser resolvido. Converse com possíveis clientes, observe dificuldades e não confunda uma ideia bonita com uma necessidade real."
    ],
    "q": "Qual é o melhor primeiro passo antes de lançar um negócio?",
    "answers": [
      "Comprar equipamentos caros para parecer profissional.",
      "Entender um problema real e quem precisa de uma solução.",
      "Criar um logotipo e esperar os clientes aparecerem."
    ],
    "correct": 1,
    "explain": "Negócios fortes começam por uma necessidade real. A solução, a marca e os gastos vêm depois de entender o cliente."
  },
  {
    "id": "rh",
    "name": "Helena",
    "floor": 1,
    "x": 830,
    "y": 280,
    "skin": "#a86643",
    "hair": "#241d26",
    "shirt": "#ce9be8",
    "style": 2,
    "role": "PESSOAS & CULTURA",
    "room": "PESSOAS & CULTURA",
    "concept": "Uma equipe que consegue trabalhar junta",
    "note": "Pessoas, habilidades, tempo e organização são recursos fundamentais. Contratar sem entender a necessidade pode aumentar custos sem resolver o problema.",
    "pages": [
      "Sou Helena e cuido das pessoas. A equipe está cansada porque todo mundo tenta fazer tudo ao mesmo tempo. Um funcionário quer sair, enquanto outro está fazendo horas extras para dar conta dos pedidos.",
      "Uma empresa não cresce só com uma boa ideia: precisa das pessoas certas, com responsabilidades claras e condições de trabalhar bem. Antes de contratar, descubra o que está faltando: conhecimento, tempo, processo ou comunicação.",
      "Uma equipe saudável aprende com erros e conversa cedo sobre dificuldades. Delegar não é simplesmente passar tarefas; é explicar o objetivo, combinar prazos e dar apoio."
    ],
    "q": "Antes de contratar alguém, qual decisão faz mais sentido?",
    "answers": [
      "Descobrir qual necessidade existe e se a contratação resolve o problema.",
      "Contratar o máximo de pessoas possível.",
      "Escolher alguém só porque aceita o menor salário."
    ],
    "correct": 0,
    "explain": "Planejar a equipe evita gastos desnecessários e ajuda cada pessoa a contribuir com clareza."
  },
  {
    "id": "financeiro",
    "name": "Theo",
    "floor": 1,
    "x": 230,
    "y": 610,
    "skin": "#f4c6a1",
    "hair": "#653d2b",
    "shirt": "#e7c07b",
    "style": 0,
    "role": "FINANÇAS & PLANEJAMENTO",
    "room": "FINANÇAS",
    "concept": "O caixa não é o mesmo que lucro",
    "note": "Receita é o dinheiro que entra pelas vendas; custos e despesas são saídas. O caixa mostra se a empresa consegue pagar suas contas no momento certo.",
    "pages": [
      "Sou Theo, responsável pelas finanças. Temos contratos que parecem lucrativos, mas alguns clientes pagam só depois de 45 dias. Enquanto isso, salários, internet e fornecedores vencem agora.",
      "Receita não é a mesma coisa que lucro, e lucro não significa que existe dinheiro disponível hoje. É preciso registrar entradas e saídas, separar custos fixos dos variáveis e prever quando cada pagamento acontecerá.",
      "Antes de gastar com uma nova campanha, precisamos saber quanto custa manter a empresa funcionando e por quantos meses o caixa aguenta. Uma planilha simples, atualizada toda semana, já ajuda muito."
    ],
    "q": "Qual afirmação sobre o dinheiro da empresa está correta?",
    "answers": [
      "Se vendeu bastante, com certeza tem dinheiro sobrando.",
      "Lucro e saldo disponível no caixa são sempre iguais.",
      "É preciso acompanhar receitas, gastos e datas de recebimento e pagamento."
    ],
    "correct": 2,
    "explain": "Uma empresa pode ter vendas e mesmo assim ficar sem dinheiro para pagar as contas. Planejar o fluxo de caixa ajuda a evitar isso."
  },
  {
    "id": "comercial",
    "name": "Rafael",
    "floor": 1,
    "x": 830,
    "y": 610,
    "skin": "#cb8e62",
    "hair": "#342625",
    "shirt": "#80afd5",
    "style": 0,
    "role": "VENDAS & RELACIONAMENTO",
    "room": "COMERCIAL",
    "concept": "Prometer menos e entregar bem",
    "note": "Marketing atrai atenção; vendas transformam interesse em contratos; atendimento e qualidade ajudam a manter clientes. A promessa precisa combinar com o que a empresa consegue entregar.",
    "pages": [
      "Sou Rafael, do comercial. Uma proposta grande está quase fechada, mas o cliente quer uma entrega em uma semana. A equipe acha que o prazo é impossível, e eu não quero perder a venda.",
      "Vender não é prometer qualquer coisa para conseguir um contrato. Uma promessa impossível pode virar atraso, reclamação, reembolso e perda de reputação. O comercial precisa conversar com quem vai executar o serviço.",
      "Uma boa proposta explica qual problema será resolvido, o que será entregue, quanto custa e quais são os limites. É melhor construir confiança do que ganhar uma venda que a empresa não consegue cumprir."
    ],
    "q": "Como agir quando o cliente pede algo que a equipe não consegue entregar no prazo?",
    "answers": [
      "Prometer mesmo assim e resolver depois.",
      "Alinhar a capacidade da equipe e negociar um prazo realista.",
      "Ignorar a pergunta até o cliente desistir."
    ],
    "correct": 1,
    "explain": "Uma venda saudável combina necessidade do cliente, capacidade de entrega, preço e prazo realistas."
  },
  {
    "id": "soc",
    "name": "Ícaro",
    "floor": 2,
    "x": 230,
    "y": 280,
    "skin": "#bb7951",
    "hair": "#211d26",
    "shirt": "#7bc6bf",
    "style": 0,
    "role": "OPERAÇÕES & ENTREGA",
    "room": "OPERAÇÕES",
    "concept": "Transformar promessa em resultado",
    "note": "Processos simples e claros ajudam a entregar qualidade de forma consistente. Cada tarefa precisa de responsável, prazo e critério para saber se foi concluída.",
    "pages": [
      "Sou Ícaro. O time entrega serviços, mas cada profissional segue um método diferente. Por isso, o resultado varia e alguns trabalhos precisam ser refeitos.",
      "Processo não precisa ser burocracia. É um caminho combinado para repetir o que funciona, identificar erros e saber quem deve agir quando surge um problema.",
      "Vamos desenhar as etapas de cada entrega, definir um responsável e conferir a qualidade antes de enviar o resultado ao cliente. Assim conseguimos atender mais pessoas sem depender de improviso o tempo todo."
    ],
    "q": "Por que documentar um processo de trabalho?",
    "answers": [
      "Para impedir qualquer mudança.",
      "Para que só uma pessoa saiba como tudo funciona.",
      "Para repetir boas práticas, reduzir erros e facilitar a colaboração."
    ],
    "correct": 2,
    "explain": "Um processo claro reduz retrabalho e permite que a equipe aprenda e melhore com o tempo."
  },
  {
    "id": "intel",
    "name": "Sofia",
    "floor": 2,
    "x": 830,
    "y": 280,
    "skin": "#f2bc91",
    "hair": "#593328",
    "shirt": "#9ba5ee",
    "style": 1,
    "role": "PESQUISA DE MERCADO",
    "room": "PESQUISA",
    "concept": "Encontrar uma oportunidade de verdade",
    "note": "Uma oportunidade de negócio combina uma necessidade relevante, clientes dispostos a pagar e uma solução que a empresa consegue oferecer melhor ou de forma diferente.",
    "pages": [
      "Sou Sofia e pesquiso o mercado. A equipe teve uma ideia de aplicativo para organizar pequenos comércios. Parece interessante, mas ainda não sabemos se os donos de lojas usariam ou pagariam por isso.",
      "Antes de investir, precisamos conversar com pessoas do público-alvo, observar concorrentes e testar as hipóteses mais arriscadas. Amigos dizendo “gostei da ideia” não é a mesma coisa que clientes usando ou pagando.",
      "Um teste pequeno — uma entrevista, uma página de apresentação ou um protótipo simples — pode revelar muito antes de gastar o dinheiro que a empresa não tem."
    ],
    "q": "Qual é a forma mais segura de avaliar uma nova ideia?",
    "answers": [
      "Conversar com potenciais clientes e testar as hipóteses com baixo custo.",
      "Investir todo o caixa antes de ouvir o mercado.",
      "Copiar um concorrente sem entender seus clientes."
    ],
    "correct": 0,
    "explain": "Validar a ideia com clientes reais reduz incertezas e evita investir demais em algo que ninguém quer."
  },
  {
    "id": "infra",
    "name": "Miguel",
    "floor": 2,
    "x": 230,
    "y": 610,
    "skin": "#e5ad80",
    "hair": "#6a4432",
    "shirt": "#82a8b3",
    "style": 0,
    "role": "FERRAMENTAS & FORNECEDORES",
    "room": "RECURSOS",
    "concept": "Comprar o necessário, na hora certa",
    "note": "Ferramentas, equipamentos, espaço e fornecedores têm custos. A escolha deve considerar necessidade, qualidade, preço, suporte e impacto no orçamento.",
    "pages": [
      "Sou Miguel e cuido das ferramentas que a equipe usa. Um fornecedor oferece uma plataforma cara com muitos recursos, mas usamos apenas uma pequena parte do que ela oferece.",
      "Comprar o mais caro não significa fazer o melhor investimento. Precisamos comparar alternativas, avaliar o que é essencial e observar custos que se repetem todo mês.",
      "Negociar com fornecedores e revisar assinaturas pode liberar dinheiro para atividades que geram mais valor. O importante é não economizar de um jeito que prejudique a qualidade ou a segurança."
    ],
    "q": "Como escolher uma ferramenta para a empresa?",
    "answers": [
      "Escolher sempre a opção mais cara.",
      "Comparar necessidades, custo total, qualidade e suporte.",
      "Assinar várias ferramentas antes de testar."
    ],
    "correct": 1,
    "explain": "Uma boa compra atende à necessidade real e cabe no orçamento presente e futuro."
  },
  {
    "id": "grc",
    "name": "Helena",
    "floor": 2,
    "x": 830,
    "y": 610,
    "skin": "#9d6246",
    "hair": "#2d2027",
    "shirt": "#cf9bbb",
    "style": 1,
    "role": "ÉTICA & RISCOS",
    "room": "RESPONSABILIDADE",
    "concept": "Crescer sem perder a confiança",
    "note": "Uma empresa precisa cumprir compromissos, respeitar leis aplicáveis, proteger dados e considerar os efeitos das decisões sobre clientes, trabalhadores, fornecedores e sociedade.",
    "pages": [
      "Sou Helena e ajudo a equipe a pensar em riscos e responsabilidade. Um possível cliente pediu dados pessoais de usuários que não precisamos compartilhar para prestar o serviço.",
      "Ganhar dinheiro não justifica qualquer decisão. A confiança é um ativo: quando a empresa é transparente, respeita a privacidade e explica seus limites, protege pessoas e a própria reputação.",
      "Antes de tomar uma decisão importante, pergunte: é correto? É necessário? Quem pode ser prejudicado? Temos autorização e condições de fazer isso? Se houver dúvida, pare e procure orientação."
    ],
    "q": "Uma decisão comercial parece lucrativa, mas expõe dados desnecessários de clientes. O que fazer?",
    "answers": [
      "Compartilhar os dados para fechar o contrato.",
      "Enviar os dados e apagar os registros depois.",
      "Proteger os dados e buscar uma alternativa legítima e necessária."
    ],
    "correct": 2,
    "explain": "Ética e privacidade não são detalhes: ajudam a proteger pessoas, cumprir obrigações e manter a confiança."
  },
  {
    "id": "appsec",
    "name": "Luna",
    "floor": 3,
    "x": 230,
    "y": 280,
    "skin": "#d59b72",
    "hair": "#292232",
    "shirt": "#9ab7e9",
    "style": 1,
    "role": "PRODUTO & QUALIDADE",
    "room": "PRODUTO",
    "concept": "Construir uma solução que funciona",
    "note": "Um produto ou serviço deve resolver a necessidade identificada com qualidade. Testar cedo e ouvir usuários evita que defeitos caros apareçam apenas depois do lançamento.",
    "pages": [
      "Sou Luna e ajudo a transformar ideias em produtos. O protótipo da nova ferramenta tem uma tela bonita, mas usuários de teste não conseguem concluir a tarefa principal sem ajuda.",
      "Uma solução não é boa só porque parece moderna. O mais importante é se as pessoas conseguem usá-la para resolver o problema que têm. Testes simples mostram onde a experiência falha.",
      "Podemos lançar uma versão pequena, medir o que acontece e melhorar com base em evidências. Isso é melhor do que passar meses construindo recursos que ninguém pediu."
    ],
    "q": "Qual atitude ajuda a criar um produto melhor?",
    "answers": [
      "Testar com usuários e melhorar com base no que aprendemos.",
      "Evitar ouvir críticas depois de escolher a ideia.",
      "Adicionar recursos sem verificar se são úteis."
    ],
    "correct": 0,
    "explain": "Testar cedo permite corrigir o rumo antes de gastar muito dinheiro e tempo."
  },
  {
    "id": "red",
    "name": "Theo",
    "floor": 3,
    "x": 830,
    "y": 280,
    "skin": "#efba8d",
    "hair": "#49312c",
    "shirt": "#dc9299",
    "style": 0,
    "role": "ESTRATÉGIA & CONCORRÊNCIA",
    "room": "ESTRATÉGIA",
    "concept": "Diferenciar-se sem copiar",
    "note": "Conhecer concorrentes ajuda a identificar lacunas, preços e expectativas do mercado. Diferenciação pode vir de atendimento, especialização, facilidade, confiança ou custo.",
    "pages": [
      "Sou Theo e estudo a concorrência. Outra empresa oferece um serviço parecido com preço menor. Marina está preocupada que a Horizonte não consiga competir.",
      "Nem sempre a resposta é baixar o preço. Precisamos descobrir por que um cliente escolheria a Horizonte: atendimento mais próximo, entrega mais rápida, especialização ou uma experiência mais simples?",
      "Uma vantagem real precisa ser importante para o cliente e possível de manter. Copiar tudo o que o concorrente faz pode fazer a empresa perder sua própria identidade."
    ],
    "q": "Como a Horizonte pode competir com uma empresa que cobra menos?",
    "answers": [
      "Reduzir o preço sem calcular os custos.",
      "Descobrir o que os clientes valorizam e construir uma diferença real.",
      "Falar mal do concorrente sem melhorar o serviço."
    ],
    "correct": 1,
    "explain": "Diferenciar-se é oferecer algo valorizado pelo cliente que a empresa consegue entregar de maneira consistente."
  },
  {
    "id": "cloud",
    "name": "Yasmin",
    "floor": 3,
    "x": 230,
    "y": 610,
    "skin": "#b77a54",
    "hair": "#231e26",
    "shirt": "#88d0be",
    "style": 2,
    "role": "TECNOLOGIA & ESCALA",
    "room": "TECNOLOGIA",
    "concept": "Crescer sem aumentar o caos",
    "note": "Tecnologia e automação podem economizar tempo, mas só funcionam bem quando resolvem uma necessidade clara e quando a equipe sabe usá-las.",
    "pages": [
      "Sou Yasmin e cuido das ferramentas digitais. Temos tarefas repetitivas que consomem horas da equipe, mas também há quem queira comprar um sistema novo para cada problema.",
      "Automatizar tudo não é o objetivo. Primeiro precisamos entender o processo, corrigir etapas desnecessárias e então avaliar se uma ferramenta realmente economiza tempo ou melhora a qualidade.",
      "Uma empresa pequena pode crescer com boas ferramentas e processos simples. Mas deve medir o resultado e evitar comprometer o caixa com tecnologia que parece impressionante, mas não resolve a dor principal."
    ],
    "q": "Antes de investir em automação, o que a empresa deve fazer?",
    "answers": [
      "Entender o processo e confirmar que a ferramenta resolve um problema real.",
      "Comprar a ferramenta mais popular sem pesquisar.",
      "Automatizar um processo confuso sem revisá-lo."
    ],
    "correct": 0,
    "explain": "A tecnologia gera valor quando resolve uma necessidade e seu benefício compensa o custo."
  },
  {
    "id": "direcao",
    "name": "Marina",
    "floor": 3,
    "x": 830,
    "y": 610,
    "skin": "#e7ae87",
    "hair": "#382b30",
    "shirt": "#e0c582",
    "style": 1,
    "role": "DIREÇÃO & ESTRATÉGIA",
    "room": "DIREÇÃO",
    "concept": "A escolha que define o futuro",
    "note": "Empreender exige equilibrar oportunidade, recursos, pessoas, clientes e responsabilidade. Crescer é importante, mas deve acontecer de forma sustentável.",
    "pages": [
      "Sou Marina, diretora da Horizonte. Há três meses quase fechamos as portas. Agora temos uma chance: lançar um serviço simples para pequenos negócios. O caixa é limitado, a equipe está dividida e um cliente importante espera uma resposta amanhã.",
      "Não existe uma decisão perfeita sem riscos. Podemos gastar tudo em divulgação, contratar antes de validar a demanda ou começar com um piloto pequeno. Cada escolha tem consequências para o caixa, a equipe e a confiança dos clientes.",
      "Quero que você ajude a transformar a Horizonte. Pense como quem empreende: observe o mercado, faça contas, escute a equipe, cumpra o que promete e aprenda com os resultados. Sua jornada não termina quando a empresa começa a crescer — é aí que a gestão fica ainda mais importante."
    ],
    "q": "Qual plano é mais responsável para testar o novo serviço?",
    "answers": [
      "Gastar todo o caixa em propaganda antes de testar a ideia.",
      "Contratar muita gente e torcer para aparecerem clientes.",
      "Testar com poucos clientes, medir resultados e ajustar antes de ampliar."
    ],
    "correct": 2,
    "explain": "Um piloto pequeno permite aprender com menos risco e decidir o próximo passo com dados reais."
  }
];
const FINAL_QUESTIONS = [
  {
    "q": "A pesquisa mostrou que pequenos comerciantes perdem muito tempo controlando estoque. Qual deve ser o próximo passo?",
    "a": [
      "Criar a solução completa imediatamente, sem conversar com ninguém.",
      "Conversar com comerciantes e testar uma versão simples da solução.",
      "Comprar anúncios antes de saber se alguém quer o produto."
    ],
    "ok": 1,
    "why": "Você valida a necessidade antes de comprometer recursos importantes."
  },
  {
    "q": "A empresa vendeu bem, mas não tem dinheiro suficiente para pagar as contas desta semana. O que isso ensina?",
    "a": [
      "Vendas altas sempre significam dinheiro disponível.",
      "É melhor ignorar as datas das contas.",
      "É necessário acompanhar o fluxo de caixa, os custos e os prazos de recebimento."
    ],
    "ok": 2,
    "why": "O controle de caixa ajuda a empresa a pagar suas obrigações no momento certo."
  },
  {
    "q": "A Horizonte quer crescer sem prejudicar clientes e equipe. Qual caminho faz mais sentido?",
    "a": [
      "Ampliar aos poucos, medir resultados e ajustar processos.",
      "Aceitar todos os contratos, mesmo sem capacidade de entrega.",
      "Cortar todo treinamento para economizar no curto prazo."
    ],
    "ok": 0,
    "why": "Crescimento sustentável combina planejamento, qualidade, cuidado com as pessoas e aprendizado."
  }
];
