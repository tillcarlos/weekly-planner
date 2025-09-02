# About this project

StatsAware is a remote team online tracker. The main use case is to show every team member when their peers went online, and when are they most likely to stop working.

We faced the issue of not knowing when people come online, or when they leave. That made it harder to reach people across timezones.

With this tool we get a clear UI that's like a calendar view: it shows every hour when someone was online. It looks exactly like any calendar software, but instead of days there are people. The y axis it the local time. The columns show the person's name, their timezone, and their local time.

## How it works technically

It checks on people's online status and plots it into a relational database. Every minute we write the poll log. After that we update the work_session. It continues open sessions (person of the last minute is still there), and closes sessions that just went online.


## How it looks visually

We are going with a vertical (calendar like) view now. It cold also look like this (horizontally). The general idea is the same.

John Doe    [████████████████████████████] ← Online session
            •       •   •               •  ← Events (commits, updates)
            9AM    11AM 1PM            4PM
            
Where:
- = Git commit
- = JIRA update  
- = Deploy

