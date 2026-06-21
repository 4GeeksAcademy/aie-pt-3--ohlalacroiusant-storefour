const componentMap = {
  "site-navbar": "components/NavBar.html",
  "site-footer": "components/Footer.html"
};

async function loadComponent(tagName, path) {
  const nodes = document.querySelectorAll(tagName);
  if (nodes.length === 0) {
    return;
  }

  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`No se pudo cargar ${path}`);
    }

    const html = await response.text();
    nodes.forEach((node) => {
      node.outerHTML = html;
    });
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all(
    Object.entries(componentMap).map(([tagName, path]) => loadComponent(tagName, path))
  );

  if (window.OhlalaCart && typeof window.OhlalaCart.updateBadge === "function") {
    window.OhlalaCart.updateBadge();
  }

  if (window.Alpine && typeof window.Alpine.initTree === "function") {
    window.Alpine.initTree(document.body);
  }
});
