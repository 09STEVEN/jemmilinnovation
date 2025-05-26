document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle (same as main.js)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
        mobileMenuBtn.innerHTML = navbar.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Product Data (would normally come from an API)
    const products = [
        {
            id: 1,
            image: 'images/1.png',
            category: 'Cleaning Chemical',
            title: 'Industrial Degreaser',
            description: 'Powerful degreaser for kitchen equipment and industrial use.',
            price: 'K8,500',
            categoryClass: 'chemicals',
            industries: ['restaurant', 'hotel']
        },
        {
            id: 2,
            image: 'images/products/equipment-1.jpg',
            category: 'Equipment',
            title: 'Commercial Floor Scrubber',
            description: 'Heavy-duty floor scrubber for large area cleaning.',
            price: 'K120,000',
            categoryClass: 'equipment',
            industries: ['hotel', 'supermarket', 'healthcare']
        },
        {
            id: 3,
            image: 'images/products/packaging-1.jpg',
            category: 'Packaging',
            title: 'Eco-Friendly Food Containers',
            description: 'Biodegradable food containers for takeaway and delivery.',
            price: 'K2,500 per pack',
            categoryClass: 'packaging',
            industries: ['restaurant', 'supermarket']
        },
        {
            id: 4,
            image: 'images/products/chemical-2.jpg',
            category: 'Cleaning Chemical',
            title: 'Hospital Grade Disinfectant',
            description: 'Effective against 99.9% of bacteria and viruses.',
            price: 'K6,800',
            categoryClass: 'chemicals',
            industries: ['healthcare', 'hotel']
        },
        {
            id: 5,
            image: 'images/products/equipment-2.jpg',
            category: 'Equipment',
            title: 'Handheld Steam Cleaner',
            description: 'Portable steam cleaner for sanitizing surfaces.',
            price: 'K45,000',
            categoryClass: 'equipment',
            industries: ['restaurant', 'healthcare']
        },
        {
            id: 6,
            image: 'images/products/packaging-2.jpg',
            category: 'Packaging',
            title: 'Vacuum Sealer Bags',
            description: 'Commercial-grade bags for food preservation.',
            price: 'K3,200 per roll',
            categoryClass: 'packaging',
            industries: ['restaurant', 'supermarket']
        },
        {
            id: 7,
            image: 'images/products/custom-1.jpg',
            category: 'Custom Solution',
            title: 'Custom Label Cleaning Products',
            description: 'Private label cleaning products for your brand.',
            price: 'Contact for pricing',
            categoryClass: 'custom',
            industries: ['restaurant', 'hotel', 'supermarket']
        },
        {
            id: 8,
            image: 'images/products/chemical-3.jpg',
            category: 'Cleaning Chemical',
            title: 'Glass Cleaner Concentrate',
            description: 'Streak-free cleaner for windows and glass surfaces.',
            price: 'K7,500',
            categoryClass: 'chemicals',
            industries: ['hotel', 'supermarket']
        },
          {
            id: 8,
            image: 'images/products/chemical-3.jpg',
            category: 'Cleaning Chemical',
            title: 'Glass Cleaner Concentrate',
            description: 'Streak-free cleaner for windows and glass surfaces.',
            price: 'K7,500',
            categoryClass: 'chemicals',
            industries: ['hotel', 'supermarket']
        }
        
    ];

    // DOM Elements
    const productsContainer = document.getElementById('products-container');
    const categoryLinks = document.querySelectorAll('.category-list a');
    const industryCheckboxes = document.querySelectorAll('.industry-filter input');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');

    // Current filters
    let currentCategory = 'all';
    let currentIndustries = [];

    // Display all products initially
    displayProducts(products);

    // Category filter click handler
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active class
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Set current category
            currentCategory = this.dataset.category;
            filterProducts();
        });
    });

    // Industry filter change handler
    industryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            currentIndustries = Array.from(industryCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
        });
    });

    // Apply filters button
    applyFiltersBtn.addEventListener('click', function(e) {
        e.preventDefault();
        filterProducts();
    });

    // Reset filters button
    resetFiltersBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Reset UI
        categoryLinks.forEach(l => l.classList.remove('active'));
        document.querySelector('.category-list a[data-category="all"]').classList.add('active');
        industryCheckboxes.forEach(cb => cb.checked = false);
        
        // Reset filters
        currentCategory = 'all';
        currentIndustries = [];
        
        // Show all products
        displayProducts(products);
    });

    // Filter products based on current filters
    function filterProducts() {
        let filteredProducts = [...products];
        
        // Apply category filter
        if (currentCategory !== 'all') {
            filteredProducts = filteredProducts.filter(
                product => product.categoryClass === currentCategory
            );
        }
        
        // Apply industry filter if any industries are selected
        if (currentIndustries.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                currentIndustries.some(industry =>
                    product.industries.includes(industry)
                )
            );
        }
        
        displayProducts(filteredProducts);
    }

    // Display products in the grid
    function displayProducts(productsToDisplay) {
        productsContainer.innerHTML = '';
        
        if (productsToDisplay.length === 0) {
            productsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No products match your filters</h3>
                    <p>Try adjusting your search criteria</p>
                </div>
            `;
            return;
        }
        
        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${product.price}</div>
                    <div class="product-actions">
                        <a href="#" class="btn btn-primary">Details</a>
                        <a href="#" class="btn btn-secondary">Enquire</a>
                    </div>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
    }
});