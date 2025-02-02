<template>
  <div class="min-h-screen bg-gray-100 p-4 overflow-y-auto">
    <!-- Button to add a new product -->
    <button @click="showAddProductForm = true" class="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
      Add Product
    </button>

    <!-- Product list section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <!-- Loop through the products and display them -->
      <div v-for="(product, index) in products" :key="product._id"
        class="bg-white rounded-lg shadow-md overflow-hidden">
        <!-- Image Carousel Section -->
        <div class="w-full h-48 bg-gray-200 relative">
          <div class="absolute inset-0 flex items-center justify-between z-10">
            <!-- Previous Button -->
            <button class="p-2 bg-black bg-opacity-50 text-white rounded-full" @click="prevImage(index)">
              &#9664;
            </button>
            <!-- Next Button -->
            <button class="p-2 bg-black bg-opacity-50 text-white rounded-full" @click="nextImage(index)">
              &#9654;
            </button>
          </div>
          <img :src="`http://localhost:3005/${product.images[currentImageIndex[index]]}`" alt="Product image"
            class="w-full h-full object-cover" />
        </div>
        <!-- Product Details Section -->
        <div class="p-4">
          <h2 class="text-xl font-semibold">{{ product.name }}</h2>
          <p class="text-sm text-gray-600">Price: ${{ product.price }}</p>
          <p class="text-sm text-gray-600">Stock: {{ product.stock }}</p>
          <p class="text-gray-700 mt-2">{{ product.description }}</p>
          <div class="mt-4 flex justify-between">

            <!-- Edit button -->
            <button @click="openEditForm(product)" class="text-blue-600 hover:underline">
              Edit
            </button>
            <!-- Edit button -->
            <button @click="openAddPhotos(product._id)" class="text-blue-200 hover:underline">
              Add img
            </button>
            <!-- Delete button -->
            <button @click="confirmDelete(product._id)" class="text-red-600 hover:underline">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Product Form Modal -->
    <div v-if="showAddProductForm" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg w-96">
        <h2 class="text-xl font-semibold mb-4">Add New Product</h2>
        <form @submit.prevent="submitAddProduct">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" v-model="newProduct.name" id="name"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" v-model="newProduct.price" id="price"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
            <input type="number" v-model="newProduct.stock" id="stock"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea v-model="newProduct.description" id="description"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required></textarea>
          </div>
          <div class="mb-4">
            <label for="imgSrc" class="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="file" multiple ref="images" id="imgSrc"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" />
          </div>

          <div class="flex justify-end">
            <button @click="showAddProductForm = false" type="button"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg">Submit</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Product Form Modal -->
    <div v-if="showEditProductForm" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg w-96">
        <h2 class="text-xl font-semibold mb-4">Edit Product</h2>
        <form @submit.prevent="updateProduct">
          <!-- Form fields omitted for brevity (same as Add Product Form) -->
          <div class="mb-4">
            <label for="editName" class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" v-model="editProduct.name" id="editName"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="editPrice" class="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" v-model="editProduct.price" id="editPrice"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="editStock" class="block text-sm font-medium text-gray-700">Stock</label>
            <input type="number" v-model="editProduct.stock" id="editStock"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="editDescription" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea v-model="editProduct.description" id="editDescription"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required></textarea>
          </div>
          <div class="mb-4">
            <label for="editImgSrc" class="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="file" ref="" id="editImgSrc"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" />
          </div>
          <div class="flex justify-end">
            <button @click="showEditProductForm = false" type="button"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg">Update</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add Photos Modal -->
    <div v-if="showAddImg" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg w-96">
        <h2 class="text-xl font-semibold mb-4">Add Photos</h2>
        <form @submit.prevent="addPhotosToProduct">
          <!-- File input for selecting multiple images -->
          <div class="mb-4">
            <label for="editImgSrc" class="block text-sm font-medium text-gray-700">
              Upload Images
            </label>
            <input type="file" multiple @change="handleFileInput" id="editImgSrc"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" />
          </div>
          <!-- Modal action buttons -->
          <div class="flex justify-end">
            <button @click="showAddImg = false" type="button" class="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useProductStore } from '../../stores/productStore';
const productStore = useProductStore();

// Reactive States
const products = ref([]); // List of products
const currentImageIndex = ref([]); // Tracks the current image in the carousel for each product
const newProduct = ref({ name: '', price: '', description: '', stock: '' }); // New product form data
const editProduct = ref({}); // Product being edited
const selectedImages = ref([]); // Selected files for image upload
const currentProductId = ref(null); // Current product ID for adding images

// UI State
const showAddProductForm = ref(false); // Toggle for the "Add Product" form
const showEditProductForm = ref(false); // Toggle for the "Edit Product" form
const showAddImg = ref(false); // Toggle for the "Add Images" modal

// Fetch Products from the Server
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3005/api/products');
    products.value = response.data;
    currentImageIndex.value = products.value.map(() => 0); // Initialize image index for each product
    productStore.setProducts(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to fetch products. Please try again.',
    });
  }
};

// Lifecycle Hook to Fetch Products on Mount
onMounted(() => fetchProducts());

// Carousel Navigation
const prevImage = (index) => {
  const totalImages = products.value[index].images.length;
  currentImageIndex.value[index] = (currentImageIndex.value[index] - 1 + totalImages) % totalImages;
};

const nextImage = (index) => {
  const totalImages = products.value[index].images.length;
  currentImageIndex.value[index] = (currentImageIndex.value[index] + 1) % totalImages;
};

// Add Product
const submitAddProduct = async () => {
  try {
    const formData = new FormData();
    formData.append('name', newProduct.value.name);
    formData.append('price', newProduct.value.price);
    formData.append('description', newProduct.value.description);
    formData.append('stock', newProduct.value.stock);

    await axios.post('http://localhost:3005/api/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Product added successfully!',
    });

    // Reset form and refresh product list
    fetchProducts();
    showAddProductForm.value = false;
    newProduct.value = { name: '', price: '', description: '', stock: '' };
  } catch (error) {
    console.error('Error adding product:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to add product. Please try again.',
    });
  }
};

// Open Edit Form
const openEditForm = (product) => {
  editProduct.value = { ...product }; // Clone product data
  showEditProductForm.value = true;
};

// Open Add Photos Modal
const openAddPhotos = (productId) => {
  currentProductId.value = productId;
  showAddImg.value = true;
};

// Handle File Input for Image Upload
const handleFileInput = (event) => {
  selectedImages.value = event.target.files;
};

// delete product 
const confirmDelete = async (productId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Call the store action to delete the product
        await productStore.deleteProduct(productId);

        Swal.fire("Deleted!", "Product has been successfully deleted.", "success");
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire("Error", "Failed to delete the product. Please try again.", "error");
      }
    }
  });
};



// Add Photos to Product
const addPhotosToProduct = async () => {
  if (!currentProductId.value || selectedImages.value.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'No Images Selected',
      text: 'Please select images to upload.',
    });
    return;
  }

  try {
    const formData = new FormData();
    for (const file of selectedImages.value) {
      formData.append('images', file);
    }

    await axios.post(
      `http://localhost:3005/api/products/${currentProductId.value}/upload-images`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Images uploaded successfully!',
    });

    // Reset modal state
    showAddImg.value = false;
    selectedImages.value = [];
    fetchProducts(); // Refresh products to reflect changes
  } catch (error) {
    console.error('Error uploading images:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to upload images. Please try again.',
    });
  }
};
</script>
