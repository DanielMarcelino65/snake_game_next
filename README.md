# 🐍 Snake Game Next

Este projeto é uma implementação do clássico jogo da cobrinha utilizando **Next.js** e **React**. O objetivo é proporcionar uma experiência nostálgica com uma interface moderna e responsiva.

## 🎮 Demonstração

Acesse o jogo em produção: [https://snake-game-next.vercel.app](https://snake-game-next.vercel.app)

## 🛠 Tecnologias Utilizadas

- **Next.js** – Framework React para aplicações modernas
- **React** – Biblioteca para construção de interfaces
- **TypeScript** – Tipagem estática para maior segurança
- **CSS Modules** – Estilização escopada por componente

## 📁 Estrutura do Projeto

```
snake_game_next/
├── public/             # Arquivos estáticos
├── src/
│   ├── components/     # Componentes React reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   ├── styles/         # Arquivos de estilização
│   └── utils/          # Funções utilitárias
├── .eslintrc.json      # Configuração do ESLint
├── .gitignore          # Arquivos ignorados pelo Git
├── README.md           # Documentação do projeto
├── next.config.js      # Configuração do Next.js
├── package.json        # Scripts e dependências
├── tsconfig.json       # Configuração do TypeScript
└── yarn.lock           # Lockfile do Yarn
```

## 🚀 Como Executar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/DanielMarcelino65/snake_game_next.git
```

2. Acesse a pasta do projeto:

```bash
cd snake_game_next
```

3. Instale as dependências:

```bash
yarn install
```

4. Inicie o servidor de desenvolvimento:

```bash
yarn dev
```

5. Acesse no navegador:

```
http://localhost:3000
```

## 🕹️ Como Jogar

- O jogo inicia automaticamente ao carregar a página.
- **Setas direcionais do teclado** controlam a cobra:
  - ↑ Cima
  - ↓ Baixo
  - ← Esquerda
  - → Direita
- Ao colidir nas paredes, você aparecerá do lado contrário do tabuleiro. Cuidado, no final isso pode ser seu calcanhar de aquiles.

## 📈 Pontuação

- Cada alimento coletado adiciona 1 pontos.
- A pontuação atual é exibida no canto da tela.

## 🎨 Personalização

Você pode alterar cores, tamanho do grid ou velocidade da cobra em arquivos de configuração ou dentro dos componentes.

## 🤝 Contribuições

Contribuições são bem-vindas! Se você tiver sugestões de melhoria, encontrar bugs ou quiser colaborar, fique à vontade para abrir uma issue ou pull request.

## 📜 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
