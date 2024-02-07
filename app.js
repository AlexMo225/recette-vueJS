const app = Vue.createApp({
    data() {
      return {
        recipes: [],
        newRecipe: {
          name: '',
          ingredients: '',
          preparation: '',
          time: 0,
          people: 0
        },
        showSuccessMessage: false
      };
    },
    methods: {
      addRecipe() {
        if (this.validateForm()) {
          const id = Date.now();
          this.recipes.push({ id, ...this.newRecipe });
          this.saveRecipes();
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
          this.clearForm();
        }
      },
      deleteRecipe(id) {
        const recipeIndex = this.recipes.findIndex(recipe => recipe.id === id);
        if (recipeIndex !== -1) {
          this.recipes.splice(recipeIndex, 1);
          this.saveRecipes();
          alert("Votre recette a été supprimée avec succès.");
        }
      },
      validateForm() {
        return (
          this.newRecipe.name.trim() !== '' &&
          this.newRecipe.ingredients.trim() !== '' &&
          this.newRecipe.preparation.trim() !== '' &&
          this.newRecipe.time > 0 &&
          this.newRecipe.people > 0
        );
      },
      saveRecipes() {
        localStorage.setItem('recipes', JSON.stringify(this.recipes));
      },
      loadRecipes() {
        const recipes = localStorage.getItem('recipes');
        if (recipes) {
          this.recipes = JSON.parse(recipes);
        }
      },
      clearForm() {
        this.newRecipe = {
          name: '',
          ingredients: '',
          preparation: '',
          time: 0,
          people: 0
        };
      }
    },
    mounted() {
      this.loadRecipes();
    }
  });

  app.mount('#app');