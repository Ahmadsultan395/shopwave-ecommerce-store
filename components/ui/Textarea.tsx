// /components/ui/Textarea.tsx
import { forwardRef, TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-lg border px-3 py-2 text-sm transition-colors resize-none',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-200'
              : 'border-gray-300 bg-white focus:border-primary-500 focus:ring-primary-100',
            className
          )}
          rows={4}
          {...props}
        />
        {error && (
          <p className="flex items-center gap-1 text-xs text-red-500">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
