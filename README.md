# WAD application

Install mongoDB first, then import the database into mongoDB

install mongoDB tools (https://fastdl.mongodb.org/tools/db/mongodb-database-tools-windows-x86_64-100.5.0.zip) < i think is this not sure
to import database
1. cd to mongodb bin
2. run command `./mongorestore -d <database_name> <directory_backup>`

to export
1. run command `./mongodump -d <database_name> -o <directory_backup>`

To run server,
1. cd to server
2. `npm install`
3. `npm run start`


To run app,
1. cd to app
2. `npm install`
3. `npx react-native run-android`


