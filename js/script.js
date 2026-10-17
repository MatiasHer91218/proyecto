
const preguntas = [
    {
        pregunta: "¿Cuándo nació San Faustino Míguez?",
        opciones: [
            "El 24 de marzo de 1831",
            "El 8 de marzo de 1925",
            "El 15 de octubre de 2017"
        ],
        correcta: 0,
        explicacion: "Nació el 24 de marzo de 1831 en Xamirás, Ourense."
    },
    {
        pregunta: "¿A qué orden religiosa perteneció?",
        opciones: [
            "A los franciscanos",
            "A las Escuelas Pías",
            "A los benedictinos"
        ],
        correcta: 1,
        explicacion: "Fue sacerdote y religioso escolapio."
    },
    {
        pregunta: "¿En qué año fue ordenado sacerdote?",
        opciones: ["1831", "1850", "1856"],
        correcta: 2,
        explicacion: "Fue ordenado sacerdote el 19 de marzo de 1856, en Madrid."
    },
    {
        pregunta: "¿En qué área desarrolló investigaciones científicas?",
        opciones: [
            "Astronomía y física espacial",
            "Botánica y aguas medicinales",
            "Geología y volcanes"
        ],
        correcta: 1,
        explicacion: "Investigó plantas y aguas medicinales para contribuir al cuidado de la salud."
    },
    {
        pregunta: "¿Qué instituto fundó?",
        opciones: [
            "El Instituto Calasancio de Hijas de la Divina Pastora",
            "La Universidad de Sanlúcar",
            "El Instituto de Ciencias de Madrid"
        ],
        correcta: 0,
        explicacion: "Impulsó la fundación del Instituto Calasancio de Hijas de la Divina Pastora."
    },
    {
        pregunta: "¿En qué año fue canonizado?",
        opciones: ["1998", "2003", "2017"],
        correcta: 2,
        explicacion: "El papa Francisco lo canonizó el 15 de octubre de 2017."
    }
];

const formulario = document.getElementById("formulario-quiz");
const preguntaTexto = document.getElementById("pregunta-texto");
const opcionesContenedor = document.getElementById("opciones-quiz");
const progreso = document.getElementById("progreso-quiz");
const botonSiguiente = document.getElementById("siguiente-quiz");
const resultado = document.getElementById("resultado-quiz");
const botonReiniciar = document.getElementById("reiniciar-quiz");

let preguntaActual = 0;
let puntaje = 0;
let respondida = false;

function mostrarPregunta() {
    respondida = false;

    const pregunta = preguntas[preguntaActual];

    preguntaTexto.textContent =
        (preguntaActual + 1) + ". " + pregunta.pregunta;

    progreso.textContent =
        "Pregunta " + (preguntaActual + 1) +
        " de " + preguntas.length;

    opcionesContenedor.innerHTML = "";
    botonSiguiente.disabled = true;
    botonSiguiente.textContent =
        preguntaActual === preguntas.length - 1
            ? "Ver resultado"
            : "Siguiente pregunta";

    pregunta.opciones.forEach(function (opcion, indice) {
        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "opcion-quiz";
        boton.textContent = opcion;

        boton.addEventListener("click", function () {
            comprobarRespuesta(indice);
        });

        opcionesContenedor.appendChild(boton);
    });
}

function comprobarRespuesta(indiceElegido) {
    if (respondida) {
        return;
    }

    respondida = true;

    const pregunta = preguntas[preguntaActual];
    const botones = opcionesContenedor.querySelectorAll("button");

    botones.forEach(function (boton, indice) {
        boton.disabled = true;

        if (indice === pregunta.correcta) {
            boton.classList.add("correcta");
        } else if (indice === indiceElegido) {
            boton.classList.add("incorrecta");
        }
    });

    const mensaje = document.createElement("p");
    mensaje.className = "explicacion-quiz";

    if (indiceElegido === pregunta.correcta) {
        puntaje++;
        mensaje.textContent = "¡Correcto! " + pregunta.explicacion;
    } else {
        mensaje.textContent =
            "No es correcto. " + pregunta.explicacion;
    }

    opcionesContenedor.appendChild(mensaje);
    botonSiguiente.disabled = false;
}

function mostrarResultado() {
    formulario.hidden = true;
    resultado.hidden = false;

    resultado.replaceChildren();

    const titulo = document.createElement("h3");
    titulo.textContent = "¡Terminaste el cuestionario!";

    const puntajeTexto = document.createElement("p");
    puntajeTexto.textContent =
        "Tu puntaje: " + puntaje + " de " + preguntas.length;

    const mensaje = document.createElement("p");

    if (puntaje === preguntas.length) {
        mensaje.textContent =
            "¡Excelente! Conocés muy bien la vida de San Faustino Míguez.";
    } else if (puntaje >= 4) {
        mensaje.textContent =
            "¡Muy bien! Aprendiste muchos datos sobre su vida y su obra.";
    } else {
        mensaje.textContent =
            "¡Buen intento! Podés repasar la página y volver a jugar.";
    }

    resultado.append(titulo, puntajeTexto, mensaje);
    resultado.focus();
}

botonSiguiente.addEventListener("click", function () {
    if (!respondida) {
        return;
    }

    if (preguntaActual < preguntas.length - 1) {
        preguntaActual++;
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
});

botonReiniciar.addEventListener("click", function () {
    preguntaActual = 0;
    puntaje = 0;

    resultado.hidden = true;
    formulario.hidden = false;

    mostrarPregunta();
});

mostrarPregunta();
