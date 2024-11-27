// Productos de ejemplo
let products = [
    { id: 1, name: "Cuaderno Profesional", image: "cuaderno.jpg" },
    { id: 2, name: "Lápiz HB", image: "lapiz.jpg" },
    { id: 3, name: "Goma de Borrar", image: "goma.jpg" }
  ];
  
  // Cargar productos en la galería
  function loadGallery() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // Limpia el contenido previo
    products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <button onclick="deleteProduct(${product.id})">Eliminar</button>
      `;
      gallery.appendChild(productDiv);
    });
  }
  
  // Filtrar productos según la búsqueda
  function filterProducts() {
    const searchBar = document.getElementById("searchBar").value.toLowerCase();
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchBar)
    );
  
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    filteredProducts.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <button onclick="deleteProduct(${product.id})">Eliminar</button>
      `;
      gallery.appendChild(productDiv);
    });
  }
  
  // Agregar un nuevo producto
  function addProduct() {
    const nameInput = document.getElementById("newProductName").value.trim();
    const imageInput = document.getElementById("newProductImage").files[0];
  
    if (!nameInput || !imageInput) {
      alert("Por favor, ingresa un nombre y selecciona una imagen.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function (e) {
      const newProduct = {
        id: Date.now(),
        name: nameInput,
        image: e.target.result
      };
      products.push(newProduct);
      loadGallery();
    };
    reader.readAsDataURL(imageInput);
  }
  
  // Eliminar un producto por su ID
  function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    loadGallery();
  }
  
  // Inicializar la galería al cargar la página
  document.addEventListener("DOMContentLoaded", loadGallery);
  