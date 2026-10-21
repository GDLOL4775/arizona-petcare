(function () {
  "use strict";
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target instanceof HTMLAnchorElement) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
  var slides = Array.prototype.slice.call(document.querySelectorAll(".carousel-slide"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".carousel-dot"));
  var current = 0;
  function showSlide(index) {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) { slide.classList.toggle("active", i === current); });
    dots.forEach(function (dot, i) { dot.classList.toggle("active", i === current); });
  }
  var prev = document.getElementById("carouselPrev");
  var next = document.getElementById("carouselNext");
  if (prev) prev.addEventListener("click", function () { showSlide(current - 1); });
  if (next) next.addEventListener("click", function () { showSlide(current + 1); });
  dots.forEach(function (dot, i) { dot.addEventListener("click", function () { showSlide(i); }); });
  if (slides.length) window.setInterval(function () { showSlide(current + 1); }, 6000);
  var grid = document.getElementById("galleryGrid");
  var box = document.getElementById("lightbox");
  var img = document.getElementById("lbImg");
  var close = document.getElementById("lbClose");
  function openBox(src, alt) {
    if (!box || !img) return;
    img.src = src; if (alt) img.alt = alt;
    box.hidden = false; document.body.style.overflow = "hidden";
    if (close) close.focus();
  }
  function closeBox() { if (box) { box.hidden = true; document.body.style.overflow = ""; } }
  if (grid) grid.addEventListener("click", function (e) {
    var btn = e.target instanceof Element ? e.target.closest(".g-item") : null;
    if (!btn) return;
    var full = btn.getAttribute("data-full"); var pic = btn.querySelector("img");
    if (full) openBox(full, pic ? pic.alt : "Foto da clínica ampliada");
  });
  if (close) close.addEventListener("click", closeBox);
  if (box) {
    box.addEventListener("click", function (e) { if (e.target === box) closeBox(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !box.hidden) closeBox(); });
  }
})();