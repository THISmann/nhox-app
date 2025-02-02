import { defineStore } from "pinia";
import axios from "axios";
import { io } from "socket.io-client";
import {  state , socket } from  "../socket.js";
  
export const useArticleStore = defineStore("articleStore", {
  state: () => ({
    articles: [],
    lastFetch: null, // Tracks the last fetch time to avoid redundant requests
    eventSource: null, // Holds the SSE connection
    localStorageUpdateInProgress: false, // Prevents simultaneous updates 
  }),

  actions: {
    // Sync articles from localStorage with reactivity
    syncFromLocalStorage() {
      try {
        const storedArticles = localStorage.getItem("articleStore");
        if (storedArticles) {
          const parsedArticles = JSON.parse(storedArticles);
          this.$patch({ articles: parsedArticles }); // Trigger reactivity
        }
      } catch (error) {
        console.error("Error syncing from localStorage:", error);
      }
    },

    // Update localStorage and notify other tabs
    updateLocalStorage() {
      if (this.localStorageUpdateInProgress) {
        console.warn(
          "localStorage update already in progress. Skipping this call."
        );
        return;
      }

      this.localStorageUpdateInProgress = true;

      try {
        const serializedData = JSON.stringify(this.articles);
        localStorage.setItem("articleStore", serializedData);

        // Notify other tabs about the update
        localStorage.setItem("articleStore-update", Date.now());
       // console.log("localStorage updated", serializedData);
      } catch (error) {
        console.error("Error updating localStorage:", error);
      } finally {
        this.localStorageUpdateInProgress = false;
      }
    },

    // Fetch articles from the API
    async fetchArticles(force = false) {
      const now = Date.now();
      if (!force && this.lastFetch && now - this.lastFetch < 60000) {
        return; // Avoid unnecessary fetch
      }

      try {
        const response = await axios.get("http://localhost:3003/articles");
        if (response.data && Array.isArray(response.data)) {
          this.$patch({
            articles: response.data,
            lastFetch: now,
          });

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
          "http://localhost:3003/articles",
          newArticle
        );
        if (response.data) {
          this.$patch({
            articles: [...this.articles, response.data.article],
          });

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
        await axios.delete(`http://localhost:3003/articles/${articleId}`);
        this.$patch({
          articles: this.articles.filter(
            (article) => article._id !== articleId
          ),
        });

        // Update localStorage
        this.updateLocalStorage();
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    },

    // Initialize the store (sync from localStorage and set up SSE connection)
    initStore() {
      this.syncFromLocalStorage();
     // this.connectSocket();

      // Listen for localStorage changes from other tabs or windows
      window.addEventListener("storage", (event) => {
        if (event.key === "articleStore-update") {
          this.syncFromLocalStorage(); // Sync articles when another tab updates localStorage
          console.log("localStorage updated -- syncing data...");
        }
      });

      // Establish SSE connection
      this.setupSSEConnection();
    },

     // Set up socket connection for real-time updates
    //  connectSocket() {
    //   socket.on("article_update", (data) => {
    //     console.log("Socket received article update:", data);
    //     // Handle real-time updates (e.g., create, update, delete logic)
    //     if (data.action === "create") {
    //       this.articles.push(data.article);
    //     } else if (data.action === "update") {
    //       const index = this.articles.findIndex(
    //         (article) => article._id === data.article._id
    //       );
    //       if (index !== -1) {
    //         this.articles[index] = data.article;
    //       }
    //     } else if (data.action === "delete") {
    //       this.articles = this.articles.filter(
    //         (article) => article._id !== data.articleId
    //       );
    //     }
    //     console.log("articles", this.articles);
    //     // Update localStorage with new data
    //     this.updateLocalStorage();
    //   });
    // },

    // Set up SSE connection for real-time updates
    setupSSEConnection() {
      this.eventSource = new EventSource("http://localhost:3003/events");

      // Listen for SSE messages
      this.eventSource.addEventListener("message", (event) => {
        try {
          const message = JSON.parse(event.data);

          if (message.action === "create") {
            this.articles.push(message.article);
          } else if (message.action === "update") {
            const index = this.articles.findIndex(
              (article) => article._id === message.article._id
            );
            if (index !== -1) {
              this.articles[index] = message.article;
            }
          } else if (message.action === "delete") {
            this.articles = this.articles.filter(
              (article) => article._id !== message.articleId
            );
          }

          // Update localStorage with new data
          this.updateLocalStorage();
        } catch (error) {
          console.error("Error processing SSE message:", error);
        }
      });

      // Handle SSE connection errors
      this.eventSource.onerror = (error) => {
        console.error("SSE connection error:", error);
        if (this.eventSource) {
          this.eventSource.close();
          this.eventSource = null;
        }
      };
    },

    // Close SSE connection when the store is destroyed
    closeSSEConnection() {
      if (this.eventSource) {
        this.eventSource.close();
        this.eventSource = null;
      }
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
