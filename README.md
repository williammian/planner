# Planner

Planner é uma aplicação web responsiva para o controle de atendimentos em uma clínica. Utiliza tecnologias modernas no back-end e front-end para oferecer uma experiência eficiente e intuitiva.

## Tecnologias Utilizadas

### Back-end:
- Java com Spring Boot
- JPA (Java Persistence API)
- JdbcTemplate
- Validações
- Paginação
- JUnit para testes
- Banco de dados MySQL

### Front-end:
- React com TypeScript
- React Bootstrap para estilização
- Axios para requisições HTTP
- Context API para gerenciamento de estado

## Estrutura do Projeto

- **planner-api**: Contém o código-fonte do back-end desenvolvido com Spring Boot.
- **planner-front**: Contém o código-fonte do front-end desenvolvido com React e TypeScript.

## Funcionalidades

- Cadastro e gerenciamento de pacientes.
- Agendamento de consultas.
- Listagem e filtragem de atendimentos.
- Validações de dados no back-end e front-end.
- Paginação de resultados para melhor performance.

## Como Executar o Projeto

### Pré-requisitos:
- Java 11 ou superior instalado.
- Node.js 14 ou superior instalado.
- Banco de dados MySQL configurado.

### Passos:

1. **Configuração do Back-end:**
   - Navegue até o diretório `planner-api`.
   - Configure as credenciais do banco de dados no arquivo `application.properties`.
   - Execute o comando `mvn spring-boot:run` para iniciar o servidor.

2. **Configuração do Front-end:**
   - Navegue até o diretório `planner-front`.
   - Execute o comando `npm install` para instalar as dependências.
   - Execute o comando `npm start` para iniciar o aplicativo.

O aplicativo estará disponível em `http://localhost:3000`.

## Licença

Este projeto está licenciado sob a licença MIT.

