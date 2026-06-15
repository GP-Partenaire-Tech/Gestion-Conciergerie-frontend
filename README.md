[EN](en) / [FR](fr) / [ES](es)

---
---

[EN](en)

# Elite Concierge - Frontend Application

This repository contains the open-source frontend codebase for Elite Concierge, a specialized task management and scheduling platform tailored for luxury property management services.

The application is engineered as a high-performance Progressive Web App (PWA) to ensure seamless operational continuity for field agents and administrators, particularly under constrained network conditions.

---

## Project Overview

Elite Concierge addresses the operational friction often found in luxury property management by delivering an intuitive, low-friction user experience for field staff (cleaning crews, gardeners, pool technicians) while offering robust tracking and logistics tools for operations managers.

This client-side application utilizes an offline-first approach, allowing field agents to execute and validate standardized, property-specific checklists without relying on continuous cellular connectivity.

## Key Technical Features

* **Progressive Web App Architecture**: Full support for standalone installation on mobile devices, optimized for minimal bundle size and fast initial load times.
* **Offline Synchronization**: Operational checklists remain interactive offline using robust client-side caching, automatically synchronizing state changes with the central database once network connectivity is re-established.
* **Adaptive Responsive Design**: Interface layouts optimized specifically for single-hand mobile operations on the field and high-density viewports for desktop-based administrative planning.
* **Dynamic Property Provisioning**: UI flows that allow managers to quickly provision complex estates by defining modular components (levels, specific rooms, outbuildings) and attaching recurring custom tasks.

## System Architecture

This project strictly adheres to a decoupled, API-first architecture:

* **Frontend (This Repository)**: Public open-source single-page application built using React, Vite, TypeScript, and Tailwind CSS.
* **Backend (Proprietary)**: Secure, multi-tenant REST API engineered with Symfony and PostgreSQL, handling relational data isolation, compliance workflows, and core business logic.

---

## Getting Started

### Prerequisites

Ensure you have Node.js (version 18 or higher) and npm installed on your local development environment.

### Installation

Clone the repository and install the required dependencies:

```bash
git clone https://github.com/GP-Partenaire-Tech/Gestion-Concierge-frontend.git
cd Gestion-Concierge-frontend
npm install

```

### Development Server

To launch the local development server with hot-module replacement (HMR):

```bash
npm run dev

```

### Production Build

To compile and optimize the application assets for production deployment:

```bash
npm run build

```

---

## Licensing

The frontend codebase contained within this repository is open-source software distributed under the **MIT License**. For comprehensive terms, please consult the accompanying `LICENSE` file.

The associated backend infrastructure, data models, and API orchestration layers remain under private, proprietary ownership and are strictly excluded from this open-source release.

---
---

[FR](fr)

# Elite Concierge - Application Frontend

Ce dépôt contient le code source ouvert de l'interface d'Elite Concierge, une plateforme spécialisée dans la gestion des tâches et des plannings pour les services de conciergerie de luxe.

L'application est conçue comme une Progressive Web App (PWA) de haute performance afin de garantir une continuité opérationnelle transparente pour les agents de terrain et les administrateurs, en particulier dans des conditions de réseau instables ou limitées.

---

## Aperçu du Projet

Elite Concierge répond aux frictions opérationnelles fréquemment rencontrées dans la gestion de propriétés haut de gamme. L'outil offre une expérience utilisateur intuitive et simplifiée pour le personnel de terrain (équipes de nettoyage, jardiniers, piscinistes) tout en mettant à disposition des gestionnaires des outils de suivi logistique rigoureux.

Cette application client fonctionne selon une approche déconnectée (offline-first), permettant aux agents d'exécuter et de valider des listes de contrôle standardisées et spécifiques à chaque bien sans dépendre d'une connexion cellulaire continue.

## Caractéristiques Techniques Clés

* **Architecture Progressive Web App** : Support complet pour une installation autonome sur les appareils mobiles, optimisé pour une taille de bundle minimale et des temps de chargement initiaux rapides.
* **Synchronisation Hors-ligne** : Les check-lists opérationnelles restent interactives hors-ligne grâce à un système de cache côté client robuste, synchronisant automatiquement les changements d'état avec la base de données centrale dès que la connectivité réseau est rétablie.
* **Design Adaptatif et Réactif** : Interfaces optimisées spécifiquement pour les opérations mobiles à une main sur le terrain, et affichages haute densité adaptés aux ordinateurs de bureau pour la planification administrative.
* **Configuration Dynamique des Biens** : Flux d'interface permettant aux gestionnaires de configurer rapidement des domaines complexes en définissant des composants modulaires (niveaux, pièces spécifiques, dépendances) et en y associant des tâches récurrentes personnalisées.

## Architecture du Système

Ce projet respecte strictement une architecture découplée de type API-first :

