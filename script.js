let cart = [];

const products = [
    {
        title: 'Total Whey Protein',
        price: 19.99,
        sku: 'SKU001',
        stock: 5,
        image: 'produs1.jpeg',
        description: 'Lorem ipsum dolor sit amet.'
    },
    
    {
        title: 'Creatine',
        sku: 'SKU002',
        price: 29.99,
        stock: 3,
        image: 'produs2.jpeg',
        description: 'Lorem ipsum dolor sit amet.'
    },
    {
        title: 'Pre-Workout',
        sku: 'SKU003',
        price: 32.99,
        stock: 7,
        image: 'produs3.jpeg',
        description: 'Lorem ipsum dolor sit amet.'
    },
    {
        title: 'Whey Protein',
        sku: 'SKU004',
        price: 15.99,
        stock: 8,
        image: 'produs4.jpeg',
        description: 'Lorem ipsum dolor sit amet.'
    },
    {
        title: 'In Green',
        sku: 'SKU005',
        price: 15.99,
        stock: 8,
        image: 'produs5.jpeg',
        description: 'Lorem ipsum dolor sit amet.'
    },
    {
        title: 'Creatine',
        sku: 'SKU006',
        price: 15.99,
        stock: 8,
        image: 'produs6.jpeg',
        description: 'Lorem ipsum dolor sit amet.'
    },
];

// Function to generate product HTML
function generateProductHTML(product) {
    return `
        <div class="product-item">
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>Description: ${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Stock: ${product.stock}</p>
            <input type="number" id="quantity${product.sku}" min="1" max="${product.stock}" value="1">
            <button onclick="addToCart('${product.title}', '${product.sku}', ${product.price}, ${product.stock})">Add to Cart</button>
        </div>
    `;
}

// Function to populate products list
function populateProducts() {
    const productsListDiv = document.getElementById('productsList');
    products.forEach(product => {
        productsListDiv.innerHTML += generateProductHTML(product);
    });
}

// Function to add product to cart
function addToCart(title, sku, price, stock) {
    const quantity = parseInt(document.getElementById(`quantity${sku}`).value);
    if (quantity > stock) {
        alert(`Only ${stock} items available.`);
        return;
    }
    const existingItem = cart.find(item => item.sku === sku);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            title: title,
            sku: sku,
            price: price,
            quantity: quantity
        });
    }
    updateCartUI();
}

// Function to update cart UI
function updateCartUI() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <p>${item.title} (SKU: ${item.sku}) - Quantity: ${item.quantity}</p>
            <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart('${item.sku}')">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
        total += item.price * item.quantity;
    });
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

// Function to remove item from cart
function removeFromCart(sku) {
    cart = cart.filter(item => item.sku !== sku);
    updateCartUI();
}

// Function to empty the cart
function emptyCart() {
    cart = [];
    updateCartUI();
}

// Modal functions
const modal = document.getElementById('myModal');

function openModal() {
    modal.style.display = 'block';
    updateOrderDetails();
}

function closeModal() {
    modal.style.display = 'none';
}

function updateOrderDetails() {
    const orderDetailsDiv = document.getElementById('order-details');
    orderDetailsDiv.innerHTML = '';
    cart.forEach(item => {
        const itemDetails = document.createElement('p');
        itemDetails.textContent = `${item.title} - Quantity: ${item.quantity}`;
        orderDetailsDiv.appendChild(itemDetails);
    });
}

function completeOrder() {
    // Here you can implement your order completion logic
    alert('Order completed! Thank you for shopping with us.');
    emptyCart(); // Empty cart after completing the order
    closeModal(); // Close modal after completing the order
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
};

// Populate products initially
populateProducts();