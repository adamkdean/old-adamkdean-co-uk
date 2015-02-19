---title: MySQL Global Vars wait_timeout & max_connectionsslug: mysql-global-vars-wait-timeout-max-connectionsdate: 2011-11-22 22:19tags:  - sql---Just some more code for me to bookmark. Problem was the MySQL connections were not being closed, the timeout was set at 8 hours and the connection limit was 400.

    SHOW VARIABLES LIKE "%wait%"
    SET @@GLOBAL.wait_timeout=300
     
    SHOW VARIABLES LIKE "%max%"
    SET @@GLOBAL.max_connections=1000