'use client'
// /components/product/CategoryFilter.tsx
import { cn } from '@/utils'
import type { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  selected: string
  onSelect: (id: string) => void
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  const all = [{ id: 'all', name: 'All Products', slug: 'all', created_at: '' }]
  const items = [...all, ...categories]

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200',
            selected === cat.id
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600'
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
