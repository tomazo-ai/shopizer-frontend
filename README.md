# Shopizer Frontend

A modern, headless e-commerce frontend built for [Shopizer](https://github.com/shopizer-ecommerce/shopizer) — the open-source Java e-commerce platform.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)

## Features

- 🛍️ **Product Catalog** — Browse products by category with responsive grid layout
- 🛒 **Shopping Cart** — Add items, update quantities, remove products ( persisted via localStorage)
- 🔍 **Product Search** — Real-time search with autocomplete
- 📱 **Mobile-First** — Responsive design optimized for all screen sizes
- ⚡ **Fast Performance** — Next.js 16 with App Router and React Server Components
- 🎨 **Modern UI** — Built with shadcn/ui components and Tailwind CSS
- 🔐 **JWT Auth Ready** — Login/registration endpoints wired (checkout flow in progress)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **React:** React 19 with Server Components
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui (Radix UI + Tailwind)
- **State:** Zustand + React Query (TanStack Query)
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Notifications:** Sonner (toast notifications)

## Prerequisites

- [Shopizer Backend](http://192.168.56.1:8080) running (default: `http://localhost:8080`)
- Node.js 20+ 
- npm or yarn

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/tomazo-ai/shopizer-frontend.git
cd shopizer-frontend

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your Shopizer backend URL

# 4. Run development server
npm run dev

# 5. Open http://localhost:3000
```

## Environment Variables

Create `.env.local` in the project root:

```env
# Shopizer Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Project Structure

```
shopizer-frontend/
├── app/                    # Next.js App Router
│   ├── cart/              # Shopping cart page
│   ├── products/[slug]/   # Product detail page
│   ├── page.tsx           # Homepage (product grid)
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # shadcn/ui components
│   └── product-card.tsx   # Product display component
├── hooks/                 # Custom React hooks
├── lib/
│   ├── api.ts            # Shopizer API client
│   └── utils.ts          # Utility functions
├── stores/
│   └── cart.ts           # Zustand cart store
├── types/
│   └── shopizer.ts       # TypeScript type definitions
└── public/               # Static assets
```

## API Integration

This frontend connects to Shopizer's REST API:

| Feature | Endpoint |
|---------|----------|
| Products | `GET /api/v1/products` |
| Product Detail | `GET /api/v2/product/{sku}` |
| Cart (Create) | `POST /api/v1/cart` |
| Cart (Update) | `PUT /api/v1/cart/{code}` |
| Categories | `GET /api/v1/category` |
| Search | `POST /api/v1/search` |

## Development

```bash
# Run dev server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Current Status

✅ Working:
- Product catalog with categories
- Product detail pages
- Add to cart functionality
- Shopping cart with quantity management
- Responsive mobile layout

🚧 In Progress:
- Checkout flow
- Guest checkout (privacy-focused)
- User authentication
- Order history

## Customization

### Theming
The project uses Tailwind CSS with a stone-based color palette. Customize in:
- `app/globals.css` — CSS variables and global styles
- `tailwind.config.ts` — Tailwind theme configuration
- `components/ui/` — shadcn/ui component styling

### Adding New Components
```bash
npx shadcn add button card dialog
```

## Backend Setup

This frontend requires a running Shopizer backend. See the [Shopizer documentation](https://github.com/shopizer-ecommerce/shopizer) for backend setup instructions.

Default backend configuration assumes:
- API Base URL: `http://localhost:8080`
- Admin Panel: `http://localhost:8080/admin`
- Default admin credentials: `admin/admin`

## License

MIT License — feel free to use for personal or commercial projects.

## Credits

- [Shopizer](https://github.com/shopizer-ecommerce/shopizer) — Open source e-commerce platform
- [shadcn/ui](https://ui.shadcn.com) — Beautifully designed components
- [Next.js](https://nextjs.org) — React framework
