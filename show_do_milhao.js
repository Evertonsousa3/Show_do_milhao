const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let playerName = '';

function getPlayerName() {
  rl.question('Digite o seu nome: ', (name) => {
    playerName = name;
    console.log(`Bem-vindo(a), ${playerName}!\n`);
    askQuestion();
  });
}

const questions = [
    { question: 'Quanto é 2 + 2?', options: ['a) 3', 'b) 4', 'c) 5', 'd) 6'], correctAnswer: 'b', prize: 1000},
    { question: 'Qual é a capital do Brasil?', options: ['a) Rio de Janeiro', 'b) São Paulo', 'c) Brasília', 'd) Belo Horizonte'], correctAnswer: 'c', prize: 2000},
    { question: 'Quem escreveu "Dom Quixote"?', options: ['a) Machado de Assis', 'b) Miguel de Cervantes', 'c) Fernando Pessoa', 'd) Franz Kafka'], correctAnswer: 'b', prize: 3000},
    { question: 'Qual é o maior planeta do Sistema Solar?', options: ['a) Terra', 'b) Júpiter', 'c) Saturno', 'd) Marte'], correctAnswer: 'b', prize: 4000},
    { question: 'Em que ano a independência do Brasil foi proclamada?', options: ['a) 1808', 'b) 1822', 'c) 1889', 'd) 1750'], correctAnswer: 'b', prize:5000},
    { question: 'Quem pintou a Mona Lisa?', options: ['a) Vincent van Gogh', 'b) Pablo Picasso', 'c) Leonardo da Vinci', 'd) Claude Monet'], correctAnswer: 'c', prize: 10000},
    { question: 'Qual é a velocidade da luz?', options: ['a) 300,000 km/s', 'b) 150,000 km/s', 'c) 500,000 km/s', 'd) 1,000,000 km/s'], correctAnswer: 'a', prize: 20000},
    { question: 'Quantos continentes existem?', options: ['a) 5', 'b) 6', 'c) 7', 'd) 8'], correctAnswer: 'c', prize: 30000},
    { question: 'Qual é o metal líquido à temperatura ambiente?', options: ['a) Ouro', 'b) Mercúrio', 'c) Prata', 'd) Cobre'], correctAnswer: 'b', prize: 40000},
    { question: 'Quem foi o primeiro presidente dos Estados Unidos?', options: ['a) Thomas Jefferson', 'b) George Washington', 'c) Abraham Lincoln', 'd) John F. Kennedy'], correctAnswer: 'b', prize: 50000},
    { question: 'Quantos lados tem um heptágono?', options: ['a) 5', 'b) 6', 'c) 7', 'd) 8'], correctAnswer: 'c', prize: 100000},
    { question: 'Quem escreveu "Romeu e Julieta"?', options: ['a) Charles Dickens', 'b) William Shakespeare', 'c) Jane Austen', 'd) Fyodor Dostoevsky'], correctAnswer: 'b', prize: 200000},
    { question: 'Qual é o segundo planeta do Sistema Solar?', options: ['a) Mercúrio', 'b) Vênus', 'c) Terra', 'd) Marte'], correctAnswer: 'b', prize: 300000},
    { question: 'Em que ano a Primeira Guerra Mundial começou?', options: ['a) 1905', 'b) 1914', 'c) 1920', 'd) 1939'], correctAnswer: 'b', prize: 400000},
    { question: 'Quantos elementos químicos naturais existem na Tabela Periódica?', options: ['a) 92', 'b) 98', 'c) 104', 'd) 110'], correctAnswer: 'a', prize: 500000},
    { question: 'Em que ano o físico Albert Einstein ganhou o Prêmio Nobel de Física?', options: ['a) 1905', 'b) 1915', 'c) 1921', 'd) 1930'], correctAnswer: 'c', prize: 1000000},
];

let currentQuestionIndex = 0;
let score = 0;
let stopGame = false;

function displayCorrectAnswer() {
    if (currentQuestionIndex > 0) {
      const correctAnswer = questions[currentQuestionIndex - 1].correctAnswer;
      console.log(`A resposta correta da última pergunta foi: ${correctAnswer.toUpperCase()}\n`);
    }
}

function calculatePrize(currentIndex, isStop) {
    if (isStop) {
      const prizesStop = [0, 1000, 2000, 3000, 4000, 5000, 10000, 20000, 30000, 40000, 50000, 100000, 200000, 300000, 400000, 500000];
      return prizesStop[currentIndex];
    } else {
      const prizesWrong = [0, 500, 1000, 1500, 2000, 2500, 5000, 10000, 15000, 20000, 25000, 50000, 100000, 150000, 200000, 0];
      return prizesWrong[currentIndex];
    }
}

function displayRoundInfo() {
    console.log(`Rodada ${currentQuestionIndex + 1} - ${questions[currentQuestionIndex].question}`);
    console.log(`Prêmio atual: R$ ${questions[currentQuestionIndex].prize.toLocaleString()}`);
}
  
function playAgain() {
    rl.question('Deseja jogar novamente? (Digite "sim" ou "nao"): ', (answer) => {
      if (answer.toLowerCase() === 'sim') {
        currentQuestionIndex = 0;
        score = 0;
        stopGame = false;
        console.clear(); // Limpa o console para uma nova rodada
        getPlayerName(); // Reinicia o jogo pedindo novamente o nome do jogador
      } else {
        rl.close();
      }
    });
}
  
function endGame() {
    console.log(`Fim de jogo, ${playerName}. Obrigado por jogar!\n`);
    displayCorrectAnswer(); // Exibe a resposta correta da última pergunta
    playAgain(); // Pergunta se o jogador quer jogar novamente
}

function askQuestion() {
    displayRoundInfo();
  
    const currentQuestion = questions[currentQuestionIndex];
    currentQuestion.options.forEach(option => console.log(option));
  
    rl.question('Sua resposta (ou digite "parar" para encerrar): ', (answer) => {
      if (answer.toLowerCase() === 'parar') {
        stopGame = true;
        score = calculatePrize(currentQuestionIndex, true);
        console.log(`Você escolheu parar. Você ganhou R$ ${score.toLocaleString()}`);
        endGame();
        return;
      }
  
      if (answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
        console.log(`\nResposta correta! Você ganhou R$ ${currentQuestion.prize.toLocaleString()}\n`);
        score = currentQuestion.prize;
      } else {
        console.log(`\nResposta incorreta. Você ganhou R$ ${calculatePrize(currentQuestionIndex, false).toLocaleString()}\n`);
        endGame();
        return;
      }
  
      currentQuestionIndex += 1;
  
      if (currentQuestionIndex < questions.length && !stopGame) {
        askQuestion();
      } else {
        console.log(`\nParabéns, ${playerName}! Você chegou ao final do Show do Milhão!`);
        console.log(`\nVocê ganhou: R$ ${score.toLocaleString()}`);
        endGame();
      }
    });
}  

console.log('Bem-vindo ao Show do Milhão!\n');
getPlayerName();