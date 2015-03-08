---

    fleetctl list-units | sed 1d | while read -r line ; \
        do fleetctl destroy $(echo $line | cut -f1 -d ' '); done

It gets a list of units, removes the first line, loops through, grabs the first word, and and destroys it.

    $ fleetctl list-units | sed 1d | while read -r line ; \
        do fleetctl destroy $(echo $line | cut -f1 -d ' '); done
    Destroyed Job august-frosting_v4.web.1-announce.service
    Destroyed Job august-frosting_v4.web.1-log.service
    Destroyed Job august-frosting_v4.web.1.service
    Destroyed Job august-frosting_v4.web.2-announce.service
    Destroyed Job august-frosting_v4.web.2-log.service
    Destroyed Job august-frosting_v4.web.2.service
    Destroyed Job quaint-teamwork_v5.cmd.1-announce.service
    Destroyed Job quaint-teamwork_v5.cmd.1-log.service
    Destroyed Job quaint-teamwork_v5.cmd.1.service
    Destroyed Job quaint-teamwork_v5.cmd.2-announce.service
    Destroyed Job quaint-teamwork_v5.cmd.2-log.service
    Destroyed Job quaint-teamwork_v5.cmd.2.service

Now imagine typing each of those by hand. 