document.addEventListener("DOMContentLoaded", function () {
  let questions = {
    1: [
      {
        question: "Qual é a função do comando 'ls' no Linux?",
        answers: [
          "Listar arquivos e diretórios",
          "Criar um novo arquivo",
          "Remover um arquivo",
          "Editar um arquivo"
        ],
        correct: "Listar arquivos e diretórios"
      },
      {
        question: "Qual comando é usado para copiar arquivos no Linux?",
        answers: [
          "cp",
          "rm",
          "mv",
          "mkdir"
        ],
        correct: "cp"
      },
      {
        question: "Qual comando é usado para remover arquivos no Linux?",
        answers: [
          "rm",
          "cp",
          "mv",
          "mkdir"
        ],
        correct: "rm"
      }
    ],
    2: [
      {
        question: "O que é um sistema de controle de versão?",
        answers: [
          "Um sistema que rastreia as alterações em um arquivo ou conjunto de arquivos ao longo do tempo",
          "Um sistema que permite criar e gerenciar máquinas virtuais",
          "Um sistema que permite criar e gerenciar bancos de dados",
          "Um sistema que permite criar e gerenciar redes de computadores"
        ],
        correct: "Um sistema que rastreia as alterações em um arquivo ou conjunto de arquivos ao longo do tempo"
      },
      {
        question: "Qual é a diferença entre Git e GitHub?",
        answers: [
          "Git é um sistema de controle de versão distribuído, enquanto GitHub é um serviço de hospedagem de repositórios Git",
          "Git é um serviço de hospedagem de repositórios Git, enquanto GitHub é um sistema de controle de versão distribuído",
          "Git e GitHub são a mesma coisa",
          "Git é um sistema operacional, enquanto GitHub é um navegador web"
        ],
        correct: "Git é um sistema de controle de versão distribuído, enquanto GitHub é um serviço de hospedagem de repositórios Git"
      },
      {
        question: "Qual comando Git é usado para criar um novo repositório?",
        answers: [
          "git init",
          "git clone",
          "git add",
          "git commit"
        ],
        correct: "git init"
      }
    ],
    3: [
      {
        question: "O que é Docker?",
        answers: [
          "Uma plataforma de conteinerização",
          "Um sistema operacional",
          "Um editor de texto",
          "Um navegador web"
        ],
        correct: "Uma plataforma de conteinerização"
      },
      {
        question: "O que é Kubernetes?",
        answers: [
          "Um sistema de orquestração de contêineres",
          "Um sistema operacional",
          "Um editor de texto",
          "Um navegador web"
        ],
        correct: "Um sistema de orquestração de contêineres"
      },
      {
        question: "Qual a diferença entre Docker e Virtualização?",
        answers: [
          "Docker usa o mesmo kernel do sistema operacional, enquanto a virtualização cria um sistema operacional convidado completo.",
          "Virtualização usa o mesmo kernel do sistema operacional, enquanto o Docker cria um sistema operacional convidado completo.",
          "Não existe diferença.",
          "Docker é mais lento que a virtualização."
        ],
        correct: "Docker usa o mesmo kernel do sistema operacional, enquanto a virtualização cria um sistema operacional convidado completo."
      }
    ],
    4: [
      {
        question: "O que é AWS?",
        answers: [
          "Uma plataforma de serviços de computação em nuvem da Amazon",
          "Um sistema operacional",
          "Um editor de texto",
          "Um navegador web"
        ],
        correct: "Uma plataforma de serviços de computação em nuvem da Amazon"
      },
      {
        question: "O que é Azure?",
        answers: [
          "Uma plataforma de serviços de computação em nuvem da Microsoft",
          "Um sistema operacional",
          "Um editor de texto",
          "Um navegador web"
        ],
        correct: "Uma plataforma de serviços de computação em nuvem da Microsoft"
      },
      {
        question: "O que é Google Cloud Platform?",
        answers: [
          "Uma plataforma de serviços de computação em nuvem do Google",
          "Um sistema operacional",
          "Um editor de texto",
          "Um navegador web"
        ],
        correct: "Uma plataforma de serviços de computação em nuvem do Google"
      }
    ],
    5: [
      {
        question: "O que é Machine Learning?",
        answers: [
          "Um campo da ciência da computação que permite que os computadores aprendam sem serem explicitamente programados",
          "Um sistema operacional",
          "Um editor de texto",
          "Um navegador web"
        ],
        correct: "Um campo da ciência da computação que permite que os computadores aprendam sem serem explicitamente programados"
      },
      {
        question: "O que é Deep Learning?",
        answers: [
          "Um subcampo do Machine Learning que usa redes neurais profundas para aprender com grandes quantidades de dados",
          "Um sistema operacional",
          "Um editor de texto",
          "Um navegador web"
        ],
        correct: "Um subcampo do Machine Learning que usa redes neurais profundas para aprender com grandes quantidades de dados"
      },
      {
        question: "O que é Inteligência Artificial?",
        answers: [
          "A capacidade de um computador ou robô de executar tarefas que normalmente exigem inteligência humana",
          "Um sistema operacional",
          "Um editor de texto",
          "Um navegador web"
        ],
        correct: "A capacidade de um computador ou robô de executar tarefas que normalmente exigem inteligência humana"
      }
    ]
  };
  let currentQuestionIndex = 0;
  let score = 0;
  let level = 1;
  let timer; // Referência para o temporizador
  let timeLeft = 15; // Tempo inicial para responder (em segundos)
  let correctAnswersCount = 0;
  let incorrectAnswersCount = 0;

  // Função para decodificar entidades HTML
  function decodeEntities(encodedString) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = encodedString;
    return textarea.value;
  }

  // Seleciona os elementos do DOM
  const questionContainer = document.getElementById("pergunta");
  const answersContainer = document.getElementById("answers");
  const statusContainer = document.getElementById("status");
  const scoreContainer = document.getElementById("score");
  const levelContainer = document.getElementById("level");
  async function fetchQuestions() {
    try {
      // URL atualizada para incluir o parâmetro de idioma
      const apiUrl = "https://quizapi.io/api/v1/questions?apiKey=dVszblUtj27pG1hGLiLl7yTXxRfDpkHxWsNSW2Tp&category=Linux&difficulty=Easy&limit=10&language=pt-BR";
      console.log("URL da API:", apiUrl);
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("Resposta da API:", data);

      // Verifica se a resposta da API é um array antes de usar `map`
      if (!Array.isArray(data)) {
        throw new Error("Resposta da API não é um array");
      }

      // Formata as perguntas recebidas para o formato usado no quiz
      questions = data.map((item) => ({
        question: decodeEntities(item.question),
        answers: shuffle([item.answers.answer_a, item.answers.answer_b, item.answers.answer_c, item.answers.answer_d].filter(Boolean)),
        correct: item.correct_answers.answer_a_correct === "true" ? item.answers.answer_a
                : item.correct_answers.answer_b_correct === "true" ? item.answers.answer_b
                : item.correct_answers.answer_c_correct === "true" ? item.answers.answer_c
                : item.correct_answers.answer_d_correct === "true" ? item.answers.answer_d
                : null
      }));

      loadQuestion(); // Carrega a primeira pergunta
    } catch (error) {
      console.error("Erro ao buscar perguntas:", error);
      statusContainer.textContent = "Erro ao carregar perguntas. Tente novamente mais tarde.";
    }
  }

  // Função para embaralhar respostas
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  
    // Carrega a pergunta atual
    function loadQuestion() {
      console.log("Carregando pergunta");
      clearInterval(timer); // Limpa o temporizador anterior
      timeLeft = 15; // Reinicia o tempo
      updateTimer();
  
      console.log("Nível:", level);
      console.log("Índice da pergunta:", currentQuestionIndex);
      console.log("Perguntas[nível]:", questions[level]);
  
      // Verifica se há perguntas para o nível atual
      if (!questions[level]) {
        questionContainer.innerHTML = `<h1>Fim do Quiz!</h1>
                                       <h2>Você completou todos os níveis!</h2>
                                       <h2>Você acertou ${correctAnswersCount} perguntas e errou ${incorrectAnswersCount} perguntas.</h2>`;
        answersContainer.innerHTML = "";
        timerContainer.textContent = "";
        statusContainer.textContent = "Obrigado por jogar!";
        return;
      }
  
      if (currentQuestionIndex >= questions[level].length) {
        currentQuestionIndex = 0;
        updateLevel();
        loadQuestion();
        return;
      }
  
      // Carrega a pergunta e as respostas
      if (!questions[level] || !questions[level][currentQuestionIndex]) {
        statusContainer.textContent = "Não há perguntas para este nível e dificuldade.";
        questionContainer.innerHTML = "";
        answersContainer.innerHTML = "";
        return;
      }
  
      const question = questions[level][currentQuestionIndex];
      console.log("Pergunta:", question);
      questionContainer.innerHTML = question.question;
      answersContainer.innerHTML = "";
    // Embaralha as respostas
    let shuffledAnswers = shuffle(question.answers);

    // Cria botões para as respostas
    shuffledAnswers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.classList.add("opcao"); // Ajuste para corresponder ao CSS
      button.addEventListener("click", handleButtonClick);
      console.log("Botão criado e listener adicionado:", button);
      answersContainer.appendChild(button);
    });

    // Inicia o temporizador
    startTimer();
  }

  // Função para lidar com o clique do botão
  function handleButtonClick(event) {
    const selectedAnswer = event.target.textContent;
    console.log("Botão clicado:", selectedAnswer); // Log para verificar o clique
    checkAnswer(selectedAnswer);
  }

  // Verifica a resposta escolhida
  function checkAnswer(selectedAnswer) {
    console.log("Resposta selecionada:", selectedAnswer);
    clearInterval(timer); // Para o temporizador ao responder
    const question = questions[level][currentQuestionIndex];
    const buttons = answersContainer.querySelectorAll(".opcao");

    if (selectedAnswer === question.correct) {
      score += 10; // Incrementa pontuação
      statusContainer.textContent = "Você acertou!";
      statusContainer.style.color = "green";
      startConfetti(); // Chama a função de confetes
      correctAnswersCount++;
      buttons.forEach(button => {
        if (button.textContent === selectedAnswer) {
          button.classList.add("selecionado");
        }
      });
    } else {
      statusContainer.textContent = "Você errou!";
      statusContainer.style.color = "red";
      incorrectAnswersCount++;
      buttons.forEach(button => {
        if (button.textContent === selectedAnswer) {
          button.classList.add("errada");
        } else if (button.textContent === question.correct) {
          button.classList.add("selecionado");
        }
      });
    }

    // Atualiza o placar
    scoreContainer.textContent = score;

    // Próxima pergunta ou fim do quiz
    currentQuestionIndex++;
    setTimeout(() => {
      statusContainer.textContent = ""; // Limpa a mensagem de status
      updateLevel();
      loadQuestion();
    }, 2000);
  }

  // Atualiza o nível com base na pontuação
  function updateLevel() {
    if (questions[level] && currentQuestionIndex >= questions[level].length) {
      currentQuestionIndex = 0;
      level++;
      levelContainer.textContent = level;
    }
  }

  // Função para lidar com o clique do botão
  function handleButtonClick(event) {
    const selectedAnswer = event.target.textContent;
    console.log("Botão clicado:", selectedAnswer); // Log para verificar o clique
    checkAnswer(selectedAnswer);
  }

  // Função para iniciar os confetes
  function startConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff0", "#0f0", "#00f"],
    });
  }

  // Função para iniciar o temporizador
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      updateTimer();

      if (timeLeft <= 0) {
        clearInterval(timer);
        statusContainer.textContent = "Tempo esgotado!";
        statusContainer.style.color = "red";

        // Avança para a próxima pergunta
        currentQuestionIndex++;
        setTimeout(() => {
          updateLevel();
          loadQuestion();
        }, 2000);
      }
    }, 1000);
  }

  // Atualiza o texto do temporizador
  function updateTimer() {
    const timerContainer = document.getElementById("timer");
    timerContainer.textContent = `Tempo restante: ${timeLeft}s`;
  }

  // Inicia o jogo carregando as perguntas
  loadQuestion();
  //loadQuestion();
});
