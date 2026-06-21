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

  const cartCountNode = document.querySelector("[data-cart-count]");
  if (cartCountNode) {
    try {
      const rawCart = localStorage.getItem("ohlala-cart");
      const parsedCart = rawCart ? JSON.parse(rawCart) : [];
      const cartItems = Array.isArray(parsedCart) ? parsedCart : [];
      const totalItems = cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);
      cartCountNode.textContent = String(totalItems);
    } catch {
      cartCountNode.textContent = "0";
    }
  }

  if (window.Alpine && typeof window.Alpine.initTree === "function") {
    window.Alpine.initTree(document.body);
  }
});
