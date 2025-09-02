# UI Patterns and Guidelines

## Interactive Elements

### Tabs
- **Always add `cursor-pointer`** to clickable tab buttons
- Use consistent hover states with color transitions
- Include proper focus states for accessibility
- **Add URL query parameters** to persist tab state on page reload

```tsx
// ✅ Good - includes cursor-pointer and URL persistence
const [activeTab, setActiveTab] = useState<'accounts' | 'services'>(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab');
  return (tabParam === 'services' || tabParam === 'accounts') ? tabParam : 'accounts';
});

const handleTabChange = (tab: 'accounts' | 'services') => {
  setActiveTab(tab);
  const url = new URL(window.location.href);
  url.searchParams.set('tab', tab);
  window.history.pushState({}, '', url.toString());
};

<button
  onClick={() => handleTabChange('services')}
  className={`py-2 px-1 border-b-2 font-medium text-sm cursor-pointer ${
    activeTab === 'services'
      ? 'border-blue-500 text-blue-600'
      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
  }`}
>
  Services
</button>

// ❌ Bad - missing cursor-pointer and no URL persistence
<button
  onClick={() => setActiveTab('services')}
  className="py-2 px-1 border-b-2 font-medium text-sm"
>
  Services
</button>
```

### Buttons
- All clickable buttons should have `cursor-pointer`
- Include disabled states with `disabled:opacity-50` and `disabled:cursor-not-allowed`
- Use consistent transition classes: `transition-colors`

```tsx
// ✅ Good button pattern
<button
  onClick={handleAction}
  disabled={loading}
  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
>
  Action
</button>
```

### Icon Buttons
- Small action buttons with icons should include `cursor-pointer`
- Use consistent hover color patterns

```tsx
// ✅ Good icon button
<button
  onClick={() => handleAction(item.id)}
  className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
  title="Action description"
>
  <Icon className="w-4 h-4" />
</button>
```

## Color Patterns

### Status Indicators
- Green: `bg-green-400`, `text-green-700` for enabled/active states
- Gray: `bg-gray-400`, `text-gray-700` for disabled/inactive states
- Red: `text-red-500 hover:text-red-700` for destructive actions
- Blue: `text-blue-500 hover:text-blue-700` for primary actions

### Hover States
- Always include hover states for interactive elements
- Use `hover:bg-gray-50` for subtle background changes
- Use `hover:text-{color}-700` for text color changes

## Layout Patterns

### Modal Structure
```tsx
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-lg max-w-{size} w-full max-h-[90vh] overflow-y-auto">
    {/* Header with close button */}
    <div className="flex justify-between items-center p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900">Title</h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
      >
        <XCircle className="w-6 h-6" />
      </button>
    </div>
    {/* Content */}
    <div className="p-6">
      {/* Modal content */}
    </div>
  </div>
</div>
```

## Common Mistakes to Avoid

1. **Missing cursor-pointer on interactive elements** - Always add this class
2. **Inconsistent hover states** - Use the established color patterns
3. **Missing disabled states** - Include proper disabled styling
4. **Forgetting transition classes** - Add `transition-colors` for smooth interactions
5. **Missing accessibility attributes** - Include `title` attributes for icon buttons