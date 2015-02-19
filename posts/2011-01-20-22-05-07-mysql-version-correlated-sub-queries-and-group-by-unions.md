---title: MySql Version "Correlated Sub-Queries and Group By Unions"slug: mysql-version-correlated-sub-queries-and-group-by-unionsdate: 2011-01-20 22:05tags:  - sql---If you look at this SQL article [old link removed], you may either be impressed or insult me for bad coding practise. FYI, it does run on 1000 rows in < 1 second. When I was using MsSql (before I migrated to CentOS/Mono/MySql) I sometimes had to go to extortionate amounts of effort to get stuff done, but with MySql it all seems, a bit too easy.. So from the giant SQL that you saw in the previous article, I can do all that on the same tables (bar one change) with the following SQL:

    SELECT t_Hosts.Id AS Id, t_Records.Id AS RecordId, Hostname, 
     
    Frequency, PingStatus, PingLatency, HttpStatusCode, 
     
    HttpOnlineStatus, HttpLatency, CheckDate
     
    FROM t_Hosts 
     
    LEFT JOIN t_Records ON t_Hosts.Id = t_Records.HostId
     
    WHERE t_Records.CheckDate IS NULL
     
    OR t_Records.CheckDate < DATE_SUB(NOW(), INTERVAL t_Hosts.Frequency MINUTE);

This happens to have caused more trouble than it's worth, so it's back to a datetime now.

Also, make sure that you add an alias for the second Id or it may overwrite the first tables Id!

Edit: It would seem this doesn't work, and is actually flawed. My old logic (@mcfly version) is actually the way to go, not streakys stupid left join crap!

Below is the MySQL Version.

    SELECT t_Hosts.Id AS Id, MAX(Hostname) AS Hostname, MAX(Frequency) AS Frequency
    FROM t_Hosts
    LEFT JOIN t_Records
    ON t_Hosts.Id = t_Records.HostId 
    GROUP BY t_Hosts.Id
    HAVING MAX(CheckDate) <= DATE_SUB(NOW(), INTERVAL MAX(Frequency) MINUTE)
    UNION
    SELECT Id, Hostname, Frequency
    FROM t_Hosts
    WHERE (
       Id NOT IN (
          SELECT HostId
          FROM t_Records
          WHERE (HostId IS NOT NULL)
       )
    )