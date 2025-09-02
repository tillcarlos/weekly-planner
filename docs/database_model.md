# Database


This is a preliminary model to start with

DBDatabase.io diagram notation

```js
// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table users {
  id integer [primary key]
  email varchar [unique, not null]
  encrypted_password varchar [not null]
  username varchar [unique, not null]
  role varchar [not null, note: 'member, manager, superuser']
  first_name varchar
  last_name varchar
  timezone varchar [default: 'UTC']
  created_at timestamp
  updated_at timestamp
}

Table teams {
  id integer [primary key]
  name varchar [not null]
  description text
  trial_expires_at timestamp
  created_at timestamp
  updated_at timestamp
}

Table team_memberships {
  id integer [primary key]
  user_id integer [not null]
  team_id integer [not null]
  role varchar [not null, note: 'member, manager']
  joined_at timestamp [default: `now()`]
  created_at timestamp
  updated_at timestamp
}

Table weekly_plans {
  id integer [primary key]
  user_id integer [not null]
  team_id integer [not null]
  week_year integer [not null]
  week_number integer [not null]
  locked_until_date date
  created_at timestamp
  updated_at timestamp
}

Table goals {
  id integer [primary key]
  weekly_plan_id integer [not null]
  user_id integer [not null]
  title varchar [not null]
  description text
  planned_date date [not null]
  smartness_score decimal
  weekly_adherence_score decimal
  ambition_score decimal
  locked_at timestamp
  created_at timestamp
  updated_at timestamp
}

Table tasks {
  id integer [primary key]
  goal_id integer [not null]
  user_id integer [not null]
  title varchar [not null]
  html_content text [note: 'Simple HTML formatting - bold, links, etc']
  original_planned_date date [not null]
  current_planned_date date [not null]
  planning_log json [note: 'Track when task was moved/rescheduled']
  status varchar [not null, default: 'not_started', note: 'not_started, in_progress, completed, blocked']
  completed_at timestamp
  created_at timestamp
  updated_at timestamp
}

Table checkouts {
  id integer [primary key]
  goal_id integer [not null]
  user_id integer [not null]
  checkout_date date [not null]
  status varchar [not null, default: 'not_started', note: 'not_started, in_progress, completed, blocked, skipped']
  notes text
  checked_out_at timestamp
  created_at timestamp
  updated_at timestamp
}

Table task_checkouts {
  id integer [primary key]
  task_id integer [not null]
  checkout_id integer [not null]
  status varchar [not null, default: 'not_started', note: 'not_started, in_progress, completed, blocked, skipped']
  notes text
  created_at timestamp
  updated_at timestamp
}



// Relationships
Ref: team_memberships.user_id > users.id
Ref: team_memberships.team_id > teams.id
Ref: weekly_plans.user_id > users.id
Ref: weekly_plans.team_id > teams.id
Ref: goals.weekly_plan_id > weekly_plans.id
Ref: goals.user_id > users.id
Ref: tasks.goal_id > goals.id
Ref: tasks.user_id > users.id
Ref: checkouts.goal_id > goals.id
Ref: checkouts.user_id > users.id
Ref: task_checkouts.task_id > tasks.id
Ref: task_checkouts.checkout_id > checkouts.id
```