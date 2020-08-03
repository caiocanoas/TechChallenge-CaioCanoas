const TelegramBot = require('node-telegram-bot-api')
const dialogflow = require('./dialogflow')

const token = 'Insira qui o token do seu Telegram Bot'

const bot = new TelegramBot(token, {polling: true})

const opcoes = {
    "keyboard": [["Buscar um produto", "Descobrir ofertas próximas"],
    ["Acompanhar meu pedido", "Redes Sociais Carrefour"]]
}

const sociais = {
    "keyboard": [["Facebook", "Twitter"], ["YouTube", "Instagram"]]
}

bot.onText(/\/start/, (msg) => {
    
    bot.sendMessage(msg.chat.id, "Olá " + msg.from.first_name + 
    ". Eu sou o ajudante do Carrefour e estou aqui para te ajudar. Por favor, escolha uma das opções", 
    { "reply_markup": opcoes })
})

bot.on('message', async function (msg) {
    const chatId = msg.chat.id
    console.log(msg.text)
    
    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text)

    let responseText = dfResponse.text

    bot.sendMessage(chatId, responseText)
    
    const buscar = "Buscar um produto"
    if(msg.text.indexOf(buscar) === 0) {
        bot.sendMessage(chatId, "Que legal! É só digitar o produto que deseja pesquisar e eu vou te mandar o link")
        .then(bot.once('message', (msg) => {
            let produto = msg.text.toLowerCase().replace(/ /g, "%20")
            bot.sendMessage(chatId, `Certo! Dê uma olhada aqui: https://busca.carrefour.com.br/busca?q=${produto}`,
            { "reply_markup": opcoes })
        }))
    }

    const ofertas = "Descobrir ofertas próximas"
    if(msg.text.indexOf(ofertas) === 0) {
        bot.sendMessage(chatId, "Ótimo, " + msg.from.first_name +
        "! Verifique as melhores ofertas perto de você aqui!\nhttps://www.carrefour.com.br/institucional/ofertas-das-lojas?crfimt=hm-tlink|carrefour|menu|servicos|ofertas-das-lojas|1")
    }

    const pedido = "Acompanhar meu pedido"
    if(msg.text.indexOf(pedido) === 0) {
        bot.sendMessage(chatId, "É muito fácil acompanhar os seus pedidos, " + 
        msg.from.first_name +
        ", basta clicar aqui e fazer o seu login! \nhttps://www.carrefour.com.br/minha-conta/meus-pedidos")
    }

    const redes = "Redes Sociais Carrefour"
    if(msg.text.indexOf(redes) === 0) {
        bot.sendMessage(chatId, "Beleza!\nEm qual rede social você deseja encontrar o Carrefour?\nEscolha entre as opções abaixo", 
        { "reply_markup":  sociais })
        .then(
            bot.once('message', (msg) => {
                var fb = "Facebook"
                if(msg.text.indexOf(fb) === 0) {
                    bot.sendMessage(chatId, "Você encontra o Carrefour no Facebook aqui: https://www.facebook.com/CarrefourBR/", {
                        "reply_markup": opcoes })
                }

                var tw = "Twitter"
                if(msg.text.indexOf(tw) === 0) {
                    bot.sendMessage(chatId, "Você encontra o Carrefour no Twitter aqui: https://twitter.com/carrefourbrasil", {
                        "reply_markup": opcoes })
                }

                var yt = "YouTube"
                if(msg.text.indexOf(yt) === 0) {
                    bot.sendMessage(chatId, "Você encontra o Carrefour no YouTube aqui: https://www.youtube.com/user/carrefourbrasil", {
                        "reply_markup": opcoes })
                }

                var ig = "Instagram"
                if(msg.text.indexOf(ig) === 0) {
                    bot.sendMessage(chatId, "Você encontra o Carrefour no Instagram aqui: https://www.instagram.com/carrefourbrasil/", {
                        "reply_markup": opcoes })
                }
            })
        )
    }
})