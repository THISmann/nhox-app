// stores/articleStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useArticleStore = defineStore("articleStore", {
  state: () => ({
    articles: [],
    socket: null, // Pour stocker la connexion WebSocket
    lastFetch: null, // Pour stocker la date de la dernière récupération
  }),

  actions: {

    // Fonction pour initialiser la connexion WebSocket
    initWebSocket() {
      // Assurez-vous que vous avez une URL WebSocket correcte
      const socket = new WebSocket("ws://localhost:3005/ws/articles"); // Remplacez l'URL par votre serveur WebSocket

      // Sauvegarder la connexion WebSocket dans l'état
      this.socket = socket;

      // Lorsqu'un message est reçu
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data); // Supposons que le message soit en JSON
        if (message.type === "article_added") {
          this.addArticle(message.data);
        } else if (message.type === "article_deleted") {
          this.deleteArticle(message.data._id);
        } else if (message.type === "article_updated") {
          this.updateArticle(message.data);
        }
      };

      // Gestion des erreurs
      socket.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      // Lorsque la connexion est ouverte
      socket.onopen = () => {
        console.log("WebSocket connection established.");
      };

      // Lorsque la connexion est fermée
      socket.onclose = () => {
        console.log("WebSocket connection closed.");
      };
    },


    async fetchArticles(force = false) {
      const now = Date.now();
      // Recharge uniquement si les données sont périmées ou si le chargement est forcé
      if (!force && this.lastFetch && now - this.lastFetch < 60000) {
        return; // Pas besoin de recharger
      }
    
      try {
        const response = await axios.get("http://localhost:3005/api/articles");
        if (response.data && Array.isArray(response.data)) {
          this.articles = response.data;
          this.lastFetch = now;
          console.log("Fetched articles:", this.articles);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    },
  
    async addArticle(newArticle) {
      try {
        const response = await axios.post("http://localhost:3005/api/articles", newArticle);
        if (response.data) {
          this.articles = [...this.articles, response.data];
          console.log("Article added:", response.data);
          console.log("Updated articles:", this.articles);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error adding article:", error);
      }
    },
 

    deleteArticle(articleId) {
      this.articles = this.articles.filter(
        (article) => article._id !== articleId
      );
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
