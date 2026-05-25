export function initTamayGallery(
  gallery: HTMLElement,
  modal: HTMLElement,
  player: HTMLElement,
  closeBtn: HTMLElement
): () => void {
  const cleanups: (() => void)[] = [];

  function isMobile() {
    return window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
  }

  function lockScroll() {
    document.documentElement.classList.add("tamay-lock");
    document.body.classList.add("tamay-lock");
  }

  function unlockScroll() {
    document.documentElement.classList.remove("tamay-lock");
    document.body.classList.remove("tamay-lock");
  }

  function thumb(id: string) {
    const img = document.createElement("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.referrerPolicy = "no-referrer";
    img.alt = "Video thumbnail";

    const bust = () => "cb=" + Date.now() + "-" + Math.random().toString(16).slice(2);

    const candidates = [
      "https://i.ytimg.com/vi/" + id + "/hq720.jpg?" + bust(),
      "https://i.ytimg.com/vi/" + id + "/maxresdefault.jpg?" + bust(),
      "https://i.ytimg.com/vi/" + id + "/sddefault.jpg?" + bust(),
      "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg?" + bust(),
      "https://i.ytimg.com/vi/" + id + "/mqdefault.jpg?" + bust(),
      "https://i.ytimg.com/vi/" + id + "/default.jpg?" + bust(),
      "https://i.ytimg.com/vi_webp/" + id + "/hq720.webp?" + bust(),
      "https://i.ytimg.com/vi_webp/" + id + "/hqdefault.webp?" + bust(),
    ];

    let i = 0;
    function next() {
      if (i >= candidates.length) return;
      img.src = candidates[i++];
    }
    const onError = () => next();
    const onLoad = () => {
      if (img.naturalWidth && img.naturalWidth <= 140) next();
    };
    img.addEventListener("error", onError);
    img.addEventListener("load", onLoad);
    cleanups.push(() => {
      img.removeEventListener("error", onError);
      img.removeEventListener("load", onLoad);
    });
    next();
    return img;
  }

  function animateFromTileTo(targetRect: DOMRect, tileEl: HTMLElement) {
    const imgEl = tileEl.querySelector("img");
    if (!imgEl) return null;

    const r = tileEl.getBoundingClientRect();
    const ghost = document.createElement("div");
    ghost.className = "tamay-ghost";
    ghost.style.left = r.left + "px";
    ghost.style.top = r.top + "px";
    ghost.style.width = r.width + "px";
    ghost.style.height = r.height + "px";

    const ghostImg = document.createElement("img");
    ghostImg.src = (imgEl as HTMLImageElement).currentSrc || (imgEl as HTMLImageElement).src;
    ghost.appendChild(ghostImg);
    document.body.appendChild(ghost);

    const dx = targetRect.left - r.left;
    const dy = targetRect.top - r.top;
    const sx = targetRect.width / r.width;
    const sy = targetRect.height / r.height;

    ghost.animate(
      [
        { transform: "translate(0px,0px) scale(1,1)" },
        { transform: `translate(${dx}px,${dy}px) scale(${sx},${sy})` },
      ],
      { duration: 260, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
    );

    return ghost;
  }

  function removeGhost(ghost: HTMLElement | null) {
    ghost?.remove();
  }

  function embedIframe(container: HTMLElement, id: string) {
    container.innerHTML = "";
    const iframe = document.createElement("iframe");
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.src =
      "https://www.youtube-nocookie.com/embed/" +
      encodeURIComponent(id) +
      "?autoplay=1&mute=1&playsinline=1&rel=0&vq=hd1080&modestbranding=1";
    container.appendChild(iframe);
  }

  function openDesktopModal(id: string, tileEl: HTMLElement) {
    lockScroll();
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    closeBtn.classList.add("show");

    const box = player.parentElement;
    if (!box) return;
    const target = box.getBoundingClientRect();
    const ghost = animateFromTileTo(target, tileEl);

    window.setTimeout(() => {
      embedIframe(player, id);
      window.setTimeout(() => removeGhost(ghost), 120);
    }, 160);
  }

  function closeDesktopModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    player.innerHTML = "";
    closeBtn.classList.remove("show");
    unlockScroll();
  }

  const onCloseClick = () => closeDesktopModal();
  const onModalClick = (e: MouseEvent) => {
    if (e.target === modal) closeDesktopModal();
  };
  closeBtn.addEventListener("click", onCloseClick);
  modal.addEventListener("click", onModalClick);
  cleanups.push(() => {
    closeBtn.removeEventListener("click", onCloseClick);
    modal.removeEventListener("click", onModalClick);
  });

  function syncScrollLockForFullscreen() {
    const fs =
      document.fullscreenElement ||
      (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement;
    if (fs) {
      if (
        fs.closest &&
        (fs.closest(".tamay-mobile-overlay") || fs.closest(".tamay-modal"))
      ) {
        unlockScroll();
      }
      return;
    }
    if (document.querySelector(".tamay-mobile-overlay.active") && isMobile()) lockScroll();
    if (modal.classList.contains("active")) lockScroll();
  }

  document.addEventListener("fullscreenchange", syncScrollLockForFullscreen);
  document.addEventListener("webkitfullscreenchange", syncScrollLockForFullscreen);
  cleanups.push(() => {
    document.removeEventListener("fullscreenchange", syncScrollLockForFullscreen);
    document.removeEventListener("webkitfullscreenchange", syncScrollLockForFullscreen);
  });

  function ensureMobileOverlay(projectEl: HTMLElement) {
    let overlay = projectEl.querySelector<HTMLElement>(".tamay-mobile-overlay");
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.className = "tamay-mobile-overlay";

    const close = document.createElement("div");
    close.className = "tamay-mobile-close";
    close.textContent = "✕";

    const playerWrap = document.createElement("div");
    playerWrap.className = "tamay-mobile-player";

    overlay.appendChild(close);
    overlay.appendChild(playerWrap);

    function closeMobile() {
      overlay!.classList.remove("active");
      playerWrap.innerHTML = "";
      if (isMobile()) unlockScroll();
    }

    const onClose = (e: MouseEvent) => {
      e.stopPropagation();
      closeMobile();
    };
    const onOverlayClick = (e: MouseEvent) => {
      if (e.target !== overlay) return;
      if (isMobile()) return;
      closeMobile();
    };
    const onPlayerClick = (e: MouseEvent) => e.stopPropagation();

    close.addEventListener("click", onClose);
    overlay.addEventListener("click", onOverlayClick);
    playerWrap.addEventListener("click", onPlayerClick);
    cleanups.push(() => {
      close.removeEventListener("click", onClose);
      overlay?.removeEventListener("click", onOverlayClick);
      playerWrap.removeEventListener("click", onPlayerClick);
    });

    projectEl.appendChild(overlay);
    return overlay;
  }

  function openMobileOverlay(projectEl: HTMLElement, id: string, tileEl: HTMLElement) {
    const videosEl = projectEl.querySelector<HTMLElement>(".tamay-videos");
    if (!videosEl) return;

    const overlay = ensureMobileOverlay(projectEl);
    const playerWrap = overlay.querySelector<HTMLElement>(".tamay-mobile-player");
    if (!playerWrap) return;

    if (isMobile()) {
      lockScroll();
      overlay.style.top = "";
      overlay.style.height = "";
    } else {
      overlay.style.top = videosEl.offsetTop + "px";
      overlay.style.height = videosEl.offsetHeight + "px";
    }

    overlay.classList.add("active");

    const target = playerWrap.getBoundingClientRect();
    const ghost = animateFromTileTo(target, tileEl);

    window.setTimeout(() => {
      embedIframe(playerWrap, id);
      window.setTimeout(() => removeGhost(ghost), 120);
    }, 160);
  }

  gallery.querySelectorAll<HTMLElement>(".tamay-project").forEach((p) => {
    const ids = (p.dataset.videos || "")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);

    const desc = p.dataset.desc || "";
    const title = p.dataset.title || "";
    const grid = document.createElement("div");
    grid.className = "tamay-videos";

    if (ids.length === 1) grid.classList.add("layout-1");

    ids.forEach((id, i) => {
      const slot = document.createElement("div");
      slot.className = "slot-" + i;
      if (i === 0 && ids.length >= 3) slot.classList.add("main");

      const tile = document.createElement("div");
      tile.className = "tamay-tile";

      const img = thumb(id);
      const tileOverlay = document.createElement("div");
      tileOverlay.className = "tamay-overlay";
      const play = document.createElement("div");
      play.className = "tamay-play";

      tileOverlay.appendChild(play);
      tile.appendChild(img);
      tile.appendChild(tileOverlay);

      const onTileClick = () => {
        if (isMobile()) openMobileOverlay(p, id, tile);
        else openDesktopModal(id, tile);
      };
      tile.addEventListener("click", onTileClick);
      cleanups.push(() => tile.removeEventListener("click", onTileClick));

      slot.appendChild(tile);
      grid.appendChild(slot);
    });

    if (title) {
      const h = document.createElement("h2");
      h.className = "font-heading text-xl text-tamay-primary font-semibold mb-4 text-center";
      h.textContent = title;
      p.appendChild(h);
    }

    p.appendChild(grid);

    if (desc) {
      const d = document.createElement("div");
      d.className = "tamay-desc";
      d.textContent = desc;
      p.appendChild(d);
    }
  });

  return () => {
    closeDesktopModal();
    document.querySelectorAll(".tamay-mobile-overlay.active").forEach((el) => {
      el.classList.remove("active");
      el.querySelector(".tamay-mobile-player")!.innerHTML = "";
    });
    document.querySelectorAll(".tamay-ghost").forEach((el) => el.remove());
    cleanups.forEach((fn) => fn());
    unlockScroll();
  };
}
