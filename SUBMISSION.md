# Assessment Submission

## Q1: Which parts of the assessment did you complete?

- Authentication and authorization
- Database and Prisma
- Ride API
- Firebase Cloud Messaging and notifications
- Real-time communication using WebSockets
- Redis and background jobs
- Frontend requirements

## Q2: Which parts did you intentionally leave incomplete, and why?

I left observability incomplete due to time constraints, its lower priority relative to the core requirements, and a knowledge gap: I have no prior experience with OpenTelemetry specifically. I also left out some bonus features, such as finding the nearest seeded driver using Haversine distance.

## Q3: What would you improve with additional time?

- I would write end-to-end tests and integration tests
- I would implement a distance dependent fare policy, the current imiplementation is a flat 1,000 naira rate
- I would implement volatile ride request such that a ride request times out and the data is cleaned up 
- I would implement observability and logging
- I would handle API failures proper  with  retries, network error indication etc.
- Authentication credentials expiration and refresh
- Token deletion and logout cleanup.

## Q4: How would you scale this system to support 10,000 concurrent rides?

## Q5: What security considerations would you address?

- **User verification:** • 1. The current app doesn’t include user verification, an email or phone verification would be necessary in a production system to guard the application from bots, fake accounts and abuse
- **Rate limiting:** Apply rate limits to public routes, relevant authenticated routes, and WebSocket events to reduce API overload and risk of DOS attack.
- **Additional protections:** Add a web application firewall (WAF). Implement CSRF protection for state-changing requests, alongside appropriate cookie settings and origin checks.

## Q6: What assumptions did you make?

- I assumed the rider and driver experiences should exist within the same frontend application, although they could be separate applications.
- I assumed rider and driver accounts are mutually exclusive. A driver would need a separate email address and account to register as a rider, and vice versa. The backend could be extended to support users with both roles.
