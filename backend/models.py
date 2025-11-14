#backend/models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    '''Inicializa a conexão com o banco MySQL'''
    app.config['SQLALCHEMY_DATABASE_URI'] = ('mysql://root:iJhTCDjGMLbRFwuuKJdQEROEJvzLllIV@caboose.proxy.rlwy.net:11698/railway')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

class User(db.Model):
    __tablename__ = 'usuarios'  #Ligando com a tabela usuarios no banco de dados
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    senha = db.Column(db.String(100), nullable=False)
    creditos = db.Column(db.Integer, default=10000)
    avatar_url = db.Column(db.String(255), nullable=True)
    data_cadastro = db.Column(db.DateTime, default=db.func.current_timestamp())


class Cosmetico(db.Model):
    __tablename__ = 'cosmeticos'  #Ligando com a tabela cosmeticos no banco de dados

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text(), nullable=True)
    preco = db.Column(db.Integer, nullable=False)
    tipo = db.Column(db.String(50), nullable=False) 
    ativo = db.Column(db.Boolean, default=True)
    raridade = db.Column(db.String(50), nullable=True)
    imagem_url = db.Column(db.String(255), nullable=True)
    data_inclusao = db.Column(db.DateTime, default=db.func.current_timestamp())
    data_criado = db.Column(db.DateTime, default=db.func.current_timestamp())


class Inventario(db.Model):
    __tablename__ = 'inventarios'  #Ligando com a tabela inventarios no banco de dados

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    cosmetico_id = db.Column(db.Integer, db.ForeignKey('cosmeticos.id'), nullable=False)
    data_compra = db.Column(db.DateTime, default=db.func.current_timestamp())

    usuario = db.relationship('User', backref=db.backref('inventario', lazy=True))
    cosmetico = db.relationship('Cosmetico', backref=db.backref('inventario', lazy=True))

class Transacao(db.Model):
    __tablename__ = 'transacoes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    cosmetico_id = db.Column(db.Integer, db.ForeignKey('cosmeticos.id'), nullable=False)
    tipo_operacao = db.Column(db.String(20), nullable=False)  # 'compra' ou 'devolucao'
    valor = db.Column(db.Integer, nullable=False)
    data_hora = db.Column(db.DateTime, default=db.func.current_timestamp())

    usuario = db.relationship('User', backref=db.backref('transacoes', lazy=True))
    cosmetico = db.relationship('Cosmetico', backref=db.backref('transacoes', lazy=True))
