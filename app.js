
const itemsPerPage = 10;
let currentPage = 1;

async function fetchData(page) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${itemsPerPage}`);
    const data = await response.json();
    return data;
}

async function renderPage(page) {
    const itemsToDisplay = await fetchData(page);
    const container = document.getElementById('data-container');
    container.innerHTML = itemsToDisplay.map(item => `<div>${item.title}</div>`).join('');
    const totalItems = 100;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const controls = document.getElementById('pagination-controls');
    controls.innerHTML = `
        <button ${page === 1 ? 'disabled' : ''} onclick="changePage(${page - 1})">Previous</button>
        ${generatePageButtons(page, totalPages)}
        <button ${page === totalPages ? 'disabled' : ''} onclick="changePage(${page + 1})">Next</button>
    `;
}

function generatePageButtons(currentPage, totalPages) {
    let buttons = '';
    const range = 2;

    if (totalPages <= 1) return '';

    if (currentPage > range + 1) {
        buttons += `<button onclick="changePage(1)">1</button>`;
        buttons += `<span>...</span>`;
    }

    for (let i = Math.max(2, currentPage - range); i <= Math.min(totalPages - 1, currentPage + range); i++) {
        buttons += `<button ${i === currentPage ? 'class="active"' : ''} onclick="changePage(${i})">${i}</button>`;
    }

    if (currentPage < totalPages - range) {
        buttons += `<span>...</span>`;
        buttons += `<button onclick="changePage(${totalPages})">${totalPages}</button>`;
    }

    return buttons;
}

function changePage(page) {
    currentPage = page;
    renderPage(currentPage);
}

renderPage(currentPage);
