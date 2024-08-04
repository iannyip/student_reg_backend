### Student Registration CRM

A CRM system built for Nullspace, the education company I was working for at that time.

The project was built as project #6 of the software bootcamp in 2019 Jun.

Core features include the ability to:

1. setup courses and sessions
2. register students for courses
3. assign instructors to sessions
4. track purchases of credits + usage

Also handles login and auth using bcrypt

## Running the application

```
docker-compose up
```

## Development

```
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up --build
```

`--build` is optional here and can be removed

## Seeders

The seeders are read from `src/seeders/jsonData.json`
This json file can be built with `node src/seeders/csv-data.js`, which reads from the csv files `src/seeders/csvData`.
