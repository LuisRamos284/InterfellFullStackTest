#! /bin/bash

#NOTE: To run this file, run npm run create-migration from the root of this project.

echo "Please enter a name for the migration"

# get name from user input
read migrationName

echo "Creating migration for $migrationName"

# change into api folder
cd apps/api 

# run script to create migration
npx sequelize-cli seed:generate --name $migrationName 

echo "Moving file to migrations folder."

# change into seeders folder
cd src/seeders 

# get filepath for newly created migration file
filepath=$(find . -type f -name "*$migrationName*")

# move file into migrations folder
mv $filepath ../migrations

# just removing "./" from the filepath
filename=$(echo "$filepath" | cut -d "/" -f 2)

echo "Migration file created at apps/api/src/migrations/$filename"

# back to root
cd ../../../../../

# if you have vscode, opening the file with it.
if command -v code &> /dev/null
then 
    code "apps/api/src/migrations/$filename"
fi

