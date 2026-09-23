// Arizona Pet Care — minimal vanilla JS (replaces jQuery + Elementor + Swiper + GTM payloads)
(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav
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

  // Reviews carousel buttons (progressive enhancement over native scroll)
  var track = document.getElementById("revTrack");
  var prev = document.getElementById("revPrev");
  var next = document.getElementById("revNext");
  function step() {
    var card = track ? track.querySelector(".review-card") : null;
    return card ? card.getBoundingClientRect().width + 16 : 360;
  }
  if (track && prev && next) {
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
  }

  // Gallery lightbox
  var grid = document.getElementById("galleryGrid");
  var box = document.getElementById("lightbox");
  var img = document.getElementById("lbImg");
  var close = document.getElementById("lbClose");
  function openBox(src, alt) {
    if (!box || !img) return;
    img.src = src;
    if (alt) img.alt = alt;
    box.hidden = false;
    document.body.style.overflow = "hidden";
    if (close) close.focus();
  }
  function closeBox() {
    if (!box) return;
    box.hidden = true;
    document.body.style.overflow = "";
  }
  if (grid) {
    grid.addEventListener("click", function (e) {
      var btn = e.target instanceof Element ? e.target.closest(".g-item") : null;
      if (!btn) return;
      var full = btn.getAttribute("data-full");
      var pic = btn.querySelector("img");
      if (full) openBox(full, pic ? pic.alt : "Foto da clínica ampliada");
    });
  }
  if (close) close.addEventListener("click", closeBox);
  if (box) {
    box.addEventListener("click", function (e) { if (e.target === box) closeBox(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !box.hidden) closeBox(); });
  }

  // Reveal on scroll
  var sections = document.querySelectorAll(".section");
  sections.forEach(function (s) { s.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.08 });
    sections.forEach(function (s) { io.observe(s); });
  } else {
    sections.forEach(function (s) { s.classList.add("visible"); });
  }
})();
