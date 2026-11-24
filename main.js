(() => {
  const projects = window.TONDYNO_PROJECTS || [];
  const grid = document.querySelector("#project-grid");
  if (!grid) return;

  const filters = document.querySelector("#filters");
  const search = document.querySelector("#project-search");
  const emptyState = document.querySelector("#empty-state");
  let activeFilter = "all";

  const render = () => {
    const query = (search?.value || "").trim().toLowerCase();
    const visible = projects.filter(project => {
      const matchesFilter = activeFilter === "all" || project.category.toLowerCase() === activeFilter;
      const matchesSearch = `${project.title} ${project.category} ${project.year}`.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });

    grid.innerHTML = visible.map(project => `
      <a class="project-card" href="project.html?id=${encodeURIComponent(project.id)}">
        <div class="project-card-image-wrap">
          <img class="project-image" src="${project.cover}" alt="${project.title}" loading="lazy">
        </div>
        <div class="project-card-info">
          <span class="project-card-title">${project.title}</span>
          <span class="project-card-meta">${project.category} · ${project.year}</span>
        </div>
      </a>
    `).join("");

    if (emptyState) emptyState.hidden = visible.length > 0;
  };

  filters?.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    activeFilter = button.dataset.filter;
    filters.querySelectorAll(".filter-button").forEach(item => item.classList.toggle("active", item === button));
    render();
  });

  search?.addEventListener("input", render);
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
  render();
})();
