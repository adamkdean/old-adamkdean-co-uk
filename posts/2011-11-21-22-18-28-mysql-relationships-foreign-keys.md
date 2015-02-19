---title: MySQL Relationships & Foreign Keysslug: mysql-relationships-foreign-keysdate: 2011-11-21 22:18tags:  - sql---Just another snippet of code that I will forget...

    ALTER TABLE `accounts`
      ADD CONSTRAINT `FK_myKey` FOREIGN KEY (`customer_id`) 
      REFERENCES `customers` (`customer_id`) 
      ON DELETE CASCADE ON UPDATE CASCADE;