document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const productGrid = document.getElementById('product-grid');

    // --- State Variable ---
    let cart = [];

    // --- Event Listeners ---
    cartIcon.addEventListener('click', openCartModal);
    closeBtn.addEventListener('click', closeCartModal);
    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            closeCartModal();
        }
    });

    // Event delegation for Add to Cart buttons
    productGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productCard = event.target.closest('.product-card');
            const product = {
                id: productCard.dataset.id,
                name: productCard.dataset.name,
                price: parseFloat(productCard.dataset.price),
                quantity: 1
            };
            addToCart(product);
        }
    });

    // --- Functions ---

    function openCartModal() {
        cartModal.style.display = 'block';
    }

    function closeCartModal() {
        cartModal.style.display = 'none';
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            // If item exists, just increase quantity
            existingItem.quantity++;
        } else {
            // If item is new, add it to the cart
            cart.push(product);
        }

        updateCartUI();
        alert(`${product.name} added to cart!`);
    }

    function calculateSubtotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    function updateCartUI() {
        // 1. Update Cart Count in the header
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;

        // 2. Update Cart Items List in the modal
        cartItemsContainer.innerHTML = ''; // Clear existing items

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <span>**${item.name}** x ${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }

        // 3. Update Subtotal
        const subtotal = calculateSubtotal();
        cartSubtotal.textContent = subtotal.toFixed(2);
    }

    // Initial load: ensure UI matches the empty cart state
    updateCartUI();
});