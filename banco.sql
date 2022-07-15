-- Criar um banco de dados chamado pessoas_api	

-- Criar a tabela pessoas

create table Editora (
codigo serial not null primary key, 
descricao varchar(50) not null);

-- inserir alguns registros
insert into Editora (descricao) values ('Azul'),('Record');