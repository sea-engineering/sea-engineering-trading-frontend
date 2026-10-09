/**
 * Configuration centralisée des URLs et de l'API
 */

// URL de base du backend (ex: http://localhost:8000 en dev, https://monsite.com en prod)
const rawBackendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
export const BACKEND_URL = rawBackendUrl.replace(/\/+$/, '');

// URL de l'API (ex: http://localhost:8000/api)
const rawApiUrl = import.meta.env.VITE_API_URL || `${BACKEND_URL}/api`;
export const API_URL = rawApiUrl.replace(/\/+$/, '');

// URL de la page de connexion administrateur Laravel
export const ADMIN_LOGIN_URL = `${BACKEND_URL}/login`;

/**
 * Génère l'URL complète pour accéder à un fichier stocké dans Laravel storage
 * @param {string|null|undefined} path - Chemin relatif du fichier (ex: 'banners/image.jpg' ou '/storage/banners/image.jpg')
 * @returns {string} URL complète vers la ressource
 */
export const getStorageUrl = (path) => {
  if (!path) return '';

  // Si c'est déjà une URL absolue externe
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Nettoyer les slashes de début
  const cleanPath = path.replace(/^\/+/, '');

  // Si le chemin commence déjà par storage/
  if (cleanPath.startsWith('storage/')) {
    return `${BACKEND_URL}/${cleanPath}`;
  }

  return `${BACKEND_URL}/storage/${cleanPath}`;
};
