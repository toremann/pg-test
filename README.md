# Jobs API:

## URL: /jobs


Query Parameters:

lokasjon (optional): Filter jobs by location. Example: lokasjon=OSLO
order (optional): Order jobs by date or get the latest job. Valid values: last, today. Example: order=today

## Examples

Get all jobs with the location OSLO:
- GET http://localhost:3000/jobs?lokasjon=OSLO

 Get the latest job with the location OSLO:
- GET http://localhost:3000/jobs?lokasjon=OSLO&order=last

Get all jobs matching todays date and location OSLO:
- GET http://localhost:3000/jobs?order=today&lokasjon=OSLO

Get all jobs with today's date:
- GET http://localhost:3000/jobs?order=today
