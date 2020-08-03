# TechChallenge-CaioCanoas

Criando um chatbot com a api do Telegram para otimizar o comunicação entre o Carrefour e seus clientes.

## Gerando um token

- Abra seu app do Telegram, busque por: @BotFather e clique sobre ele;
- Envie o comando: /newbot;
- Insira um nome para o seu bot;
- Insira um username. ...
- Feito isso, você receberá um Token.

## Dialogflow

- Crie um agent no Google Cloud Platform;
- Crie as suas intents do dialogflow;
- Deixe a intent de fallback sem respostas (para não mandar nada quando alguma das opções for escolhida);
- Adicione as chaves de identificação no arquivo dialogflowKeys.JSON.

## Funcionamento do Bot

- Insira seu token no local indicado no arquivo index.js;
- Abra um terminal na pasta do projeto;
- Escreva o comando "node index.js";
- Vá até a conversa com o seu bot e clique em "Começar".
