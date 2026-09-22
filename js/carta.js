document.addEventListener("DOMContentLoaded", function () {

    const boton =
        document.getElementById("abrirCarta");

    const contenidoCarta =
        document.getElementById("contenidoCarta");

    const gatosLaterales =
        document.getElementById("gatosLaterales");

    const contenedorPetalos =
        document.getElementById("petalos");

    const contenedorPetalosAcumulados =
        document.getElementById("petalosAcumulados");


    // ==========================================
    // VARIABLES
    // ==========================================

    let lluviaActiva = false;

    let intervaloPetalos = null;

    let cantidadAcumulados = 0;

    // 40 zonas para repartir los pétalos
    let alturasPila = [];


    // ==========================================
    // CREAR UN PÉTALO QUE CAE
    // ==========================================

    function crearPetalo() {

        if (!lluviaActiva) {
            return;
        }


        const petalo =
            document.createElement("div");

        petalo.classList.add("petalo");


        // ======================================
        // POSICIÓN HORIZONTAL
        // ======================================

        petalo.style.left =
            Math.random() * 100 + "%";


        // ======================================
        // TAMAÑO
        // ======================================

        const tamaño =
            8 + Math.random() * 9;

        petalo.style.width =
            tamaño + "px";

        petalo.style.height =
            tamaño * 1.35 + "px";


        // ======================================
        // VELOCIDAD
        // ======================================

        petalo.style.animationDuration =
            (3 + Math.random() * 2) + "s";


        // ======================================
        // PEQUEÑO RETRASO
        // ======================================

        petalo.style.animationDelay =
            (Math.random() * 0.8) + "s";


        // ======================================
        // ROTACIÓN
        // ======================================

        petalo.style.transform =
            "rotate(" +
            Math.random() * 360 +
            "deg";


        // ======================================
        // AÑADIR
        // ======================================

        contenedorPetalos.appendChild(petalo);


        // ======================================
        // CUANDO LLEGA AL SUELO
        // ======================================

        petalo.addEventListener(
            "animationend",
            function () {

                if (!lluviaActiva) {

                    petalo.remove();

                    return;
                }


                // Crear el pétalo que se queda abajo

                const acumulado =
                    document.createElement("div");

                acumulado.classList.add(
                    "petaloAcumulado"
                );


                // ==================================
                // TAMAÑO
                // ==================================

                acumulado.style.width =
                    petalo.style.width;

                acumulado.style.height =
                    petalo.style.height;


                // ==================================
                // ELEGIR UNA ZONA
                // ==================================

                const numeroColumnas =
                    window.innerWidth <= 600
                        ? 30
                        : 45;


                const columna =
                    Math.floor(
                        Math.random() *
                        numeroColumnas
                    );


                // ==================================
                // POSICIÓN HORIZONTAL
                // ==================================

                const anchoColumna =
                    100 / numeroColumnas;


                const posicionBase =
                    columna * anchoColumna;


                // Variación pequeña
                // para que no parezcan columnas

                const variacion =
                    Math.random() *
                    anchoColumna;


                acumulado.style.left =
                    (posicionBase + variacion) + "%";


                // ==================================
                // INICIALIZAR ALTURA
                // ==================================

                if (
                    alturasPila[columna] === undefined
                ) {

                    alturasPila[columna] = 0;
                }


                // ==================================
                // ALTURA ACTUAL
                // ==================================

                const alturaActual =
                    alturasPila[columna];


                // ==================================
                // COLOCAR SOBRE LOS ANTERIORES
                // ==================================

                acumulado.style.bottom =
                    alturaActual + "px";


                // ==================================
                // AUMENTAR LA PILA
                // ==================================

                const alturaPetalo =
                    parseFloat(
                        petalo.style.height
                    );


                // Solapamiento ligero
                // para evitar huecos

                const aumento =
                    alturaPetalo * 0.55;


                alturasPila[columna] +=
                    aumento;


                // ==================================
                // ROTACIÓN
                // ==================================

                acumulado.style.transform =
                    "rotate(" +
                    (-35 + Math.random() * 70) +
                    "deg)";


                // ==================================
                // AÑADIR A LA PILA
                // ==================================

                contenedorPetalosAcumulados.appendChild(
                    acumulado
                );


                cantidadAcumulados++;


                // ==================================
                // ELIMINAR EL PÉTALO QUE CAE
                // ==================================

                petalo.remove();

            }
        );

    }


    // ==========================================
    // INICIAR LLUVIA
    // ==========================================

    function iniciarLluvia() {

        lluviaActiva = true;

        cantidadAcumulados = 0;

        alturasPila = [];


        // ======================================
        // PRIMEROS PÉTALOS
        // ======================================

        for (let i = 0; i < 35; i++) {

            setTimeout(
                function () {

                    crearPetalo();

                },
                i * 100
            );

        }


        // ======================================
        // LLUVIA CONTINUA
        // ======================================

        intervaloPetalos =
            setInterval(
                function () {

                    crearPetalo();

                },
                180
            );

    }


    // ==========================================
    // DETENER LLUVIA
    // ==========================================

    function detenerLluvia() {

        lluviaActiva = false;


        if (
            intervaloPetalos !== null
        ) {

            clearInterval(
                intervaloPetalos
            );

            intervaloPetalos = null;
        }


        // ======================================
        // BORRAR PÉTALOS QUE CAEN
        // ======================================

        contenedorPetalos.innerHTML = "";


        // ======================================
        // BORRAR PÉTALOS ACUMULADOS
        // ======================================

        contenedorPetalosAcumulados.innerHTML =
            "";


        // ======================================
        // REINICIAR
        // ======================================

        cantidadAcumulados = 0;

        alturasPila = [];

    }


    // ==========================================
    // BOTÓN
    // ==========================================

    boton.addEventListener(
        "click",
        function () {

            const estaAbierta =
                contenidoCarta.style.display ===
                "block";


            // ==================================
            // ABRIR CARTA
            // ==================================

            if (!estaAbierta) {

                contenidoCarta.style.display =
                    "block";

                gatosLaterales.style.display =
                    "none";

                boton.innerHTML =
                    "No cerrar jaja";


                // Iniciar pétalos

                iniciarLluvia();


                // Bajar hacia la carta

                setTimeout(
                    function () {

                        contenidoCarta.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    },
                    100
                );

            }


            // ==================================
            // CERRAR CARTA
            // ==================================

            else {

                contenidoCarta.style.display =
                    "none";

                gatosLaterales.style.display =
                    "block";

                boton.innerHTML =
                    "Pa q cierras ya no abras😂";


                // Detener y limpiar todo

                detenerLluvia();


                // Volver arriba

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }

        }
    );

});
