---

    SHOW VARIABLES LIKE "%wait%"
    SET @@GLOBAL.wait_timeout=300
     
    SHOW VARIABLES LIKE "%max%"
    SET @@GLOBAL.max_connections=1000