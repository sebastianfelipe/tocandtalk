su - postgres -c "dropdb coffeeexpress;"
su - postgres -c "createdb coffeeexpress;"
su - postgres -c "psql -d coffeeexpress -c \"CREATE EXTENSION postgis;\""