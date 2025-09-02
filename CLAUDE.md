# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a weekly planner SaaS application designed for team planning and daily check-outs. The system enforces time-based locking of goals to encourage upfront planning and follow-through.

## Architecture

### Backend
- **Framework**: Fastify with TypeScript
- **Database**: Relational database with tables for users, teams, weekly_plans, goals, tasks, and checkouts

### Frontend
- **Main App**: React with React Router and Vite
- **Landing Page**: Next.js static page at `/landing`

### Deployment
- **Infrastructure**: Single Hetzner server
- **Deployment Tool**: Kamal

## Key Business Logic

### Time-Based Locking System
- **Weekly goals**: Editable until Monday noon
- **Daily goals**: Locked immediately after creation
- **Evening status reports**: Disabled the next day

### User Roles
- **System roles**: member, manager, superuser
- **Team roles**: member, manager

## Database Schema

The application uses a relational database with the following core entities:
- `users`: Authentication and user profiles
- `teams`: Organization units with trial expiration
- `team_memberships`: Many-to-many relationship between users and teams
- `weekly_plans`: Week-based planning containers
- `goals`: Daily goals linked to weekly plans
- `tasks`: Individual tasks within goals
- `checkouts`: Daily status reports for goals
- `task_checkouts`: Status tracking for individual tasks

## Development Approach

Currently targeting Milestone 1 (POC) which focuses on:
- Single user system
- Testing the daily checkout experience
- Displaying all tasks in a weekly view

The codebase is in early stages with documentation-first development. No implementation exists yet.