const pos_var_inventory = [
  { pos_var_item_name: "ItemName1", pos_var_item_stock: 10, pos_var_item_price: 111, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-1.jpg" },
  { pos_var_item_name: "ItemName2", pos_var_item_stock: 10, pos_var_item_price: 116, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-2.jpg" },
  { pos_var_item_name: "ItemName3", pos_var_item_stock: 10, pos_var_item_price: 121, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-3.jpg" },
  { pos_var_item_name: "ItemName4", pos_var_item_stock: 10, pos_var_item_price: 126, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-4.jpg" },
  { pos_var_item_name: "ItemName5", pos_var_item_stock: 10, pos_var_item_price: 131, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-5.jpg" },
  { pos_var_item_name: "ItemName6", pos_var_item_stock: 10, pos_var_item_price: 136, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-6.jpg" },
  { pos_var_item_name: "ItemName7", pos_var_item_stock: 10, pos_var_item_price: 141, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-7.jpg" },
  { pos_var_item_name: "ItemName8", pos_var_item_stock: 10, pos_var_item_price: 146, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-8.jpg" },
  { pos_var_item_name: "ItemName9", pos_var_item_stock: 10, pos_var_item_price: 151, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-9.jpg" },
  { pos_var_item_name: "ItemName10", pos_var_item_stock: 10, pos_var_item_price: 156, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-10.jpg" },
  { pos_var_item_name: "ItemName11", pos_var_item_stock: 10, pos_var_item_price: 161, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-11.jpg" },
  { pos_var_item_name: "ItemName12", pos_var_item_stock: 10, pos_var_item_price: 166, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-12.jpg" },
  { pos_var_item_name: "ItemName13", pos_var_item_stock: 10, pos_var_item_price: 171, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-13.jpg" },
  { pos_var_item_name: "ItemName14", pos_var_item_stock: 10, pos_var_item_price: 176, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-14.jpg" },
  { pos_var_item_name: "ItemName15", pos_var_item_stock: 10, pos_var_item_price: 181, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-15.jpg" },
  { pos_var_item_name: "ItemName16", pos_var_item_stock: 10, pos_var_item_price: 186, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-16.jpg" },
  { pos_var_item_name: "ItemName17", pos_var_item_stock: 10, pos_var_item_price: 191, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-17.jpg" },
  { pos_var_item_name: "ItemName18", pos_var_item_stock: 10, pos_var_item_price: 196, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-18.jpg" },
  { pos_var_item_name: "ItemName19", pos_var_item_stock: 10, pos_var_item_price: 201, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-19.jpg" },
  { pos_var_item_name: "ItemName20", pos_var_item_stock: 10, pos_var_item_price: 206, pos_var_item_quantity: 0, pos_var_item_image: "images/displayed-items/item-20.jpg" }
];

let pos_var_discount = 0.0;
let pos_var_taxRate = 0.0;
let pos_var_customerCash = 0.0;

let pos_var_totalPrice = 0;
let pos_var_discountedPrice = 0;
let pos_var_taxAmount = 0;
let pos_var_customerChange = 0;

let pos_var_purchase_state = 0;
let pos_var_purchase_btn = null;

let pos_var_isAdmin = false;

const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

function pos_fnc_calculateSummary() {
  pos_var_totalPrice = pos_var_inventory.reduce((s, it) => s + it.pos_var_item_price * it.pos_var_item_quantity, 0);
  pos_var_discountedPrice = pos_var_totalPrice - pos_var_totalPrice * (pos_var_discount / 100);
  pos_var_taxAmount = pos_var_discountedPrice * (pos_var_taxRate / 100);
  const totalDue = pos_var_discountedPrice + pos_var_taxAmount;
  pos_var_customerChange = pos_var_customerCash >= totalDue ? pos_var_customerCash - totalDue : 0;
}

function formatValue(v, pct = false) {
  if (v <= 0) return "No Input";
  return pct ? `${v.toFixed(2)}%` : `₱ ${v.toFixed(2)}`;
}

function pos_fnc_renderInventory(items) {
  const c = $("#pos-inventory");
  if (!c) return;
  c.innerHTML = "";
  items.forEach((it, i) => {
    const slot = document.createElement("div");
    slot.className = "pos-inventory-slot";
    slot.innerHTML = `
      <div class="pos-item-frame">
        <div class="pos-item-image" style="background-image: url('${it.pos_var_item_image}')">
          <div class="pos-item-name">${it.pos_var_item_name}</div>
          <div class="pos-item-stock">${it.pos_var_item_stock} in Stock</div>
        </div>
      </div>
      <div class="pos-item-price">
        <div class="pos-item-price-icon">₱</div>
        <div class="pos-item-price-value">${it.pos_var_item_price.toFixed(2)}</div>
        <button class="pos-item-price-listbtn" data-index="${i}" type="button">LIST</button>
      </div>`;
    c.appendChild(slot);
  });
  $$(".pos-item-price-listbtn", c).forEach(b => {
    const idx = Number(b.dataset.index);
    b.disabled = pos_var_inventory[idx].pos_var_item_quantity >= 1;
    b.removeEventListener("click", pos_fnc_handleListClick);
    b.addEventListener("click", pos_fnc_handleListClick);
  });
}

function pos_fnc_renderReceiptList(items) {
  const c = $("#pos-receipt-list");
  if (!c) return;
  c.innerHTML = "";
  items.forEach((it, i) => {
    if (it.pos_var_item_quantity < 1) return;
    const line = it.pos_var_item_price * it.pos_var_item_quantity;
    const row = document.createElement("div");
    row.className = "pos-listed-item";
    row.innerHTML = `
      <div class="pos-listed-item-description">${it.pos_var_item_name}</div>
      <div class="pos-listed-item-unitprice">₱ ${it.pos_var_item_price.toFixed(2)}</div>
      <div class="pos-listed-item-quantity">
        <button class="pos-listed-item-quantity-addbtn" data-index="${i}" type="button">+</button>
        <div class="pos-listed-item-quantity-value">${it.pos_var_item_quantity}</div>
        <button class="pos-listed-item-quantity-subbtn" data-index="${i}" type="button">-</button>
      </div>
      <div class="pos-listed-item-price">₱ ${line.toFixed(2)}</div>`;
    c.appendChild(row);
  });
  $$(".pos-listed-item-quantity-addbtn", c).forEach(b => {
    const idx = Number(b.dataset.index);
    b.disabled = pos_var_inventory[idx].pos_var_item_quantity >= pos_var_inventory[idx].pos_var_item_stock;
    b.removeEventListener("click", pos_fnc_handleAddQty);
    b.addEventListener("click", pos_fnc_handleAddQty);
  });
  $$(".pos-listed-item-quantity-subbtn", c).forEach(b => {
    b.removeEventListener("click", pos_fnc_handleSubQty);
    b.addEventListener("click", pos_fnc_handleSubQty);
  });
}

function pos_fnc_handleListClick(e) {
  const idx = Number(e.currentTarget.dataset.index);
  if (Number.isNaN(idx) || !pos_var_inventory[idx]) return;
  if (pos_var_inventory[idx].pos_var_item_quantity < 1) {
    pos_var_inventory[idx].pos_var_item_quantity = 1;
    pos_var_purchase_state = 0;
    pos_fnc_refreshPOS();
  }
}

function pos_fnc_handleAddQty(e) {
  const idx = Number(e.currentTarget.dataset.index);
  if (Number.isNaN(idx) || !pos_var_inventory[idx]) return;
  const it = pos_var_inventory[idx];
  if (it.pos_var_item_quantity < it.pos_var_item_stock) {
    it.pos_var_item_quantity += 1;
    pos_var_purchase_state = 0;
    pos_fnc_refreshPOS();
  }
}

function pos_fnc_handleSubQty(e) {
  const idx = Number(e.currentTarget.dataset.index);
  if (Number.isNaN(idx) || !pos_var_inventory[idx]) return;
  const it = pos_var_inventory[idx];
  if (it.pos_var_item_quantity > 0) {
    it.pos_var_item_quantity -= 1;
    pos_var_purchase_state = 0;
    pos_fnc_refreshPOS();
  }
}

function pos_fnc_renderReceiptSummary() {
  const c = $("#pos-receipt-summary");
  if (!c) return;
  c.innerHTML = `
    <div class="pos-summary-name">Discount<div class="pos-summary-value">${formatValue(pos_var_discount, true)}</div></div>
    <div class="pos-summary-name">Tax Rate<div class="pos-summary-value">${formatValue(pos_var_taxRate, true)}</div></div>
    <div class="pos-summary-name">Customer Cash<div class="pos-summary-value">${formatValue(pos_var_customerCash)}</div></div>
    <div class="pos-summary-name">Total Price<div class="pos-summary-value">${formatValue(pos_var_totalPrice)}</div></div>
    <div class="pos-summary-name">Discounted Price<div class="pos-summary-value">${formatValue(pos_var_discountedPrice)}</div></div>
    <div class="pos-summary-name">Tax Amount<div class="pos-summary-value">${formatValue(pos_var_taxAmount)}</div></div>
    <div class="pos-summary-name">Customer Change<div class="pos-summary-value">${formatValue(pos_var_customerChange)}</div></div>`;
}

function pos_fnc_updatePurchaseButtonLabel() {
  if (!pos_var_purchase_btn) return;
  if (pos_var_customerCash < pos_var_discountedPrice) {
    pos_var_purchase_btn.textContent = "INPUT CUSTOMER CASH";
    return;
  }
  if (pos_var_purchase_state === 2) {
    pos_var_purchase_btn.textContent = "CONFIRM PURCHASE";
    return;
  }
  pos_var_purchase_btn.textContent = "PURCHASE";
}

function promptNumber(message, validator) {
  while (true) {
    const v = prompt(message);
    if (v === null) return null;
    const n = parseFloat(v);
    if (!Number.isNaN(n) && (!validator || validator(n))) return n;
    alert("Invalid input. Try again or press Cancel.");
  }
}

function pos_fnc_handlePurchase() {
  pos_fnc_calculateSummary();
  if (pos_var_totalPrice <= 0) {
    alert("No items listed. Add items before purchasing.");
    return;
  }
  if (pos_var_customerCash < pos_var_discountedPrice) {
    const prefill = pos_var_customerCash > 0 ? pos_var_customerCash.toFixed(2) : "";
    const input = prompt(`Discounted price is ₱ ${pos_var_discountedPrice.toFixed(2)}.\nEnter Customer Cash amount (must be ≥ discounted price):`, prefill);
    if (input === null) return;
    const parsed = parseFloat(input);
    if (Number.isNaN(parsed) || parsed < pos_var_discountedPrice) {
      alert(`Invalid amount. Enter a numeric amount ≥ ₱ ${pos_var_discountedPrice.toFixed(2)}.`);
      return;
    }
    pos_var_customerCash = parsed;
    pos_var_purchase_state = 1;
    pos_fnc_refreshPOS();
    alert("Customer cash updated. Click PURCHASE again to continue.");
    return;
  }
  const totalDue = pos_var_discountedPrice + pos_var_taxAmount;
  if (pos_var_purchase_state === 0 && pos_var_customerCash < totalDue) {
    pos_var_purchase_state = 1;
    pos_fnc_updatePurchaseButtonLabel();
    return;
  }
  if (pos_var_purchase_state === 1 && pos_var_customerCash < totalDue) {
    const prefill = pos_var_customerCash > 0 ? pos_var_customerCash.toFixed(2) : "";
    const input = prompt(`Total due is ₱ ${totalDue.toFixed(2)}.\nEnter Customer Cash amount (must be ≥ total due):`, prefill);
    if (input === null) return;
    const parsed = parseFloat(input);
    if (Number.isNaN(parsed) || parsed < totalDue) {
      alert(`Invalid amount. Enter a numeric amount ≥ ₱ ${totalDue.toFixed(2)}.`);
      return;
    }
    pos_var_customerCash = parsed;
    pos_var_purchase_state = 2;
    pos_fnc_refreshPOS();
    alert("Customer cash updated. Click PURCHASE again to continue.");
    return;
  }
  if (pos_var_purchase_state === 0 && pos_var_customerCash >= totalDue) {
    pos_var_purchase_state = 2;
    pos_fnc_updatePurchaseButtonLabel();
    return;
  }
  if (pos_var_purchase_state === 2 && pos_var_customerCash >= totalDue) {
    const confirmMsg =
      `Discounted price: ₱ ${pos_var_discountedPrice.toFixed(2)}\n` +
      `Tax: ₱ ${pos_var_taxAmount.toFixed(2)}\n` +
      `Total due: ₱ ${totalDue.toFixed(2)}\n` +
      `Customer cash: ₱ ${pos_var_customerCash.toFixed(2)}`;
    if (!confirm(confirmMsg + "\n\nProceed to complete purchase?")) return;
    const change = Math.max(0, pos_var_customerCash - totalDue);
    alert(`Thank you for your purchase.\nChange: ₱ ${change.toFixed(2)}.`);
    pos_var_inventory.forEach(i => (i.pos_var_item_quantity = 0));
    pos_var_customerCash = 0;
    pos_var_purchase_state = 0;
    pos_fnc_refreshPOS();
    return;
  }
  pos_var_purchase_state = 0;
  pos_fnc_updatePurchaseButtonLabel();
}

/* Admin: single-pass prompts. After a successful "Apply", the admin flow ends immediately. */
function pos_fnc_adminFlow() {
  const mainChoice = prompt("Admin Menu:\n1. Edit Item\n2. Set Discount\n3. Set Tax\n0. Exit\nEnter 0, 1, 2 or 3:");
  if (mainChoice === null || mainChoice === "0") return;

  if (mainChoice === "1") {
    let item = null;
    const name = prompt("Enter item name to edit (exact or partial). Cancel to return:");
    if (name === null) return;
    const lower = name.trim().toLowerCase();
    item = pos_var_inventory.find(it => it.pos_var_item_name.toLowerCase() === lower) ||
           pos_var_inventory.find(it => it.pos_var_item_name.toLowerCase().includes(lower));
    if (!item) { alert("Item not found."); return; }

    const editChoice = prompt("Edit Item - choose:\n1. Name\n2. Price\n3. Stock\n0. Back\nEnter 0, 1, 2 or 3:");
    if (editChoice === null || editChoice === "0") return;

    if (editChoice === "1") {
      const newName = prompt("Enter new item name (non-empty, unique). Cancel to go back:");
      if (newName === null) return;
      const trimmed = newName.trim();
      if (!trimmed) { alert("Name cannot be empty."); return; }
      const exists = pos_var_inventory.some(it => it !== item && it.pos_var_item_name.toLowerCase() === trimmed.toLowerCase());
      if (exists) { alert("Name already exists."); return; }
      if (confirm(`Old name: ${item.pos_var_item_name}\nNew name: ${trimmed}\n\nApply change?`)) {
        item.pos_var_item_name = trimmed;
        pos_fnc_refreshPOS();
        alert("Item name updated.");
      }
      return;
    }

    if (editChoice === "2") {
      const newPrice = promptNumber("Enter new price (>= 0). Cancel to go back:", x => x >= 0);
      if (newPrice === null) return;
      if (confirm(`Old price: ₱ ${item.pos_var_item_price.toFixed(2)}\nNew price: ₱ ${newPrice.toFixed(2)}\n\nApply change?`)) {
        item.pos_var_item_price = newPrice;
        pos_fnc_refreshPOS();
        alert("Price updated.");
      }
      return;
    }

    if (editChoice === "3") {
      const newStock = promptNumber("Enter new stock (integer >= 0). Cancel to go back:", x => Number.isInteger(x) && x >= 0);
      if (newStock === null) return;
      if (confirm(`Old stock: ${item.pos_var_item_stock}\nNew stock: ${parseInt(newStock, 10)}\n\nApply change?`)) {
        item.pos_var_item_stock = parseInt(newStock, 10);
        pos_fnc_refreshPOS();
        alert("Stock updated.");
      }
      return;
    }

    alert("Invalid option.");
    return;
  }

  if (mainChoice === "2") {
    const newDiscount = promptNumber("Enter discount percent (>= 0). Cancel to go back:", x => x >= 0);
    if (newDiscount === null) return;
    if (confirm(`Old discount: ${pos_var_discount.toFixed(2)}%\nNew discount: ${newDiscount.toFixed(2)}%\n\nApply change?`)) {
      pos_var_discount = newDiscount;
      pos_fnc_refreshPOS();
      alert("Discount updated.");
    }
    return;
  }

  if (mainChoice === "3") {
    const newTax = promptNumber("Enter tax percent (>= 0). Cancel to go back:", x => x >= 0);
    if (newTax === null) return;
    if (confirm(`Old tax: ${pos_var_taxRate.toFixed(2)}%\nNew tax: ${newTax.toFixed(2)}%\n\nApply change?`)) {
      pos_var_taxRate = newTax;
      pos_fnc_refreshPOS();
      alert("Tax rate updated.");
    }
    return;
  }

  alert("Invalid option.");
}

function pos_fnc_wireLoginButtonInit() {
  const loginBtn = document.querySelector(".pos-login");
  if (!loginBtn) return;
  loginBtn.removeEventListener("click", pos_fnc_wireLoginButtonInit);
  loginBtn.addEventListener("click", () => {
    if (!pos_var_isAdmin) {
      const code = prompt("Enter admin code:");
      if (code === null) return;
      if (code === "admin1234") {
        pos_var_isAdmin = true;
        alert("Admin status granted.");
      } else {
        alert("Incorrect code.");
      }
      return;
    }
    const cont = confirm("You are currently an admin. Continue as admin?");
    if (!cont) {
      pos_var_isAdmin = false;
      alert("Admin status revoked.");
      return;
    }
    pos_fnc_adminFlow();
  });
}

function pos_fnc_calculateSummary() {
  pos_var_totalPrice = pos_var_inventory.reduce((s, it) => s + it.pos_var_item_price * it.pos_var_item_quantity, 0);
  pos_var_discountedPrice = pos_var_totalPrice - pos_var_totalPrice * (pos_var_discount / 100);
  pos_var_taxAmount = pos_var_discountedPrice * (pos_var_taxRate / 100);
  const totalDue = pos_var_discountedPrice + pos_var_taxAmount;
  pos_var_customerChange = pos_var_customerCash >= totalDue ? pos_var_customerCash - totalDue : 0;
}

function pos_fnc_renderReceiptSummary() {
  pos_fnc_calculateSummary();
  const c = $("#pos-receipt-summary");
  if (!c) return;
  c.innerHTML = `
    <div class="pos-summary-name">Discount<div class="pos-summary-value">${formatValue(pos_var_discount, true)}</div></div>
    <div class="pos-summary-name">Tax Rate<div class="pos-summary-value">${formatValue(pos_var_taxRate, true)}</div></div>
    <div class="pos-summary-name">Customer Cash<div class="pos-summary-value">${formatValue(pos_var_customerCash)}</div></div>
    <div class="pos-summary-name">Total Price<div class="pos-summary-value">${formatValue(pos_var_totalPrice)}</div></div>
    <div class="pos-summary-name">Discounted Price<div class="pos-summary-value">${formatValue(pos_var_discountedPrice)}</div></div>
    <div class="pos-summary-name">Tax Amount<div class="pos-summary-value">${formatValue(pos_var_taxAmount)}</div></div>
    <div class="pos-summary-name">Customer Change<div class="pos-summary-value">${formatValue(pos_var_customerChange)}</div></div>`;
}

function formatValue(v, pct = false) {
  if (v <= 0) return "No Input";
  return pct ? `${v.toFixed(2)}%` : `₱ ${v.toFixed(2)}`;
}

function pos_fnc_refreshPOS() {
  pos_fnc_calculateSummary();
  pos_fnc_renderInventory(pos_var_inventory);
  pos_fnc_renderReceiptList(pos_var_inventory);
  pos_fnc_renderReceiptSummary();
  pos_fnc_updatePurchaseButtonLabel();
}

function pos_fnc_wirePurchaseButton() {
  pos_var_purchase_btn = document.querySelector(".pos-purchase");
  if (!pos_var_purchase_btn) {
    const container = document.querySelector(".pos-receipt-buttons") || document.body;
    pos_var_purchase_btn = document.createElement("button");
    pos_var_purchase_btn.className = "pos-purchase";
    pos_var_purchase_btn.type = "button";
    pos_var_purchase_btn.textContent = "PURCHASE";
    container.appendChild(pos_var_purchase_btn);
  } else {
    try { pos_var_purchase_btn.type = pos_var_purchase_btn.type || "button"; } catch (e) {}
  }
  pos_var_purchase_btn.removeEventListener("click", pos_fnc_handlePurchase);
  pos_var_purchase_btn.addEventListener("click", pos_fnc_handlePurchase);
  document.removeEventListener("click", pos_fnc_handlePurchaseDelegated);
  document.addEventListener("click", pos_fnc_handlePurchaseDelegated);
}

function pos_fnc_handlePurchaseDelegated(e) {
  const el = e.target;
  if (el && el.classList && el.classList.contains("pos-purchase")) {
    e.preventDefault();
    pos_fnc_handlePurchase();
  }
}

function pos_fnc_initPOS() {
  function ready() {
    pos_fnc_refreshPOS();
    pos_fnc_wirePurchaseButton();
    pos_fnc_wireLoginButtonInit();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready);
  else ready();
}

pos_fnc_initPOS();
