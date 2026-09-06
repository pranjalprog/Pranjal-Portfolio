const themeToggle = document.querySelector(".theme-toggle");
const htmlEl = document.documentElement;

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  htmlEl.setAttribute("data-theme", "dark");
  if (themeToggle) themeToggle.textContent = "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = htmlEl.getAttribute("data-theme") === "dark";

    if (isDark) {
      htmlEl.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "🌙";
    } else {
      htmlEl.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "☀️";
    }
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("#nav-links a").forEach((link) => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

const revealElements = document.querySelectorAll("main section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((section) => {
  section.classList.add("reveal");
  observer.observe(section);
});