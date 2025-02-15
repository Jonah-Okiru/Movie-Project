import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        movieDatabase: "Movie Database",
        toggleTheme: "Turn to {{theme}} Mode",
        sortByYear: "Sort by Year",
        sortByTitle: "Sort by Title",
        filterByYear: "Filter by Year",
        applyFilters: "Apply Filters",
        previous: "Previous",
        next: "Next",
        favorites: "Favorites",
        searchPlaceholder: "Search for a movie...",
        dark: "Dark",
        light: "Light",
        language: "Language",
      },
    },
    es: {
      translation: {
        movieDatabase: "Base de Datos de Películas",
        toggleTheme: "Cambiar a modo {{theme}}",
        sortByYear: "Ordenar por Año",
        sortByTitle: "Ordenar por Título",
        filterByYear: "Filtrar por Año",
        applyFilters: "Aplicar Filtros",
        previous: "Anterior",
        next: "Siguiente",
        favorites: "Favoritos",
        searchPlaceholder: "Buscar una película...",
        dark: "Oscuro",
        light: "Claro",
        language: "Idioma",
      },
    },
    fr: {
      translation: {
        movieDatabase: "Base de Données de Films",
        toggleTheme: "Passer en mode {{theme}}",
        sortByYear: "Trier par Année",
        sortByTitle: "Trier par Titre",
        filterByYear: "Filtrer par Année",
        applyFilters: "Appliquer les Filtres",
        previous: "Précédent",
        next: "Suivant",
        favorites: "Favoris",
        searchPlaceholder: "Rechercher un film...",
        dark: "Sombre",
        light: "Clair",
        language: "Langue",
      },
    },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
