import * as React from 'react';
import { cn } from '../lib/utils';
import Eye from '../../assets/eye.svg';
import EyeOff from '../../assets/eye-off.svg';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
      <div className="relative w-full">
        <input
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#A1ABB5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer">
          {showPassword ? (
            <img
              src={Eye}
              className="w-4 h-4 text-gray-200"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <img
              src={EyeOff}
              className="w-4 h-4 text-gray-200"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input as PasswordInput };
