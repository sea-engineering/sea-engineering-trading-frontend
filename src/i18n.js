import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "search_placeholder": "Search the products",
      "home": "Home",
      "about": "About Us",
      "products_solutions": "Products & Solutions",
      "industrial_equipment": "Industrial Equipment",
      "oilfield_equipment": "Oilfield Equipment & Materials",
      "general_commodities": "General Commodities",
      "procurement_logistics": "Procurement & Logistics",
      "why_us": "Why Us",
      "contact": "Contact Us",
      "request_quote": "Request a Quote",
      "explore": "Explore",
      "footer_desc": "Supply of industrial and oilfield equipment, tools and materials — with sourcing, freight and customs handled end to end.",
      "quick_links": "Quick Links",
      "contact_info": "Contact Info",
      "tunis_tunisia": "Tunis, Tunisia",
      "all_rights_reserved": "SEA International Trading. All rights reserved.",

      "contact_title": "Contact our specialists",
      "contact_for_customers": "For Customers",
      "contact_for_retailers": "For Retailers",
      "contact_intro": "Fill out the form below and we will reply within 24 hours.",
      "contact_success": "Your message has been sent successfully!",
      "contact_error": "There was an error sending your message. Please try again.",
      "contact_first_name": "First name *",
      "contact_last_name": "Last name *",
      "contact_email": "Email *",
      "contact_phone": "Phone number",
      "contact_subject": "Subject *",
      "contact_select_subject": "Select subject",
      "contact_message": "Message *",
      "contact_send": "Send message",
      "contact_sending": "Sending...",
      "contact_company_name": "Company name *",
      "contact_person": "Contact person *",
      "contact_website": "Website",

      "our_location": "Our Location",
      "headquarters": "Headquarters",
      "address": "Address",
      "country_region": "Country / Region",

      "subject_general_inquiry": "General inquiry",
      "subject_order_status": "Order status",
      "subject_product_info": "Product information",
      "subject_technical_support": "Technical support",
      "subject_website_feedback": "Website feedback",
      "subject_account_assistance": "Account assistance",
      "subject_security": "Security concerns",
      "subject_affiliation": "Affiliation program",
      "subject_marketing": "Marketing and promotions",
      "subject_press": "Press and media inquiries"
    }
  },
  fr: {
    translation: {
      "search_placeholder": "Rechercher des produits",
      "home": "Accueil",
      "about": "À Propos",
      "products_solutions": "Produits & Solutions",
      "industrial_equipment": "Équipement Industriel",
      "oilfield_equipment": "Équipements Pétroliers",
      "general_commodities": "Marchandises Générales",
      "procurement_logistics": "Approvisionnement & Logistique",
      "why_us": "Pourquoi Nous",
      "contact": "Contactez-Nous",
      "request_quote": "Demander un Devis",
      "explore": "Explorer",
      "footer_desc": "Fourniture d'équipements, d'outils et de matériaux industriels et pétroliers — avec approvisionnement, fret et douane gérés de bout en bout.",
      "quick_links": "Liens Rapides",
      "contact_info": "Informations de Contact",
      "tunis_tunisia": "Tunis, Tunisie",
      "all_rights_reserved": "SEA International Trading. Tous droits réservés.",

      "contact_title": "Contactez nos spécialistes",
      "contact_for_customers": "Pour les Clients",
      "contact_for_retailers": "Pour les Revendeurs",
      "contact_intro": "Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures.",
      "contact_success": "Votre message a été envoyé avec succès !",
      "contact_error": "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer.",
      "contact_first_name": "Prénom *",
      "contact_last_name": "Nom *",
      "contact_email": "Email *",
      "contact_phone": "Numéro de téléphone",
      "contact_subject": "Sujet *",
      "contact_select_subject": "Sélectionner un sujet",
      "contact_message": "Message *",
      "contact_send": "Envoyer le message",
      "contact_sending": "Envoi en cours...",
      "contact_company_name": "Nom de l'entreprise *",
      "contact_person": "Personne de contact *",
      "contact_website": "Site web",

      "our_location": "Notre Emplacement",
      "headquarters": "Siège Social",
      "address": "Adresse",
      "country_region": "Pays / Région",

      "subject_general_inquiry": "Demande générale",
      "subject_order_status": "Statut de commande",
      "subject_product_info": "Informations produit",
      "subject_technical_support": "Support technique",
      "subject_website_feedback": "Retour sur le site",
      "subject_account_assistance": "Assistance compte",
      "subject_security": "Problèmes de sécurité",
      "subject_affiliation": "Programme d'affiliation",
      "subject_marketing": "Marketing et promotions",
      "subject_press": "Relations presse et médias"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
