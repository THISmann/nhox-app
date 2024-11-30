<template>
    <div class="min-h-screen bg-gray-100 p-4">
      <!-- Button to add a new article -->
      <button @click="showAddArticleForm = true" class="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Add Article
      </button>
  
      <!-- Article list section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <!-- Loop through the articles and display them -->
        <div v-for="(article, index) in articles" :key="article._id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <img :src="article.imgSrc" alt="Article image" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h2 class="text-xl font-semibold">{{ article.title }}</h2>
            <p class="text-sm text-gray-600">{{ article.description }}</p>
            <p class="text-gray-700 mt-2">{{ article.text }}</p>
            <div class="mt-4 flex justify-between">
              <!-- Edit button that shows the form to edit the article -->
              <button @click="openEditForm(article)" class="text-blue-600 hover:underline">
                Edit
              </button>
              <!-- Delete button with confirmation popup -->
              <button @click="confirmDelete(article._id)" class="text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Add Article Form Modal -->
      <div v-if="showAddArticleForm" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg w-96">
          <h2 class="text-xl font-semibold mb-4">Add New Article</h2>
          <form @submit.prevent="submitAddArticle">
            <div class="mb-4">
              <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" v-model="newArticle.title" id="title" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div class="mb-4">
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
              <input type="text" v-model="newArticle.description" id="description" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div class="mb-4">
              <label for="text" class="block text-sm font-medium text-gray-700">Text</label>
              <textarea v-model="newArticle.text" id="text" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required></textarea>
            </div>
            <div class="mb-4">
              <label for="imgSrc" class="block text-sm font-medium text-gray-700">Image URL</label>
              <input type="url" v-model="newArticle.imgSrc" id="imgSrc" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div class="mb-4">
              <label for="link" class="block text-sm font-medium text-gray-700">Link</label>
              <input type="url" v-model="newArticle.link" id="link" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div class="flex justify-end">
              <button @click="showAddArticleForm = false" type="button" class="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg">Submit</button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Edit Article Form Modal -->
      <div v-if="showEditArticleForm" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg w-96">
          <h2 class="text-xl font-semibold mb-4">Edit Article</h2>
          <form @submit.prevent="submitEditArticle">
            <div class="mb-4">
              <label for="editTitle" class="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" v-model="editArticle.title" id="editTitle" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div class="mb-4">
              <label for="editDescription" class="block text-sm font-medium text-gray-700">Description</label>
              <input type="text" v-model="editArticle.description" id="editDescription" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div class="mb-4">
              <label for="editText" class="block text-sm font-medium text-gray-700">Text</label>
              <textarea v-model="editArticle.text" id="editText" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required></textarea>
            </div>
            <div class="mb-4">
              <label for="editImgSrc" class="block text-sm font-medium text-gray-700">Image URL</label>
              <input type="url" v-model="editArticle.imgSrc" id="editImgSrc" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div class="mb-4">
              <label for="editLink" class="block text-sm font-medium text-gray-700">Link</label>
              <input type="url" v-model="editArticle.link" id="editLink" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div class="flex justify-end">
              <button @click="showEditArticleForm = false" type="button" class="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2">Cancel</button>
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
  const articles = ref([]);
  const showAddArticleForm = ref(false);
  const showEditArticleForm = ref(false);
  const newArticle = ref({
    title: '',
    description: '',
    text: '',
    imgSrc: '',
    link: ''
  });
  const editArticle = ref({
    title: '',
    description: '',
    text: '',
    imgSrc: '',
    link: ''
  });
  
  // Fetch articles from the server
  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:3003/articles');
      articles.value = response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };
  
  // Fetch articles when the component is mounted
  onMounted(() => {
    fetchArticles();
  });
  
  // Show the form to edit an article
  const openEditForm = (article) => {
    editArticle.value = { ...article }; // Pre-fill the form with the article's data
    showEditArticleForm.value = true;
  };
  
  // Submit the edit form to update the article
  const submitEditArticle = async () => {
    try {
      await axios.put(`http://localhost:3003/articles/${editArticle.value._id}`, editArticle.value);
      Swal.fire('Success!', 'Article updated successfully.', 'success');
      fetchArticles(); // Refresh the articles list
      showEditArticleForm.value = false;
    } catch (error) {
      console.error('Error updating article:', error);
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
          await axios.delete(`http://localhost:3003/articles/${id}`);
          Swal.fire('Deleted!', 'The article has been deleted.', 'success');
          fetchArticles(); // Refresh the articles list
        } catch (error) {
          console.error('Error deleting article:', error);
        }
      }
    });
  };
  
  // Submit the add form to create a new article
  const submitAddArticle = async () => {
    try {
      await axios.post('http://localhost:3003/articles', newArticle.value);
      Swal.fire('Success!', 'Article added successfully.', 'success');
      fetchArticles(); // Refresh the articles list
      showAddArticleForm.value = false;
      newArticle.value = { title: '', description: '', text: '', imgSrc: '', link: '' }; // Reset form fields
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };
  </script>
  
  <style scoped>
  /* You can add any custom styles here */
  </style>
  