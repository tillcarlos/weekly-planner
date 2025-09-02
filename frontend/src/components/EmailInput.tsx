import React from 'react';

interface EmailInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'onKeyDown' | 'onSubmit' | 'onBlur'> {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  label?: string;
  error?: string;
  showValidation?: boolean;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  onSubmit,
  label,
  error,
  showValidation = true,
  className = '',
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [hasBlurred, setHasBlurred] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const baseClassName = "w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      const trimmedValue = currentTarget.value.trim();
      if (trimmedValue !== currentTarget.value) {
        onChange(trimmedValue);
      }
    }, 0);
    props.onPaste?.(e);
  };

  const handleKeyDown = (_e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmedValue = value.trim();
    if (trimmedValue !== value) {
      onChange(trimmedValue);
    }
    if (onSubmit) {
      onSubmit(trimmedValue);
    }
  };

  const handleBlur = (_e: React.FocusEvent<HTMLInputElement>) => {
    const trimmedValue = value.trim();
    if (trimmedValue !== value) {
      onChange(trimmedValue);
    }
    setHasBlurred(true);
    setIsFocused(false);
    // props.onBlur?.(e); // onBlur is excluded from props
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const getValidationMessage = () => {
    if (!showValidation || !hasBlurred) return null;
    if (!value.trim()) return null;
    return isValidEmail(value.trim()) ? 'Valid email address' : 'Invalid email address';
  };

  const validationMessage = getValidationMessage();
  const isValid = validationMessage === 'Valid email address';

  return (
    <div>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          ref={inputRef}
          // type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`${baseClassName} ${className} ${validationMessage ? 'pr-10' : ''}`}
        />
        {validationMessage && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isValid ? (
              <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : isFocused ? (
              <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};