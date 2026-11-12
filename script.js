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
  dots.forEach(function (dot, i) { dot.addEventListener("click", function () { showSlide(i); }); });
  if (slides.length) window.setInterval(function () { showSlide(current + 1); }, 6000);
  var grid = document.getElementById("galleryGrid");
  var box = document.getElementById("lightbox");
  var img = document.getElementById("lbImg");
  var close = document.getElementById("lbClose");
  var lbPrev = document.getElementById("lbPrev");
  var lbNext = document.getElementById("lbNext");
  var items = grid ? Array.prototype.slice.call(grid.querySelectorAll(".g-item")) : [];
  var currentImg = 0;
  function openBox(src, alt) {
    if (!box || !img) return;
    img.src = src; if (alt) img.alt = alt;
    box.hidden = false; document.body.style.overflow = "hidden";
    if (close) close.focus();
  }
  function closeBox() { if (box) { box.hidden = true; document.body.style.overflow = ""; } }
  function showImage(index) {
    if (!items.length) return;
    currentImg = (index + items.length) % items.length;
    var btn = items[currentImg];
    var pic = btn.querySelector("img");
    var full = btn.getAttribute("data-full");
    if (full) openBox(full, pic ? pic.alt : "Foto da clínica ampliada");
  }
  if (grid) grid.addEventListener("click", function (e) {
    var btn = e.target instanceof Element ? e.target.closest(".g-item") : null;
    if (!btn) return;
    showImage(items.indexOf(btn));
  });
  if (close) close.addEventListener("click", closeBox);
  if (lbPrev) lbPrev.addEventListener("click", function () { showImage(currentImg - 1); });
  if (lbNext) lbNext.addEventListener("click", function () { showImage(currentImg + 1); });
  if (box) {
    box.addEventListener("click", function (e) { if (e.target === box) closeBox(); });
    document.addEventListener("keydown", function (e) {
      if (box.hidden) return;
      if (e.key === "Escape") closeBox();
      else if (e.key === "ArrowLeft") showImage(currentImg - 1);
      else if (e.key === "ArrowRight") showImage(currentImg + 1);
    });
  }
})();