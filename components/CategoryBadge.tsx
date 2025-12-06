import Link from 'next/link';
import { Category } from '@/lib/types';

interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

export default function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  return (
    <Link 
      href={`/categories/${category.slug}`}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors ${className}`}
    >
      {category.title}
    </Link>
  );
}