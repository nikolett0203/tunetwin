document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselControlsContainer = document.querySelector('.carousel-controls');
    const carouselControls = ['⏮', '⏭'];
    const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
    const totalItems = carouselItems.length;
    let currentIndex = 0;

    class Carousel {
        constructor(container, items, controls) {
            this.galleryContainer = container;
            this.galleryControls = controls;
            this.galleryArray = [...items];
            this.updateCarousel(); 
        }

        updateCarousel() {
            this.galleryArray.forEach((item, index) => {
                
                for (let i = 1; i <= 5; i++) {
                    item.classList.remove(`index-${i}`);
                }
                
                const classIndex = (index + 1) % totalItems + 1; 
                item.classList.add(`index-${classIndex}`);
                
                //item.style.transform = `rotateY(${index * (360 / totalItems)}deg)`;
            });

            //this.galleryContainer.style.transform = `rotateY(${-currentIndex * (360 / totalItems)}deg)`;
        }

        setCurrentState(direction) {
            if (direction === 'previous') {
                this.galleryArray.unshift(this.galleryArray.pop());
            } else {
                this.galleryArray.push(this.galleryArray.shift());
            }
            this.updateCarousel();
        }

        setControls() {
            this.galleryControls.forEach(control => {
                const button = document.createElement('button');
                button.className = control === '⏮' ? 'carousel-controls-previous' : 'carousel-controls-next';
                button.innerText = control;
                carouselControlsContainer.appendChild(button);
            });
        }

        useControls() {
            const triggers = Array.from(carouselControlsContainer.childNodes);
            triggers.forEach(control => {
                control.addEventListener('click', e => {
                    e.preventDefault();
                    this.setCurrentState(control.className.includes('previous') ? 'previous' : 'next');
                });
            });
        }
    }

    const exampleCarousel = new Carousel(carouselContainer, carouselItems, carouselControls);

    exampleCarousel.setControls();
    exampleCarousel.useControls();

    
    setTimeout(() => scrollToSection('twinning-section'), 1000); 

    function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
        section.scrollIntoView({ behavior: 'smooth' });
    }
    
});
