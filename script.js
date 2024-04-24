// console.log('====================================');
// console.log("Connected");
// console.log('====================================');


// document.addEventListener('DOMContentLoaded', function() {
//     // Fetch product data from API
//     fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
//       .then(response => response.json())
//       .then(data => {
//         console.log('Fetched data:', data); // Log fetched data to console
//         // Initial load - show men's products by default
//         showProducts('Men', data.categories);
//         showProducts('Women', data.categories);
//         showProducts('Kids', data.categories);
//       })
//       .catch(error => console.error('Error fetching product data:', error));
// });

// // Function to display products based on category
// function showProducts(category, categories) {
//   console.log('Category:', category);
//   console.log('Data:', categories);

//   if (!Array.isArray(categories)) {
//     console.error('Invalid categories:', categories);
//     return;
//   }

//   const categoryData = categories.find(cat => cat.category_name.toLowerCase() === category.toLowerCase());
//   if (!categoryData || !Array.isArray(categoryData.category_products)) {
//     console.error('Invalid data or category:', categoryData, category);
//     return;
//   }

//   const productsContainer = document.getElementById('products');
//   productsContainer.innerHTML = ''; // Clear previous products

//   const products = categoryData.category_products;
//   products.forEach(product => {
//     const productCard = createProductCard(product);
//     if (productCard) {
//       productsContainer.appendChild(productCard);
//     }
//   });
// }

// '''''''''''''''


document.addEventListener('DOMContentLoaded', function() {
  fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched data:', data); // Log fetched data to console
      // Initial load - show men's products by default
      showProducts('Men', data.categories);
      showProducts('Women', data.categories);
      showProducts('Kids', data.categories);
    })
    .catch(error => console.error('Error fetching product data:', error));
});

function showProducts(category, categories) {
  const categoryData = categories.find(cat => cat.category_name.toLowerCase() === category.toLowerCase());
  if (!categoryData || !Array.isArray(categoryData.category_products)) {
    console.error('Invalid data or category:', categoryData, category);
    return;
  }

  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = ''; // Clear previous products

  categoryData.category_products.forEach(product => {
    const productCard = createProductCard(product);
    if (productCard) {
      productsContainer.appendChild(productCard);
    }
  });
}

// function createProductCard(product) {
//   if (!product || typeof product !== 'object') {
//     console.error('Invalid product data:', product);
//     return null;
//   }

//   // Create product card HTML elements
//   // Example: 
//   // const productCard = document.createElement('div');
//   // productCard.classList.add('product-card');
//   // ...

//   return productCard; // Return the created product card
// }









// Function to create a product card HTML element
function createProductCard(product) {
  if (!product || typeof product !== 'object') {
    console.error('Invalid product data:', product);
    return null;
  }

  const productCard = document.createElement('div');
  productCard.classList.add('product-card');

  const badge = document.createElement('div');
  badge.classList.add('badge');
  badge.innerText = product.badge_text || 'No Badge';
  productCard.appendChild(badge);

  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.title;
  image.classList.add('product-image'); // Add CSS class for styling
  productCard.appendChild(image);

  const title = document.createElement('h3');
  title.innerText = product.title;
  productCard.appendChild(title);

  const vendor = document.createElement('p');
  vendor.innerText = 'Vendor: ' + product.vendor;
  productCard.appendChild(vendor);

  const price = document.createElement('p');
  price.innerText = 'Price: $' + product.price;
  productCard.appendChild(price);

  const comparePrice = document.createElement('p');
  comparePrice.innerText = 'Compare at Price: $' + product.compare_at_price;
  productCard.appendChild(comparePrice);

  const discount = document.createElement('p');
  const discountPercent = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
  discount.innerText = 'Discount: ' + discountPercent + '% off';
  productCard.appendChild(discount);

  const addToCartBtn = document.createElement('button');
  addToCartBtn.innerText = 'Add to Cart';
  addToCartBtn.classList.add('add-to-cart'); // Add CSS class for styling
  productCard.appendChild(addToCartBtn);

  return productCard;
}
