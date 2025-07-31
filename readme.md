# Equip Manager Backend

## Descrição

O **Equip Manager Backend** é uma API RESTful desenvolvida em Node.js com Express, projetada para gerenciar usuários, equipamentos e empréstimos. A API permite o registro e login de administradores, gerenciamento de equipamentos (CRUD), criação e acompanhamento de empréstimos, e gerenciamento de usuários. Ela utiliza um banco de dados PostgreSQL com Sequelize como ORM, autenticação via JWT, upload de imagens com Multer, e documentação da API com Swagger/OpenAPI.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção da API.
- **Sequelize**: ORM para interação com banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional.
- **JWT (jsonwebtoken)**: Autenticação baseada em tokens.
- **Bcrypt**: Hashing de senhas para segurança.
- **Multer**: Upload de arquivos (imagens de equipamentos).
- **Nodemailer**: Envio de e-mails.
- **Zod**: Validação de dados.
- **Swagger-UI-Express e YAMLjs**: Documentação da API.
- **CORS**: Suporte a requisições cross-origin.
- **Nodemon**: Ferramenta de desenvolvimento para reinício automático do servidor.

## Pré-requisitos

- **Node.js** (v18 ou superior)
- **PostgreSQL** (v13 ou superior)
- **NPM** (v8 ou superior)

## Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/vitordealbs/equipmentmanager
   cd equipmentmanager
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:

   Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`. Exemplo de conteúdo:

   ```env
   PORT=8080
   JWT_SECRET="ajsbdkajsbdkjabdskjasbd"
   URL_SITE="http://localhost:3000"
   EMAIL_USER="lucas@email.com"
   EMAIL_PASS="..."
   DB_NAME=""
   DB_USER=""
   DB_PASSWORD=""
   DB_HOST=""
   DB_PORT=""
   ```

   ```
   - `DB_*`: Configurações do banco de dados PostgreSQL.
   - `JWT_SECRET`: Chave secreta para geração de tokens JWT.
   - `EMAIL_*`: Credenciais para envio de e-mails.
   - `PORT`: Porta onde o servidor será executado.
   - `URL_SITE`: URL para indicar onde o site está hospedado - importante para envio de email.
   ```

## Executando o Projeto

1. **Modo de desenvolvimento**:

```bash
npm run dev
```

O servidor será iniciado em `http://localhost:8080`.

2. **Acesse a documentação da API**:

   A documentação OpenAPI está disponível em:

   ```
   http://localhost:8080/api-docs
   ```

   Use o Swagger UI para explorar os endpoints, testar requisições e visualizar os schemas.

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```plaintext
equipmentmanager/
├── src/
│   ├── config/                  # Configurações da aplicação
│   │   ├── auth.js              # Configurações de autenticação (JWT)
│   │   ├── database.js          # Configuração do banco de dados (Sequelize)
│   │   └── swagger.js           # Configuração do Swagger para documentação
│   ├── controllers/             # Lógica dos endpoints
│   │   ├── admController.js     # Controladores para administradores
│   │   ├── authController.js    # Controladores para autenticação
│   │   ├── equipmentController.js # Controladores para equipamentos
│   │   ├── loanController.js    # Controladores para empréstimos
│   │   └── userController.js    # Controladores para usuários
│   ├── middlewares/             # Middlewares da aplicação
│   │   ├── authMiddleware.js    # Middleware de autenticação JWT
│   │   ├── errorHandler.js      # Middleware de tratamento de erros
│   │   ├── upload.js            # Middleware para upload de arquivos com Multer
│   │   └── userTokenMiddleware.js # Middleware para validação de tokens de usuário
│   ├── models/                  # Modelos do Sequelize
│   │   ├── adm.js               # Modelo para administradores
│   │   ├── equipment.js         # Modelo para equipamentos
│   │   ├── index.js             # Configuração e exportação dos modelos
│   │   ├── loan.js              # Modelo para empréstimos
│   │   └── user.js              # Modelo para usuários
│   ├── resources/               # Recursos estáticos
│   │   └── imagens/             # Diretório para armazenamento de imagens
│   ├── routes/                  # Definição das rotas da API
│   │   ├── admRoutes.js         # Rotas para administradores
│   │   ├── authRoutes.js        # Rotas para autenticação
│   │   ├── equipmentRoutes.js   # Rotas para equipamentos
│   │   ├── index.js             # Agregador de todas as rotas
│   │   ├── loanRoutes.js        # Rotas para empréstimos
│   │   └── userRoutes.js        # Rotas para usuários
│   ├── services/                # Lógica de negócio
│   │   ├── emailService.js      # Serviço para envio de e-mails
│   │   ├── equipmentService.js  # Serviço para gerenciamento de equipamentos
│   │   ├── loanService.js       # Serviço para gerenciamento de empréstimos
│   │   └── userService.js       # Serviço para gerenciamento de usuários
│   ├── utils/                   # Utilitários
│   │   └── errorHandler.js      # Funções utilitárias para tratamento de erros
│   ├── validations/             # Validações com Zod
│   │   ├── equipmentValidation.js # Validações para equipamentos
│   │   ├── registerValidation.js # Validações para registro de administradores
│   │   └── userValidation.js    # Validações para usuários
│   └── server.js                # Ponto de entrada da aplicação
├── apiSwagger.yaml              # Especificação OpenAPI da API
├── package.json                 # Dependências e scripts
├── readme.md                    # Documentação do projeto
├── .env.example                 # Exemplo de arquivo de variáveis de ambiente
└── .gitignore                   # Arquivos e pastas ignorados pelo Git
```

