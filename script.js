/* ============================================================
   MTD Studio — Coming Soon
   Vanilla JS only: countdown, status pill clock, contact form
   ============================================================ */

(function () {
  "use strict";

  /* ---------- CONFIG ----------
     Set your real launch date/time here (local time, ISO format).
     Example: '2026-09-15T09:00:00'
  --------------------------------- */
  const LAUNCH_DATE = new Date("2026-09-15T09:00:00");
  const LAUNCH_ANNOUNCED = new Date("2026-08-02T00:00:00"); // used only for progress bar

  const els = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
    progress: document.getElementById("progressFill"),
    clock: document.getElementById("clock"),
    year: document.getElementById("year"),
  };

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function setValue(el, value) {
    if (!el) return;
    if (el.textContent === value) return;
    el.textContent = value;
    el.classList.remove("tick");
    // force reflow so the animation can replay
    void el.offsetWidth;
    el.classList.add("tick");
  }

  function updateCountdown() {
    const now = new Date();
    const total = LAUNCH_DATE - now;

    if (total <= 0) {
      setValue(els.days, "00");
      setValue(els.hours, "00");
      setValue(els.minutes, "00");
      setValue(els.seconds, "00");
      if (els.progress) els.progress.style.width = "100%";
      return;
    }

    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / (1000 * 60)) % 60);
    const seconds = Math.floor((total / 1000) % 60);

    setValue(els.days, pad(days));
    setValue(els.hours, pad(hours));
    setValue(els.minutes, pad(minutes));
    setValue(els.seconds, pad(seconds));

    const span = LAUNCH_DATE - LAUNCH_ANNOUNCED;
    const elapsed = now - LAUNCH_ANNOUNCED;
    const pct = Math.min(100, Math.max(0, (elapsed / span) * 100));
    if (els.progress) els.progress.style.width = pct + "%";
  }

  function updateClock() {
    if (!els.clock) return;
    const now = new Date();
    els.clock.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  updateCountdown();
  updateClock();
  setInterval(updateCountdown, 1000);
  setInterval(updateClock, 15000);

  if (els.year) els.year.textContent = new Date().getFullYear();

  /* ---------- Contact form ---------- */
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      const action = form.getAttribute("action") || "";
      const isPlaceholder = action.includes("yourFormID");

      // No real form backend configured yet — keep it graceful instead of
      // sending a request that will fail.
      if (isPlaceholder) {
        e.preventDefault();
        status.textContent =
          "Form isn't connected yet — add your Formspree endpoint in index.html.";
        status.className = "form-status is-error";
        return;
      }

      e.preventDefault();
      status.textContent = "";
      status.className = "form-status";
      submitBtn.disabled = true;
      submitBtn.querySelector(".submit-btn__label").textContent = "Sending…";

      fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then((res) => {
          if (res.ok) {
            form.reset();
            status.textContent = "Thanks — we'll be in touch at launch.";
            status.className = "form-status is-success";
          } else {
            throw new Error("Request failed");
          }
        })
        .catch(() => {
          status.textContent = "Something went wrong. Please try again.";
          status.className = "form-status is-error";
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.querySelector(".submit-btn__label").textContent =
            "Notify Me";
        });
    });
  }
})();
