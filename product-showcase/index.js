"use strict";
class Collection {
    items;
    constructor(items) {
        this.items = items;
    }
    getAll() {
        return this.items;
    }
    filter(callback) {
        return this.items.filter(callback);
    }
}
function renderProduct(product) {
    const createProductCard = (id, content, price) => {
        return `
     <div class="item" id="${id}">
       ${content}
       <div class="price">$${price}</div>
     </div>
   `;
    };
    if (product.type === "book") {
        const content = `<strong>Book:</strong> ${product.title} by ${product.author}`;
        return createProductCard(product.id, content, product.price);
    }
    if (product.type === "electronics") {
        const warranty = product.warranty ? ` - Warranty: ${product.warranty} year(s)` : "";
        const content = `<strong>Electronics:</strong> ${product.item} - ${product.model}${warranty}`;
        return createProductCard(product.id, content, product.price);
    }
    if (product.type === "clothing") {
        const size = product.size ? ` - Size ${product.size}` : "";
        const content = `<strong>Clothing:</strong> ${product.item} by ${product.brand}${size}`;
        return createProductCard(product.id, content, product.price);
    }
    const _never = product;
    throw new Error(`Unknown product type: ${JSON.stringify(product)}`);
}
const products = new Collection([
    {
        id: "c1",
        type: "clothing",
        item: "Jacket",
        brand: "Northloom",
        size: "M",
        price: 89.99
    },
    {
        id: "e1",
        type: "electronics",
        item: "Tablet",
        model: "Pixelon Slate-A9",
        warranty: 2,
        price: 349.99
    },
    {
        id: "b1",
        type: "book",
        title: "Dune",
        author: "Frank Herbert",
        price: 14.99
    },
    {
        id: "e2",
        type: "electronics",
        item: "Smartphone",
        model: "NovaCore X1-Alpha",
        warranty: 2,
        price: 699.99
    },
    {
        id: "c2",
        type: "clothing",
        item: "Hoodie",
        brand: "CozyForge",
        size: "S",
        price: 49.99
    },
    {
        id: "b2",
        type: "book",
        title: "1984",
        author: "George Orwell",
        price: 9.99
    },
    {
        id: "e3",
        type: "electronics",
        item: "Headphones",
        model: "EchoSphere Silent-7",
        price: 129.99
    },
    {
        id: "c3",
        type: "clothing",
        item: "Jeans",
        brand: "BlueWeave",
        size: "L",
        price: 59.99
    },
    {
        id: "e4",
        type: "electronics",
        item: "Laptop",
        model: "HexaBook Orion-15",
        warranty: 3,
        price: 1199.99
    },
    {
        id: "b3",
        type: "book",
        title: "Brave New World",
        author: "Aldous Huxley",
        price: 11.99
    },
    {
        id: "c4",
        type: "clothing",
        item: "T-Shirt",
        brand: "Fabricon",
        price: 19.99
    },
    {
        id: "e5",
        type: "electronics",
        item: "Smartwatch",
        model: "Chronex Pulse-Q",
        warranty: 1,
        price: 199.99
    },
    {
        id: "b4",
        type: "book",
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        price: 24.99
    }
]);
const output = document.getElementById("output");
/** Track currently active filter category (or undefined for all) */
let currentFilter = undefined;
function showProducts(filter) {
    if (!output) {
        return;
    }
    let itemsToShow;
    /** Toggle logic */
    if (currentFilter === filter || filter === undefined) {
        /** Reset to all if same button clicked again or filter is undefined */
        itemsToShow = products.getAll();
        currentFilter = undefined;
        setActiveButton(undefined);
    }
    else {
        itemsToShow = products.filter((p) => p.type === filter);
        currentFilter = filter;
        setActiveButton(filter);
    }
    output.innerHTML = itemsToShow.map(renderProduct).join("");
}
/** Active Button Highlighting */
function setActiveButton(filter) {
    const buttons = {
        all: document.getElementById("all"),
        book: document.getElementById("books"),
        electronics: document.getElementById("electronics"),
        clothing: document.getElementById("clothing")
    };
    for (const key in buttons) {
        buttons[key]?.classList.remove("active");
    }
    if (filter === undefined) {
        buttons["all"]?.classList.add("active");
    }
    else {
        buttons[filter]?.classList.add("active");
    }
}
/** Button Event Handlers */
document.getElementById("all")?.addEventListener("click", () => showProducts());
document.getElementById("books")?.addEventListener("click", () => showProducts("book"));
document.getElementById("electronics")?.addEventListener("click", () => showProducts("electronics"));
document.getElementById("clothing")?.addEventListener("click", () => showProducts("clothing"));
/** Initial Render */
document.addEventListener("DOMContentLoaded", () => showProducts());
