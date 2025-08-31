// Filtrado dinámico de productos
window.onload = function() {
    const filtros = document.querySelectorAll('.filtros-bloque input[type="checkbox"]');
    const productos = document.querySelectorAll('.producto');

    filtros.forEach(filtro => {
        filtro.addEventListener('change', filtrarProductos);
    });

    function filtrarProductos() {
        const activos = Array.from(filtros)
            .filter(f => f.checked)
            .map(f => f.id);
        productos.forEach(producto => {
            if (activos.length === 0) {
                producto.style.display = '';
            } else {
                producto.style.display = activos.includes(producto.dataset.categoria) ? '' : 'none';
            }
        });
    }
}
