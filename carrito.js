(function () {
  const CART_KEY = "ohlala-cart";
  const DEFAULT_CART_ITEMS = [
    {
      id: "sneakers-pulse-red",
      name: "Sneakers Pulse Red",
      category: "Calzado",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
      alt: "Zapatillas urbanas rojas",
      price: 79,
      quantity: 1
    },
    {
      id: "camisa-lino-blanc",
      name: "Camisa Lino Blanc",
      category: "Camisas",
      image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80",
      alt: "Camisa blanca de lino",
      price: 58,
      quantity: 1
    },
    {
      id: "chinos-sand-tailor",
      name: "Chinos Sand Tailor",
      category: "Pantalones",
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80",
      alt: "Pantalones chinos beige",
      price: 68,
      quantity: 1
    }
  ];

  function getCartItems() {
    try {
      const rawCart = localStorage.getItem(CART_KEY);
      const parsedCart = rawCart ? JSON.parse(rawCart) : [];
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch {
      return [];
    }
  }

  function getTotalItems(items = getCartItems()) {
    return items.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);
  }

  function updateBadge(items = getCartItems()) {
    const cartCountNode = document.querySelector("[data-cart-count]");
    if (!cartCountNode) return;
    cartCountNode.textContent = String(getTotalItems(items));
  }

  function saveCartItems(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateBadge(items);
  }

  function ensureDefaultCartItems() {
    const cartItems = getCartItems();
    if (cartItems.length > 0) return;

    // Clonamos para evitar mutaciones accidentales sobre la constante base.
    saveCartItems(DEFAULT_CART_ITEMS.map((item) => ({ ...item })));
  }

  function extractProductFromCard(card) {
    const name = card.querySelector("h3")?.textContent?.trim() || "Producto sin nombre";
    const categoryLabel = card.querySelector("span")?.textContent?.trim() || "Categoria";
    const imageNode = card.querySelector("img");
    const priceText = card.querySelector(".text-2xl")?.textContent?.trim() || "$0";
    const price = Number(priceText.replace(/[^\d.]/g, "")) || 0;
    const image = imageNode?.getAttribute("src") || "";
    const alt = imageNode?.getAttribute("alt") || name;
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    return {
      id,
      name,
      category: categoryLabel,
      image,
      alt,
      price,
      quantity: 1
    };
  }

  function addProduct(product) {
    const cartItems = getCartItems();
    const existingIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingIndex >= 0) {
      const currentQty = Number(cartItems[existingIndex].quantity) || 0;
      cartItems[existingIndex].quantity = currentQty + 1;
    } else {
      cartItems.push(product);
    }

    saveCartItems(cartItems);
  }

  function initCatalogPage() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const catalogItems = document.querySelectorAll(".catalog-item");
    const categorySelect = document.getElementById("catalog-category-filter");
    const sizeSelect = document.getElementById("catalog-size-filter");
    const resetFiltersButton = document.getElementById("catalog-reset-filters");

    if (!catalogItems.length) return;

    let activeCategory = categorySelect?.value || "all";
    let activeSize = sizeSelect?.value || "all";
    const sizeOptionsByCategory = {
      all: ["all", "38", "39", "40", "41", "42", "s", "m", "l", "xl", "u"],
      calzado: ["all", "38", "39", "40", "41", "42"],
      camisas: ["all", "s", "m", "l", "xl"],
      pantalones: ["all", "s", "m", "l", "xl"],
      accesorios: ["all", "u"]
    };

    function getSizeLabel(sizeValue) {
      if (sizeValue === "all") return "Todas";
      if (sizeValue === "u") return "Unica";
      return sizeValue.toUpperCase();
    }

    function renderSizeOptionsForCategory(category) {
      if (!sizeSelect) return;

      const nextOptions = sizeOptionsByCategory[category] || sizeOptionsByCategory.all;
      const currentValueIsValid = nextOptions.includes(activeSize);

      if (!currentValueIsValid) {
        activeSize = "all";
      }

      sizeSelect.innerHTML = nextOptions
        .map((sizeValue) => `<option value="${sizeValue}">${getSizeLabel(sizeValue)}</option>`)
        .join("");

      sizeSelect.value = activeSize;
    }

    function setActiveButton(activeButton) {
      filterButtons.forEach((button) => {
        const isActive = button === activeButton;
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
        button.classList.toggle("bg-amber-900", isActive);
        button.classList.toggle("text-white", isActive);
        button.classList.toggle("bg-white", !isActive);
        button.classList.toggle("text-gray-700", !isActive);
      });
    }

    function applyFilter() {
      catalogItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        const size = (item.getAttribute("data-size") || "all").toLowerCase();
        const showCategory = activeCategory === "all" || category === activeCategory;
        const showSize = activeSize === "all" || size === activeSize;
        const showItem = showCategory && showSize;
        item.classList.toggle("hidden", !showItem);
      });
    }

    if (filterButtons.length) {
      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          activeCategory = button.getAttribute("data-filter") || "all";
          renderSizeOptionsForCategory(activeCategory);
          setActiveButton(button);

          if (categorySelect) {
            categorySelect.value = activeCategory;
          }

          applyFilter();
        });
      });
    }

    if (categorySelect) {
      categorySelect.addEventListener("change", (event) => {
        activeCategory = event.target.value;
        renderSizeOptionsForCategory(activeCategory);

        if (filterButtons.length) {
          const matchingButton = Array.from(filterButtons).find(
            (button) => button.getAttribute("data-filter") === activeCategory
          );
          if (matchingButton) {
            setActiveButton(matchingButton);
          }
        }

        applyFilter();
      });
    }

    if (sizeSelect) {
      sizeSelect.addEventListener("change", (event) => {
        activeSize = event.target.value;
        applyFilter();
      });
    }

    if (resetFiltersButton) {
      resetFiltersButton.addEventListener("click", () => {
        activeCategory = "all";
        activeSize = "all";
        renderSizeOptionsForCategory(activeCategory);

        if (categorySelect) {
          categorySelect.value = "all";
        }

        if (sizeSelect) {
          sizeSelect.value = activeSize;
        }

        if (filterButtons.length) {
          const allButton = Array.from(filterButtons).find(
            (button) => button.getAttribute("data-filter") === "all"
          );
          if (allButton) {
            setActiveButton(allButton);
          }
        }

        applyFilter();
      });
    }

    renderSizeOptionsForCategory(activeCategory);
    applyFilter();

    catalogItems.forEach((item) => {
      const addButton = item.querySelector("button");
      if (!addButton) return;

      addButton.addEventListener("click", () => {
        addProduct(extractProductFromCard(item));

        const originalText = addButton.textContent;
        addButton.textContent = "Agregado";
        addButton.classList.add("bg-amber-800");

        setTimeout(() => {
          addButton.textContent = originalText;
          addButton.classList.remove("bg-amber-800");
        }, 700);
      });
    });
  }

  function initCartPage() {
    const cartItemsContainer = document.getElementById("cart-items");
    const emptyState = document.getElementById("cart-empty-state");
    const subtotalEl = document.getElementById("cart-subtotal");

    if (!cartItemsContainer || !emptyState || !subtotalEl) return;

    const formatCurrency = (value) => `$${value.toFixed(2)}`;
    const parsePrice = (value) => Number(value) || 0;

    function renderRow(item) {
      const safeName = item.name || "Producto";
      const safeCategory = item.category || "Categoria";
      const safeAlt = item.alt || safeName;
      const safeImage = item.image || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=320&q=80";
      const unitPrice = parsePrice(item.price);
      const quantity = Math.max(1, Number(item.quantity) || 1);

      return `
        <article class="cart-row rounded-2xl border border-amber-100 bg-white px-4 py-4 shadow-sm sm:px-5" data-id="${item.id}" data-price="${unitPrice}">
          <div class="flex items-center gap-4">
            <img src="${safeImage}" alt="${safeAlt}" class="h-20 w-20 rounded-xl object-cover" loading="lazy" />
            <div>
              <h2 class="text-2xl text-amber-950">${safeName}</h2>
              <p class="text-sm text-amber-900/80">${safeCategory}</p>
            </div>
          </div>
          <p class="text-sm font-semibold text-amber-900 md:text-base"><span class="md:hidden">Precio unitario: </span>${formatCurrency(unitPrice)}</p>
          <label class="flex items-center gap-2 text-sm text-amber-900/80">
            <span class="md:hidden">Cantidad:</span>
            <input type="number" min="1" value="${quantity}" class="cart-qty-input w-20 rounded-lg border border-amber-200 px-3 py-2 text-sm font-semibold text-amber-950" data-qty-input />
            <button type="button" class="rounded-md px-2 py-1 text-xs font-semibold text-[color:var(--wine)] hover:bg-amber-100" data-remove-item>Quitar</button>
          </label>
          <p class="text-base font-bold text-[color:var(--wine)]" data-line-total><span class="md:hidden">Total: </span>${formatCurrency(unitPrice * quantity)}</p>
        </article>
      `;
    }

    function updateTotals() {
      const rows = Array.from(document.querySelectorAll("[data-id][data-price]"));
      let subtotal = 0;
      const cartItems = getCartItems();

      rows.forEach((row) => {
        const productId = row.getAttribute("data-id");
        const unitPrice = Number(row.getAttribute("data-price")) || 0;
        const quantityInput = row.querySelector("[data-qty-input]");
        const lineTotalEl = row.querySelector("[data-line-total]");
        const product = cartItems.find((item) => item.id === productId);

        if (!product || !quantityInput || !lineTotalEl) return;

        let quantity = Number(quantityInput.value) || 1;
        if (quantity < 1) {
          quantity = 1;
          quantityInput.value = "1";
        }

        product.quantity = quantity;

        const total = unitPrice * quantity;
        subtotal += total;

        lineTotalEl.innerHTML = `<span class="md:hidden">Total: </span>${formatCurrency(total)}`;
      });

      saveCartItems(cartItems);
      subtotalEl.textContent = formatCurrency(subtotal);
    }

    function bindCartEvents() {
      const rows = Array.from(document.querySelectorAll("[data-id][data-price]"));
      rows.forEach((row) => {
        const quantityInput = row.querySelector("[data-qty-input]");
        const removeButton = row.querySelector("[data-remove-item]");

        if (quantityInput) {
          quantityInput.addEventListener("input", updateTotals);
        }

        if (removeButton) {
          removeButton.addEventListener("click", () => {
            const productId = row.getAttribute("data-id");
            const nextCart = getCartItems().filter((item) => item.id !== productId);
            saveCartItems(nextCart);
            renderCart();
          });
        }
      });
    }

    function renderCart() {
      const cartItems = getCartItems();

      if (!cartItems.length) {
        cartItemsContainer.innerHTML = "";
        emptyState.classList.remove("hidden");
        subtotalEl.textContent = "$0.00";
        updateBadge([]);
        return;
      }

      emptyState.classList.add("hidden");
      cartItemsContainer.innerHTML = cartItems.map((item) => renderRow(item)).join("");
      bindCartEvents();
      updateTotals();
    }

    renderCart();
  }

  document.addEventListener("DOMContentLoaded", () => {
    ensureDefaultCartItems();
    updateBadge();
    initCatalogPage();
    initCartPage();
  });

  window.OhlalaCart = {
    addProduct,
    extractProductFromCard,
    getCartItems,
    getTotalItems,
    ensureDefaultCartItems,
    saveCartItems,
    updateBadge
  };
})();