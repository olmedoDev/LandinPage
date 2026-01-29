// Fade-in on scroll
const sections = document.querySelectorAll("[data-section]");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

sections.forEach((section, index) => {
  section.classList.add("fade-in");
  section.style.transitionDelay = `${index * 120}ms`;
  observer.observe(section);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document
      .querySelector(anchor.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// Theme toggle
const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  toggleBtn.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  toggleBtn.textContent = "☀️";
}

// Blog data
const posts = [
  {
    title: "Por qué no todos pueden digievolucionar profesionalmente",
    date: "Enero 2026",
    summary: "Talento sin contexto no siempre evoluciona. Experiencia real en sistemas."
  }
];

const blogSection = document.querySelector("#blog");

posts.forEach(post => {
  const article = document.createElement("article");
  article.className = "post";
  article.innerHTML = `
    <h3>${post.title}</h3>
    <p class="post-meta">${post.date}</p>
    <p>${post.summary}</p>
    <span class="coming-soon">Próximamente</span>
  `;
  blogSection.appendChild(article);
});

console.log("OlmedoDev v1.3 listo 🚀");

// ==========================
// Back to top button
// ==========================
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

