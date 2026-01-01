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

      // send to backend
      fetch('http://localhost:3000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })
        .then(async res => {
          if (!res.ok) throw new Error('Failed to send');
          const data = await res.json();
          messageBox.textContent = "✅ Pesan berhasil dikirim! Makasih yaa!";
          messageBox.classList.remove("error");
          messageBox.classList.add("success", "show");
          form.reset();
          return data;
        })
        .catch(err => {
          console.error(err);
          messageBox.textContent = "❌ Gagal mengirim pesan. Coba lagi nanti.";
          messageBox.classList.remove("success");
          messageBox.classList.add("error", "show");
        });
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

// Load projects from backend and prepend them to project list
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.project-container');
  if (!container) return;

  fetch('http://localhost:3000/api/projects')
    .then(res => res.json())
    .then(projects => {
      // create cards for each project and insert at beginning
      projects.reverse().forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';

        const imgWrap = document.createElement('div');
        imgWrap.className = 'project-image';
        const img = document.createElement('img');
        img.src = p.image ? `http://localhost:3000${p.image}` : 'img/project/default.png';
        img.alt = p.title || 'Project image';
        imgWrap.appendChild(img);

        const content = document.createElement('div');
        content.className = 'project-content';
        const h3 = document.createElement('h3');
        h3.textContent = p.title || 'Untitled';
        const desc = document.createElement('p');
        desc.textContent = p.description || '';

        const techDiv = document.createElement('div');
        techDiv.className = 'tech-stack';
        (p.tech || []).forEach(t => {
          const span = document.createElement('span');
          span.textContent = t;
          techDiv.appendChild(span);
        });

        const a = document.createElement('a');
        a.className = 'btn-project';
        a.target = '_blank';
        if (p.githubLink) {
          a.href = p.githubLink;
          a.textContent = 'GitHub Project';
        } else {
          a.href = '#';
          a.textContent = 'Lihat Project';
          a.addEventListener('click', function (e) {
            e.preventDefault();
            // reuse existing modal function
            if (typeof showUnavailable === 'function') showUnavailable(e);
            else document.getElementById('projectModal').style.display = 'flex';
          });
        }

        content.appendChild(h3);
        content.appendChild(desc);
        content.appendChild(techDiv);
        content.appendChild(a);

        card.appendChild(imgWrap);
        card.appendChild(content);

        // insert at top
        container.insertBefore(card, container.firstChild);
      });
    })
    .catch(err => console.error('Failed to load projects', err));
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

    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        document.getElementById('loading-page').style.display = 'none';
        document.getElementById('portfolio-page').style.display = 'block';
      }, 6000); // 6 detik loading
    });

