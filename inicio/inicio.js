// Carrusel automático para imágenes en inicio.html
window.onload = function() {

        const imagenes = [
            '../Imagenes/Cuadernos/adjunto1.jpg', // Cuaderno bordado mano
            '../Imagenes/Cuadernos/adjunto2.jpg', // Cuadernos azules mano
            '../Imagenes/Cuadernos/adjunto3.jpg'  // Cuadernos azules mesa
        ];

        let indiceActual = 0;
        const imgElement = document.querySelector('.imagen-centro');
        const prevBtn = document.getElementById('carrusel-prev');
        const nextBtn = document.getElementById('carrusel-next');
        const puntosContainer = document.getElementById('carrusel-puntos');
        let direccion = 'right';

        function actualizarPuntos() {
            if (!puntosContainer) return;
            puntosContainer.innerHTML = '';
            imagenes.forEach((_, idx) => {
                const punto = document.createElement('span');
                punto.className = 'carrusel-punto' + (idx === indiceActual ? ' activo' : '');
                punto.onclick = () => {
                    direccion = idx > indiceActual ? 'right' : 'left';
                    cambiarImagen(idx);
                };
                puntosContainer.appendChild(punto);
            });
        }

        function cambiarImagen(nuevoIndice) {
            if (!imgElement) return;
            // Animación de salida
            imgElement.style.opacity = '0';
            imgElement.style.transform = direccion === 'right' ? 'translateX(100px)' : 'translateX(-100px)';
            setTimeout(() => {
                imgElement.src = imagenes[nuevoIndice];
                imgElement.style.transform = direccion === 'right' ? 'translateX(-100px)' : 'translateX(100px)';
                setTimeout(() => {
                    imgElement.style.opacity = '1';
                    imgElement.style.transform = 'translateX(0)';
                }, 50);
            }, 300);
            indiceActual = nuevoIndice;
            actualizarPuntos();
        }

        function siguienteImagen() {
            direccion = 'right';
            cambiarImagen((indiceActual + 1) % imagenes.length);
        }

        function anteriorImagen() {
            direccion = 'left';
            cambiarImagen((indiceActual - 1 + imagenes.length) % imagenes.length);
        }

        let intervalo = setInterval(siguienteImagen, 3000); // Cambia cada 3 segundos

        if (nextBtn) {
            nextBtn.onclick = () => {
                siguienteImagen();
                reiniciarIntervalo();
            };
        }
        if (prevBtn) {
            prevBtn.onclick = () => {
                anteriorImagen();
                reiniciarIntervalo();
            };
        }

        function reiniciarIntervalo() {
            clearInterval(intervalo);
            intervalo = setInterval(siguienteImagen, 3000);
        }

        // Mostrar la primera imagen al cargar
        imgElement.style.opacity = '0';
        imgElement.style.transform = 'translateX(0)';
        setTimeout(() => {
            imgElement.src = imagenes[indiceActual];
            imgElement.style.opacity = '1';
            imgElement.style.transform = 'translateX(0)';
            actualizarPuntos();
        }, 100);
    }
