---title: Natural box layout modelslug: natural-box-layout-modeldate: 2013-07-15 12:58tags:  - css---Unfortunately, browsers do not always implement the default CSS rules that we would like. One rule which should almost definitely be added to every browser ever is the following, applying border-box box-sizing to, well, everything.

    /* apply a natural box layout model to all elements */
    * { -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; }

Thanks go to Paul Irish if I remember correctly.