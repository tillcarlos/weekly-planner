# Architecture of StatsAware

The UI queries the server /api/v1/work-sessions?date=2025-05-28

or /api/v1/work-sessions/ for today

This is the output:

```js
{
  date: string,
  users: [{
    id: string,
    username: string, 
    firstname: string,
    lastname: string,
    email: string,
    timezone: string,
    lastSeenAt: string,
    isOnline: boolean,
    workSessions: [{
      id: number,
      startTime: string,
      endTime: string,
      durationMinutes: number,
      timezoneAtStart: string,
      isOngoing: boolean
    }],
    workPredictions: [{
      id: string,                   // unique identifier for this prediction
      startTime: string,            // ISO timestamp when predicted to start
      endTime: string,              // ISO timestamp when predicted to end
      durationMinutes: number,      // predicted session duration
      timezoneAtStart: string,      // user's timezone for this prediction
      confidence: number,           // 0-1 confidence score
      isOngoing: false              // always false for predictions
    }]
  }]
}
```


