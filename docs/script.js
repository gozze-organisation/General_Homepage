const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const themeToggle = document.querySelector("#themeToggle");
themeToggle?.addEventListener("click", () => {
  const light = document.body.classList.toggle("light");
  themeToggle.textContent = light ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", light ? "Włącz ciemny motyw" : "Włącz jasny motyw");
});

const menuToggle = document.querySelector("#menuToggle");
const sidebar = document.querySelector("#sidebar");
menuToggle?.addEventListener("click", () => {
  const open = sidebar.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "✕" : "☰";
});

document.querySelectorAll(".side-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".side-nav a").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    sidebar?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.textContent = "☰";
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      document.querySelectorAll(".side-nav a").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  }, { rootMargin: "-25% 0px -60% 0px" });
  sections.forEach((section) => observer.observe(section));
}

// cc

// Copy code from CodeSection
document.querySelectorAll(".copy-code").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;

    const text = target.textContent || "";
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Skopiowano!";
    } catch {
      // Clipboard access can be blocked outside HTTPS/localhost.
      button.textContent = "Nie można skopiować";
    }
    window.setTimeout(() => {
      button.textContent = "Kopiuj kod";
    }, 1800);
  });
});
