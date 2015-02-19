---title: Find column from all tablesslug: find-column-from-all-tablesdate: 2014-02-18 10:26tags:  - sql---A very useful SQL snippet today, courtesy of [Danny Dawes](http://twitter.com/noirenex) and [SQLAuthority](http://blog.sqlauthority.com/2008/08/06/sql-server-query-to-find-column-from-all-tables-of-database/).

The following query will list all tables that reference a specific column name:

    SELECT t.name AS table_name,
    SCHEMA_NAME(schema_id) AS schema_name,
    c.name AS column_name
    FROM sys.tables AS t
    INNER JOIN sys.columns c ON t.OBJECT_ID = c.OBJECT_ID
    WHERE c.name LIKE '%EmployeeID%'
    ORDER BY schema_name, table_name;

Just change `%EmployeeID%` to the column name you're looking for.