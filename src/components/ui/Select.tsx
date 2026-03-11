import { forwardRef, SelectHTMLAttributes } from 'react';
import { classNames } from '@/lib/utils/helpers';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={classNames(
            'w-full bg-[#0a0a0a] border rounded-lg px-4 py-2.5 text-white text-sm transition-all duration-200',
            'focus:outline-none focus:ring-2',
            error
              ? 'border-red-500 focus:ring-red-500/20'
              : 'border-[#1f1f1f] focus:border-[#00d4ff] focus:ring-[#00d4ff]/20',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#111111]">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
