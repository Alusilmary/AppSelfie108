var SpeechRecognition = window.webkitSpeechRecognition;
// window.webkitSpeechRecognition: é a API WebSpeechAPI, utilizada para reconhecer o que estamos dizendo e converter em texto
// Ela será armazenada em uma variável para que possamos utilizar
var recognition = new SpeechRecognition();
// Cria uma nova WebSpeechAPI para utilizarmos no nosso app e armazena em uma variável

function start() {
  //A função start é uma função predefinida de WebSpeechAPI e converterá toda a fala em texto

  document.getElementById("textbox").innerHTML = "";
  recognition.start(); //chama a função start
  // Sempre que o botão Iniciar é pressionado, queremos que a área de texto fique
  // vazia. Para isso, atualize textarea com um valor vazio
}

recognition.onresult = function (event) {
  // A função onresult armazena todos os valores de falas que foram convertidos para texto
  console.log(event); //Adiciona o evento ao console

  var Content = event.results[0][0].transcript; //obtém o resultado da nossa fala em texto

  document.getElementById("textbox").innerHTML = Content;
  //Atualiza o valor da textarea com esse valor
  console.log(Content); //podemos ver o resultado da nossa fala em texto

  if (Content == "tire minha selfie") {
    console.log("tirando selfie --- ");
    speak(); //ADICIONADO NA AULA 107 - chama a função speak()
  }
};

// // CÓDIGO PARA CONVERTER TEXTO EM FALA
function speak() {
  var synth = window.speechSynthesis;
  // window.speechSynthesis - É a API que utilizaremos para converter texto em fala e armazenaremos na variável synth
  //obtém o valor da text area e armazena na variável
  speak_data = "Tirando sua selfie em 5 segundos";

  var utterThis = new SpeechSynthesisUtterance(speak_data);
  // utterThis: a variável em que iremos armazenar o texto que deve ser dito.
  // SpeechSynthesisUtterance: função da API que converterá o texto para fala. Utilizaremos a palavra-chave new para convertermos qualquer texto novo em fala.
  // speak_data: contém o texto obtido de textarea
  synth.speak(utterThis);
  // Agora vamos passar o texto convertido que está armazenado na variável para utterThis para a função speak da API
  // synth: armazenamos a API
  // speak(): É uma função predefinida pela API
  // utterThis: armazenará o valor do texto convertido para fala para que o sistema possa lê-lo.
  // obs:Ao executarmos o arquivo e pressionarmos o botão Iniciar, tudo que falarmos será convertido
  //     em texto, mas ainda não será dito pelo computador. Isso acontece pois apenas escrevemos a
  //     função speak(), precisamos chamá-la para que o sistema possa ler o texto.

  Webcam.attach(camera); // AULA 107 ativa a webcam
  //O sistema lerá em voz alta a fala que foi convertida pelo texto

  // // FIM DO CÓDIGO DA AULA 107

  setTimeout(function () {
    take_snapshot();
    save();
  }, 5000);
}

// // FUNCIONALIDADE DA WEBCAM - INÍCIO
camera = document.getElementById("camera"); //Obtem o elemento HTML cuja pré-visualização da webcam queremos mostrar e armazena em uma variável.
Webcam.set({
  //uma função de webcam.js para visualizarmos as propriedades da pré-visualização da webcam.
  width: 360,
  height: 250,
  image_format: "png", //Ppode ser també jpeg
  png_quality: 90, //se fosse jpeg ficaria: jpeg_quality:90
});

// FIM

function take_snapshot() {
  Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML =
      '<img id="selfie_image" src="' + data_uri + '"/>';
  });
}

function save() {
  link = document.getElementById("link");
  image = document.getElementById("selfie_image").src;
  link.href = image;
  link.click();
}
