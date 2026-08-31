"use strict";
async function fetchMotorcycles() {
    const res = await fetch("https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json");
    const data = await res.json();
    return data;
}
function renderMotorcycleCard(motorcycle) {
    const card = `
  <div class="motorcycle-card">
    <div class="motorcycle-card-image-container">
      <img src="${motorcycle.image_url}" alt="${motorcycle.name}" class="motorcycle-card-image" />
      <div class="motorcycle-card-year-badge">${motorcycle.year}</div>
    </div>
    <div class="motorcycle-card-content">
      <div class="motorcycle-card-header">
        <div>
          <h3 class="motorcycle-card-title">${motorcycle.name}</h3>
          <p class="motorcycle-card-manufacturer">${motorcycle.manufacturer}</p>
        </div>
        <span class="motorcycle-card-category">${motorcycle.category}</span>
      </div>
      <p class="motorcycle-card-description">${motorcycle.description}</p>
      <div class="motorcycle-card-footer">
        <div>
          <p class="motorcycle-card-price">$${motorcycle.price.toLocaleString()}</p>
          <p class="motorcycle-card-engine">${motorcycle.engine_cc}cc</p>
        </div>
        <button class="motorcycle-card-button" data-motorcycle-id="${motorcycle.id}">View Details</button>
      </div>
    </div>
  </div>
  `;
    return card;
}
class MotorcycleGalleryApp {
    allMotorcycles = [];
    filteredData = [];
    nameFilter = "";
    constructor() {
        this.init();
    }
    async init() {
        await this.fetchData();
        this.setupEventListeners();
        this.render();
    }
    async fetchData() {
        this.showLoading(true);
        try {
            const data = await fetchMotorcycles();
            this.allMotorcycles = [...data];
            this.applyFilters();
        }
        catch (error) {
            console.error("Error loading data:", error);
        }
        finally {
            this.showLoading(false);
        }
    }
    applyFilters() {
        this.filteredData = this.allMotorcycles.filter((motorcycle) => {
            const matchesName = this.nameFilter === "" ||
                motorcycle.name.toLowerCase().includes(this.nameFilter.toLowerCase());
            return matchesName;
        });
        this.render();
    }
    setupEventListeners() {
        const nameFilterInput = document.getElementById("name-filter-input");
        if (nameFilterInput) {
            nameFilterInput.addEventListener("input", (event) => {
                const target = event.target;
                this.nameFilter = target.value;
                this.applyFilters();
            });
        }
    }
    render() {
        this.renderResultsCount();
        this.renderMotorcycles();
    }
    renderResultsCount() {
        const resultsNumber = document.getElementById("results-number");
        if (resultsNumber) {
            resultsNumber.textContent = this.filteredData.length.toString();
        }
    }
    renderMotorcycles() {
        const motorcycleGrid = document.getElementById("motorcycle-grid");
        const noResults = document.getElementById("no-results");
        if (!motorcycleGrid) {
            return;
        }
        if (this.filteredData.length === 0) {
            motorcycleGrid.style.display = "none";
            if (noResults) {
                noResults.style.display = "block";
            }
            return;
        }
        if (noResults) {
            noResults.style.display = "none";
        }
        motorcycleGrid.style.display = "grid";
        const cardsHTML = this.filteredData
            .map((motorcycle) => renderMotorcycleCard(motorcycle))
            .join("");
        motorcycleGrid.innerHTML = cardsHTML;
    }
    showLoading(show) {
        const loadingContainer = document.getElementById("loading-container");
        const motorcycleGrid = document.getElementById("motorcycle-grid");
        if (loadingContainer) {
            loadingContainer.style.display = show ? "flex" : "none";
        }
        if (motorcycleGrid) {
            motorcycleGrid.style.display = show ? "none" : "grid";
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new MotorcycleGalleryApp();
});
