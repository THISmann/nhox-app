import { defineStore } from "pinia";
import axios from "axios";

export const useArticleStore = defineStore("articleStore", {
  state: () => ({
    articles: [],
    lastFetch: null, // Tracks the last fetch time to avoid redundant requests
  }),

  actions: {
    // Sync articles from localStorage
    syncFromLocalStorage() {
      try {
        const storedArticles = localStorage.getItem("articleStore");
        if (storedArticles) {
          this.articles = JSON.parse(storedArticles);
        }
      } catch (error) {
        console.error("Error syncing from localStorage:", error);
      }
    },

    // Update localStorage with the current articles
    updateLocalStorage() {
      try {
        localStorage.setItem("articleStore", JSON.stringify(this.articles));
      } catch (error) {
        console.error("Error updating localStorage:", error);
      }
    },

    // Fetch articles from the API
    async fetchArticles(force = false) {
      const now = Date.now();
      if (!force && this.lastFetch && now - this.lastFetch < 60000) {
        return; // Avoid unnecessary fetch
      }

      try {
        const response = await axios.get("http://localhost:3005/api/articles");
        if (response.data && Array.isArray(response.data)) {
          this.articles = response.data;
          this.lastFetch = now;

          // Update localStorage
          this.updateLocalStorage();
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    },

    // Add a new article
    async addArticle(newArticle) {
      try {
        const response = await axios.post(
          "http://localhost:3005/api/articles",
          newArticle
        );
        if (response.data) {
          this.articles = [...this.articles, response.data];

          // Update localStorage
          this.updateLocalStorage();
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error adding article:", error);
      }
    },

    // Delete an article
    async deleteArticle(articleId) {
      try {
        await axios.delete(`http://localhost:3005/api/articles/${articleId}`);
        this.articles = this.articles.filter(
          (article) => article._id !== articleId
        );

        // Update localStorage
        this.updateLocalStorage();
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    },

    // Initialize the store (sync from localStorage)
    initStore() {
      this.syncFromLocalStorage();

      // Add an event listener to detect localStorage changes
      window.addEventListener("storage", (event) => {
        if (event.key === "articleStore") {
          this.syncFromLocalStorage();
        }
      });
    },
  },

  getters: {
    getArticleById: (state) => (id) => {
      return state.articles.find((article) => article._id === id);
    },

    getArticleByDate: (state) => (date) => {
      return state.articles.filter((article) => {
        const articleDate = new Date(article.createdAt)
          .toISOString()
          .split("T")[0];
        const filterDate = new Date(date).toISOString().split("T")[0];
        return articleDate === filterDate;
      });
    },
  },
});