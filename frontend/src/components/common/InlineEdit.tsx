import React, { useState, useRef, useEffect } from 'react';
import { Check, X, Edit3, RefreshCw } from 'lucide-react';

interface InlineEditProps {
  value: string | number | null;
  placeholder?: string;
  onSave: (newValue: string | number | null) => Promise<void>;
  displayValue?: string;
  type?: 'text' | 'number';
  className?: string;
  inputClassName?: string;
  displayClassName?: string;
  validator?: (value: string) => string | null; // Returns error message or null if valid
  formatter?: (value: string | number | null) => string; // Format display value
  parser?: (value: string) => string | number | null; // Parse input value
  disabled?: boolean;
  allowEmpty?: boolean;
  emptyDisplayValue?: string;
}

export const InlineEdit: React.FC<InlineEditProps> = ({
  value,
  placeholder = 'Click to edit...',
  onSave,
  displayValue,
  type = 'text',
  className = '',
  inputClassName = '',
  displayClassName = '',
  validator,
  formatter,
  parser,
  disabled = false,
  allowEmpty = false,
  emptyDisplayValue = 'Not set'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getDisplayValue = () => {
    if (displayValue !== undefined) return displayValue;
    if (formatter) return formatter(value);
    if (value === null || value === '') return emptyDisplayValue;
    return String(value);
  };

  const getInputValue = () => {
    if (value === null || value === '') return '';
    return String(value);
  };

  const startEditing = () => {
    if (disabled) return;
    setIsEditing(true);
    setInputValue(getInputValue());
    setError(null);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setInputValue('');
    setError(null);
  };

  const handleSave = async () => {
    let processedValue: string | number | null = inputValue;

    // Validate empty values
    if (inputValue.trim() === '') {
      if (!allowEmpty) {
        setError('This field cannot be empty');
        return;
      }
      processedValue = null;
    } else {
      // Parse the value if parser is provided
      if (parser) {
        processedValue = parser(inputValue);
      } else if (type === 'number') {
        const num = parseFloat(inputValue);
        if (isNaN(num)) {
          setError('Please enter a valid number');
          return;
        }
        processedValue = num;
      }

      // Validate the value
      if (validator) {
        const validationError = validator(inputValue);
        if (validationError) {
          setError(validationError);
          return;
        }
      }
    }

    setSaving(true);
    setError(null);

    try {
      await onSave(processedValue);
      setIsEditing(false);
      setInputValue('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEditing();
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  if (isEditing) {
    return (
      <div className={`inline-flex flex-col ${className}`}>
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type={type}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={saving}
            className={`px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 ${inputClassName}`}
          />
          <div className="flex items-center space-x-1">
            <button
              onClick={handleSave}
              disabled={saving}
              className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Save"
            >
              {saving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={cancelEditing}
              disabled={saving}
              className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        {error && (
          <div className="mt-1 text-xs text-red-600">{error}</div>
        )}
      </div>
    );
  }

  return (
    <div 
      onClick={startEditing}
      className={`inline-flex items-center space-x-1 group ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className}`}
    >
      <span className={`${displayClassName} ${!disabled ? 'group-hover:bg-gray-50 rounded px-1 py-0.5 transition-colors border-b border-dashed border-gray-300 group-hover:border-gray-400' : ''}`}>
        {getDisplayValue()}
      </span>
      {!disabled && (
        <Edit3 className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  );
};