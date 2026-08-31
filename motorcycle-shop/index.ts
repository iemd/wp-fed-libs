/**
 * 22. Build a Motorcycle Shop (lab)
 */
type Category = 'Sport' | 'Cruiser' | 'Touring' | 'Dirt' | 'Adventure' | 'Naked' | 'Electric';

interface Motorcycle {
  id: string;
  name: string;
  manufacturer: string;
  category: Category;
  price: number;
  image_url: string;
  created_at: Date;
  description: string;
  year: number;
  engine_cc: number;
}

async function fetchMotorcycles(): Promise<Motorcycle[]> {
  const res = await fetch("https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json");
  const data = await res.json();
  return data;
}

function renderMotorcycleCard(motorcycle: Motorcycle): string {
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
  private allMotorcycles: Motorcycle[] = [];
  private filteredData: Motorcycle[] = [];
  private nameFilter: string = "";

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    await this.fetchData();
    this.setupEventListeners();
    this.render();
  }

  private async fetchData(): Promise<void> {
    this.showLoading(true);
    try {
      const data = await fetchMotorcycles();
      this.allMotorcycles = [...data];
      this.applyFilters();
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      this.showLoading(false);
    }
  }

  private applyFilters(): void {
    this.filteredData = this.allMotorcycles.filter((motorcycle) => {
      const matchesName = this.nameFilter === "" ||
        motorcycle.name.toLowerCase().includes(this.nameFilter.toLowerCase());
      return matchesName;
    });

    this.render();
  }

  private setupEventListeners(): void {
    const nameFilterInput = document.getElementById("name-filter-input") as HTMLInputElement;

    if (nameFilterInput) {
      nameFilterInput.addEventListener("input", (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.nameFilter = target.value;
        this.applyFilters();
      });
    }
  }

  private render(): void {
    this.renderResultsCount();
    this.renderMotorcycles();
  }

  private renderResultsCount(): void {
    const resultsNumber = document.getElementById("results-number");
    if (resultsNumber) {
      resultsNumber.textContent = this.filteredData.length.toString();
    }
  }

  private renderMotorcycles(): void {
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

  private showLoading(show: boolean): void {
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
