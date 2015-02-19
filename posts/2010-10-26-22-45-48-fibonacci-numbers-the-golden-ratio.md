---title: Fibonacci Numbers & The Golden Ratioslug: fibonacci-numbers-the-golden-ratiodate: 2010-10-26 22:45tags:  - php - fibonacci---So here I am doing some designs when I think, hmm, maybe I will use the golden ratio to lay out the design, Fibonacci's Spiral and what not, but the amount of tedious workings out.. (having to use a pencil..tedious...physical movement you see..) so I wrote a script. I don't really like using C# for scripts, being it isn't a script but.. sometimes you just want something like putty in your hands to quickly test a hypothesis or whatnot, and PHP is great for that. Big project, ASP.NET but a little versatile albeit-unable-to-really-report-errors-very-well scripting language, PHP is the don.

So, Fibonacci's numbers, very nice and easy to do:

    <?php
     
    $numbers[] = 0;
    $numbers[] = 1;
     
    $a = 0;
    $b = 1;
     
    for ($i = 0; $i < 10; $i++)
    {
     $c = $a + $b;
     $a = $b;
     $b = $c;
     
     $numbers[] = $c;
    }
     
    // output
    foreach($numbers as $n) echo "$n, ";
     
    ?>

and then for the golden ratio, a slightly bigger script. 

    <?php

    error_reporting(E_ALL);

    $width = 1024;
    $height = 768;

    $phi = 0.6180339887;

    $boxes[] = array($width, $height);

    for($i = 1; $i < 10; $i++)
        {
        $w = round($boxes[$i - 1][0] * $phi, 4);
        $h = round($boxes[$i - 1][1] * $phi, 4);
        $boxes[] = array($w, $h);
    }

    echo "<pre>";
    for($i = 0; $i < count($boxes); $i++)
    {
        $box = $boxes[$i];
        $w = sprintf("%-10s", $box[0]);
        $h = sprintf("%-10s", $box[1]);

        echo "W: $w H: $h "; 
        if ($i > 0)
        {
            $pbox = $boxes[$i - 1];
            $tw = sprintf("%-10s", $box[0] + $pbox[0]);
            $th = sprintf("%-10s", $box[1] + $pbox[1]);
            echo "TW: $tw TH: $th";
        }
        echo "\r\n";
    }
    echo "</pre>";

    ?>

You'll see I supply three variables, the initial width, height and then phi, which shouldn't really need to change. This script gives us a nice output, which works out the desired width and height for each new box, allowing you to quickly code that, rather than working it out and all that..tedious work..

    W: 1024       H: 768        
    W: 632.8668   H: 474.6501   TW: 1656.8668  TH: 1242.6501 
    W: 391.1332   H: 293.3499   TW: 1024       TH: 768       
    W: 241.7336   H: 181.3002   TW: 632.8668   TH: 474.6501  
    W: 149.3996   H: 112.0497   TW: 391.1332   TH: 293.3499  
    W: 92.334     H: 69.2505    TW: 241.7336   TH: 181.3002  
    W: 57.0656    H: 42.7992    TW: 149.3996   TH: 112.0497  
    W: 35.2685    H: 26.4514    TW: 92.3341    TH: 69.2506   
    W: 21.7971    H: 16.3479    TW: 57.0656    TH: 42.7993   
    W: 13.4713    H: 10.1036    TW: 35.2684    TH: 26.4515 

Simples, simply take your new width and height (W & H) and check the values add up (TW & TH add up the current and the previous width and height), and you're set.

Enjoy.