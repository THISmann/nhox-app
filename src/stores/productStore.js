// stores/productStore.js
import { defineStore } from 'pinia';
import axios from 'axios'; 

export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: [],
    }),

    actions: {
        async fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3005/api/products');
                if (response.data && Array.isArray(response.data)) {
                    this.products = response.data;
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        setProducts(newProducts) {
            this.products = newProducts;
        },

        async deleteProduct(productId) {
            try {
              const response = await axios.delete(`http://localhost:3005/api/products/${productId}`);
              if (response.data && response.data.success) {
                // Find the product index and remove it using `splice`
                const productIndex = this.products.findIndex((product) => product._id === productId);
                if (productIndex !== -1) {
                  this.products.splice(productIndex, 1); // Mutate the array directly
                }
              } else {
                console.error('Unexpected response format:', response.data);
              }
            } catch (error) {
              console.error('Error deleting product:', error);
              throw error; // Re-throw to let the component handle it
            }
          },
      

        updateProductStock(productId, newStock) {
            const productIndex = this.products.findIndex(product => product._id === productId);
            if (productIndex !== -1) {
                this.products[productIndex].stock = newStock;
            }
        },
     
    
        editProduct(productId, newProduct) {
            const productIndex = this.products.findIndex(product => product._id === productId);
            if (productIndex !== -1) {
                this.products[productIndex] = newProduct;
            }
        },
    },

    getters: {
        getProductById: (state) => (id) => {
            return state.products.find(product => product._id === id);
        },

        getProductByDate: (state) => (date) => {
            return state.products.filter(product => {
                const productDate = new Date(product.createdAt).toISOString().split('T')[0];
                const filterDate = new Date(date).toISOString().split('T')[0];
                return productDate === filterDate;
            });
        }
    },
  
});