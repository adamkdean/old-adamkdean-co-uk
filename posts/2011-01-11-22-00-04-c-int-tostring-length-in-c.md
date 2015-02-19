---title: C# Int.ToString().Length in Cslug: c-int-tostring-length-in-cdate: 2011-01-11 22:00tags:  - c---Another little helper function here, it counts how long the int would be if it was a string, just the same as doing Int.ToString().Length in C#.

    /*
     * File:   int_strlen.c
     * Author: Adam K Dean
     * Description: get length of an int as if it was a string
     *
     * Created on 11 January 2011, 13:01
     */
     
    int int_strlen(int val)
    {
        int v = val / 10;
        int i = 1, count = 1;
         
        while(v > i - 1)
        {
            i *= 10;
            count ++;
        }
         
        return count;
    }