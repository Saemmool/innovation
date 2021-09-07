const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function() {
    //current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // check if deleting
    if(this.isDeleting) {
        // remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
        // add char
        this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Initial Type Spped
    let typeSpeed = 200;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
        //Make a pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to the next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed)
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);
//Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init typewriter
    new TypeWriter(txtElement, words, wait);
}

// Stars going up

function stars() {
    let count = 500;
    let scene = document.querySelector('.intro');
    let i = 0;
    while(i < count) {
        let star = document.createElement("i");
        let x = Math.floor(Math.random() * window.innerWidth);
        let y = Math.floor(Math.random() * window.innerHeight);
        let duration = Math.random() * 10;
        let size = Math.random() * 2;

        star.style.left = x+'px';
        star.style.top = y+'px';
        star.style.width = 1+size+'px';
        star.style.height = 1+size+'px';
        star.style.animationDuration = 5+duration+'s';
        star.style.animationDelay = duration + 's';

        scene.appendChild(star);
        i++
    }
}
stars()