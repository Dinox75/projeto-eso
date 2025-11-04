# Sistema de Loja com Créditos — Desafio ESO

Este projeto foi desenvolvido para o processo seletivo da ESO (Poços de Caldas) e simula um sistema de economia simples, onde:

- Usuários podem se cadastrar e fazer login
- Recebem créditos iniciais
- Podem comprar itens cosméticos com esses créditos
- Possuem um inventário para armazenar as compras
- Podem devolver itens e recuperar créditos
- Todos os dados são armazenados em um banco relacional (MySQL)

A aplicação foi construída com **Python, Flask, SQLAlchemy e MySQL**.

---

## 🚀 Como rodar o projeto

### ✅ Pré-requisitos

- Python 3.10+
- MySQL / MySQL Workbench
- Git
- (Opcional) Thunder Client ou Postman

---

### 📥 1) Clonar o repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd projeto-eso
```

### 🏗️ 2) Criar e ativar ambiente virtual

```bash
python -m venv .venv
```

**Windows PowerShell:**

```bash
.\.venv\Scripts\Activate.ps1
```

**Windows CMD:**

```bash
.\.venv\Scripts\activate.bat
```

**Linux / macOS:**

```bash
source .venv/bin/activate
```

### 📦 3) Instalar dependências

```bash
pip install -r backend/requirements.txt
```

### 🗄️ 4) Configurar banco de dados MySQL

```sql
CREATE DATABASE IF NOT EXISTS eso_projeto;
USE eso_projeto;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    creditos INT DEFAULT 10000,
    avatar_url VARCHAR(255),
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cosmeticos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    preco INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    data_criado DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inventarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    cosmetico_id INT NOT NULL,
    data_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (cosmetico_id) REFERENCES cosmeticos(id)
);

INSERT INTO cosmeticos (nome, descricao, preco, tipo) VALUES
('Capacete Azul ESO', 'Capacete de segurança padrão técnico ESO', 300, 'capacete'),
('Colete de Campo ESO', 'Colete oficial de técnicos de manutenção', 500, 'roupa'),
('Botina Impermeável', 'Calçado especial para áreas molhadas', 350, 'calçado'),
('Óculos Futurista', 'Óculos neon', 500, 'oculos'),
('Luvas AntiVazamento', 'Luvas para manuseio em tubulações', 250, 'acessorio'),
('Uniforme Azul ESO', 'Uniforme completo com logo ESO', 800, 'roupa');
```

### 🔧 5) Configurar conexão MySQL

No arquivo `backend/models.py`:

```python
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:SUA_SENHA@localhost:3306/eso_projeto"
```
Substitua `SUA_SENHA` pela sua senha do MySQL.

### ▶️ 6) Executar aplicação

```bash
cd backend
python app.py
```
A API estará disponível em:
http://127.0.0.1:5000

## 📡 API Endpoints

### Autenticação

| Método | Endpoint         | Descrição         |
|--------|------------------|-------------------|
| GET    | /                | Healthcheck       |
| POST   | /register        | Criar usuário     |
| POST   | /login           | Login             |

### Loja

| Método | Endpoint               | Descrição               |
|--------|------------------------|-------------------------|
| GET    | /loja/listar          | Listar itens disponíveis|
| POST   | /loja/comprar         | Comprar item            |
| POST   | /loja/devolver        | Devolver item           |
| GET    | /inventario/<id>      | Ver inventário do usuário|

## 📚 Sobre o Desenvolvimento

Este projeto demonstra competências em:

- Desenvolvimento Backend com Python/Flask
- APIs RESTful
- Banco de Dados Relacionais (MySQL)
- ORM (SQLAlchemy)
- Boas práticas e Clean Code
- Versionamento com Git

## 📘 Aprendizado e Uso de IA

Durante o desenvolvimento, utilizei o ChatGPT (OpenAI) como ferramenta de apoio educacional para:

- Esclarecer dúvidas
- Estruturar etapas
- Revisar código
- Entender boas práticas

Todo o código foi escrito manualmente, entendendo cada parte da lógica. A IA foi usada como mentora de estudo, não como substituição do processo de desenvolvimento.

Essa prática reflete o uso moderno e responsável de ferramentas tecnológicas no aprendizado profissional.

## 🛠️ Stack Tecnológica

- Python 3.10+
- Flask
- SQLAlchemy
- MySQL
- Thunder Client / Postman
- Git & GitHub
- VS Code

## 👤 Autor

**Vinicius Lima**

Estudante de Desenvolvimento de Sistemas

Poços de Caldas — MG

Email: [vibylima75@gmail.com](mailto:vibylima75@gmail.com)

LinkedIn: [Vinicius Lima](https://www.linkedin.com/in/vinicius-lima-b98100308/)

GitHub: [Dinox75](https://github.com/Dinox75)