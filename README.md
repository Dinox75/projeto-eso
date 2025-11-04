# Sistema de Loja com Créditos — Desafio ESO

Este projeto foi desenvolvido para o processo seletivo da ESO (Poços de Caldas) e simula um sistema de economia simples, onde:

- Usuários podem se cadastrar e fazer login
- Recebem créditos iniciais
- Podem comprar itens cosméticos com esses créditos
- Possuem um inventário para armazenar as compras
- Podem devolver itens e recuperar créditos
- Todos os dados são armazenados em banco relacional (MySQL)

A aplicação foi construída com Python, Flask, SQLAlchemy e MySQL.

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
cd Projeto-ESO
```

🏗️ 2) Criar e ativar ambiente virtual

Criar o venv:
```bash
python -m venv .venv
```

Ativar (Windows PowerShell):
```powershell
.\.venv\Scripts\Activate.ps1
```

Ativar (Windows CMD):
```cmd
.\.venv\Scripts\activate.bat
```

Ativar (Linux / macOS):
```bash
source .venv/bin/activate
```

📦 3) Instalar dependências

```bash
pip install -r backend/requirements.txt
```

🗄️ 4) Configurar banco de dados MySQL

No MySQL Workbench (ou outro cliente), crie o banco e as tabelas:

```sql
CREATE DATABASE IF NOT EXISTS eso_projeto;
USE eso_projeto;
```

Criar tabelas:

```sql
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

CREATE TABLE IF NOT EXISTS inventario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    cosmetico_id INT NOT NULL,
    data_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (cosmetico_id) REFERENCES cosmeticos(id)
);
```

Inserir itens da loja:

```sql
INSERT INTO cosmeticos (nome, descricao, preco, tipo) VALUES
('Capacete Azul ESO', 'Capacete de segurança padrão técnico ESO', 300, 'capacete'),
('Colete de Campo ESO', 'Colete oficial de técnicos de manutenção', 500, 'roupa'),
('Botina Impermeável', 'Calçado especial para áreas molhadas', 350, 'calçado'),
('Óculos Futurista', 'Óculos neon', 500, 'oculos'),
('Luvas AntiVazamento', 'Luvas para manuseio em tubulações', 250, 'acessorio'),
('Uniforme Azul ESO', 'Uniforme completo com logo ESO', 800, 'roupa');
```

🔧 5) Ajustar conexão MySQL no código

No arquivo `backend/models.py` (ou onde a aplicação configura o SQLAlchemy), atualize a URI:

```python
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:SUA_SENHA@localhost:3306/eso_projeto"
```

Troque `SUA_SENHA` pela senha do seu MySQL. Se o usuário ou host forem diferentes, ajuste conforme necessário.

▶️ 6) Rodar a aplicação

```bash
cd backend
python app.py
```

A aplicação estará disponível em:
http://127.0.0.1:5000

---

## 📚 Sobre o Desenvolvimento e Aprendizado

Este projeto foi desenvolvido como parte do processo seletivo da ESO para vaga de estágio e também como exercício prático para consolidar conhecimentos em:

- Python e Flask
- APIs REST
- Banco de Dados MySQL
- ORM com SQLAlchemy
- Boas práticas de desenvolvimento
- Estruturação de um projeto real do zero

Durante o desenvolvimento utilizei documentação, fóruns, vídeos e materiais técnicos, além do apoio do ChatGPT (OpenAI) como ferramenta de suporte e apoi educacional. A IA foi usada como mentoria e apoio ao estudo — para esclarecer conceitos, ajudar a estruturar tarefas, revisar lógicas e identificar erros — mas cada parte do sistema foi implementada manualmente por mim, linha a linha.

Meu objetivo foi aprender de verdade, construir algo funcional com responsabilidade e ética, e demonstrar capacidade de evolução e aplicação de novos conhecimentos.

---

