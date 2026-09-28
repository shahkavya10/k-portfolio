document.addEventListener("DOMContentLoaded", function () {

  /* TYPING ANIMATION */

  const textArray = [
    "Aspiring Frontend Developer",
    "B.Com + Tech Enthusiast",
    "Learning Python & SQL",
    "Building Modern Web Interfaces"
  ];

  let index = 0;
  let charIndex = 0;

  const typingElement = document.getElementById("typing-text");

  function type() {
    if (charIndex < textArray[index].length) {
      typingElement.textContent += textArray[index].charAt(charIndex);
      charIndex++;
      setTimeout(type, 70);
    } else {
      setTimeout(erase, 1500);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typingElement.textContent = textArray[index].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 40);
    } else {
      index++;
      if (index >= textArray.length) index = 0;
      setTimeout(type, 500);
    }
  }

  // FIX 1: Only call type() once, and only if the element exists
  if (typingElement) {
    type();
  }

  /* SCROLL REVEAL */

  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // FIX 2: Run on load so elements already in view get revealed immediately

  /* SCROLL PROGRESS */

  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
  });

  /* PARTICLES */

  particlesJS("particles-js", {
    particles: {
      number: { value: 80 },
      color: { value: "#ffffff" }, // FIX 3: Added missing particle color
      size: { value: 3 },
      move: { speed: 1 },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.2,
        width: 1
      }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "repulse" }
      }
    }
  });

  /* MOBILE MENU */
  // FIX 4: Moved inside DOMContentLoaded so elements are guaranteed to exist

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }


  /* PRIVACY-CONSCIOUS ANALYTICS */

  const ANALYTICS_CONSENT_KEY = "analyticsConsent";
  const ANALYTICS_MEASUREMENT_ID = "G-2B8T9P5WT0";
  const consentBanner = document.getElementById("analytics-consent");
  const acceptAnalytics = document.getElementById("analytics-accept");
  const declineAnalytics = document.getElementById("analytics-decline");
  const manageAnalytics = document.getElementById("manage-analytics");

  function getAnalyticsConsent() {
    try {
      return window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    } catch (error) {
      return null;
    }
  }

  function saveAnalyticsConsent(value) {
    try {
      window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
    } catch (error) {
      // The banner still works if browser storage is unavailable.
    }
  }

  function loadAnalytics() {
    if (window.__portfolioAnalyticsRequested) return;

    window.__portfolioAnalyticsRequested = true;
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      window.dataLayer.push(arguments);
    }

    window.gtag = gtag;

    gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });

    gtag("js", new Date());
    gtag("config", ANALYTICS_MEASUREMENT_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    const analyticsScript = document.createElement("script");
    analyticsScript.async = true;
    analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_MEASUREMENT_ID}`;
    document.head.appendChild(analyticsScript);
  }

  function removeAnalyticsCookies() {
    document.cookie.split(";").forEach(cookie => {
      const name = cookie.split("=")[0].trim();
      if (name === "_ga" || name.startsWith("_ga_")) {
        document.cookie = `${name}=; Max-Age=0; path=/`;
      }
    });
  }

  function withdrawAnalytics() {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });
    }

    removeAnalyticsCookies();
  }

  function setAnalyticsChoice(choice) {
    saveAnalyticsConsent(choice);

    if (choice === "granted") {
      loadAnalytics();
    } else {
      withdrawAnalytics();
    }

    if (consentBanner) {
      consentBanner.hidden = true;
    }
  }

  if (acceptAnalytics) {
    acceptAnalytics.addEventListener("click", () => {
      setAnalyticsChoice("granted");
    });
  }

  if (declineAnalytics) {
    declineAnalytics.addEventListener("click", () => {
      setAnalyticsChoice("denied");
    });
  }

  if (manageAnalytics) {
    manageAnalytics.addEventListener("click", () => {
      if (consentBanner) {
        consentBanner.hidden = false;
      }
    });
  }

  const analyticsConsent = getAnalyticsConsent();

  if (analyticsConsent === "granted") {
    loadAnalytics();
  } else if (analyticsConsent === null && consentBanner) {
    consentBanner.hidden = false;
  }

});
