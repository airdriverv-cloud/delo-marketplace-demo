/* Дело — демо-маркетплейс бизнес-услуг. Все данные и оплата имитируются локально. */
(function () {
  "use strict";

  const DATA = window.DELO_DATA || { services: [], categories: [], reviews: [] };
  const ICONS = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    shield: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"/><path d="m9 12 2 2 4-4"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
    star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.4l6.1-.9L12 3Z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
    palette: '<circle cx="12" cy="12" r="8"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/><circle cx="9" cy="15" r="1"/><path d="M15 15c1.5 0 2 1 1 2"/>',
    text: '<path d="M5 6h14M12 6v12M8 18h8"/>',
    chart: '<path d="M4 19V5M4 19h16"/><path d="M8 16v-4M12 16V8M16 16v-6M20 16v-3"/>',
    bolt: '<path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
    user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.5-4 3-6 7-6s6.5 2 7 6"/>',
    wallet: '<rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18M16 15h2"/>',
    chat: '<path d="M4 5h16v11H9l-5 4V5Z"/><path d="M8 9h8M8 12h5"/>',
    file: '<path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4V8Z"/>',
    quote: '<path d="M8 7H5v6h3v4H4M19 7h-3v6h3v4h-4"/>',
    verified: '<path d="m12 3 2.2 2.2 3.1-.4.8 3 2.8 1.5-1.4 2.8 1.4 2.8-2.8 1.5-.8 3-3.1-.4L12 21l-2.2-2.2-3.1.4-.8-3L3.1 14.7 4.5 12 3.1 9.2l2.8-1.5.8-3 3.1.4L12 3Z"/><path d="m9 12 2 2 4-4"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18M7 15h3"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V8a4 4 0 0 1 8 0v2"/>',
    phone: '<path d="M6 3h4l2 5-3 2c1 3 3 5 6 6l2-3 5 2v4c0 1-1 2-2 2C10 21 3 14 3 5c0-1 1-2 2-2h1Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
    send: '<path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M8 7V5h8v2M3 12h18M10 12v2h4v-2"/>',
    heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10Z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    external: '<path d="M14 3h7v7M21 3l-9 9"/><path d="M19 13v6H5V5h6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M6.1 8a7 7 0 0 1 11.4-1L20 12M4 12l2.5 5a7 7 0 0 0 11.4-1"/>'
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function icon(name, cls = "") {
    return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.spark}</svg>`;
  }

  function hydrateStars(root = document) {
    $$("[data-stars]", root).forEach((el) => {
      const n = Number(el.dataset.stars) || 5;
      el.innerHTML = Array.from({ length: 5 }, (_, i) => icon("star").replace('class="icon ', `class="icon ${i < n ? "filled" : "empty"} `)).join("");
    });
  }

  function hydrateIcons(root = document) {
    $$("[data-icon]", root).forEach((el) => {
      el.innerHTML = icon(el.dataset.icon);
    });
  }

  function money(value) {
    return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
  }

  function plural(n, one, few, many) {
    const mod10 = n % 10, mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
    return many;
  }

  function stars(rating) {
    const full = Math.round(rating);
    return `<span class="stars" aria-label="Рейтинг ${rating} из 5">${Array.from({ length: 5 }, (_, i) => icon("star").replace('class="icon ', `class="icon ${i < full ? "filled" : "empty"} `)).join("")}</span>`;
  }

  function serviceById(id) {
    return DATA.services.find((s) => s.id === id) || DATA.services[0];
  }

  function categoryLabel(id) {
    const c = DATA.categories.find((x) => x.id === id);
    return c ? c.label : id;
  }

  function serviceCard(s) {
    return `
      <article class="service-card reveal">
        <a class="service-cover" href="service.html?id=${encodeURIComponent(s.id)}" aria-label="${s.title}">
          <img src="${s.cover}" alt="" loading="lazy">
          <span class="service-badges">${(s.badges || []).map((b) => `<span class="badge ${b === "Хит" ? "orange" : b === "Выбор редакции" ? "green" : ""}">${b}</span>`).join("")}</span>
        </a>
        <div class="service-body">
          <div class="service-cat">${s.categoryLabel}</div>
          <h3><a href="service.html?id=${encodeURIComponent(s.id)}">${s.title}</a></h3>
          <p class="service-desc">${s.tagline}</p>
          <div class="service-contractor">
            <span class="avatar">${s.contractor.initials}</span>
            <div><div class="name">${s.contractor.name}</div><div class="meta">${s.contractor.company}</div></div>
          </div>
          <div class="service-meta">
            <span class="rating">${stars(s.rating)} ${s.rating.toFixed(1)} <span class="count">(${s.reviewsCount})</span></span>
            <span class="dot"></span><span>${s.contractor.projects} проектов</span>
          </div>
          <div class="service-footer">
            <div class="price"><small>от</small>${money(s.priceFrom)}</div>
            <div class="term"><strong>${s.term}</strong>срок</div>
          </div>
        </div>
      </article>`;
  }

  function toast(message) {
    let el = $("#toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove("show"), 2800);
  }

  function getStore(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setStore(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      toast("Не удалось сохранить данные в браузере");
      return false;
    }
  }

  function orderId() {
    return "DL-" + String(Math.floor(1000 + Math.random() * 9000));
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[ch]));
  }

  /* ---------------- header / common ---------------- */
  function initHeader() {
    const toggle = $("#menuToggle");
    const mobile = $("#mobileNav");
    if (toggle && mobile) {
      toggle.addEventListener("click", () => {
        const open = mobile.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.innerHTML = open ? icon("close") : icon("menu");
      });
      $$("a", mobile).forEach((a) => a.addEventListener("click", () => {
        mobile.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = icon("menu");
      }));
    }
    const page = document.body.dataset.page;
    $$("[data-nav]").forEach((a) => {
      if (a.dataset.nav === page) a.classList.add("active");
    });
  }

  function initReveal() {
    const items = $$(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  }

  /* ---------------- order modal ---------------- */
  let modalState = null;

  function ensureOrderDialog() {
    if ($("#orderDialog")) return;
    const dialog = document.createElement("dialog");
    dialog.id = "orderDialog";
    dialog.innerHTML = `<div class="modal" id="orderModalContent"></div>`;
    document.body.appendChild(dialog);
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
  }

  function orderSummary(service, pkg, extras) {
    const extrasTotal = extras.reduce((sum, e) => sum + e.price, 0);
    return `
      <div class="order-summary">
        <div class="row"><span>Услуга</span><strong>${escapeHtml(service.title)}</strong></div>
        <div class="row"><span>Тариф</span><strong>${escapeHtml(pkg.name)} · ${pkg.days} дней</strong></div>
        ${extras.length ? `<div class="row"><span>Допуслуги</span><strong>${extras.map((e) => escapeHtml(e.name)).join(", ")}</strong></div>` : ""}
        <div class="row total"><span>Итого</span><strong>${money(pkg.price + extrasTotal)}</strong></div>
      </div>`;
  }

  function openOrder(serviceId, packageId, extraIds) {
    ensureOrderDialog();
    const service = serviceById(serviceId);
    const pkg = service.packages.find((p) => p.id === packageId) || service.packages[0];
    const extras = (service.extras || []).filter((e) => (extraIds || []).includes(e.id));
    modalState = { service, pkg, extras };

    const content = $("#orderModalContent");
    content.innerHTML = `
      <div class="modal-head">
        <div><h2>Оформление заказа</h2><p>Демо-оплата: деньги не списываются</p></div>
        <button class="modal-close" type="button" id="closeOrder" aria-label="Закрыть">${icon("close")}</button>
      </div>
      <div class="modal-body" id="orderBody">
        ${orderSummary(service, pkg, extras)}
        <form id="orderForm" novalidate>
          <div class="form-grid">
            <div class="field"><label for="orderName">Имя</label><input id="orderName" name="name" autocomplete="name" placeholder="Алексей" required></div>
            <div class="field"><label for="orderPhone">Телефон</label><input id="orderPhone" name="phone" inputmode="tel" autocomplete="tel" placeholder="+7 999 000-00-00" required></div>
            <div class="field full"><label for="orderEmail">Email</label><input id="orderEmail" name="email" type="email" autocomplete="email" placeholder="you@company.ru" required></div>
          </div>
          <label class="consent"><input type="checkbox" id="orderConsent" required> <span>Согласен с <a href="legal.html">офертой</a> и обработкой персональных данных. Это демо, данные остаются в браузере.</span></label>
          <div class="form-error" id="orderError"></div>
          <button class="btn btn-primary btn-lg btn-block" type="submit" style="margin-top:14px">${icon("lock")} Перейти к оплате · ${money(pkg.price + extras.reduce((s, e) => s + e.price, 0))}</button>
          <div class="secure-row"><span>${icon("shield")} Escrow</span><span>${icon("card")} Карта / СБП</span><span>${icon("refresh")} Возврат по правилам</span></div>
        </form>
      </div>`;
    hydrateIcons(content);
    $("#closeOrder").addEventListener("click", () => $("#orderDialog").close());
    $("#orderForm").addEventListener("submit", submitOrder);
    $("#orderDialog").showModal();
  }

  function submitOrder(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = $("#orderName").value.trim();
    const phone = $("#orderPhone").value.trim();
    const email = $("#orderEmail").value.trim();
    const consent = $("#orderConsent").checked;
    const error = $("#orderError");
    if (name.length < 2) return showFormError(error, "Укажите имя");
    if (phone.replace(/\D/g, "").length < 10) return showFormError(error, "Укажите телефон");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showFormError(error, "Укажите корректный email");
    if (!consent) return showFormError(error, "Нужно согласие на обработку данных");

    const { service, pkg, extras } = modalState;
    const total = pkg.price + extras.reduce((s, x) => s + x.price, 0);
    const order = {
      id: orderId(),
      createdAt: new Date().toISOString(),
      serviceId: service.id,
      serviceTitle: service.title,
      cover: service.cover,
      contractor: service.contractor.name,
      packageName: pkg.name,
      packagePrice: pkg.price,
      extras: extras.map((x) => ({ name: x.name, price: x.price })),
      total,
      days: pkg.days,
      status: "paid",
      clientName: name,
      phone,
      email
    };
    const orders = getStore("delo_orders", []);
    orders.unshift(order);
    setStore("delo_orders", orders);

    $("#orderBody").innerHTML = `
      <div class="success-panel">
        <div class="success-icon">${icon("check")}</div>
        <h3>Заказ ${order.id} создан</h3>
        <p>Оплата прошла в демо-режиме. Заказ находится в escrow: исполнитель получит деньги после приёмки работы.</p>
        <div class="order-summary" style="text-align:left;margin-top:16px">
          <div class="row"><span>Исполнитель</span><strong>${escapeHtml(order.contractor)}</strong></div>
          <div class="row"><span>Сумма</span><strong>${money(order.total)}</strong></div>
          <div class="row"><span>Срок</span><strong>${order.days} дней</strong></div>
        </div>
        <a class="btn btn-primary btn-lg" href="dashboard.html?new=1">${icon("grid")} В личный кабинет</a>
      </div>`;
    hydrateIcons($("#orderBody"));
  }

  function showFormError(el, message) {
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
  }

  /* ---------------- index ---------------- */
  function initHome() {
    const catRoot = $("#categoryGrid");
    if (catRoot) {
      const icons = { web: "code", design: "palette", text: "text", seo: "chart", ads: "bolt", auto: "layers" };
      catRoot.innerHTML = DATA.categories.filter((c) => c.id !== "all").map((c) => {
        const count = DATA.services.filter((s) => s.category === c.id).length;
        return `<a class="category-card reveal" href="catalog.html?cat=${c.id}">
          <span class="category-icon">${icon(icons[c.id] || "grid")}</span>
          <div><h3>${c.label}</h3><span>${count} ${plural(count, "услуга", "услуги", "услуг")}</span></div>
        </a>`;
      }).join("");
    }
    const popular = $("#popularGrid");
    if (popular) popular.innerHTML = DATA.services.slice(0, 6).map(serviceCard).join("");

    const search = $("#heroSearch");
    if (search) {
      search.addEventListener("submit", (e) => {
        e.preventDefault();
        const q = $("#heroQuery").value.trim();
        const cat = $("#heroCategory").value;
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (cat && cat !== "all") params.set("cat", cat);
        window.location.href = "catalog.html" + (params.toString() ? "?" + params.toString() : "");
      });
    }
    const catSelect = $("#heroCategory");
    if (catSelect) {
      catSelect.innerHTML = `<option value="all">Все услуги</option>` + DATA.categories.filter((c) => c.id !== "all").map((c) => `<option value="${c.id}">${c.short}</option>`).join("");
    }
    initReveal();
  }

  /* ---------------- catalog ---------------- */
  function initCatalog() {
    const grid = $("#catalogGrid");
    if (!grid) return;
    const params = new URLSearchParams(window.location.search);
    const initialCat = params.get("cat") || "all";
    const initialQuery = params.get("q") || "";

    const catRoot = $("#filterCategories");
    if (catRoot) {
      catRoot.innerHTML = DATA.categories.filter((c) => c.id !== "all").map((c) => {
        const count = DATA.services.filter((s) => s.category === c.id).length;
        return `<label class="check"><input type="checkbox" name="cat" value="${c.id}" ${initialCat === c.id ? "checked" : ""}> <span>${c.label}</span><span class="count">${count}</span></label>`;
      }).join("");
    }
    const queryInput = $("#catalogQuery");
    if (queryInput) queryInput.value = initialQuery;
    const chips = $("#catalogChips");
    if (chips) {
      chips.innerHTML = DATA.categories.map((c) => `<button class="chip ${c.id === initialCat ? "active" : ""}" data-chip="${c.id}" type="button">${c.short}</button>`).join("");
      chips.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-chip]");
        if (!btn) return;
        $$(".chip", chips).forEach((x) => x.classList.toggle("active", x === btn));
        $$('input[name="cat"]', catRoot).forEach((x) => { x.checked = btn.dataset.chip === "all" ? false : x.value === btn.dataset.chip; });
        renderCatalog();
      });
    }

    function selectedCats() {
      return $$('input[name="cat"]:checked', catRoot).map((x) => x.value);
    }

    function renderCatalog() {
      const q = (queryInput ? queryInput.value : "").trim().toLowerCase();
      const cats = selectedCats();
      const maxPrice = Number($("#maxPrice") ? $("#maxPrice").value : 0) || Infinity;
      const minRating = Number($("#minRating") ? $("#minRating").value : 0) || 0;
      const sort = $("#sortSelect") ? $("#sortSelect").value : "popular";
      let items = DATA.services.filter((s) => {
        const hay = `${s.title} ${s.tagline} ${s.categoryLabel} ${s.contractor.name}`.toLowerCase();
        return (!q || hay.includes(q)) && (!cats.length || cats.includes(s.category)) && s.priceFrom <= maxPrice && s.rating >= minRating;
      });
      if (sort === "price-asc") items.sort((a, b) => a.priceFrom - b.priceFrom);
      else if (sort === "price-desc") items.sort((a, b) => b.priceFrom - a.priceFrom);
      else if (sort === "rating") items.sort((a, b) => b.rating - a.rating);
      else items.sort((a, b) => b.reviewsCount - a.reviewsCount);
      $("#resultCount").innerHTML = `<strong>${items.length}</strong> ${plural(items.length, "услуга", "услуги", "услуг")}`;
      grid.innerHTML = items.length ? items.map(serviceCard).join("") : `<div class="empty-state" style="grid-column:1/-1"><h3>Ничего не нашлось</h3><p>Попробуйте изменить фильтры или сбросить их.</p><button class="btn btn-light" type="button" id="emptyReset">Сбросить фильтры</button></div>`;
      hydrateIcons(grid);
      initReveal();
      const reset = $("#emptyReset");
      if (reset) reset.addEventListener("click", resetFilters);
    }

    function resetFilters() {
      $$('input[name="cat"]', catRoot).forEach((x) => { x.checked = false; });
      if (queryInput) queryInput.value = "";
      if ($("#maxPrice")) $("#maxPrice").value = "";
      if ($("#minRating")) $("#minRating").value = "0";
      if ($("#sortSelect")) $("#sortSelect").value = "popular";
      $$(".chip", chips).forEach((x) => x.classList.toggle("active", x.dataset.chip === "all"));
      renderCatalog();
    }

    $$('input[name="cat"], #maxPrice, #minRating, #sortSelect', document).forEach((el) => el.addEventListener("change", renderCatalog));
    if (queryInput) queryInput.addEventListener("input", renderCatalog);
    const resetBtn = $("#resetFilters");
    if (resetBtn) resetBtn.addEventListener("click", resetFilters);
    const filterToggle = $("#filterToggle");
    if (filterToggle) filterToggle.addEventListener("click", () => $("#filtersPanel").classList.toggle("open"));
    renderCatalog();
  }

  /* ---------------- service page ---------------- */
  function initService() {
    const root = $("#serviceRoot");
    if (!root) return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "landing";
    const s = serviceById(id);
    document.title = `${s.title} — дело`;

    $("#breadcrumbTitle").textContent = s.title;
    $("#serviceCat").textContent = s.categoryLabel;
    $("#serviceTitle").textContent = s.title;
    $("#serviceTagline").textContent = s.tagline;
    $("#serviceTerm").textContent = s.term;
    $("#serviceCover").src = s.cover;
    $("#serviceCover").alt = s.title;
    $("#serviceRating").innerHTML = `${stars(s.rating)} <strong>${s.rating.toFixed(1)}</strong> <span class="muted">(${s.reviewsCount} отзывов)</span>`;
    $("#serviceProjects").textContent = `${s.contractor.projects} проектов`;
    $("#serviceResponse").textContent = `Отвечает за ${s.contractor.response}`;
    $("#serviceDescription").textContent = s.description;
    $("#serviceIncludes").innerHTML = s.includes.map((x) => `<li>${icon("check")}<span>${x}</span></li>`).join("");
    $("#contractorCard").innerHTML = `
      <span class="avatar">${s.contractor.initials}</span>
      <div style="flex:1;min-width:0">
        <h3>${s.contractor.name} <span class="badge green">${icon("verified")} ${s.contractor.level}</span></h3>
        <p>${s.contractor.company} · ${s.categoryLabel}</p>
        <div class="stats"><span><strong>${s.contractor.rating}</strong> рейтинг</span><span><strong>${s.contractor.projects}</strong> проектов</span><span><strong>${s.contractor.response}</strong> ответ</span></div>
      </div>`;
    hydrateIcons($("#contractorCard"));

    const reviews = DATA.reviews.filter((r) => r.serviceId === s.id);
    $("#reviewsList").innerHTML = reviews.length ? reviews.map((r) => `
      <div class="review">
        <div class="review-head"><span class="avatar orange">${r.author.slice(0, 1)}</span><div><div class="name">${r.author}</div><div class="role">${r.role}</div></div><span class="date">${r.date}</span></div>
        ${stars(r.rating)}
        <p>${r.text}</p>
      </div>`).join("") : `<p>Пока нет отзывов — станьте первым клиентом.</p>`;

    $("#faqList").innerHTML = s.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("");

    const packageList = $("#packageList");
    packageList.innerHTML = s.packages.map((p, i) => `
      <label class="package-option ${i === 0 ? "selected" : ""}" data-package="${p.id}">
        <input type="radio" name="package" value="${p.id}" ${i === 0 ? "checked" : ""}>
        <div class="package-top"><span class="package-name">${p.name}</span><span class="package-price">${money(p.price)}</span></div>
        <div class="package-desc">${p.desc}</div>
        <div class="package-days">${p.days} дней</div>
      </label>`).join("");

    const extrasList = $("#extrasList");
    extrasList.innerHTML = s.extras.map((e) => `<label class="extra-option"><input type="checkbox" name="extra" value="${e.id}"> <span>${e.name}</span><span class="price">+${money(e.price)}</span></label>`).join("");

    function current() {
      const pkgId = $('input[name="package"]:checked').value;
      const pkg = s.packages.find((p) => p.id === pkgId);
      const extras = $$('input[name="extra"]:checked').map((x) => s.extras.find((e) => e.id === x.value));
      return { pkg, extras };
    }

    function refreshTotal() {
      const { pkg, extras } = current();
      const total = pkg.price + extras.reduce((sum, e) => sum + e.price, 0);
      $("#orderTotal").textContent = money(total);
      $("#orderDays").textContent = pkg.days + " дней";
      $$(".package-option", packageList).forEach((el) => el.classList.toggle("selected", el.dataset.package === pkg.id));
    }
    packageList.addEventListener("change", refreshTotal);
    extrasList.addEventListener("change", refreshTotal);
    $("#orderButton").addEventListener("click", () => {
      const { pkg, extras } = current();
      openOrder(s.id, pkg.id, extras.map((x) => x.id));
    });

    $$(".tab").forEach((tab) => tab.addEventListener("click", () => {
      $$(".tab").forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      $$(".tab-panel").forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      $("#" + tab.dataset.tab).classList.add("active");
    }));
    refreshTotal();

    const related = DATA.services
      .filter((x) => x.id !== s.id && x.category === s.category)
      .concat(DATA.services.filter((x) => x.id !== s.id && x.category !== s.category))
      .slice(0, 3);
    const relatedGrid = $("#relatedGrid");
    if (relatedGrid) {
      relatedGrid.innerHTML = related.map(serviceCard).join("");
      hydrateIcons(relatedGrid);
    }
    initReveal();
  }

  /* ---------------- brief wizard ---------------- */
  function initBrief() {
    const form = $("#briefForm");
    if (!form) return;
    let step = 1;
    const total = 5;
    const taskLabels = { site: "Сайт или лендинг", design: "Дизайн и бренд", text: "Тексты и контент", ads: "Реклама и трафик", auto: "Автоматизация", other: "Другое" };
    const budgetLabels = { "30": "до 30 тыс. ₽", "60": "30–60 тыс. ₽", "120": "60–120 тыс. ₽", "200": "120–200 тыс. ₽", "200+": "200 тыс. ₽ +" };

    function val(name) {
      const el = form.querySelector(`[name="${name}"]:checked`) || form.querySelector(`[name="${name}"]`);
      return el ? el.value.trim() : "";
    }

    function showStep(n) {
      step = n;
      $$(".step-panel", form).forEach((p) => p.classList.toggle("active", Number(p.dataset.step) === n));
      const stepNow = $("#stepNow");
      if (stepNow) stepNow.textContent = n;
      $("#progressBar").style.width = (n / total * 100) + "%";
      $("#wizardStepLabel").textContent = `Шаг ${n} из ${total}`;
      const nextBtn = $("[data-next]", form);
      const submitBtn = $("#briefSubmit");
      if (nextBtn) nextBtn.style.display = n === total ? "none" : "inline-flex";
      if (submitBtn) submitBtn.style.display = n === total ? "inline-flex" : "none";
      const backBtn = $("[data-back]", form);
      if (backBtn) backBtn.style.visibility = n === 1 ? "hidden" : "visible";
      if (n === 5) updateSummary();
      window.scrollTo({ top: Math.max(0, form.getBoundingClientRect().top + window.scrollY - 110), behavior: "smooth" });
    }

    function validate(n) {
      $("#briefError").classList.remove("show");
      if (n === 1 && !val("task")) return "Выберите, что нужно сделать";
      if (n === 2 && val("description").length < 20) return "Расскажите о проекте хотя бы в двух предложениях";
      if (n === 3 && !val("budget")) return "Выберите бюджет";
      if (n === 4) {
        if (val("clientName").length < 2) return "Укажите имя";
        if (val("phone").replace(/\D/g, "").length < 10) return "Укажите телефон";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val("email"))) return "Укажите корректный email";
      }
      return "";
    }

    function updateSummary() {
      const task = taskLabels[val("task")] || "—";
      const desc = val("description") || "—";
      const budget = budgetLabels[val("budget")] || "—";
      const deadline = val("deadline") || "—";
      const name = val("clientName") || "—";
      const contact = [val("phone"), val("email")].filter(Boolean).join(" · ") || "—";
      $("#briefSummary").innerHTML = `
        <div class="row"><span>Задача</span><strong>${escapeHtml(task)}</strong></div>
        <div class="row"><span>О проекте</span><strong>${escapeHtml(desc)}</strong></div>
        <div class="row"><span>Бюджет</span><strong>${escapeHtml(budget)}</strong></div>
        <div class="row"><span>Срок</span><strong>${escapeHtml(deadline)}</strong></div>
        <div class="row"><span>Контакты</span><strong>${escapeHtml(name)} · ${escapeHtml(contact)}</strong></div>`;
    }

    form.addEventListener("change", (e) => {
      if (e.target.matches('input[name="task"]')) {
        $$(".choice-card", form).forEach((c) => c.classList.toggle("selected", c.contains(e.target) && e.target.checked));
      }
    });

    $$("[data-next]", form).forEach((btn) => btn.addEventListener("click", () => {
      const err = validate(step);
      if (err) {
        const box = $("#briefError");
        box.textContent = err;
        box.classList.add("show");
        return;
      }
      if (step < total) showStep(step + 1);
    }));
    $$("[data-back]", form).forEach((btn) => btn.addEventListener("click", () => {
      if (step > 1) showStep(step - 1);
    }));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!$("#briefConsent").checked) {
        const box = $("#briefError");
        box.textContent = "Нужно согласие на обработку данных";
        box.classList.add("show");
        return;
      }
      const brief = {
        id: "BR-" + Math.floor(1000 + Math.random() * 9000),
        createdAt: new Date().toISOString(),
        task: taskLabels[val("task")] || "",
        description: val("description"),
        budget: budgetLabels[val("budget")] || "",
        deadline: val("deadline"),
        name: val("clientName"),
        phone: val("phone"),
        email: val("email"),
        company: val("company")
      };
      const briefs = getStore("delo_briefs", []);
      briefs.unshift(brief);
      setStore("delo_briefs", briefs);
      $("#briefCard").innerHTML = `
        <div class="success-panel" style="padding:30px 10px">
          <div class="success-icon">${icon("check")}</div>
          <h3>Заявка ${brief.id} отправлена</h3>
          <p>В реальном продукте здесь появились бы 3–5 проверенных исполнителей. В демо мы сохранили заявку в вашем браузере.</p>
          <div class="order-summary" style="text-align:left;max-width:460px;margin:16px auto 0">
            <div class="row"><span>Задача</span><strong>${escapeHtml(brief.task)}</strong></div>
            <div class="row"><span>Бюджет</span><strong>${escapeHtml(brief.budget)}</strong></div>
            <div class="row"><span>Контакт</span><strong>${escapeHtml(brief.email)}</strong></div>
          </div>
          <a class="btn btn-primary btn-lg" href="catalog.html">${icon("grid")} Смотреть услуги</a>
        </div>`;
      hydrateIcons($("#briefCard"));
      $("#briefCard").scrollIntoView({ behavior: "smooth", block: "center" });
    });

    showStep(1);
  }

  /* ---------------- dashboard ---------------- */
  function initDashboard() {
    const root = $("#ordersRoot");
    if (!root) return;
    if (new URLSearchParams(location.search).get("new") === "1") {
      toast("Заказ создан. Деньги в escrow.");
      history.replaceState({}, "", "dashboard.html");
    }

    function statusMeta(status) {
      if (status === "done") return { label: "Завершён", cls: "done" };
      if (status === "review") return { label: "На проверке", cls: "" };
      return { label: "В работе", cls: "paid" };
    }

    function timeline(status) {
      const steps = ["Оплачен", "В работе", "Проверка", "Завершён"];
      const idx = status === "done" ? 3 : status === "review" ? 2 : 1;
      return `<div class="timeline">${steps.map((label, i) => `
        <div class="timeline-step ${i < idx ? "done" : i === idx ? "current" : ""}"><span class="dot"></span>${label}</div>
        ${i < steps.length - 1 ? '<span class="timeline-line"></span>' : ""}`).join("")}</div>`;
    }

    function render() {
      const orders = getStore("delo_orders", []);
      const active = orders.filter((o) => o.status !== "done").length;
      const escrow = orders.filter((o) => o.status !== "done").reduce((s, o) => s + o.total, 0);
      const done = orders.filter((o) => o.status === "done").length;
      $("#statActive").textContent = active;
      $("#statEscrow").textContent = money(escrow);
      $("#statDone").textContent = done;
      $("#statTotal").textContent = orders.length;

      if (!orders.length) {
        root.innerHTML = `<div class="empty-panel">
          <div class="empty-icon">${icon("briefcase")}</div>
          <h3>Пока нет заказов</h3>
          <p>Создайте демо-заказ или выберите услугу в каталоге — здесь появится статус, escrow и история.</p>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:18px">
            <a class="btn btn-primary" href="catalog.html">${icon("search")} Выбрать услугу</a>
            <button class="btn btn-light" type="button" id="demoOrder">${icon("spark")} Добавить демо-заказ</button>
          </div>
        </div>`;
        hydrateIcons(root);
        $("#demoOrder").addEventListener("click", () => {
          const s = DATA.services[0];
          const order = { id: orderId(), createdAt: new Date().toISOString(), serviceId: s.id, serviceTitle: s.title, cover: s.cover, contractor: s.contractor.name, packageName: "Стандарт", packagePrice: 65000, extras: [{ name: "Логотип и мини-бренд", price: 20000 }], total: 85000, days: 10, status: "paid", clientName: "Алексей", phone: "+7 999 000-00-00", email: "alex@company.ru" };
          const next = getStore("delo_orders", []);
          next.unshift(order);
          setStore("delo_orders", next);
          render();
          toast("Демо-заказ создан");
        });
        return;
      }

      root.innerHTML = orders.map((o) => {
        const meta = statusMeta(o.status);
        return `<article class="order-item">
          <div class="order-top">
            <div class="order-title">
              <img src="${o.cover}" alt="">
              <div><h3>${escapeHtml(o.serviceTitle)}</h3><p>${o.id} · ${escapeHtml(o.packageName)} · ${o.days} дней</p></div>
            </div>
            <span class="order-status ${meta.cls}">${meta.label}</span>
          </div>
          <div class="order-mid">
            ${timeline(o.status)}
            <div class="order-amount">${money(o.total)}<span>в escrow</span></div>
          </div>
          <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap;margin-top:12px">
            <div class="service-contractor" style="margin:0"><span class="avatar">${escapeHtml((o.contractor || "И").slice(0, 2))}</span><div><div class="name">${escapeHtml(o.contractor)}</div><div class="meta">Исполнитель</div></div></div>
            <div class="order-actions">
              <button class="btn btn-light btn-sm" type="button" data-chat="${o.id}">${icon("chat")} Чат</button>
              ${o.status === "review" ? `<button class="btn btn-primary btn-sm" type="button" data-accept="${o.id}">${icon("check")} Принять работу</button>` : ""}
              ${o.status === "paid" ? `<button class="btn btn-primary btn-sm" type="button" data-review="${o.id}">${icon("file")} Отправить на проверку</button>` : ""}
            </div>
          </div>
        </article>`;
      }).join("");
      hydrateIcons(root);
      $$("[data-chat]", root).forEach((b) => b.addEventListener("click", () => toast("Чат — демо. В продукте здесь будет переписка по заказу.")));
      $$("[data-accept]", root).forEach((b) => b.addEventListener("click", () => {
        const orders2 = getStore("delo_orders", []);
        const o = orders2.find((x) => x.id === b.dataset.accept);
        if (o) { o.status = "done"; setStore("delo_orders", orders2); render(); toast("Работа принята. Escrow освобождён."); }
      }));
      $$("[data-review]", root).forEach((b) => b.addEventListener("click", () => {
        const orders2 = getStore("delo_orders", []);
        const o = orders2.find((x) => x.id === b.dataset.review);
        if (o) { o.status = "review"; setStore("delo_orders", orders2); render(); toast("Заказ отправлен на проверку."); }
      }));
    }
    render();
  }

  /* ---------------- contractor ---------------- */
  function initContractor() {
    const form = $("#contractorForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#cName").value.trim();
      const email = $("#cEmail").value.trim();
      const spec = $("#cSpec").value;
      const portfolio = $("#cPortfolio").value.trim();
      const error = $("#contractorError");
      if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !spec) {
        error.textContent = "Заполните имя, email и специализацию";
        error.classList.add("show");
        return;
      }
      const apps = getStore("delo_applications", []);
      apps.unshift({ name, email, spec, portfolio, createdAt: new Date().toISOString() });
      setStore("delo_applications", apps);
      $("#contractorCard").innerHTML = `
        <div class="success-panel">
          <div class="success-icon">${icon("check")}</div>
          <h3>Заявка отправлена</h3>
          <p>В демо мы сохранили её в браузере. В продукте вы получили бы письмо с тестовым заданием и ссылкой на верификацию.</p>
          <a class="btn btn-primary" href="catalog.html">${icon("grid")} Посмотреть услуги</a>
        </div>`;
      hydrateIcons($("#contractorCard"));
    });
  }

  /* ---------------- boot ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    hydrateIcons();
    hydrateStars();
    initHeader();
    const page = document.body.dataset.page;
    if (page === "home") initHome();
    if (page === "catalog") initCatalog();
    if (page === "service") initService();
    if (page === "brief") initBrief();
    if (page === "dashboard") initDashboard();
    if (page === "contractor") initContractor();
    initReveal();
  });
})();
