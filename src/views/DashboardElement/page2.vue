<template>
  <div class="min-h-screen bg-gray-100 p-4 overflow-y-auto">
    <!-- Button to add a new product -->
    <button @click="showAddProductForm = true" class="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
      Add Product
    </button>

    <!-- Product list section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <!-- Loop through the products and display them -->
      <div v-for="(product, index) in products" :key="product._id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <!-- Image Section -->
        <div class="w-full h-48 bg-gray-200">
          <img
            :src="product.imgSrc || 'https://via.placeholder.com/150'"
            alt="Product image"
            class="w-full h-full object-cover"
          />
        </div>
        <!-- Product Details Section -->
        <div class="p-4">
          <h2 class="text-xl font-semibold">{{ product.name }}</h2>
          <p class="text-sm text-gray-600">Price: ${{ product.price }}</p>
          <p class="text-sm text-gray-600">Stock: {{ product.stock }}</p>
          <p class="text-gray-700 mt-2">{{ product.description }}</p>
          <div class="mt-4 flex justify-between">
            <!-- Edit button that shows the form to edit the product -->
            <button @click="openEditForm(product)" class="text-blue-600 hover:underline">
              Edit
            </button>
            <!-- Delete button with confirmation popup -->
            <button @click="confirmDelete(product._id)" class="text-red-600 hover:underline">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Product Form Modal -->
    <div v-if="showAddProductForm" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg w-96">
        <h2 class="text-xl font-semibold mb-4">Add New Product</h2>
        <form @submit.prevent="submitAddProduct">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" v-model="newProduct.name" id="name" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" v-model="newProduct.price" id="price" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
            <input type="number" v-model="newProduct.stock" id="stock" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea v-model="newProduct.description" id="description" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required></textarea>
          </div>
          <div class="mb-4">
            <label for="imgSrc" class="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="url" v-model="newProduct.imgSrc" id="imgSrc" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" />
          </div>
          <div class="flex justify-end">
            <button @click="showAddProductForm = false" type="button" class="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg">Submit</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Product Form Modal -->
    <div v-if="showEditProductForm" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg w-96">
        <h2 class="text-xl font-semibold mb-4">Edit Product</h2>
        <form @submit.prevent="submitEditProduct">
          <div class="mb-4">
            <label for="editName" class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" v-model="editProduct.name" id="editName" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="editPrice" class="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" v-model="editProduct.price" id="editPrice" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="editStock" class="block text-sm font-medium text-gray-700">Stock</label>
            <input type="number" v-model="editProduct.stock" id="editStock" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="editDescription" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea v-model="editProduct.description" id="editDescription" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required></textarea>
          </div>
          <div class="mb-4">
            <label for="editImgSrc" class="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="url" v-model="editProduct.imgSrc" id="editImgSrc" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" />
          </div>
          <div class="flex justify-end">
            <button @click="showEditProductForm = false" type="button" class="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg">Update</button>
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

// Reactive data
const products = ref([]);
const showAddProductForm = ref(false);
const showEditProductForm = ref(false);
const newProduct = ref({
  name: '',
  price: '',
  description: '',
  stock: ''
});
const editProduct = ref({
  name: '',
  price: '',
  description: '',
  stock: ''
});

// Fetch products from the server
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3005/api/products');
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Fetch products when the component is mounted
onMounted(() => {
  fetchProducts();
});

// Show the form to edit a product
const openEditForm = (product) => {
  editProduct.value = { ...product }; // Pre-fill the form with the product's data
  showEditProductForm.value = true;
};

// Submit the edit form to update the product
const submitEditProduct = async () => {
  try {
    await axios.put(`http://localhost:3005/api/products/${editProduct.value._id}`, editProduct.value);
    Swal.fire('Success!', 'Product updated successfully.', 'success');
    fetchProducts(); // Refresh the products list
    showEditProductForm.value = false;
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

// Show the delete confirmation popup
const confirmDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3005/api/products/${id}`);
        Swal.fire('Deleted!', 'The product has been deleted.', 'success');
        fetchProducts(); // Refresh the products list
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  });
};

// Submit the add form to create a new product
const submitAddProduct = async () => {
  try {
    await axios.post('http://localhost:3005/api/products', newProduct.value);
    Swal.fire('Success!', 'Product added successfully.', 'success');
    fetchProducts(); // Refresh the products list
    showAddProductForm.value = false;
    newProduct.value = { name: '', price: '', description: '', stock: '' }; // Reset form fields
  } catch (error) {
    console.error('Error adding product:', error);
  }
};
</script>

<style scoped>
/* You can add any custom styles here */
</style>
