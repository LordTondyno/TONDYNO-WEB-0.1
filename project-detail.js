(() => {
  const projects = window.TONDYNO_PROJECTS || [];
  const params = new URLSearchParams(window.location.search);
  const project = projects.find(item => item.id === params.get("id"));
  const title = document.querySelector("#project-title");

  if (!project) {
    if (title) title.textContent = "Project not found.";
    return;
  }

  document.title = `${project.title} — TONDYNO PROJECT`;
  document.querySelector("#project-category").textContent = `${project.category} · ${project.year}`;
  title.innerHTML = `${project.title}<span class="accent">.</span>`;
  document.querySelector("#project-description").textContent = project.description;
  document.querySelector("#project-about").textContent = project.about;

  const meta = [
    ["Year", project.year],
    ["Location", project.location],
    ["Camera", project.camera],
    ["Film", project.film]
  ];
  document.querySelector("#project-meta").innerHTML = meta.map(([label, value]) =>
    `<div><dt>${label}</dt><dd>${value}</dd></div>`
  ).join("");

  document.querySelector("#detail-gallery").innerHTML = project.images.map((src, index) =>
    `<img src="${src}" alt="${project.title} — photograph ${index + 1}" loading="${index === 0 ? "eager" : "lazy"}">`
  ).join("");

  const index = projects.findIndex(item => item.id === project.id);
  const previous = projects[index - 1];
  const next = projects[index + 1];
  const previousLink = document.querySelector("#previous-project");
  const nextLink = document.querySelector("#next-project");

  if (previous) {
    previousLink.href = `project.html?id=${encodeURIComponent(previous.id)}`;
    previousLink.textContent = `← ${previous.title}`;
    previousLink.hidden = false;
  }
  if (next) {
    nextLink.href = `project.html?id=${encodeURIComponent(next.id)}`;
    nextLink.textContent = `${next.title} →`;
    nextLink.hidden = false;
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
