# achieva-app
# 🏆 Achieva App  A social network dedicated to sharing personal and professional achievements. Users publish their wins (travel, certifications, art, sport...), earn virtual tokens  and compete in a friendly leaderboard — all with verified identities.  > Instagram's energy × LinkedIn's credibility.  Built with Next.js · NestJS · React Native 
Cahier des charges — Achieva App
1. Concept
Achieva est un réseau social centré sur les accomplissements personnels et professionnels.
Les utilisateurs publient leurs réussites (sport, carrière, voyages, art, éducation…), reçoivent des tokens virtuels et s'affrontent dans un classement compétitif mondial.
Positionnement : Instagram (vivacité, engagement) × LinkedIn (crédibilité, identité vérifiée)
 
 2. Problème résolu
| Problème | Solution Achieva |
Probleme 	Solution achieva
KYC obligatoire via Stripe Identity 	|KYC obligatoire via Stripe Identity 
Les réseaux sociaux valorisent l'image, pas les réussites 	 Seuls les accomplissements sont publiables 
Les profils LinkedIn sont statiques et peu engageants 	Système de tokens + classement dynamique 
Les fausses photos prolifèrent	Analyse IA de chaque image avant publication


3. Utilisateurs cibles
•	Primaire* : 18–35 ans, actifs, compétitifs, avides de reconnaissance
•	Secondaire* : recruteurs, coachs, communautés sportives/créatives
•	Exclus* : entreprises (B2B hors scope v1)
 
4. Fonctionnalités
4.1 Authentification
•	Inscription email/password
•	OAuth Google
•	OAuth Apple
•	JWT (7 jours)
•	KYC Stripe Identity (vérification pièce d'identité)
4.2 Profil utilisateur
•	Affichage nom, username, bio, avatar
•	Badge "Vérifié" post-KYC
•	Compteur de tokens
•	Liste des achievements publiés
4.3 Achievements
•	Création : titre, description, catégorie, médias
•	Catégories : Sport, Éducation, Voyage, Carrière, Art, Autre
•	Upload jusqu'à 5 photos/vidéos (Cloudflare R2)
•	Système de likes (+1 token pour l'auteur par like)
•	Commentaires
•	Partage externe
 4.4 Tokens & Classement
•	+10 tokens à la publication d'un achievement
•	+1 token par like reçu
•	Classement mondial temps réel (Redis)
•	Ma position personnelle
•	Classements par catégorie
•	Classements hebdomadaires / mensuels
4.5 Feed
•	Feed global chronologique
•	Filtres par catégorie
•	Pagination
•	Feed personnalisé (abonnements)
•	Algorithme de mise en avant
4.6 Médias & Vérification IA
•	Upload via URL signée (R2 + S3 presign)
•	Analyse EXIF (métadonnées, GPS, appareil)
•	Détection doublons (perceptual hash)
•	Reverse image search (Google Vision)
•	Analyse Claude Vision (cohérence image ↔ titre, détection screenshot)
•	Score d'authenticité 0–100 + seuils de publication
4.7 Notifications
•	Push mobile (Firebase FCM)
•	Email transactionnel
•	In-app (like, commentaire, montée au classement)
 
5. Règles métier
1.	Un utilisateur non-KYC peut créer un compte mais ne peut PAS publier
2.	Un like ne peut être donné qu'une seule fois par achievement par utilisateur
3.	Un utilisateur ne peut pas liker son propre achievement
4.	Le score d'authenticité d'une photo < 40 bloque automatiquement la publication
5.	Les tokens sont non-transférables et non-monétisables (v1)
 
6.	Non-fonctionnel
Critère 	Critère 
Temps de chargement feed 	< 1s (p95) 
Disponibilité 	99.5% 
Upload photo 	< 3s |
 Analyse IA photo 	< 5s (async) |
 Taille max photo 	10 Mo |
Taille max vidéo 	100 Mo |
 



