"use strict";
/**
 * 27. Build a Flashcard Quiz App (Certification Project)
 */
const cardDisplay = document.querySelector("#current-card");
const cardButtonsContainer = document.querySelector("#cards-list");
const frontInput = document.querySelector("#front-text");
const backInput = document.querySelector("#back-text");
const errorElement = document.querySelector("#entry-error");
let currentCards = [];
let currentCardIndex = -1;
class InvalidUserInputError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidUserInputError";
    }
}
const isButtonElement = (element) => {
    return element instanceof HTMLButtonElement;
};
function refresh() {
    if (currentCards.length === 0 || currentCardIndex < 0) {
        cardDisplay.querySelector(".card-front").textContent = "";
        cardDisplay.querySelector(".card-back").textContent = "";
        return;
    }
    const card = currentCards[currentCardIndex];
    cardDisplay.querySelector(".card-front").textContent = card.questionText;
    cardDisplay.querySelector(".card-back").textContent = card.questionAnswer;
    Array.from(cardButtonsContainer.children).forEach((child, i) => {
        if (i === currentCardIndex) {
            child.classList.add("selected");
        }
        else {
            child.classList.remove("selected");
        }
    });
}
function deleteCard() {
    if (currentCards.length === 0 || currentCardIndex < 0)
        return;
    currentCards.splice(currentCardIndex, 1);
    const btnToRemove = cardButtonsContainer.children[currentCardIndex];
    if (btnToRemove) {
        cardButtonsContainer.removeChild(btnToRemove);
    }
    if (currentCards.length === 0) {
        currentCardIndex = -1;
        refresh();
        return;
    }
    currentCardIndex = Math.max(0, currentCardIndex - 1);
    Array.from(cardButtonsContainer.children).forEach((child, i) => {
        if (!isButtonElement(child)) {
            console.warn(`Element {${child}} is not a button.`);
            return;
        }
        child.onclick = () => {
            currentCardIndex = i;
            refresh();
        };
    });
    refresh();
}
function createCardButton(questionText, index) {
    const btn = document.createElement("button");
    btn.innerText = questionText.length > 20 ? questionText.slice(0, 20) + "..." : questionText;
    btn.onclick = () => {
        currentCardIndex = index;
        refresh();
    };
    return btn;
}
function uploadNewCard() {
    try {
        const questionText = frontInput.value.trim();
        const questionAnswer = backInput.value.trim();
        if (!questionText) {
            throw new InvalidUserInputError("Front text can not be empty.");
        }
        if (!questionAnswer) {
            throw new InvalidUserInputError("Back text can not be empty.");
        }
        const newCard = { questionText, questionAnswer };
        currentCards.push(newCard);
        const newIndex = currentCards.length - 1;
        const cardBtn = createCardButton(questionText, newIndex);
        cardButtonsContainer.appendChild(cardBtn);
        currentCardIndex = newIndex;
        refresh();
        frontInput.value = "";
        backInput.value = "";
    }
    catch (ex) {
        if (ex instanceof InvalidUserInputError) {
            errorElement.innerHTML = "\u26A0" + ex.message;
        }
        else {
            console.error("An unexpected error occurred:", ex);
        }
    }
}
class FlashCardController {
    elements = {};
    constructor() {
        this.elements = {
            flashcard: document.querySelector(".flashcard"),
            entryForm: document.querySelector(".entry-form"),
            deleteBtn: document.querySelector("#delete-btn")
        };
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        this.elements.flashcard.addEventListener("click", () => this.flipCard());
        this.elements.entryForm.addEventListener("submit", (ev) => {
            ev.preventDefault();
            uploadNewCard();
        });
        this.elements.deleteBtn.addEventListener("click", () => deleteCard());
    }
    flipCard() {
        this.elements.flashcard.classList.toggle("flipped");
    }
}
document.addEventListener("DOMContentLoaded", (event) => {
    new FlashCardController();
    frontInput.value = "What is the capital of France?";
    backInput.value = "Paris";
    uploadNewCard();
});
