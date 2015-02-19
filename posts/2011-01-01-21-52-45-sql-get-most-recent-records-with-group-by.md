---title: SQL Get most recent records with group byslug: sql-get-most-recent-records-with-group-bydate: 2011-01-01 21:52tags:  - sql---The following is awesome SQL. I will right now tell you, I don't like SQL. I admire it, but I don't like it. So SQL is a bit like Alan Sugar in that respect. But what I had to do, or well, what I've just done, is something very important and vital to making my medium-secret project more efficient.

I have two tables, hosts and records, and for each host row in the hosts table there is a bunch of record rows in the records table. I needed SQL to get me all the records that were either older than X number of minutes, or newer than X number of minutes, defined by a Date field.

I could easily do this in the application, and I have been doing, but when I put 5000 hosts into the database to run a test, it couldn't keep it fully because each iteration it had to pull 5000 hosts out and grab the latest record individually. So I scaled down to 1000 hosts to test my system, and managed to get about 90% upkeep, that is, keeping up with 90% of the hosts.

The problem was that whilst it was checking if any hosts had old records, a very inefficient way of doing it by the way, it was not checking the beginning of the list, which happened to be the first checked and the first that passed the threshold.

So, the SQL. With the help of @McFly from #lifestinks, being told it was impossible from someone in #sql and with the drunken non-reply of Mihner (of No Fixed Internet Abode), I came up with some SQL that would get me exactly what I wanted.

Now it wouldn't return to me all the details of the record, just the ID and the date of the most recent record. I will give you it in plain SQL, without the T-SQL schpiel:

    SELECT HostId, MAX(Hostname) AS Hostname, MAX(CheckDate) AS CheckDate, MAX(Frequency) AS Frequency
    FROM vw_HostRecords
    GROUP BY HostId
    HAVING (DATEADD(minute, MAX(Frequency), MAX(CheckDate)) < GETDATE())

And there you have it, horrible yet beautiful SQL code, that takes a weight off my back.

Enjoy, future me!