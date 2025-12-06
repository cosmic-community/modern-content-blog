// app/posts/[slug]/page.tsx
import { cosmic, isCosmicError } from '@/lib/cosmic';
import { Post } from '@/lib/types';
import CategoryBadge from '@/components/CategoryBadge';
import AuthorCard from '@/components/AuthorCard';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'posts',
        slug,
      })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    return response.object as Post;
  } catch (error) {
    if (isCosmicError(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold">Post Not Found</h1>
        <Link href="/" className="text-primary hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  const heroImage = post.metadata.hero_image?.imgix_url;
  const categories = post.metadata.categories || [];
  const author = post.metadata.author;

  return (
    <article className="min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative bg-secondary py-16 md:py-24">
        {heroImage && (
          <div className="absolute inset-0 z-0 opacity-10">
            <img 
              src={`${heroImage}?w=1600&h=600&fit=crop&auto=format,compress`} 
              alt="" 
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="container relative z-10 mx-auto max-w-4xl px-4">
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <CategoryBadge key={category.id} category={category} className="bg-background text-foreground" />
            ))}
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-6">
            {author && (
              <div className="flex items-center gap-3">
                {author.metadata?.avatar && (
                  <img 
                    src={`${author.metadata.avatar.imgix_url}?w=48&h=48&fit=crop&auto=format`}
                    alt={author.title}
                    className="h-10 w-10 rounded-full border border-border"
                  />
                )}
                <span className="font-medium text-foreground">{author.title}</span>
              </div>
            )}
            <time className="text-muted-foreground" dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {heroImage && (
          <figure className="mb-12 overflow-hidden rounded-xl border border-border shadow-md">
            <img
              src={`${heroImage}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full object-cover"
            />
          </figure>
        )}

        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          <div className="prose prose-lg prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg">
            <ReactMarkdown>{post.metadata.content}</ReactMarkdown>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">About the Author</h3>
              {author && <AuthorCard author={author} />}
            </div>

            {categories.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <CategoryBadge key={category.id} category={category} />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}