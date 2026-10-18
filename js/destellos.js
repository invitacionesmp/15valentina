/* Destellos animados: estrellitas que aparecen y se apagan por toda la invitación
   y brillos que parpadean sobre el nombre. Cada estrella cambia de lugar y de
   tamaño cada vez que se apaga, así nunca se repite el mismo dibujo. */
(function () {
  var azar = function (a, b) { return a + Math.random() * (b - a); };
  var colores = ["#fff6d0", "#ffe6a0", "#ffffff", "#ffd1dc", "#f4d03f"];

  function colocar(el, nombre) {
    var t = nombre ? azar(7, 20) : azar(6, 18);
    el.style.left = azar(2, 98) + "%";
    el.style.top = azar(nombre ? 4 : 0.5, nombre ? 96 : 99.5) + "%";
    el.style.width = el.style.height = t + "px";
    el.style.setProperty("--c", colores[Math.floor(azar(0, colores.length))]);
    el.style.animationDuration = azar(nombre ? 1.4 : 2.4, nombre ? 3 : 5.6) + "s";
  }

  function estrella(contenedor, nombre) {
    var s = document.createElement("span");
    s.className = "estrella" + (nombre ? " estrella--nombre" : "");
    colocar(s, nombre);
    s.style.animationDelay = azar(0, 4) + "s";
    s.addEventListener("animationiteration", function () { colocar(s, nombre); });
    contenedor.appendChild(s);
  }

  /* --- estrellas por toda la página --- */
  var cielo = document.createElement("div");
  cielo.className = "cielo-estrellas";
  cielo.setAttribute("aria-hidden", "true");
  document.body.appendChild(cielo);

  function llenar() {
    var h = document.documentElement.scrollHeight, w = window.innerWidth;
    var deseadas = Math.round((h / 100) * (w < 600 ? 1.5 : 2.4));
    deseadas = Math.min(deseadas, 130);
    while (cielo.children.length < deseadas) estrella(cielo, false);
  }
  llenar();
  window.addEventListener("load", llenar);
  window.addEventListener("resize", llenar);
  if (window.ResizeObserver) new ResizeObserver(llenar).observe(document.body);

  /* --- brillos sobre el nombre --- */
  var caja = document.getElementById("nombre-destellos");
  if (caja) for (var i = 0; i < 16; i++) estrella(caja, true);
})();
