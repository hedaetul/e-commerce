# BAJAR(E-commerce Platform)

![E-Commerce Platform Banner](/public/readme-banner.png)

A modern, feature-rich e-commerce platform built with Next.js and enhanced with various cutting-edge technologies.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Responsive Design**: Fully responsive layout that works seamlessly across desktop, tablet, and mobile devices.
- **User Authentication**: Secure user registration and login system.
- **Product Catalog**: Extensive product listing with search and filter capabilities.
- **Shopping Cart**: Interactive cart functionality with real-time updates.
- **Checkout Process**: Streamlined checkout with Stripe integration for secure payments.
- **User Profiles**: Customizable user profiles with order history and saved payment methods.
- **Vendor Accounts**: Dedicated section for vendors to manage their products and view sales analytics.
- **Admin Dashboard**: Comprehensive admin panel for managing products, orders, and users.
- **Real-time Updates**: Live notifications and updates using Firebase.
- **Internationalization**: Support for multiple languages and currencies.

![Product Catalog](/public/product-banner.png)

## Technologies Used

- **Frontend**:
  - Next.js 14
  - React 18
  - TypeScript
  - Tailwind CSS
  - Radix UI components
  - Shadcn UI
- **Backend**:
  - Next.js API routes
  - Firebase (Authentication and Realtime Database)
- **State Management**:
  - React Hook Form
  - Context API
  - Zod (for form validation)
- **Payment Processing**:
  - Stripe
- **UI/UX**:
  - Lucide React,React Icons (for icons)
  - Tailwind CSS
  - Shadcn UI
  - Radix UI
  - Embla Carousel
  - Vaul (for drawers/modals)
- **Development Tools**:
  - ESLint
  - Prettier
  - TypeScript
- **Deployment**:
  - Vercel


## Getting Started

To get a local copy up and running, follow these simple steps:

1. Clone the repository:
   ```
   git clone https://github.com/hedaetul/e-commerce.git
   ```

2. Install dependencies:
   ```
   cd e-commerce-platform
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add necessary environment variables (e.g., Stripe keys, Firebase config).

4. Run the development server:
   ```
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows a standard Next.js structure with some custom directories:

```
e-commerce-platform/
├── app/
│   ├── api/
│   ├── components/
│   ├── profile/
│   ├── vendor-account/
│   └── ...
├── public/
├── dist/
├── styles/
└── ...
```

## Key Components

### Hero Section
```typescript:app/HeroSection.tsx
startLine: 24
endLine: 136
```
The Hero Section showcases featured products and includes a features highlight area.

### Payment Methods
```typescript:app/profile/payment-methods/page.tsx
startLine: 13
endLine: 82
```
Displays and manages user payment methods with icons for different card types.

### Vendor Dashboard
```typescript:app/vendor-account/components/topCountries.tsx
startLine: 1
endLine: 38
```
Provides vendors with insights into top-performing countries and sales data.

![Vendor Dashboard](/public/vendor-dashboard.png)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by [Hedaetul](https://github.com/hedaetul)
