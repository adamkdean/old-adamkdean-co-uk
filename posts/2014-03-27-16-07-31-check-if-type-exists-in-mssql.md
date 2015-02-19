---title: Check if type exists in MSSQLslug: check-if-type-exists-in-mssqldate: 2014-03-27 16:07tags:  - sql - mssql - snippet---Snippet time. Check if a type exists in MSSQL with the following simple query:

    IF TYPE_ID(N'[dbo].[udt_SomeCustomType]') IS NOT NULL
    BEGIN
        -- type exists, do something here
    END

And of course, the other way round:

    IF TYPE_ID(N'[dbo].[udt_SomeCustomType]') IS NULL
    BEGIN
        -- type does not exist, do something here
    END

More SQL snippets to come.