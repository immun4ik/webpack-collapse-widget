class Collapse {
    constructor(element) {
        if (!element) {
            console.error('Collapse: Element not found.', element);
            return;
        }

        this.container = element;
        this.button = this.container.querySelector('.collapse-button');
        this.content = this.container.querySelector('.collapse-content');

        if (!this.button || !this.content) {
            console.error('Collapse: Button or content not found within the container.', this.container);
            return;
        }

        this.isExpanded = false; 

        this.init();
    }

    init() {
        if (!this.content.id) {
            this.content.id = `collapse - content - ${Date.now()} -${Math.floor(Math.random() * 1000) }`;
        }

        this.button.setAttribute('aria-controls', this.content.id);

        this.button.setAttribute('aria-expanded', this.isExpanded);
        this.content.style.height = '0px';

        this.button.addEventListener('click', this.toggle.bind(this));

        this.content.addEventListener('transitionend', this.handleTransitionEnd.bind(this));
    }

    toggle() {
        this.isExpanded ? this.hide() : this.show();
    }

    show() {
        if (this.isExpanded) return;

        this.container.classList.add('is-collapsing'); 
        this.button.setAttribute('aria-expanded', 'true');
        this.isExpanded = true;

        const originalHeight = this.content.style.height;
        this.content.style.height = '';
        const contentHeight = this.content.scrollHeight;
        this.content.style.height = originalHeight; 

        const reflow = this.content.offsetHeight;

        this.content.style.setProperty('--collapse-height', `${contentHeight }px`); 
        this.content.style.height = `${contentHeight } px`; 

        this.container.classList.add('is-expanded'); 
    }

    hide() {
        if (!this.isExpanded) return;

        this.container.classList.add('is-collapsing'); 
        this.button.setAttribute('aria-expanded', 'false');
        this.isExpanded = false;

        const contentHeight = this.content.scrollHeight;
        this.content.style.setProperty('--collapse-height', `${contentHeight }px`); 
        this.content.style.height = `${contentHeight } px`; 

        const reflow = this.content.offsetHeight;

        this.container.classList.remove('is-expanded'); 
        this.content.style.height = '0px'; 
    }

    handleTransitionEnd() {
        if (this.container.classList.contains('is-collapsing')) {
            this.container.classList.remove('is-collapsing');
            this.content.style.removeProperty('--collapse-height'); 

            if (this.isExpanded) {
                this.content.style.height = 'auto';
            }
        }
    }
}

export default Collapse;