---title: SQL Correlated Sub-Queries and Group By Unionsslug: sql-correlated-sub-queries-and-group-by-unionsdate: 2011-01-06 21:58tags:  - sql---Whilst working on my new uptime and latency monitoring project, I've ran into more than the usual amount of SQL conundrums, and I am learning a lot by having higher than normal requirements. To call yourself a programmer, I think you have to at least have basic SQL skills. They are your basic math skills for normal people, every coder should understand select, insert, update and delete.. and for a long time I was one of them, I hated SQL because I didn't understand it, or didn't want to.. but needing it, and needing it to do advanced things, means you need to learn, and it truly saves you time when you can cut out so much coding by offloading onto SQL!

So this part I'm working on now gets a list of hosts whose last record (latency check) is past a frequency threshold. The current SQL is great, it checks from a view whether the last date is past the threshold but I realised one small problem.. it doesn't get new hosts who have zero records. It will only work for previously checked hosts!

    SELECT HostId, MAX(Hostname) AS Hostname, MAX(CheckDate) AS CheckDate, MAX(Frequency) AS Frequency
    FROM vw_HostRecords
    GROUP BY HostId
    HAVING (DATEADD(minute, MAX(Frequency), MAX(CheckDate)) < GETDATE())

And so I had to again improve my SQL, onto correlated sub-queries. It is actually quite simple it just sounds clever but shh.. here is the SQL to check if a row exists in the records and if it doesn't, it selects that row from the hosts. Basically it gets all the new ones for me.

    SELECT Id AS HostId, Hostname, Frequency
    FROM t_Hosts
    WHERE (
       Id NOT IN (
          SELECT HostId
          FROM t_Records
          WHERE (HostId IS NOT NULL)
       )
    )

So now I need to mix these using a union, and adding in CheckDate = NULL so that the UNION works (as to use that, both selects must have the same fields/columns).. and we end up with this lovely piece of work:

    SELECT HostId, MAX(Hostname) AS Hostname, MAX(Frequency) AS Frequency, MAX(CheckDate) AS CheckDate
    FROM vw_HostRecords
    GROUP BY HostId
    HAVING (DATEADD(minute, MAX(Frequency), MAX(CheckDate)) < GETDATE())
    UNION
    SELECT Id AS HostId, Hostname, Frequency, NULL AS CheckDate
    FROM t_Hosts
    WHERE (
       Id NOT IN (
          SELECT HostId
          FROM t_Records
          WHERE (HostId IS NOT NULL)
       )
    )

Awesome, no?

Edit: Had to fix a bug, it seems you also have to get all the fields in the right order as well, as SQL will not mix and match for you!

So: select a, b, c from table_a union select a, b, c from union_b etc!

Edit 2: Removed OR from having line