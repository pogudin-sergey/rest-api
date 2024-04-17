psql --username "$POSTGRES_USER" --no-password --dbname postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$POSTGRES_DB'" | grep -q 1 || {
    psql --username "$POSTGRES_USER" --no-password --dbname postgres -c "CREATE DATABASE $POSTGRES_DB;"
    psql --username "$POSTGRES_USER" --no-password --dbname postgres -c "GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;"
}
