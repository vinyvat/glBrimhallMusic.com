CREATE TABLE Event 
   (
   event_id int(11) NOT NULL AUTO_INCREMENT, 
   event_type ENUM('EVENT', 'MUSIC', 'TECH', 'LESSON') NOT NULL,
   event_name varchar(255) NOT NULL UNIQUE, 
   event_date datetime NOT NULL UNIQUE, 
   event_place varchar(255), 
   event_url varchar(255), 
   event_pic varchar(255), 
   event_video varchar(255), 
   PRIMARY KEY (event_id)
   );
