// Theme handling: light / dark, persisted in localStorage-less environments too.
(function(){
  const STORAGE_KEY = "jptbeat-theme";
  let saved = null;
  try { saved = window.localStorage.getItem(STORAGE_KEY); } catch(e) { saved = null; }

  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", initial);

  function applyToggleLabel(btn, theme){
    if(!btn) return;
    btn.innerHTML = theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  }

  window.addEventListener("DOMContentLoaded", function(){
    const btn = document.getElementById("theme-toggle");
    applyToggleLabel(btn, document.documentElement.getAttribute("data-theme"));
    if(btn){
      btn.addEventListener("click", function(){
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try { window.localStorage.setItem(STORAGE_KEY, next); } catch(e) {}
        applyToggleLabel(btn, next);
      });
    }
  });
})();
