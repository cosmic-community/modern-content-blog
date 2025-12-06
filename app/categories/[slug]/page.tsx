// app/categories/[slug]/page.tsx
import { cosmic, isCosmicError } from '@/lib/cosmic';
import { Post, Category } from '@/lib/types';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'categories',
        slug,
      })
      .props(['id', 'slug', 'title', 'metadata']);
    return response.object as Category;
  } catch (error) {
    return null;
  }
}

async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.categories': categoryId,
      })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    return response.objects as Post[];
  } catch (error) {
    if (isCosmicError(error) && error.status === 404) {
      return [];
    }
    return [];
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold">Category Not Found</h1>
        <Link href="/" className="text-primary hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  const posts = await getPostsByCategory(category.id);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 border-b border-border pb-8">
        <div className="mb-4">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to all posts
          </Link>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {category.title}
        </h1>
        {category.metadata.description && (
          <p className="text-xl text-muted-foreground">
            {category.metadata.description}
          </p>
        )}
      </header>

      {posts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-muted-foreground">
          No posts found in this category.
        </div>
      )}
    </div>
  );
}