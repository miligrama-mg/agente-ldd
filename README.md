# Agente de Diagnóstico — Lógica do Design®

Aplicação web para diagnóstico de presença digital nos 4 eixos do método LdD.

---

## Como fazer o deploy (passo a passo)

### 1. Criar conta no GitHub
Acesse https://github.com e crie uma conta gratuita.

### 2. Criar um repositório
- Clique em "New repository"
- Nome: `agente-ldd`
- Deixe como Public ou Private (ambos funcionam)
- Clique em "Create repository"

### 3. Fazer upload dos arquivos
- Na página do repositório, clique em "uploading an existing file"
- Arraste os 3 arquivos: `index.html`, `vercel.json` e a pasta `api/` com o arquivo `diagnostico.js`
- Clique em "Commit changes"

### 4. Criar conta na Vercel
Acesse https://vercel.com e faça login com sua conta do GitHub.

### 5. Importar o projeto
- Clique em "Add New Project"
- Selecione o repositório `agente-ldd`
- Clique em "Import"

### 6. Adicionar a chave de API (IMPORTANTE)
Antes de clicar em Deploy:
- Na tela de configuração, clique em "Environment Variables"
- Adicione:
  - **Name:** `ANTHROPIC_API_KEY`
  - **Value:** sua chave (começa com `sk-ant-...`)
- Clique em "Add"

### 7. Deploy
- Clique em "Deploy"
- Em ~2 minutos sua aplicação estará no ar
- A Vercel vai te dar um link tipo: `agente-ldd.vercel.app`

---

## Domínio personalizado (opcional)
Se quiser um link como `diagnostico.miligrama.mg`:
- Na Vercel, vá em Settings > Domains
- Adicione seu domínio
- Siga as instruções para apontar o DNS

---

## Custo estimado
- Hospedagem Vercel: **gratuita**
- API Anthropic: ~US$ 0,02 por diagnóstico (plano pay-as-you-go)
- 100 diagnósticos/mês ≈ US$ 2,00

---

## Estrutura do projeto
```
agente-ldd/
├── index.html          ← interface do agente
├── vercel.json         ← configuração de deploy
├── README.md           ← este arquivo
└── api/
    └── diagnostico.js  ← função que chama a API da Anthropic
```
