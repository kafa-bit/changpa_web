const stage = document.body;
const entrySwitch = document.querySelector(".entry-switch");
const lightSwitch = document.querySelector(".light-switch");
const lightLabel = document.querySelector(".light-console > span");
const actorsSwitch = document.querySelector(".actors-switch");
const actorRoster = document.querySelector(".actor-roster");
const actorNames = [...document.querySelectorAll(".actor-list li")];
const worldSwitch = document.querySelector(".world-switch");
const about = document.querySelector("#about");
const workPanels = [...document.querySelectorAll(".work-panel")];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

stage.classList.add("entry-locked");

const enterSite = () => {
  stage.classList.add("site-entered");
  entrySwitch.setAttribute("aria-pressed", "true");
  entrySwitch.setAttribute("aria-label", "극단 창파 무대 켜짐");

  window.setTimeout(() => {
    stage.classList.remove("entry-locked");
  }, prefersReducedMotion.matches ? 0 : 720);
};

const setLight = (isLit) => {
  stage.classList.toggle("stage-lit", isLit);
  lightSwitch.setAttribute("aria-pressed", String(isLit));
  lightSwitch.setAttribute("aria-label", `창파 소개 조명 ${isLit ? "끄기" : "켜기"}`);
  lightLabel.textContent = isLit ? "소개 시작" : "소개 조명";
};

const setActorsArchive = (isOpen) => {
  stage.classList.toggle("actors-open", isOpen);
  actorsSwitch.setAttribute("aria-pressed", String(isOpen));
  actorsSwitch.setAttribute(
    "aria-label",
    `창파 출연 배우 명단 ${isOpen ? "끄기" : "켜기"}`,
  );
  actorRoster.setAttribute("aria-hidden", String(!isOpen));
};

const selectWork = (activePanel) => {
  workPanels.forEach((panel) => {
    const isActive = panel === activePanel;

    panel.classList.toggle("is-active", isActive);
    panel.querySelector(".work-tab").setAttribute("aria-expanded", String(isActive));
  });
};

entrySwitch.addEventListener("click", enterSite);

lightSwitch.addEventListener("click", () => {
  const isLit = !stage.classList.contains("stage-lit");

  setLight(isLit);

  if (isLit) {
    window.setTimeout(() => {
      about.scrollIntoView({
        behavior: prefersReducedMotion.matches ? "auto" : "smooth",
        block: "start",
      });
    }, prefersReducedMotion.matches ? 0 : 560);
  }
});

actorsSwitch.addEventListener("click", () => {
  setActorsArchive(!stage.classList.contains("actors-open"));
});

worldSwitch.addEventListener("click", () => {
  worldSwitch.setAttribute("aria-pressed", "true");
  worldSwitch.setAttribute("aria-label", "해외 공연 자료 페이지 켜짐");

  window.setTimeout(() => {
    window.location.href = "./world.html";
  }, prefersReducedMotion.matches ? 0 : 460);
});

workPanels.forEach((panel) => {
  const tab = panel.querySelector(".work-tab");

  tab.addEventListener("click", () => selectWork(panel));
  tab.addEventListener("focus", () => selectWork(panel));
});

actorNames.forEach((name, index) => {
  name.style.setProperty("--actor-index", index);
});
