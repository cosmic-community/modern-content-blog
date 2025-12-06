# Modern Content Blog

A professional blogging platform built with Next.js 16, Tailwind CSS, and Cosmic CMS.

## Features
- 🚀 **Next.js 16 (App Router)**: Utilizing React Server Components for optimal performance.
- 🎨 **Tailwind CSS**: Modern, utility-first styling with a custom design system.
- 📝 **Markdown Support**: Renders your Cosmic markdown content beautifully.
- 🔗 **Relational Content**: Connects Posts, Authors, and Categories seamlessly.
- 📱 **Fully Responsive**: Optimized for all device sizes.
- ⚡ **High Performance**: Server-side rendering and optimized images.

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=693497d066bea41d1799ca08&clone_repository=693498b166bea41d1799ca1e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Based on the content model I created for "Create a content model for a blog with posts, authors, and categories", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

## Technologies
- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cosmic SDK](https://www.cosmicjs.com/docs)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites
- Node.js 18+ or Bun (recommended)
- A [Cosmic](https://www.cosmicjs.com) account and project

### Installation

1. Install dependencies:
```bash
bun install
# or
npm install
```

2. Configure environment variables in `.env.local` (or use the Cosmic dashboard):
```bash
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

3. Run the development server:
```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Vercel
This project is optimized for deployment on Vercel, the creators of Next.js.
1. Push your code to a git repository.
2. Import the project into Vercel.
3. Add your environment variables (COSMIC_BUCKET_SLUG, etc.).
4. Deploy!

<!-- README_END -->