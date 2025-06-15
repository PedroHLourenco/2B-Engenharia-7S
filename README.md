# API de Gerenciamento de Tarefas

API RESTful para gerenciamento de tarefas com autenticação e autorização baseada em roles (usuário e administrador).

## 🚀 Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- bcryptjs

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB (local ou Atlas)
- NPM ou Yarn

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone [url-do-repositorio]
cd [nome-do-diretorio]
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/todo-list
JWT_SECRET=sua_chave_secreta_jwt_aqui
```

4. Inicie o servidor:

```bash
npm start
```

## 📚 Documentação da API

### Autenticação

#### Registrar Usuário Comum

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

#### Registrar Administrador

```http
POST /api/auth/register/admin
Content-Type: application/json

{
  "name": "Admin",
  "email": "admin@email.com",
  "password": "123456"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "123456"
}
```

### Tarefas

Todas as rotas de tarefas requerem autenticação. Inclua o token JWT no header:

```http
Authorization: Bearer seu_token_jwt_aqui
```

#### Listar Todas as Tarefas

```http
GET /api/tasks
```

#### Criar Nova Tarefa (Apenas Admin)

```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Implementar testes",
  "description": "Criar testes unitários para a API",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2024-03-30T23:59:59.999Z"
}
```

#### Atualizar Tarefa

```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "status": "IN_PROGRESS",
  "priority": "MEDIUM",
  "description": "Criar testes unitários e de integração"
}
```

#### Excluir Tarefa (Apenas Admin)

```http
DELETE /api/tasks/:id
```

## 📝 Modelos de Dados

### Usuário

```javascript
{
  name: String,
  email: String,
  password: String,
  role: String (enum: ["user", "admin"]),
  createdAt: Date
}
```

### Tarefa

```javascript
{
  title: String,
  description: String,
  status: String (enum: ["TODO", "IN_PROGRESS", "DONE"]),
  priority: String (enum: ["LOW", "MEDIUM", "HIGH"]),
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Níveis de Acesso

### Usuário Comum

- Visualizar todas as tarefas
- Atualizar tarefas existentes

### Administrador

- Todas as permissões do usuário comum
- Criar novas tarefas
- Excluir tarefas

## ⚠️ Respostas de Erro

A API retorna os seguintes códigos de status:

- 200: Sucesso
- 201: Criado com sucesso
- 400: Erro na requisição
- 401: Não autorizado
- 403: Acesso negado
- 404: Recurso não encontrado
- 500: Erro interno do servidor

## 🔄 Fluxo de Autenticação

1. Registre um usuário ou faça login
2. Receba o token JWT
3. Inclua o token no header `Authorization` de todas as requisições subsequentes
4. O token expira em 24 horas

## 🛠️ Estrutura do Projeto

```
src/
├── config/         # Configurações do projeto
├── controllers/    # Controladores da aplicação
├── middlewares/    # Middlewares (autenticação, etc)
├── models/         # Modelos do MongoDB
├── routes/         # Rotas da API
├── services/       # Lógica de negócios
└── server.js       # Arquivo principal
```

## 🔧 Scripts Disponíveis

- `npm start`: Inicia o servidor
- `npm run dev`: Inicia o servidor em modo desenvolvimento com nodemon
