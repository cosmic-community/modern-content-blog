import Link from 'next/link';
import { Post } from '@/lib/types';
import CategoryBadge from './CategoryBadge';

interface PostCardProps {
  post: Post;
  priority?: boolean;
}

export default function PostCard({ post, priority = false }: PostCardProps) {
  const heroImage = post.metadata?.hero_image?.imgix_url;
  const categories = post.metadata?.categories || [];
  const author = post.metadata?.author;

  return (
    <div className="group flex flex-col h-full overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md">
      <Link href={`/posts/${post.slug}`} className="relative aspect-video w-full overflow-hidden bg-secondary">
        {heroImage ? (
          <img
            src={`${heroImage}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            width={400}
            height={225}
            loading={priority ? 'eager' : 'lazy'}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </Link>
      
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {categories.length > 0 && categories.map((category) => (
            <CategoryBadge key={category.id} category={category} />
          ))}
        </div>
        
        <Link href={`/posts/${post.slug}`} className="mb-2 block">
          <h3 className="text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
            {post.title}
          </h3>
        </Link>
        
        <p className="mb-4 flex-1 text-muted-foreground line-clamp-3">
          {post.metadata.excerpt}
        </p>
        
        {author && (
          <div className="mt-auto flex items-center text-sm text-muted-foreground">
            {author.metadata?.avatar && (
              <img 
                src={`${author.metadata.avatar.imgix_url}?w=40&h=40&fit=crop&auto=format`}
                alt={author.title}
                className="mr-2 h-6 w-6 rounded-full"
              />
            )}
            <span>{author.title}</span>
            <span className="mx-2">•</span>
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
          </div>
        )}
      </div>
    </div>
  );
}