## Endpoints Principais

A API é dividida em três grupos principais de endpoints:

1. **Autenticação**:

   - `POST /register`: Registro de administradores.
   - `POST /login`: Login de administradores com JWT.
   - `GET /me`: Obter dados do administrador autenticado.

2. **Equipamentos**:

   - `GET /equipments`: Listar todos os equipamentos.
   - `POST /equipments`: Cadastrar um novo equipamento (com upload de imagem).
   - `GET /equipments/{id}`: Obter equipamento por ID.
   - `PUT /equipments/{id}`: Atualizar equipamento.
   - `DELETE /equipments/{id}`: Excluir equipamento.

3. **Empréstimos**:

   - `POST /loan`: Criar um novo empréstimo.
   - `GET /loan`: Listar todos os empréstimos.
   - `GET /loan/{id}`: Obter empréstimo por ID.
   - `PUT /loan/{id}`: Atualizar status do empréstimo (realizar devolução).
   - `DELETE /loan/{id}`: Excluir empréstimo.
   - `GET /loan/user/{token}`: Listar empréstimos de um usuário por token.
   - `GET /loan/user/{id}/{token}`: Obter empréstimo específico de um usuário.

4. **Usuários**:
   - `GET /users`: Listar todos os usuários.
   - `POST /users`: Criar um novo usuário.
   - `GET /users/{id}`: Obter usuário por ID.
   - `PUT /users/{id}`: Atualizar dados de um usuário.
   - `DELETE /users/{id}`: Excluir usuário.

Consulte a documentação em `/api-docs` para detalhes completos, incluindo schemas, parâmetros e respostas.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com Nodemon.

## Dependências

### Produção

- `bcrypt` e `bcryptjs`: Para hashing de senhas.
- `cors`: Para suporte a requisições cross-origin.
- `dotenv`: Para carregar variáveis de ambiente.
- `express`: Framework da API.
- `jsonwebtoken`: Para autenticação com JWT.
- `multer`: Para upload de arquivos.
- `nodemailer`: Para envio de e-mails.
- `pg`: Driver do PostgreSQL.
- `sequelize`: ORM para PostgreSQL.
- `swagger-ui-express` e `yamljs`: Para documentação OpenAPI.
- `zod`: Para validação de dados.

### Desenvolvimento

- `nodemon`: Reinício automático do servidor durante o desenvolvimento.
