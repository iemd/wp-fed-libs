"use strict";
/**
 * 23. Build a Bug Emoji Picker (Workshop)
 */
class Bug {
    emoji;
    emojiElement;
    constructor(emojiElement) {
        this.emojiElement = emojiElement;
    }
}
class Bee extends Bug {
    constructor(emojiElement) {
        super(emojiElement);
        this.emoji = "🐝";
    }
    render() {
        this.emojiElement.innerText = this.emoji;
    }
}
class Spider extends Bug {
    constructor(emojiElement) {
        super(emojiElement);
        this.emoji = "🕷️";
    }
    render() {
        this.emojiElement.innerText = this.emoji;
    }
}
function isSelect(element) {
    return element instanceof HTMLSelectElement;
}
const bugEmojiElement = document.querySelector('#bug-emoji');
const bugMap = {
    "bee": new Bee(bugEmojiElement),
    "spider": new Spider(bugEmojiElement),
};
const selectElement = document.querySelector('#species');
selectElement.addEventListener("change", e => {
    if (isSelect(e.target)) {
        bugMap[e.target.value].render();
    }
});
