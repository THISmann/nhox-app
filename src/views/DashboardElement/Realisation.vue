<template>
  <div class="min-h-screen bg-gray-100 p-4 overflow-y-auto">
    <!-- Button to add a new article -->
    <button @click="showAddArticleForm = true" class="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
      Add Article
    </button>

    <!-- Article list section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <!-- Loop through the articles and display them -->
      <div v-for="(article, index) in articles" :key="article._id"
        class="bg-white rounded-lg shadow-md overflow-hidden">
        <img :src="`http://localhost:3005/${article.gallery}`" alt="Article image" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h2 class="text-xl font-semibold">{{ article.title }}</h2>
          <p class="text-sm text-gray-600">{{ article.description }}</p>
          <p class="text-gray-700 mt-2">{{ article.text }}</p>
          <div class="mt-4 flex justify-between">
            <!-- Edit button -->
            <button @click="openEditForm(article)" class="text-blue-600 hover:underline">
              Edit
            </button>
            <!-- Add Image button -->
            <button @click="openAddPhotos(article._id)" class="text-blue-600 hover:underline">
              Add Img
            </button>
            <!-- Delete button -->
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
            <input type="text" v-model="newArticle.title" id="title"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <input type="text" v-model="newArticle.description" id="description"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="text" class="block text-sm font-medium text-gray-700">Text</label>
            <textarea v-model="newArticle.text" id="text"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required></textarea>
          </div>
          <div class="mb-4">
            <label for="imgSrc" class="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="url" v-model="newArticle.imgSrc" id="imgSrc"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="link" class="block text-sm font-medium text-gray-700">Image</label>
            <input type="file" ref="images" id="link"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="flex justify-end">
            <button @click="showAddArticleForm = false" type="button"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Submit
            </button>
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
            <input type="text" v-model="articleToEdit.title" id="editTitle"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="editDescription" class="block text-sm font-medium text-gray-700">Description</label>
            <input type="text" v-model="articleToEdit.description" id="editDescription"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="editText" class="block text-sm font-medium text-gray-700">Text</label>
            <textarea v-model="articleToEdit.text" id="editText"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required></textarea>
          </div>
          <div class="mb-4">
            <label for="editImgSrc" class="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="url" v-model="articleToEdit.imgSrc" id="editImgSrc"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" />
          </div>
          <div class="flex justify-end">
            <button @click="showEditArticleForm = false" type="button"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>


    <!-- Add Photos Modal -->
    <div v-if="showAddPhotos" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg w-96">
        <h2 class="text-xl font-semibold mb-4">Add Images to Article</h2>
        <form @submit.prevent="addPhotosToArticle">
          <div class="mb-4">
            <label for="images" class="block text-sm font-medium text-gray-700">Select Images</label>
            <input type="file" id="images" multiple @change="handleFileInput"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div class="flex justify-end">
            <button @click="showAddPhotos = false" type="button"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2">
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
import { ref, reactive } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

// State
const articles = ref([]); // List of articles
const showAddArticleForm = ref(false); // Toggle for "Add Article" form
const showEditArticleForm = ref(false); // Toggle for "Edit Article" form
const showAddPhotos = ref(false); // Toggle for "Add Photos" modal
const selectedImages = ref([]); // Selected files for image upload
const currentArticleId = ref(""); // ID of the current article for photo upload

// Form data for adding and editing articles
const newArticle = reactive({
  title: "",
  description: "",
  text: "",
  imgSrc: "",
});
const articleToEdit = reactive({
  _id: "",
  title: "",
  description: "",
  text: "",
  imgSrc: "",
});

// Refs for file inputs
const images = ref(null); // Add article image
const editImages = ref(null); // Edit article image

// Fetch articles from the API
const fetchArticles = async () => {
  try {
    const response = await axios.get("http://localhost:3005/api/articles");
    articles.value = response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
};

// Reset new article form
const resetNewArticle = () => {
  newArticle.title = "";
  newArticle.description = "";
  newArticle.text = "";
  newArticle.imgSrc = "";
  images.value = null;
};

// Add a new article
const submitAddArticle = async () => {
  try {
    const formData = new FormData();
    formData.append("title", newArticle.title);
    formData.append("description", newArticle.description);
    formData.append("text", newArticle.text);
    formData.append("imgSrc", newArticle.imgSrc);

    const imageFile = images.value?.files[0];
    if (imageFile) formData.append("gallery", imageFile);

    await axios.post("http://localhost:3005/api/articles", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    Swal.fire("Success!", "Article added successfully.", "success");
    showAddArticleForm.value = false;
    fetchArticles();
    resetNewArticle();
  } catch (error) {
    console.error("Error adding article:", error);
    Swal.fire("Error", "Failed to add the article. Please try again.", "error");
  }
};

// Open Edit Article Form
const openEditForm = (article) => {
  articleToEdit._id = article._id;
  articleToEdit.title = article.title;
  articleToEdit.description = article.description;
  articleToEdit.text = article.text;
  articleToEdit.imgSrc = article.imgSrc;
  showEditArticleForm.value = true;
};

// Submit Edit Article
const submitEditArticle = async () => {
  try {
    const response = await axios.put(
      `http://localhost:3005/api/articles/${articleToEdit._id}`,
      articleToEdit
    );
    // Update the articles list
    const updatedArticle = response.data;
    const index = articles.value.findIndex((article) => article._id === updatedArticle._id);
    if (index !== -1) {
      articles.value[index] = updatedArticle;
    }
    showEditArticleForm.value = false;
    Swal.fire('Success!', 'Article updated successfully', 'success');
  } catch (error) {
    Swal.fire('Error', 'Failed to update the article', 'error');
  }
};

// Open Add Photos Modal
const openAddPhotos = (articleId) => {
  currentArticleId.value = articleId;
  showAddPhotos.value = true;
};

// Add Photos to Article
const addPhotosToArticle = async () => {
  if (!currentArticleId.value || selectedImages.value.length === 0) {
    Swal.fire("Warning", "Please select images to upload.", "warning");
    return;
  }

  try {
    const formData = new FormData();
    for (const file of selectedImages.value) {
      formData.append("gallery", file);
    }

    await axios.post(
      `http://localhost:3005/api/articles/${currentArticleId.value}/upload-gallery`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    Swal.fire("Success!", "Images uploaded successfully.", "success");
    showAddPhotos.value = false;
    selectedImages.value = [];
    fetchArticles();
  } catch (error) {
    console.error("Error uploading images:", error);
    Swal.fire("Error", "Failed to upload images. Please try again.", "error");
  }
};

// Handle File Input for Add Photos
const handleFileInput = (event) => {
  selectedImages.value = event.target.files;
};

// Confirm and Delete Article
const confirmDelete = (articleId) => {
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
        await axios.delete(`http://localhost:3005/api/articles/${articleId}`);
        Swal.fire("Deleted!", "Article has been deleted.", "success");
        fetchArticles();
      } catch (error) {
        console.error("Error deleting article:", error);
        Swal.fire("Error", "Failed to delete the article. Please try again.", "error");
      }
    }
  });
};

// Initialize and fetch articles on mount
fetchArticles();
</script>
