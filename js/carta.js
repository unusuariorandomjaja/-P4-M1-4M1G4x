document.addEventListener("DOMContentLoaded", function () {

    /* ==================================================
       ELEMENTOS
    ================================================== */

    const boton =
        document.getElementById("abrirCarta");

    const contenidoCarta =
        document.getElementById("contenidoCarta");

    const gatosLaterales =
        document.getElementById("gatosLaterales");

    const finalArbol =
        document.getElementById("finalArbol");

    const hojasArbol =
        document.getElementById("hojasArbol");

    const contenedorPetalos =
        document.getElementById("petalos");

    const contenedorPetalosAcumulados =
        document.getElementById(
            "petalosAcumulados"
        );


    /* ==================================================
       ESTADO
    ================================================== */

    let estado = "inicio";


    /* ==================================================
       LLUVIA DE PETALOS
    ================================================== */

    let lluviaActiva = false;

    let intervaloPetalos = null;

    let alturasPila = [];


    /* ==================================================
       CREAR PETALO
    ================================================== */

    function crearPetalo() {

        if (!lluviaActiva) {
            return;
        }


        const petalo =
            document.createElement("div");


        petalo.classList.add("petalo");


        /* Posicion horizontal */

        petalo.style.left =
            Math.random() * 100 + "%";


        /* Tamaño */

        const tamaño =
            8 + Math.random() * 9;


        petalo.style.width =
            tamaño + "px";


        petalo.style.height =
            tamaño * 1.35 + "px";


        /* Velocidad */

        petalo.style.animationDuration =
            (3 + Math.random() * 2) + "s";


        /* Rotacion */

        petalo.style.transform =
            "rotate(" +
            Math.random() * 360 +
            "deg)";


        contenedorPetalos.appendChild(
            petalo
        );


        /* Cuando llega abajo */

        petalo.addEventListener(
            "animationend",
            function () {

                if (!lluviaActiva) {

                    petalo.remove();

                    return;
                }


                /* Crear petalo acumulado */

                const acumulado =
                    document.createElement("div");


                acumulado.classList.add(
                    "petaloAcumulado"
                );


                acumulado.style.width =
                    petalo.style.width;


                acumulado.style.height =
                    petalo.style.height;


                /* Columnas */

                const numeroColumnas =
                    window.innerWidth <= 600
                        ? 30
                        : 45;


                const columna =
                    Math.floor(
                        Math.random() *
                        numeroColumnas
                    );


                const anchoColumna =
                    100 / numeroColumnas;


                const posicionBase =
                    columna *
                    anchoColumna;


                const variacion =
                    Math.random() *
                    anchoColumna;


                acumulado.style.left =
                    (
                        posicionBase +
                        variacion
                    ) + "%";


                /* Crear columna */

                if (
                    alturasPila[columna] ===
                    undefined
                ) {

                    alturasPila[columna] = 0;
                }


                /* Altura */

                const alturaActual =
                    alturasPila[columna];


                acumulado.style.bottom =
                    alturaActual + "px";


                const alturaPetalo =
                    parseFloat(
                        petalo.style.height
                    );


                const aumento =
                    alturaPetalo * 0.55;


                alturasPila[columna] +=
                    aumento;


                /* Rotacion */

                acumulado.style.transform =
                    "rotate(" +
                    (
                        -35 +
                        Math.random() * 70
                    ) +
                    "deg)";


                /* Agregar */

                contenedorPetalosAcumulados
                    .appendChild(
                        acumulado
                    );


                petalo.remove();

            }
        );
    }


    /* ==================================================
       INICIAR LLUVIA
    ================================================== */

    function iniciarLluvia() {

        if (lluviaActiva) {
            return;
        }


        lluviaActiva = true;

        alturasPila = [];


        /* Primera tanda */

        for (
            let i = 0;
            i < 35;
            i++
        ) {

            setTimeout(
                function () {

                    crearPetalo();

                },
                i * 100
            );
        }


        /* Lluvia infinita */

        intervaloPetalos =
            setInterval(
                function () {

                    crearPetalo();

                },
                180
            );
    }


    /* ==================================================
       DETENER LLUVIA
    ================================================== */

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


        contenedorPetalos.innerHTML =
            "";


        contenedorPetalosAcumulados
            .innerHTML = "";


        alturasPila = [];
    }


    /* ==================================================
       CREAR ARBOL
    ================================================== */

    function crearArbol() {

        hojasArbol.innerHTML = "";


        /* 1500 PETALOS */

        const cantidadHojas = 1500;


        for (
            let i = 0;
            i < cantidadHojas;
            i++
        ) {

            const hoja =
                document.createElement("div");


            hoja.classList.add("hoja");


            /* Tamaño */

            const tamaño =
                9 + Math.random() * 12;


            hoja.style.width =
                tamaño + "px";


            hoja.style.height =
                tamaño + "px";


            /* Forma del arbol */

            const centroX = 50;

            const centroY = 30;

            const radioX = 44;

            const radioY = 28;


            const angulo =
                Math.random() *
                Math.PI *
                2;


            const distancia =
                Math.sqrt(
                    Math.random()
                );


            let x =
                centroX +
                Math.cos(angulo) *
                radioX *
                distancia;


            let y =
                centroY +
                Math.sin(angulo) *
                radioY *
                distancia;


            /* Parte inferior mas llena */

            if (
                Math.random() < 0.35
            ) {

                y =
                    30 +
                    Math.random() * 22;
            }


            /* Variacion */

            x +=
                (
                    Math.random() -
                    0.5
                ) * 5;


            y +=
                (
                    Math.random() -
                    0.5
                ) * 5;


            hoja.style.left =
                x + "%";


            hoja.style.top =
                y + "%";


            hoja.style.transform =
                "rotate(" +
                Math.random() * 360 +
                "deg)";


            hoja.style.animationDelay =
                (
                    Math.random() * 1.5
                ) + "s";


            hojasArbol.appendChild(
                hoja
            );
        }
    }


    /* ==================================================
       ABRIR CARTA
    ================================================== */

    function abrirCarta() {

        estado = "carta";


        gatosLaterales.style.display =
            "none";


        contenidoCarta.style.display =
            "block";


        boton.innerHTML =
            "No cerrar jaja";


        /* Iniciar petalos */

        iniciarLluvia();


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


    /* ==================================================
       CERRAR CARTA
    ================================================== */

    function cerrarCarta() {

        estado = "cerrada";


        contenidoCarta.style.display =
            "none";


        gatosLaterales.style.display =
            "block";


        boton.innerHTML =
            "Pa q cierras ya no abras😂";


        /* Detener petalos */

        detenerLluvia();


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* ==================================================
       MOSTRAR ARBOL
    ================================================== */

    function mostrarArbol() {

        estado = "arbol";


        /* Detener lluvia */

        detenerLluvia();


        contenidoCarta.style.display =
            "none";


        gatosLaterales.style.display =
            "none";


        boton.style.display =
            "none";


        finalArbol.style.display =
            "block";


        /* Crear 1500 petalos */

        crearArbol();


        setTimeout(
            function () {

                finalArbol.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            },
            150
        );
    }


    /* ==================================================
       BOTON
    ================================================== */

    boton.addEventListener(
        "click",
        function () {

            /* Primer clic */

            if (
                estado === "inicio"
            ) {

                abrirCarta();

                return;
            }


            /* Segundo clic */

            if (
                estado === "carta"
            ) {

                cerrarCarta();

                return;
            }


            /* Tercer clic */

            if (
                estado === "cerrada"
            ) {

                mostrarArbol();

                return;
            }

        }
    );

});
