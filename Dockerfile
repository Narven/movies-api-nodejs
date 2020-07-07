FROM mysql:5.7.30

ADD mysql-dump/movies.sql /docker-entrypoint-initdb.d
