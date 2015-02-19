---title: Uri to Hostname in C (GNU-C99)slug: uri-to-hostname-in-c-gnu-c99date: 2011-01-13 22:01tags:  - c---Another C function which works quite well and has no bugs that I know of yet...

Updated: fixed this now, leak free!

    /*
     * File:   utohn.c
     * Author: Adam K Dean
     * Description: gets a hostname from an uri
     *
     * Created on 11 January 2011, 22:12
     */
     
    /* int utohn(char *uri, char *hostname)
     * Uri to Hostname
     * Author: Adam K Dean
     */
    char *utohn(char *uri)
    {
        char *pch, *hostname;
        if ((pch = strstr(uri, "://")) != NULL)
        {
            pch += 3;
            int i = 0;
            while(pch[i] != '/' && pch[i] != ':' && pch[i] != '\0') i++;
            hostname = (char *)calloc(i + 1, sizeof(char));
            return strncpy(hostname, pch, i);
        }
        else return NULL;
    }

and usage code:

    int main(int argc, char** argv)
    {
        char hn1[] = "http://www.gentoo.org/";
        char hn2[] = "http://www.gentoo.org/docs/";
        char hn3[] = "http://www.gentoo.org:80/";
        char hn4[] = "127.0.0.1";
     
        printf("%s -> %s\n", hn1, utohn(hn1));
        printf("%s -> %s\n", hn2, utohn(hn2));
        printf("%s -> %s\n", hn3, utohn(hn3));
        printf("%s -> %s\n", hn4, utohn(hn4));
         
        return (EXIT_SUCCESS);
    }

and results:

`http://www.gentoo.org/ -> www.gentoo.org  
http://www.gentoo.org/docs/ -> www.gentoo.org  
http://www.gentoo.org:80/ -> www.gentoo.org  
127.0.0.1 -> (null)`

P.S, I have no affiliation with gentoo, and actually use centos.. I just like how easy it is to type gentoo..very nice!

Enjoy