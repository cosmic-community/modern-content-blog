import { cosmic, isCosmicError } from '@/lib/cosmic';
import { Post } from '@/lib/types';
import PostCard from '@/components/PostCard';

async function getPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as Post[];
  } catch (error) {
    if (isCosmicError(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Latest Stories
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Discover thoughts, ideas, and stories on technology, lifestyle, and more.
        </p>
      </section>

      {posts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[40vh] items-center justify-center rounded-lg border border-dashed border-border bg-card p-12 text-center">
          <div>
            <h3 className="mb-2 text-xl font-semibold">No posts found</h3>
            <p className="text-muted-foreground">Check back later for new content.</p>
          </div>
        </div>
      )}
    </div>
  );
}