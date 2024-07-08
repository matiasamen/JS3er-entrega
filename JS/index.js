
let baseDeDatosViajes = [];

function Viaje(destino, duracion, costoDiario, presupuestoTotal) {
    this.destino = destino;
    this.duracion = duracion;
    this.costoDiario = costoDiario;
    this.presupuestoTotal = presupuestoTotal;
}


function guardarViajeEnLocalStorage(viaje) {
    baseDeDatosViajes.push(viaje);
    localStorage.setItem('baseDeDatosViajes', JSON.stringify(baseDeDatosViajes));
}


document.addEventListener("DOMContentLoaded", function() {
    let viajesGuardados = localStorage.getItem('baseDeDatosViajes');
    if (viajesGuardados) {
        baseDeDatosViajes = JSON.parse(viajesGuardados);
    }
});

document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    let destino = document.getElementById("destino").value;
    let duracion = parseFloat(document.getElementById("duracion").value);
    let costoDiario = parseFloat(document.getElementById("costoDiario").value);

    if (!destino || isNaN(duracion) || duracion <= 0 || isNaN(costoDiario) || costoDiario <= 0) {
        mostrarMensajeError("Por favor, ingresa valores válidos para todos los campos.");
        return;
    }

    let presupuestoTotal = duracion * costoDiario;
    mostrarResultado(destino, duracion, costoDiario, presupuestoTotal);
    
    
    let viaje = new Viaje(destino, duracion, costoDiario, presupuestoTotal);
    guardarViajeEnLocalStorage(viaje);
});

function mostrarMensajeError(mensaje) {
    let resultadoElement = document.getElementById("resultado");
    resultadoElement.innerHTML = `<p class="error">${mensaje}</p>`;
}


function mostrarResultado(destino, duracion, costoDiario, presupuestoTotal) {
    let resultadoElement = document.getElementById("resultado");
    resultadoElement.innerHTML = `
        <h2>Presupuesto para el viaje a ${destino}:</h2>
        <p>Duración: ${duracion} días</p>
        <p>Costo diario estimado: ${costoDiario} unidades monetarias</p>
        <p><strong>Presupuesto total estimado: ${presupuestoTotal} unidades monetarias</strong></p>
    `;
}

