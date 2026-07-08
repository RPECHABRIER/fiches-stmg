/* =========================================================================
   Moteur de présentation "Fiches interactives" — Terminale STMG
   -------------------------------------------------------------------------
   Ce fichier ne contient AUCUN contenu de cours : il sait juste comment
   transformer un objet SESSION_DATA (voir /data/*.js) en diaporama animé.
   Pour créer une nouvelle séance : copier un fichier dans /data/, changer
   le contenu, l'ajouter au manifest, puis ouvrir seance.html?s=<id>.
   ========================================================================= */

(function () {
  "use strict";

  const deckEl = document.getElementById("deck");
  const progressFill = document.getElementById("progress-fill");
  const counterEl = document.getElementById("slide-counter");
  const dotsEl = document.getElementById("slide-dots");
  const hintEl = document.getElementById("nav-hint");

  let slides = [];      // liste des éléments DOM .slide
  let current = 0;
  let session = null;

  /* ------------------------------------------------------------------- *
   *  Chargement des données de séance (data/<id>.js -> window.SESSION_DATA)
   * ------------------------------------------------------------------- */
  function loadSession() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("s") || document.body.dataset.defaultSession;

    if (!id) {
      showFatalError("Aucune séance indiquée. Ajoute <code>?s=identifiant</code> à l'URL.");
      return;
    }

    const script = document.createElement("script");
    script.src = `data/${id}.js`;
    script.onload = () => {
      if (!window.SESSION_DATA) {
        showFatalError(`Le fichier data/${id}.js ne définit pas SESSION_DATA.`);
        return;
      }
      session = window.SESSION_DATA;
      window.SESSION_DATA = null; // évite les collisions si on recharge
      init(session);
    };
    script.onerror = () => {
      showFatalError(`Impossible de charger <code>data/${id}.js</code>. Vérifie l'identifiant dans l'URL.`);
    };
    document.head.appendChild(script);
  }

  function showFatalError(html) {
    deckEl.innerHTML = `<div class="slide active kind-title" style="position:relative;opacity:1;transform:none;">
      <div class="slide-bg"></div>
      <div class="stage"><h1 style="font-size:2.4rem;">Oups 🙈</h1><p style="font-size:1.3rem;">${html}</p></div>
    </div>`;
  }

  /* ------------------------------------------------------------------- *
   *  Construction du diaporama
   * ------------------------------------------------------------------- */
  function init(data) {
    document.title = `${data.title} — ${data.subtitle || ""}`.trim();

    data.slides.forEach((slideData, i) => {
      const el = renderSlide(slideData, i);
      deckEl.appendChild(el);
      slides.push(el);
    });

    buildDots();
    goTo(0, true);
    updateChrome();
    bindEvents();
  }

  /* ------------------------------------------------------------------- *
   *  Rendu d'une slide selon son "type"
   * ------------------------------------------------------------------- */
  function renderSlide(s, index) {
    const wrap = document.createElement("section");
    wrap.className = `slide kind-${s.type}`;
    wrap.dataset.index = index;

    const bg = document.createElement("div");
    bg.className = "slide-bg";
    wrap.appendChild(bg);

    const stage = document.createElement("div");
    stage.className = "stage";
    wrap.appendChild(stage);

    const renderer = RENDERERS[s.type] || RENDERERS.fallback;
    renderer(stage, s);

    if (s.autoCelebrate) wrap.dataset.autocelebrate = "true";

    return wrap;
  }

  const RENDERERS = {
    fallback(stage, s) {
      stage.innerHTML = `<p>Type de slide inconnu : ${s.type}</p>`;
    },

    title(stage, s) {
      stage.classList.add("stage-title");
      stage.innerHTML = `
        <p class="kicker">${s.kicker || ""}</p>
        <h1 class="title-word">${s.title}</h1>
        <p class="subtitle">${s.subtitle || ""}</p>
        <p class="footer-note">${s.footer || ""}</p>
        <p class="nav-tip">→ / Espace pour avancer&nbsp;&nbsp;·&nbsp;&nbsp;clique sur un trou pour le révéler&nbsp;&nbsp;·&nbsp;&nbsp;F pour le plein écran</p>
      `;
    },

    objectif(stage, s) {
      stage.innerHTML = `
        <div class="icon-badge">${s.icon || "🎯"}</div>
        <h2>${s.title}</h2>
        <p class="lead">${s.text}</p>
      `;
    },

    organisation(stage, s) {
      stage.innerHTML = `<h2>${s.title}</h2><div class="card-row"></div>`;
      const row = stage.querySelector(".card-row");
      (s.cards || []).forEach((c, i) => {
        const card = document.createElement("div");
        card.className = "org-card revealable";
        card.style.setProperty("--delay", `${i * 0.08}s`);
        card.innerHTML = `<div class="org-icon">${c.icon}</div><h3>${c.title}</h3><p>${c.text}</p>`;
        row.appendChild(card);
      });
    },

    flash(stage, s) {
      stage.innerHTML = `
        <h2>${s.title}</h2>
        <p class="subtitle small">${s.subtitle || ""}</p>
        <ol class="flash-list"></ol>
      `;
      const list = stage.querySelector(".flash-list");
      (s.questions || []).forEach((q, i) => {
        const li = document.createElement("li");
        li.className = "flash-item revealable";
        li.dataset.celebrate = "small";
        li.innerHTML = `
          <span class="flash-num">${i + 1}</span>
          <div class="flash-body">
            <p class="flash-q">${q.q}</p>
            <p class="flash-a"><span class="dots">poser sa réponse…</span><span class="answer">✅ ${q.a}</span></p>
          </div>`;
        list.appendChild(li);
      });
    },

    cours(stage, s) {
      stage.innerHTML = `
        <h2>${s.title}</h2>
        <p class="subtitle small">${s.subtitle || ""}</p>
        <div class="cours-blocks"></div>
      `;
      const container = stage.querySelector(".cours-blocks");
      (s.blocks || []).forEach((block) => {
        const blockEl = document.createElement("div");
        blockEl.className = "cours-block";
        if (block.label) {
          const label = document.createElement("p");
          label.className = "block-label";
          label.textContent = block.label;
          blockEl.appendChild(label);
        }
        (block.paragraphs || []).forEach((p) => {
          const para = document.createElement("p");
          para.className = "cours-line" + (p.big ? " big" : "");
          para.appendChild(renderSegments(p.segments));
          blockEl.appendChild(para);
        });
        container.appendChild(blockEl);
      });
    },

    exercice(stage, s) {
      stage.innerHTML = `
        <div class="ex-header">
          <h2>${s.title}</h2>
          ${s.tag ? `<span class="tag">${s.tag}</span>` : ""}
        </div>
        <p class="ex-context">${s.context}</p>
        <div class="ex-questions"></div>
      `;
      const qWrap = stage.querySelector(".ex-questions");
      (s.questions || []).forEach((q) => {
        const item = document.createElement("div");
        item.className = "ex-item revealable";
        item.dataset.celebrate = "small";
        item.innerHTML = `
          <p class="ex-q">${q.text}</p>
          <p class="ex-a"><span class="dots">Correction masquée — clique pour révéler</span><span class="answer">✅ ${q.answer}</span></p>
        `;
        qWrap.appendChild(item);
      });
    },

    bilan(stage, s) {
      stage.innerHTML = `
        <h2>${s.title}</h2>
        <ul class="bilan-list"></ul>
      `;
      const list = stage.querySelector(".bilan-list");
      (s.items || []).forEach((item) => {
        const li = document.createElement("li");
        li.className = "bilan-item revealable";
        li.dataset.celebrate = "small";
        li.appendChild(renderSegments(item.segments));
        list.appendChild(li);
      });
    },

    fin(stage, s) {
      stage.innerHTML = `
        <div class="trophy">🏆</div>
        <h1>${s.title}</h1>
        <p class="subtitle">${s.subtitle || ""}</p>
        <ul class="fin-list"></ul>
        <p class="footer-note">${s.footer || ""}</p>
      `;
      const list = stage.querySelector(".fin-list");
      (s.recap || []).forEach((text, i) => {
        const li = document.createElement("li");
        li.className = "fin-item";
        li.style.setProperty("--delay", `${0.4 + i * 0.25}s`);
        li.innerHTML = `<span class="check">✔</span> ${text}`;
        list.appendChild(li);
      });
    },
  };

  /* Segments : tableau de chaînes (texte brut) ou {b:"réponse"} (trou) */
  function renderSegments(segments) {
    const frag = document.createDocumentFragment();
    (segments || []).forEach((seg) => {
      if (typeof seg === "string") {
        frag.appendChild(document.createTextNode(seg));
      } else if (seg && typeof seg === "object" && "b" in seg) {
        const span = document.createElement("span");
        span.className = "trou revealable";
        span.dataset.celebrate = "sparkle";
        span.innerHTML = `<span class="dots">?</span><span class="answer">${seg.b}</span>`;
        frag.appendChild(span);
      }
    });
    return frag;
  }

  /* ------------------------------------------------------------------- *
   *  Navigation : reveal progressif puis changement de slide
   * ------------------------------------------------------------------- */
  function revealableItems(slideEl) {
    return Array.from(slideEl.querySelectorAll(".revealable"));
  }

  function revealOne(item) {
    if (item.classList.contains("revealed")) return;
    item.classList.add("revealed");
    const rect = item.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    if (item.dataset.celebrate === "sparkle") {
      window.Confetti.sparkle(cx, cy);
    } else if (item.dataset.celebrate === "small") {
      window.Confetti.burst(cx, cy, 26);
    }
  }

  function revealAll(slideEl) {
    revealableItems(slideEl).forEach(revealOne);
  }

  function next() {
    const slideEl = slides[current];
    const items = revealableItems(slideEl);
    const pending = items.find((it) => !it.classList.contains("revealed"));
    if (pending) {
      revealOne(pending);
      return;
    }
    if (current < slides.length - 1) goTo(current + 1);
  }

  function prev() {
    if (current > 0) goTo(current - 1);
  }

  function goTo(index, silent) {
    if (index < 0 || index >= slides.length) return;
    slides.forEach((el) => el.classList.remove("active"));
    current = index;
    const el = slides[current];
    el.classList.add("active");
    updateChrome();

    if (el.dataset.autocelebrate === "true") {
      setTimeout(() => {
        const rect = el.getBoundingClientRect();
        window.Confetti.burst(rect.width / 2, rect.height * 0.15, 140);
        window.Confetti.burst(60, 40, 90);
        window.Confetti.burst(rect.width - 60, 40, 90);
      }, 350);
    }
    if (!silent) el.scrollIntoView && el.scrollIntoView({ block: "nearest" });
  }

  function updateChrome() {
    const pct = slides.length > 1 ? (current / (slides.length - 1)) * 100 : 100;
    progressFill.style.width = `${pct}%`;
    counterEl.textContent = `${current + 1} / ${slides.length}`;
    Array.from(dotsEl.children).forEach((d, i) => {
      d.classList.toggle("active", i === current);
    });
    if (hintEl) {
      hintEl.style.opacity = current === 0 ? "1" : "0";
    }
  }

  function buildDots() {
    dotsEl.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "dot";
      dot.setAttribute("aria-label", `Aller à la slide ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsEl.appendChild(dot);
    });
  }

  /* ------------------------------------------------------------------- *
   *  Événements
   * ------------------------------------------------------------------- */
  function bindEvents() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          prev();
          break;
        case "Home":
          goTo(0);
          break;
        case "End":
          goTo(slides.length - 1);
          break;
        case "r":
        case "R":
          revealAll(slides[current]);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
      }
    });

    deckEl.addEventListener("click", (e) => {
      const item = e.target.closest(".revealable");
      if (item) {
        revealOne(item);
        return;
      }
      if (e.target.closest(".chrome")) return;
      next();
    });

    document.getElementById("btn-prev").addEventListener("click", prev);
    document.getElementById("btn-next").addEventListener("click", next);
    document.getElementById("btn-fullscreen").addEventListener("click", toggleFullscreen);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  }

  loadSession();
})();
