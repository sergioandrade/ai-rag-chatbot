# Chatbot com RAG usando OpenAI

Este projeto implementa uma **API de RAG (Retrieval Augmented Generation)** capaz de responder perguntas de usuários utilizando **exclusivamente** conteúdos recuperados de um **Vector DB (IDS)**.

A solução foi pensada como um **MVP**, com foco em:

* Simplicidade
* Clareza de código
* Separação de responsabilidades
* Facilidade de evolução futura

---

## Por que Node.js com Fastify

A escolha por **Node.js com Fastify** foi motivada pelo fato de **JavaScript ser a linguagem na qual tenho mais experiência**. Isso permitiu direcionar o esforço para os pontos mais relevantes, como **arquitetura, organização do código e clareza da solução**, sem dispersão com detalhes específicos de linguagem ou framework.

O **Fastify** foi escolhido por ser:

* Leve e performático
* Simples de configurar
* Amplamente utilizado em projetos Node modernos, especialmente considerando que o Express já não é mais a principal escolha nesse ecossistema

---

## Como rodar o projeto

O projeto está totalmente configurado para execução via **Docker Compose**.

Copie o arquivo `env.example` e renomeie para `.env`, adicione os valoreas às variáveis que estão lá presentes.
Após configurar as variáveis de ambiente no arquivo `.env`, basta executar:

```
docker compose up app-dev
```

Nesse processo, o Docker:

* Sobe o ambiente de desenvolvimento
* Instala as dependências
* Inicia a API automaticamente

Após a inicialização, a aplicação estará disponível em:

```
http://localhost:3333
```

A documentação da API pode ser acessada via **Swagger**, utilizando o **Scalar**, em:

```
http://localhost:3333/api-docs
```

Não é necessário nenhum passo adicional para rodar ou testar a aplicação.

Neste projeto, foi adotado o Recurso de Transferência (Opção 2) para permitir escalonamento automático de atendimento humano quando necessário.
