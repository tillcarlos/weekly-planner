# TypeScript Coding Advice from Senior Developer Review

The following is an extract from a call I did with a senior typescript dev. You don't need to apply everything, but if you can, follow this best practice. Or at least hint it to me.

<senior_ts_advice>
## Database Schema Organization (Drizzle)

### Remove Unnecessary Aliases
- **Issue**: Extensive use of manual database table aliases in Drizzle schema
- **Solution**: Drizzle automatically maps camelCase properties to snake_case in database
- **Benefit**: Eliminates need for manual aliases, cleaner code

### Split Schema into Multiple Files
- **Current**: All schema definitions in single file
- **Recommended**: Organize by models with separate files
  - `accounts.ts`
  - `integrations.ts` 
  - `index.ts` (to export all models)
- **Benefit**: Improved readability and better organization of relations

### Separate Type Definitions
- **Issue**: Types defined directly within schema files
- **Solution**: Create dedicated folder structure:
  ```
  types/
    ├── models/
    └── api/
  ```
- **Benefit**: Better separation of concerns and improved reusability

## TypeScript Best Practices

### Type vs Interface Usage
- **Interface**: Use when you need type extension capabilities
- **Type**: More commonly used when extension isn't the primary concern
- **Rule of thumb**: Choose based on whether type extension is needed

### Code Sharing Between Frontend and Backend
- **Problem**: Duplicate type definitions across frontend and backend
- **Solution**: Use TurboRepo (monorepo solution)
- **Benefit**: Efficient code sharing and management between application parts

## Project Structure

### Adopt MVC-like Architecture
Organize code into clear separation of concerns:

```
src/
├── models/          # Database schemas
├── routes/          # Path definitions and middleware
├── controllers/     # Route logic
├── middleware/      # Authorization and other tasks
├── lib/            # Utilities and packages (like JWT)
└── utils/          # Custom functions without dependencies
```

### Controller Organization
- **Recommended**: Separate files for CRUD operations within controller folders
- **Benefit**: Clean, visible structure vs. single monolithic controller file

### Benefits of Smaller Files
- **Current issue**: Large generated files slow down development
- **Solution**: Split logic into shorter, smaller files
- **Impact**: Significant development speed improvement

## Error Handling

### Implement Centralized Error Handling
Use the "upright up" project pattern:

1. **Async Handler Middleware**: Automatically catch errors
2. **Custom Error Class**: `AppError` with properties:
   - Message
   - Status code  
   - Type (operational/internal)
3. **Error Handler Middleware**: Format and send appropriate responses

**Benefits**:
- Eliminates try-catch blocks in every controller
- Consistent error responses
- Cleaner controller code

## Authentication Strategy

### JWT vs Sessions
- **Sessions**: Stored in database, can be lost on server restart
- **JWT**: Stateless, no database lookups needed after initial generation
- **Recommendation**: Use JWT for better scalability and stateless authentication

## React Project Organization

### Folder Structure
```
src/
├── pages/           # Actual page components
├── components/      # Reusable components
└── [page-name]/
    ├── index.tsx    # Main page component
    ├── _components/ # Page-specific components
    └── tabs/        # Sub-components like tabs
```

### Page-Specific Components
- **Shared components**: Place in global `components/` directory
- **Page-specific**: Place in `_components/` folder within page directory
- **Sub-components**: Organize in relevant folders (e.g., `tabs/` for tab components)

## State Management

### URL-Based State Management
- **Problem**: State lost on page refresh when managed in memory
- **Solution**: Use Nuks package for URL-based state management
- **Implementation**: Add query parameters (e.g., `?tab=users`)
- **Benefits**: 
  - State persists across page refreshes
  - Better user experience
  - Shareable URLs with specific states

## Framework Choices

### Backend Framework Selection
- **NestJS**: Good for larger teams, enforces structure, but adds complexity
- **Express**: Full control, widely used, but requires more manual structure
- **Fastify**: Middle ground with more built-in structure than Express
- **Recommendation**: Choose based on team size and structure needs

## Code Quality Principles

### Avoid "Vibe Coding"
- **Risk**: Code quality degradation without full understanding
- **Solution**: Focus on learning and understanding the codebase
- **Importance**: Essential for maintainable, scalable applications

### Continuous Learning
- **Approach**: Take time to understand code architecture and patterns
- **Benefit**: Better decision-making and code quality over time
- **Reference**: Study well-structured projects like "upright up" for best practices

## Next Steps

1. **Immediate**: Rework models, controllers, and routes for better organization
2. **Study**: Review the "upright up" backend project structure
3. **Implement**: Centralized error handling pattern
4. **Refactor**: Split large files into smaller, focused modules
5. **Setup**: TurboRepo for code sharing between frontend and backend


</senior_ts_advice>