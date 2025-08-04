import '../src/styles/collapse.css';
import Collapse from './js/Collapse';

document.addEventListener('DOMContentLoaded', () => {
    const collapseContainers = document.querySelectorAll('.collapse-container');

    collapseContainers.forEach(container => {
        new Collapse(container);
    });
});