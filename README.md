# FoodSpot Management System

[![Next.js](https://img.shields.io/badge/Next.js-13.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-blue?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Shadcn/UI](https://img.shields.io/badge/Shadcn/UI-Latest-black?style=flat)](https://ui.shadcn.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-red?style=flat&logo=react-query)](https://tanstack.com/query/latest)
[![Google Maps](https://img.shields.io/badge/Google_Maps_API-Latest-green?style=flat&logo=google-maps)](https://developers.google.com/maps)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Ffoodie.town)](https://foodie.town)

A comprehensive platform for restaurant discovery and management in Vietnam, helping users explore and connect with local dining establishments.

![image](https://github.com/user-attachments/assets/09af7be6-1737-4ee3-ba50-de2d7e239e2a)
![image](https://github.com/user-attachments/assets/8d55d2d3-86c2-479b-bc41-d31f146e3d43)

## 🌐 Live Demo

Visit [Foodie.town](https://foodie.town) to see the platform in action.

## 🚀 Features

- Interactive map interface for restaurant discovery
- Restaurant search and filtering capabilities
- Detailed restaurant profiles and menus
- User authentication and profile management
- Responsive design for mobile and desktop experiences

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:**
  - [TailwindCSS](https://tailwindcss.com/)
  - [Shadcn/UI](https://ui.shadcn.com/)
- **Data Management:**
  - [TanStack Query](https://tanstack.com/query/latest)
  - [Axios](https://axios-http.com/)
- **Maps Integration:**
  - [Google Maps API](https://developers.google.com/maps)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- IDE or text editor (Webstorm, VSCode, ...)
- Node.js (v18 or higher)
- npm
- Git

Since this project uses Google Maps API for geolocation and clouidnary for image storage, api keys are required. Please refer to the links below on how to retrieve the keys:

[Google Maps API](https://developers.google.com/maps/documentation/geolocation/get-api-key)

[Cloudinary](https://cloudinary.com/)

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/foodspot-management-frontend.git
cd foodspot-management-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_CLOUD_NAME=your_cloudinary_api_key
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 🔗 Related Repositories

- Backend Repository: [foodie-connect-backend](https://github.com/VaderNgo/foodie-connect-backend)
- Api documentation: [Swagger](https://api.foodie.town/swagger/index.html)

## 📝 Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/         # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and configurations
├── services/          # API service layer
└── types/             # TypeScript type definitions
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
