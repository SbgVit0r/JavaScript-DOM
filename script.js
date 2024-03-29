// Adicionando interações aos botões
const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause')
const iniciarPausarBt = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')

// Carregando arquivos de áudio
const musica = new Audio('/sons/luna-rise-part-one.mp3') 
const play = new Audio('/sons/play.wav')
const pause  = new Audio('/sons/pause.mp3')
const beep = new Audio('/sons/beep.mp3')

let tempoDecorridoEmSegundos =  1500
let intervaloId = null
musica.loop = true

// Função que toca a música ao clicar no botão
musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused) {
        musica.play()
    } else{
        musica.pause()
    }
})

// Textos
const titulo =  document.querySelector('.app__title')


focoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

// Função que altera a imagem e texto da página 
function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            ` 
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície. <br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        beep.play()
        alert('Tempo finalizado!')
        zerar()
        beep.currentTime = 4;
        return
    }
    mostrarTempo()
    tempoDecorridoEmSegundos -= 1 
}

startPauseBt.addEventListener('click', iniciarPausar)

function iniciarPausar(){
    if(intervaloId){
        pause.play()
        zerar()
        return
    }
    play.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarPausarBt.textContent = "Pausar"
}

function zerar(){
    clearInterval(intervaloId)
    iniciarPausarBt.textContent = "Começar"
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}