const data = JSON.parse(`
{
    "produtos": [
        {
            "id": 1,
            "nome": "Fone Bluetooth TWS",
            "preco": 149.90,
            "categoria": "Acessórios",
            "imagem": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60",
            "descricao": "Som estéreo sem fio de alta qualidade com cancelamento de ruído passivo.",
            "emEstoque": true
        },
        {
            "id": 2,
            "nome": "Chocolate Trufado",
            "preco": 12.50,
            "categoria": "Comida",
            "imagem": "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&auto=format&fit=crop&q=60",
            "descricao": "Cremoso e recheado com trufa de avelã artesanal.",
            "emEstoque": true
        },
        {
            "id": 3,
            "nome": "Quebra-Cabeça 2000 Peças",
            "preco": 55.90,
            "categoria": "Games",
            "imagem": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60",
            "descricao": "Desafio complexo de paisagem panorâmica com encaixe preciso.",
            "emEstoque": true
        },
        {
            "id": 4,
            "nome": "Caderno Universitário",
            "preco": 24.50,
            "categoria": "Papelaria",
            "imagem": "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&auto=format&fit=crop&q=60",
            "descricao": "Capa dura resistente, 10 matérias com adesivos inclusos.",
            "emEstoque": true
        },
        {
            "id": 5,
            "nome": "Copo Térmico Inox",
            "preco": 89.90,
            "categoria": "Acessórios",
            "imagem": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60",
            "descricao": "Mantém a bebida gelada por até 24 horas ou quente por 6 horas.",
            "emEstoque": false
        },
        {
            "id": 6,
            "nome": "Luminária LED Articulada",
            "preco": 45.00,
            "categoria": "Casa",
            "imagem": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60",
            "descricao": "Luz focada para estudos e trabalho com touch e ajuste de brilho.",
            "emEstoque": true
        },
        {
            "id": 7,
            "nome": "Mouse Gamer RGB",
            "preco": 129.90,
            "categoria": "Notebooks",
            "imagem": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60",
            "descricao": "Alta precisão com DPI ajustável e iluminação personalizável.",
            "emEstoque": true
        },
        {
            "id": 8,
            "nome": "Notebook Ultrafino",
            "preco": 3499.00,
            "categoria": "Notebooks",
            "imagem": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60",
            "descricao": "Processador rápido, 8GB RAM e SSD de 256GB para alta performance.",
            "emEstoque": true
        }
    ]
}
`);

const productListElement = document.getElementById('product-list');
const productDetailsElement = document.getElementById('product-details');

const searchInput = document.querySelector('#search');
const categorySelect = document.querySelector('#category');
const btnRender = document.querySelector('#btnRender');

function formatPrice(preco) {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function createProductCard(produto) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', produto.id);

    card.style.transition = 'all 0.3s ease';

    card.innerHTML = `
        <div class="card-img-container">
            <img src="${produto.imagem}" alt="${produto.nome}" class="card-img">
        </div>
        <div class="card-body">
            <span class="card-category">${produto.categoria}</span>
            <h3 class="card-title">${produto.nome}</h3>
            <p class="card-price">${formatPrice(produto.preco)}</p>
            <div class="card-actions">
                <button class="btn-details">Detalhes</button>
                <button class="btn-highlight">Destacar</button>
            </div>
        </div>
    `;

    const btnDetails = card.querySelector('.btn-details');
    const btnHighlight = card.querySelector('.btn-highlight');

    btnDetails.addEventListener('click', () => {
        showProductDetails(produto);
    });

    btnHighlight.addEventListener('click', () => {
        card.classList.toggle('highlight');
    });

    return card;
}

function renderProducts(produtos) {
    productListElement.innerHTML = "";

    if (produtos.length === 0) {
        productListElement.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center; padding: 2rem;">Nenhum produto encontrado.</p>`;
        return;
    }

    produtos.forEach(produto => {
        const cardElement = createProductCard(produto);
        productListElement.appendChild(cardElement);
    });

    const allCards = document.querySelectorAll(".card");
    console.log(`Total de cards renderizados: ${allCards.length}`);
    
    allCards.forEach((cardNode, index) => {
        const prodId = cardNode.getAttribute('data-id');
        console.log(`Card [${index + 1}] -> data-id: ${prodId}`);
    });
}

function renderCategories() {
    const categoriasUnicas = [...new Set(data.produtos.map(p => p.categoria))];
    
    categorySelect.innerHTML = `<option value="Todas">Todas</option>`;
    
    categoriasUnicas.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto) {
    productDetailsElement.innerHTML = `
        <div class="details-content">
            <h3>Detalhes do Produto: ${produto.nome}</h3>
            <p>ID: <span>${produto.id}</span></p>
            <p>Categoria: <span>${produto.categoria}</span></p>
            <p>Preço: <span>${formatPrice(produto.preco)}</span></p>
            <p>Estoque: <span style="color: ${produto.emEstoque ? 'var(--accent)' : 'var(--accent-out)'};">${produto.emEstoque ? 'Disponível' : 'Indisponível'}</span></p>
            <p>Descrição: <span>${produto.descricao}</span></p>
        </div>
    `;
}

function filterProducts() {
    const textoBusca = searchInput.value.toLowerCase().trim();
    const categoriaSelecionada = categorySelect.value;

    const produtosFiltrados = data.produtos.filter(produto => {
        const correspondeNome = produto.nome.toLowerCase().includes(textoBusca);
        const correspondeCategoria = (categoriaSelecionada === "Todas" || produto.categoria === categoriaSelecionada);
        return correspondeNome && correspondeCategoria;
    });

    renderProducts(produtosFiltrados);
}

searchInput.addEventListener('input', () => {
    filterProducts();
});

categorySelect.addEventListener('change', () => {
    filterProducts();
});

btnRender.addEventListener('click', () => {
    searchInput.value = "";
    categorySelect.value = "Todas";
    renderProducts(data.produtos);
});

document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderProducts(data.produtos);
});
