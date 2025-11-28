// ===== Mobile Nav Toggle =====
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

// ===== Location Demo =====
const findFoodBtn = document.getElementById("findFoodBtn");
const locationInput = document.getElementById("locationInput");

findFoodBtn.addEventListener("click", () => {
  const value = locationInput.value.trim();
  if (!value) {
    alert("Please enter your location (demo).");
    return;
  }
  alert(`Showing restaurants near "${value}" (portfolio demo).`);
});

// ===== Filters =====
const filterButtons = document.querySelectorAll(".filter-btn");
const restaurantCards = document.querySelectorAll(".restaurant-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    restaurantCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || filter === category) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ===== Cart (Demo Logic) =====
const addButtons = document.querySelectorAll(".add-to-cart");
const cartList = document.getElementById("cartList");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

// Simple demo pricing
const basePrice = 250; // assume each item ~₹250

let cartItems = [];

function renderCart() {
  cartList.innerHTML = "";

  if (cartItems.length === 0) {
    const li = document.createElement("li");
    li.classList.add("empty");
    li.textContent = "No items yet. Add something tasty 🍕";
    cartList.appendChild(li);
    cartCount.textContent = "0";
    cartTotal.textContent = "₹0";
    return;
  }

  cartItems.forEach((item, index) => {
    const li = document.createElement("li");

    const left = document.createElement("span");
    left.classList.add("item-name");
    left.textContent = item;

    const btn = document.createElement("button");
    btn.classList.add("remove-item");
    btn.textContent = "Remove";
    btn.addEventListener("click", () => {
      cartItems.splice(index, 1);
      renderCart();
    });

    li.appendChild(left);
    li.appendChild(btn);
    cartList.appendChild(li);
  });

  cartCount.textContent = cartItems.length.toString();
  cartTotal.textContent = `₹${cartItems.length * basePrice}`;
}

addButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const itemName = btn.getAttribute("data-item") || "Food Item";
    cartItems.push(itemName);
    renderCart();
  });
});

checkoutBtn.addEventListener("click", () => {
  if (cartItems.length === 0) {
    alert("Cart is empty. Add some items first (demo).");
    return;
  }
  alert(
    `Checkout successful! (Demo only)\n\nItems: ${cartItems.join(
      ", "
    )}\nTotal: ${cartItems.length * basePrice}`
  );
  cartItems = [];
  renderCart();
});

renderCart();

// ===== Login Modal =====
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");

loginBtn.addEventListener("click", () => loginModal.classList.add("show"));
closeModal.addEventListener("click", () => loginModal.classList.remove("show"));
loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) loginModal.classList.remove("show");
});

// ===== Login Form Demo =====
const modalForm = document.querySelector(".modal-form");

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login successful! (Demo for portfolio)");
  loginModal.classList.remove("show");
  modalForm.reset();
});

// ===== Contact Form Demo =====
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Message sent! (Demo for portfolio)");
  contactForm.reset();
});
