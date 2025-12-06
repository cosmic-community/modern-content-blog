import { Author } from '@/lib/types';

interface AuthorCardProps {
  author: Author;
  showBio?: boolean;
}

export default function AuthorCard({ author, showBio = true }: AuthorCardProps) {
  const avatarUrl = author.metadata?.avatar?.imgix_url;
  
  return (
    <div className="flex items-center space-x-4">
      {avatarUrl ? (
        <img
          src={`${avatarUrl}?w=100&h=100&fit=crop&auto=format,compress`}
          alt={author.title}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover border border-border"
        />
      ) : (
        <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
          {author.title.substring(0, 1)}
        </div>
      )}
      
      <div>
        <h4 className="text-sm font-bold text-foreground">{author.title}</h4>
        {showBio && author.metadata?.bio && (
          <p className="text-sm text-muted-foreground line-clamp-2">{author.metadata.bio}</p>
        )}
      </div>
    </div>
  );
}