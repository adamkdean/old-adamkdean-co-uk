---

    ALTER TABLE `accounts`
      ADD CONSTRAINT `FK_myKey` FOREIGN KEY (`customer_id`) 
      REFERENCES `customers` (`customer_id`) 
      ON DELETE CASCADE ON UPDATE CASCADE;