const $ = (s) => document.querySelector(s),
  $$ = (s) => document.querySelectorAll(s);
const menu = $(".menu"),
  links = $(".nav-links");
menu.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
});
$$(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => links.classList.remove("open")),
);

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }),
  { threshold: 0.12 },
);
$$(".reveal").forEach((el) => observer.observe(el));

const modal = $("#modal"),
  selectedPlan = $("#selectedPlan"),
  selectedPrice = $("#selectedPrice"),
  modalTitle = $("#modalTitle");
const prices = {
  Bronze: "₹2,999 / year",
  Silver: "₹4,999 / year",
  Gold: "₹7,999 / year",
};
$$(".choose").forEach((btn) =>
  btn.addEventListener("click", () => {
    const plan = btn.dataset.plan;
    selectedPlan.textContent = plan;
    selectedPrice.textContent = prices[plan];
    modalTitle.textContent = `${plan} Membership`;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }),
);
function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}
$(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
$(".modal-contact").addEventListener("click", closeModal);

const spend = $("#spend"),
  rate = $("#rate"),
  rateLabel = $("#rateLabel"),
  calcPlan = $("#calcPlan"),
  saving = $("#saving");
function calculate() {
  const value = Math.max(0, Number(spend.value) || 0),
    pct = Number(rate.value) || 0,
    fee = Number(calcPlan.value) || 0;
  const gross = Math.round((value * pct) / 100);
  const net = Math.max(0, gross - fee);
  saving.textContent = "₹" + net.toLocaleString("en-IN");
}
rate.addEventListener("input", () => {
  rateLabel.textContent = rate.value + "%";
  calculate();
});
spend.addEventListener("input", calculate);
calcPlan.addEventListener("change", calculate);
$("#calcBtn").addEventListener("click", () => {
  calculate();
  showToast(
    "Savings estimate updated",
    "This is an illustrative demo calculation.",
  );
});
calculate();

const quotes = [
  [
    "Ananya Shah",
    "Gold Member · Mumbai",
    "The membership makes regular healthcare feel simpler and more affordable. Everything is clear and easy to understand.",
    "AS",
  ],
  [
    "Rahul Mehta",
    "Silver Member · Pune",
    "I like having preventive checkups and member savings in one simple healthcare plan.",
    "RM",
  ],
  [
    "Priya Nair",
    "Gold Member · Nashik",
    "A clear membership experience makes it easier for our family to stay consistent with healthcare.",
    "PN",
  ],
];
let q = 0;
function renderQuote() {
  const [name, meta, text, initials] = quotes[q];
  $("#personName").textContent = name;
  $("#personMeta").textContent = meta;
  $("#quote").textContent = text;
  $("#avatar").textContent = initials;
  $$("#dots button").forEach((d, i) => d.classList.toggle("active", i === q));
}
$(".next").addEventListener("click", () => {
  q = (q + 1) % quotes.length;
  renderQuote();
});
$(".prev").addEventListener("click", () => {
  q = (q - 1 + quotes.length) % quotes.length;
  renderQuote();
});
$$("#dots button").forEach((d, i) =>
  d.addEventListener("click", () => {
    q = i;
    renderQuote();
  }),
);

$("#cardDemo").addEventListener("click", () => {
  document
    .querySelector(".member-card")
    .animate(
      [
        { transform: "rotate(3deg) scale(1)" },
        { transform: "rotate(0deg) scale(1.035)" },
        { transform: "rotate(3deg) scale(1)" },
      ],
      { duration: 650, easing: "ease-out" },
    );
  showToast(
    "Digital card preview",
    "This represents the future member identity experience.",
  );
});

function showToast(title, text) {
  $(".toast b").textContent = title;
  $(".toast small").textContent = text;
  const t = $("#toast");
  t.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
}
$("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("Thank you!", "Your enquiry has been captured for this demo.");
  e.target.reset();
});

const topButton = $("#topBtn");
window.addEventListener("scroll", () =>
  topButton.classList.toggle("show", scrollY > 500),
);
topButton.addEventListener("click", () =>
  scrollTo({ top: 0, behavior: "smooth" }),
);

// Smooth anchor fallback for browsers that don't honor CSS scroll behavior.
$$('a[href^="#"]').forEach((a) =>
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }),
);

if (window.lucide) window.lucide.createIcons();
