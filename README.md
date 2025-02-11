# 🚀 GitHub Explorer - Teste Técnico

## 📖 Sobre o Projeto

O **GitHub Explorer** é uma aplicação React que permite buscar e visualizar repositórios do GitHub, exibindo informações detalhadas como quantidade de estrelas ⭐, forks 🍴, issues abertas 🐞 e detalhes do repositório. O projeto segue boas práticas de programação e arquitetura, garantindo um código limpo e escalável.

---

## 📌 **Tecnologias Utilizadas**

- **React.js** ⚛️ - Biblioteca para construção da interface do usuário
- **TypeScript** 📜 - Tipagem estática para melhor segurança e manutenção do código
- **React Router** 🚏 - Navegação entre páginas
- **TailwindCSS** 🎨 - Estilização moderna e responsiva
- **SWR** 🔄 - Gerenciamento de cache e requisições assíncronas
- **Vite.js** ⚡ - Build tool para otimização do desenvolvimento
- **Zustand** 🏪 - Gerenciamento de estado global
- **React Icons** 🎨 - Ícones estilizados para UI

---

## ⚙️ **Setup do Projeto**

### **1️⃣ Requisitos**

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 16 ou superior)
- npm ou yarn

### **2️⃣ Clonando o Repositório**

```bash
 git clone https://github.com/seu-usuario/github-explorer.git
 cd github-explorer
```

### **3️⃣ Instalando Dependências**

```bash
npm install
# ou
yarn install
```

### **4️⃣ Rodando o Projeto**

```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em `http://localhost:5173`

---

## 📂 **Estrutura do Projeto**

```
📂 src/
 ├── components/        # Componentes reutilizáveis
 │   ├── Tabs.tsx       # Controle de abas para repositórios e favoritos
 │   ├── SearchBar.tsx  # Barra de pesquisa
 │   ├── RepoCard.tsx   # Cartão de repositório
 │
 ├── pages/             # Páginas da aplicação
 │   ├── Home.tsx       # Página inicial
 │   ├── RepositoryDetails.tsx # Página de detalhamento do repositório
 │
 ├── services/          # Integração com a API do GitHub
 │   ├── githubApi.ts   # Hooks personalizados para chamadas à API
 │
 ├── store/             # Gerenciamento de estado global (Zustand)
 │   ├── useRepoStore.ts      # Estado global para repositórios
 │   ├── useSearchStore.ts    # Estado global para pesquisa
 │
 ├── interfaces/        # Interfaces TypeScript para tipagem segura
 │   ├── IRepository.ts # Interface para repositórios
 │   ├── IIssue.ts      # Interface para issues
 │
 ├── utils/             # Funções auxiliares
 ├── styles/            # Estilos globais
 ├── main.tsx           # Ponto de entrada da aplicação
 ├── App.tsx            # Configuração de rotas
```

---

## 🛠️ **Como Funciona?**

### **🔍 Busca de Repositórios**

1. Digite o nome do usuário ou organização no campo de busca
2. Os repositórios são listados com informações como estrelas, forks e linguagem principal

### **📄 Detalhamento do Repositório**

- Mostra descrição, estatísticas e lista de issues abertas
- Possui um botão para acessar diretamente o repositório no GitHub
- Exibe avatar do repositório
- Lista as últimas issues abertas

---

## 📝 **Padrão de Commits e Branches**

### **🔹 Branching Strategy**

- `main` → Código estável e pronto para produção
- `develop` → Desenvolvimento ativo
- `feature/*` → Implementação de novas funcionalidades

### **🔹 Commits Semânticos**

Os commits seguem o padrão:

```bash
feat: adiciona funcionalidade de busca por repositórios
fix: corrige erro ao carregar issues
refactor: refatora componente RepoCard
```

---

## 🔎 **Boas Práticas Utilizadas**

✅ **SOLID** → Código modular e de fácil manutenção
✅ **KISS (Keep It Simple, Stupid)** → Implementação clara e objetiva
✅ **YAGNI (You Aren’t Gonna Need It)** → Apenas funcionalidades essenciais
✅ **DRY (Don't Repeat Yourself)** → Reutilização de código ao máximo
✅ **Acessibilidade** → Estruturas e estilos otimizados para UX/UI

---

## 📌 **Observações**

- O código foi comentado para facilitar o entendimento
- O projeto segue um fluxo bem organizado para facilitar contribuições futuras
- Feedbacks e sugestões são bem-vindos! 😃

---

## 💡 **Considerações Finais**

Este projeto foi desenvolvido para demonstrar boas práticas de desenvolvimento e organização de código. Ele é facilmente escalável e pode ser expandido para novas funcionalidades.

📩 **Dúvidas ou sugestões?** Entre em contato! 🚀
