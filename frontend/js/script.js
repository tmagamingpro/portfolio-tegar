const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const form = document.getElementById("contactForm");
const messageBox = document.getElementById("formMessage");
const scrollTopBtn = document.getElementById("scrollTopBtn");

  function showUnavailable(event) {
      event.preventDefault();
      document.getElementById("projectModal").style.display = "flex";
  }

  function closeModal() {
      document.getElementById("projectModal").style.display = "none";
  }

  hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  });

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const messageBox = document.getElementById("formMessage"); 

    if (!form || !messageBox) return; 

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.querySelector("input[type='text']").value.trim();
      const email = form.querySelector("input[type='email']").value.trim();
      const message = form.querySelector("textarea").value.trim();

      messageBox.classList.remove("success", "error", "show");

      if (!name || !email || !message) {
        messageBox.textContent = "❌ Semua field wajib diisi yaa!";
        messageBox.classList.add("error", "show");
        return;
      }

      messageBox.textContent = "⏳ Mengirim pesan...";
      messageBox.classList.add("show");

      setTimeout(() => {
        messageBox.textContent = "✅ Pesan berhasil dikirim! Makasih yaa!";
        messageBox.classList.remove("error");
        messageBox.classList.add("success", "show");
        form.reset();
      }, 1500);
    });
  });


  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    });

    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href"))
        .scrollIntoView({
          behavior: "smooth"
        });
    });
  });

