# AI Banner - Tech & AI News Blog

![App Preview](https://imgix.cosmicjs.com/8b55d880-a045-11ed-81f2-f50e185dd248-T7K4aEPoGGk.jpg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive AI and tech news blog built with Next.js 16 and [Cosmic](https://www.cosmicjs.com).

## Features

- 📝 Dynamic blog posts with rich content
- 👤 Author profiles with social links
- 🏷️ Category-based filtering
- 🖼️ Optimized images via imgix
- 📱 Fully responsive design
- ⚡ Server-side rendering with Next.js 16

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69fa919d804ca589f220fe64&clone_repository=69fa927b7bf7458feebd670c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
> 
> User instructions: An AI and tech news blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "AI Banner". The content is managed in Cosmic CMS with the following object types: categories, authors, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
> 
> User instructions: An AI and tech news blog with posts, authors, and categories

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic SDK** - Content management
- **imgix** - Image optimization

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the required object types

### Installation

```bash
bun install
```

Set up environment variables (provided automatically):
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all posts with related data
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post' })
  .depth(1)
```

## Cosmic CMS Integration

This app integrates with three content types: **posts**, **authors**, and **categories**. All connections use Cosmic's depth parameter for efficient data fetching.

## Deployment

Deploy to Vercel or Netlify. Set environment variables in your hosting platform.
<!-- README_END -->