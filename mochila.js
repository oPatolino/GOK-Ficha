document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-button');
    const clearButton = document.getElementById('clear-button');
    const saveButton = document.getElementById('save-button');
    const loadButton = document.getElementById('load-button');
    const itemList = document.getElementById('item-list');
    const itemName = document.getElementById('item-name');
    const itemDescription = document.getElementById('item-description');
    const itemQuantity = document.getElementById('item-quantity');
    const message = document.getElementById('message');

    // Função para mostrar mensagem de sucesso
    function showMessage(text) {
        message.textContent = text;
        message.style.opacity = 1;
        setTimeout(() => {
            message.style.opacity = 0;
        }, 3000);
    }

    // Função para atualizar a lista de itens
    function updateItemList(items) {
        itemList.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${item.name}</strong>
                    <p>${item.description}</p>
                </div>
                <div class="quantity-controls">
                    <button class="decrease-quantity">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-quantity">+</button>
                    <button class="remove-button">Remover</button>
                </div>
            `;
            itemList.appendChild(li);

            li.querySelector('.decrease-quantity').addEventListener('click', () => {
                const quantitySpan = li.querySelector('.quantity');
                let currentQuantity = parseInt(quantitySpan.textContent);
                if (currentQuantity > 1) {
                    quantitySpan.textContent = currentQuantity - 1;
                    saveItems();
                } else if (currentQuantity === 1) {
                    itemList.removeChild(li);
                    saveItems();
                }
            });

            li.querySelector('.increase-quantity').addEventListener('click', () => {
                const quantitySpan = li.querySelector('.quantity');
                let currentQuantity = parseInt(quantitySpan.textContent);
                quantitySpan.textContent = currentQuantity + 1;
                saveItems();
            });

            li.querySelector('.remove-button').addEventListener('click', () => {
                itemList.removeChild(li);
                saveItems();
            });
        });
    }

    // Função para salvar itens no localStorage
    function saveItems() {
        const items = [];
        itemList.querySelectorAll('li').forEach(li => {
            items.push({
                name: li.querySelector('strong').textContent,
                description: li.querySelector('p').textContent,
                quantity: li.querySelector('.quantity').textContent
            });
        });
        localStorage.setItem('mochila', JSON.stringify(items));
        showMessage('Itens salvos com sucesso!');
    }

    // Função para carregar itens do localStorage
    function loadItems() {
        const savedItems = JSON.parse(localStorage.getItem('mochila')) || [];
        updateItemList(savedItems);
        showMessage('Itens carregados com sucesso!');
    }

    // Adicionar novo item à lista
    addButton.addEventListener('click', () => {
        const name = itemName.value.trim();
        const description = itemDescription.value.trim();
        const quantity = itemQuantity.value.trim();
        if (name && description && quantity) {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${name}</strong>
                    <p>${description}</p>
                </div>
                <div class="quantity-controls">
                    <button class="decrease-quantity">-</button>
                    <span class="quantity">${quantity}</span>
                    <button class="increase-quantity">+</button>
                    <button class="remove-button">Remover</button>
                </div>
            `;
            itemList.appendChild(li);

            li.querySelector('.decrease-quantity').addEventListener('click', () => {
                const quantitySpan = li.querySelector('.quantity');
                let currentQuantity = parseInt(quantitySpan.textContent);
                if (currentQuantity > 1) {
                    quantitySpan.textContent = currentQuantity - 1;
                    saveItems();
                } else if (currentQuantity === 1) {
                    itemList.removeChild(li);
                    saveItems();
                }
            });

            li.querySelector('.increase-quantity').addEventListener('click', () => {
                const quantitySpan = li.querySelector('.quantity');
                let currentQuantity = parseInt(quantitySpan.textContent);
                quantitySpan.textContent = currentQuantity + 1;
                saveItems();
            });

            li.querySelector('.remove-button').addEventListener('click', () => {
                itemList.removeChild(li);
                saveItems();
            });

            itemName.value = '';
            itemDescription.value = '';
            itemQuantity.value = '1';
            saveItems();
        } else {
            showMessage('Por favor, preencha todos os campos.');
        }
    });

    // Limpar todos os itens da lista
    clearButton.addEventListener('click', () => {
        itemList.innerHTML = '';
        localStorage.removeItem('mochila');
        showMessage('Mochila limpa com sucesso!');
    });

    // Botão para salvar a lista de itens
    saveButton.addEventListener('click', () => {
        saveItems();
    });

    // Botão para carregar a lista de itens
    loadButton.addEventListener('click', () => {
        loadItems();
    });

    // Carregar a lista ao iniciar
    loadItems();
});