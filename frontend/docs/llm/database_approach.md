# Database

now help me add drizzle. can we wrap the database tables in objects and connect them together, like in rails?

I need
* Account (for multi tenancy)
* Integration (having an API key + kind (like mattermost, slack), belongs to account)
* user (belongs to account)
* person (the one being tracked, belongs to account)
* worksessions (belongs to user. start - end + kind (online, away, meeting, ...)
* apicall (belongs to activity) just logs what we have. has payload.
All into postgres db. I need migrations as well.