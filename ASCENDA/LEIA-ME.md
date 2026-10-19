# ASCENDA — Meu primeiro dia · versão com arte aprovada

Jogo acadêmico em português sobre empresas e cibersegurança. A ASCENDA é fictícia e não representa a estrutura real da CrowdStrike.

## Abrir e publicar

Para experimentar individualmente, extraia o ZIP e abra `index.html` dentro da pasta do ASCENDA. Mantenha todos os arquivos e a pasta `assets` juntos. Não é necessário instalar programas nem compilar.

Para disponibilizar para a turma na Netlify: abra https://app.netlify.com/drop, entre na sua conta se solicitado e arraste a pasta do ASCENDA, que contém `index.html`. O endereço HTTPS gerado abre o jogo para os colegas.

Para jogar vendo os colegas: o apresentador abre **Sala da turma → Criar sala como apresentador**, copia o link que contém `?sala=...` e envia aos colegas. Os colegas escolhem nome/aparência e entram. O apresentador precisa manter a aba e o computador abertos. Crie a sala na hora da apresentação: o código é temporário. O endereço do site sem o código sempre permite jogar individualmente.

## O que foi aplicado

- Fachada aprovada com o nome ASCENDA, com um único L.
- Três cenários internos aprovados: térreo, 1º andar e 2º andar.
- Os 12 NPCs e a mentora Valentina, extraídos como sprites próprios, com retratos nos diálogos.
- Oito cabelos, seis cores de cabelo, seis tons de pele, seis roupas e cinco combinações de acessórios.
- Caminhada com quadros de braços e pernas para frente, costas, direita e esquerda; a esquerda espelha os sprites laterais. Oito quadros laterais, ciclo frontal e traseiro de quatro fases. Há poses separadas para quando o personagem para.
- A roupa e o cabelo escolhidos acompanham o movimento. Os colegas também recebem direção, aparência e indicação de caminhada pela rede.
- Navegação por clique/toque com busca de caminho, colisões, portas, elevador, zoom e câmera que acompanha o personagem quando aproximada.
- Conversas, perguntas, caderno, progresso local, desafio com Valentina e crachá de conclusão em PNG.

Os estilos da prancha foram adaptados a sprites para o jogo. O cenário é uma imagem de fundo e usa uma malha de navegação ajustada às áreas livres; não é um ambiente 3D. Alguns elementos de vidro passam à frente dos personagens para dar profundidade.

## Controles

- **WASD / setas**: andar.
- **Clique ou toque no chão**: encontrar um caminho até o ponto.
- **Clique em um NPC** ou no nome dele na coluna esquerda: caminhar até ele e abrir a conversa.
- **E / espaço / Interagir**: conversar perto de uma pessoa, usar elevador ou atravessar entrada/saída.
- **Botões dos andares**: atalhos de elevador após entrar pela primeira vez.
- **+ / −**: zoom. **⌖**: mostrar o mapa completo.
- **♙**: editar seu personagem sem apagar as descobertas.
- **♫**: efeitos de passos e de conclusão de descobertas.
- No celular, use os controles direcionais de toque e o zoom. O mapa completo fica menor em telas estreitas; aproxime para explorar.

## Percurso para a apresentação

1. Personalize o estagiário e entre no prédio.
2. Térreo: Lia na recepção, Bia no RH, Caio em finanças e Davi no comercial.
3. 1º andar: Ravi no SOC, Nina em inteligência, Ivo na infraestrutura e Helena em GRC.
4. 2º andar: Luna em AppSec, Theo no Red Team, Yasmin em Cloud e Marina na direção.
5. Depois das 12 descobertas, entre na sala de integração central do 2º andar e converse com Valentina para fazer a primeira missão.

Reserve aproximadamente 15–25 minutos conforme o ritmo de leitura. Cada jogador tem seu próprio percurso; ninguém precisa esperar os demais responderem.

## Conteúdo acadêmico

Os diálogos são paráfrases didáticas do capítulo “Focalizando o novo negócio”, de Chiavenato, fornecido para o trabalho. Abordam conceito e tipos de empresa, objetivos, recursos, stakeholders, oportunidades, escolha do negócio, pequenas empresas, porte e crescimento. As áreas de segurança contextualizam esses conceitos na empresa fictícia.

Os 60 empregados, cargos e valores financeiros são exemplos narrativos. A classificação de porte apresentada na conversa com Marina é explicitamente a tabela histórica do capítulo, sem se apresentar como definição legal atual. As leis e limites tributários antigos do material não são ensinados como regras vigentes. O crachá de conclusão é uma lembrança acadêmica, não uma certificação profissional.

## Sala da turma: funcionamento e limites

O modo em grupo usa PeerJS 1.5.5/WebRTC com sinalização pública PeerJS. A aba do apresentador retransmite apenas nomes escolhidos, aparências, posições, direção e estado de movimento. Não usa câmera, microfone, chat nem acesso aos arquivos dos visitantes. Os nomes ficam visíveis aos integrantes; é possível usar apelidos.

Foi verificada uma conexão real entre duas abas, com personagens diferentes e posições sincronizadas. O limite do código é de 40 participantes, mas **não houve teste de carga com 34 pessoas**. Isso não é garantia de capacidade. Firewalls, NAT e bloqueios de WebRTC da faculdade podem impedir a comunicação; não foi configurado TURN dedicado. Ensaie na rede da apresentação e mantenha o link individual como alternativa. Se a sala cair, o jogo individual continua.

## Verificação

- Verificação de sintaxe dos arquivos JavaScript.
- Teste das rotas nos quatro mapas, com pontos de chegada e destinos acessíveis.
- Teste do movimento usando o laço real de quadros: entrada, 12 NPCs, abertura automática de conversas e mentora.
- Teste das perguntas, descobertas, missão final e validação das mensagens de rede.
- Renderização de 384 combinações de cabelo/roupa/direção, incluindo pose parada e caminhada.
- Conferência no navegador: personalização, aparência em movimento, entrada, conversa, pergunta, registro no caderno, troca de andar, retratos e conexão entre duas abas.

## Arquivos

`index.html`, `style.css`, `content.js`, `maps.js`, `art.js`, `game.js`: código sem framework nem etapa de build. `assets`: mapas e sprites locais. As imagens com sufixo `referencia` documentam os visuais aprovados; a personalização pode exibi-las como catálogo.

`vendor/peerjs.min.js`: biblioteca PeerJS sob licença MIT. Projeto: https://github.com/peers/peerjs . Demais artes foram geradas e adaptadas nesta conversa para o projeto.

Publicação Netlify: https://docs.netlify.com/deploy/create-deploys/ . PeerJS: https://peerjs.com/client/getting-started .