* **Frontend (Ce Dépôt)** : Application monopage (SPA) publique et open-source construite avec React, Vite, TypeScript et Tailwind CSS.
* **Backend (Propriétaire)** : API REST sécurisée et multi-tenant développée avec Symfony et PostgreSQL, gérant l'isolation des données relationnelles, les flux de conformité et la logique métier centrale.

---

## Prise en Main

### Prérequis

Assurez-vous d'avoir installé Node.js (version 18 ou supérieure) et npm sur votre environnement de développement local.

### Installation

Clonez le dépôt et installez les dépendances requises :

```bash
git clone https://github.com/GP-Partenaire-Tech/Gestion-Concierge-frontend.git
cd Gestion-Concierge-frontend
npm install

```

### Serveur de Développement

Pour lancer le serveur de développement local avec rafraîchissement à chaud (HMR) :

```bash
npm run dev

```

### Build de Production

Pour compiler et optimiser les actifs de l'application en vue d'un déploiement en production :

```bash
npm run build

```

---

## Licence

Le code source frontend contenu dans ce dépôt est un logiciel libre distribué sous la **Licence MIT**. Pour consulter l'ensemble des conditions, veuillez vous référer au fichier `LICENSE` joint.

L'infrastructure backend associée, les modèles de données et les couches d'orchestration de l'API restent sous propriété privée et exclusive, et sont strictement exclus de cette publication open-source.

---
---

[ES](es)

# Elite Concierge - Aplicación Frontend

Este repositorio contiene el código fuente abierto del frontend de Elite Concierge, una plataforma especializada en la gestión de tareas y horarios adaptada a servicios de gestión de propiedades de lujo.

La aplicación está diseñada como una Progressive Web App (PWA) de alto rendimiento para garantizar una continuidad operativa fluida tanto para los agentes de campo como para los administradores, especialmente en condiciones de conectividad de red limitada.

---

## Descripción del Proyecto

Elite Concierge aborda las fricciones operativas habituales en la gestión de propiedades de lujo al ofrecer una experiencia de usuario intuitiva y accesible para el personal de campo (equipos de limpieza, jardineros, técnicos de piscinas), al tiempo que proporciona herramientas robustas de seguimiento y logística para los gestores de operaciones.

Esta aplicación cliente utiliza un enfoque prioritario fuera de línea (offline-first), lo que permite a los agentes ejecutar y validar listas de verificación estandarizadas y específicas de cada propiedad sin depender de una conexión celular continua.

## Características Técnicas Clave

* **Arquitectura de Aplicación Web Progresiva** : Soporte completo para la instalación independiente en dispositivos móviles, optimizado para un tamaño mínimo de paquete y tiempos de carga iniciales rápidos.
* **Sincronización Fuera de Línea** : Las listas de verificación operativas siguen enviando e interactuando fuera de línea mediante un sólido almacenamiento en caché en el cliente, sincronizando automáticamente los cambios de estado con la base de datos central una vez que se restablece la conexión de red.
* **Diseño Adaptativo y Responsivo** : Interfaces optimizadas específicamente para operaciones móviles con una sola mano en el campo y pantallas de alta densidad para la planificación administrativa en computadoras de escritorio.
* **Aprovisionamiento Dinámico de Propiedades** : Flujos de interfaz de usuario que permiten a los administradores configurar rápidamente fincas complejas definiendo componentes modulares (niveles, habitaciones específicas, dependencias) y asignando tareas personalizadas recurrentes.

## Arquitectura del Sistema

Este proyecto se adhiere estrictamente a una arquitectura desacoplada, priorizando las API (API-first):

* **Frontend (Este Repositorio)** : Aplicación de página única pública y de código abierto construida con React, Vite, TypeScript y Tailwind CSS.
* **Backend (Propietario)** : API REST segura y multi-inquilino (multi-tenant) desarrollada con Symfony y PostgreSQL, encargada del aislamiento de datos relacionales, flujos de trabajo de cumplimiento y la lógica de negocio central.

---

## Primeros Pasos

### Requisitos Previos

Asegúrese de tener instalado Node.js (versión 18 o superior) y npm en su entorno de desarrollo local.

### Instalación

Clone el repositorio e instale las dependencias requeridas:

```bash
git clone https://github.com/GP-Partenaire-Tech/Gestion-Concierge-frontend.git
cd Gestion-Concierge-frontend
npm install

```

### Servidor de Desarrollo

Para iniciar el servidor de desarrollo local con reemplazo de módulos en caliente (HMR):

```bash
npm run dev

```

### Compilación de Producción

Para compilar y optimizar los archivos de la aplicación para su despliegue en producción:

```bash
npm run build

```

---

## Licencia

El código fuente del frontend contenido en este repositorio es software de código abierto distribuido bajo la **Licencia MIT**. Para conocer los términos detallados, consulte el archivo `LICENSE` adjunto.

La infraestructura del backend asociada, los modelos de datos y las capas de orquestación de la API permanecen bajo propiedad privada y exclusiva, quedando estrictamente excluidos de esta distribución de código abierto.
