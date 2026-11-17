const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navigation.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const contactForm = document.querySelector("#contact-form");
const formError = document.querySelector("#form-error");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formError.hidden = true;

  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const name = formData.get("name").toString().trim();
  const email = formData.get("email").toString().trim();
  const message = formData.get("message").toString().trim();

  if (!name || !email || !message) {
    formError.textContent = "Please complete all fields before continuing.";
    formError.hidden = false;
    return;
  }

  const text = `Hi Kusuma!\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const whatsappUrl = `https://wa.me/918897883195?text=${encodeURIComponent(text)}`;
  const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  if (!whatsappWindow) {
    formError.textContent = "Your browser blocked the new tab. Please allow pop-ups or contact Kusuma by email.";
    formError.hidden = false;
  }
});
