document.addEventListener('DOMContentLoaded', () => {
    const btnEvaluar = document.getElementById('btn-evaluar');
    const quizForm = document.getElementById('quiz-form');
    const resultadoDiv = document.getElementById('resultado');

    btnEvaluar.addEventListener('click', () => {
        // Respuestas correctas
        const respuestasCorrectas = {
            p1: 'b',
            p2: 'a',
            p3: 'b'
        };

        let puntaje = 0;
        let totalPreguntas = 3;
        let respondidas = 0;

        // Validar respuesta 1
        const p1 = quizForm.p1.value;
        if (p1) {
            respondidas++;
            if (p1 === respuestasCorrectas.p1) puntaje++;
        }

        // Validar respuesta 2
        const p2 = quizForm.p2.value;
        if (p2) {
            respondidas++;
            if (p2 === respuestasCorrectas.p2) puntaje++;
        }

        // Validar respuesta 3
        const p3 = quizForm.p3.value;
        if (p3) {
            respondidas++;
            if (p3 === respuestasCorrectas.p3) puntaje++;
        }

        // Mostrar alerta si falta responder alguna opción
        if (respondidas < totalPreguntas) {
            alert('Por favor, responde todas las preguntas antes de enviar.');
            return;
        }

        // Mostrar el resultado con estilos dinámicos
        resultadoDiv.classList.remove('hidden');
        
        if (puntaje === totalPreguntas) {
            resultadoDiv.className = 'resultado-box excelente';
            resultadoDiv.innerHTML = `<h3>¡Excelente Trabajo! 👏</h3><p>Obtuviste ${puntaje} de ${totalPreguntas} puntos. Demuestras un gran conocimiento sobre la vida y legado de San Faustino Míguez.</p>`;
        } else if (puntaje >= 1) {
            resultadoDiv.className = 'resultado-box regular';
            resultadoDiv.innerHTML = `<h3>¡Buen intento! 👍</h3><p>Obtuviste ${puntaje} de ${totalPreguntas} puntos. Te invitamos a repasar las secciones de Biografía y Botánica para conocerlo aún mejor.</p>`;
        } else {
            resultadoDiv.className = 'resultado-box insuficiente';
            resultadoDiv.innerHTML = `<h3>¡Sigue aprendiendo! 📖</h3><p>Obtuviste ${puntaje} de ${totalPreguntas} puntos. Vuelve a leer el contenido para descubrir el gran carisma de San Faustino.</p>`;
        }
    });
});