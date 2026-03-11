import { forwardRef, TextareaHTMLAttributes } from 'react';
import { classNames } from '@/lib/utils/helpers';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={classNames(
            'w-full bg-[#0a0a0a] border rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm transition-all duration-200 resize-none',
            'focus:outline-none focus:ring-2',
            error
              ? 'border-red-500 focus:ring-red-500/20'
              : 'border-[#1f1f1f] focus:border-[#00d4ff] focus:ring-[#00d4ff]/20',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
