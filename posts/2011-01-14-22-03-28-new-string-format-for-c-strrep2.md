---title: New String.Format for C - strrep2slug: new-string-format-for-c-strrep2date: 2011-01-14 22:03tags:  - c---Following on from the problems I had with my previous string.format C function, I decided to rewrite it today under heavy valgrind observation.

So I re-wrote it and now get the all clear from valgrind:

`==25693== HEAP SUMMARY:  
==25693==     in use at exit: 0 bytes in 0 blocks  
==25693==   total heap usage: 43 allocs, 43 frees, 161 bytes allocated  
==25693==  
==25693== All heap blocks were freed -- no leaks are possible`

    /*
     * File:   strrep2.c
     * Author: Adam K Dean
     * Description: string replacement (replication of string.replace for C)
     *
     * Original created on 11 January 2011, 10:01
     * This version (2) created on 14 January 2011, 9:36
     */
     
    // usage
    int main()
    {
        char str[] = "ab{0}def{1}hi{2}";
        char *rep = strrep2(str, 3, "c", "g", "j");
     
        printf("%s\n", rep);
     
        free(rep);
         
        return (EXIT_SUCCESS);
    }
     
    char *strrep2(char *format, int argc, char *argv, ...)
    {
        char *args[argc];
        char *tmp_left, *tmp_right, *arg, *fstr;
        char *start, *end, *param;
        int l_len, r_len, f_sz, argn;
         
        va_list marker;
        va_start(marker, *argv);
        for(int i = 0; i < argc; i++)
        {
            args[i] = (char *)calloc(strlen(argv) + 1, sizeof(char));
            strcpy(args[i], argv);
            argv = va_arg(marker, char *);
        }
        va_end(marker);
     
        fstr = (char *)calloc(strlen(format) + 1, sizeof(char));
        strcpy(fstr, format);
     
        for(int c = 1; c < strlen(fstr) - 1; c++)
        {
            start = (char *)calloc(2, sizeof(char));
            param = (char *)calloc(2, sizeof(char));
            end = (char *)calloc(2, sizeof(char));
            strncpy(start, &fstr[c-1], 1);
            strncpy(param, &fstr[c], 1);
            strncpy(end, &fstr[c+1], 1);
     
            if (start[0] == '{' && end[0] == '}' && isdigit(param[0]))
            {
                argn = atoi(&param[0]);
                if (argn < 0 || argn >= argc) continue;
     
                arg = args[argn];
     
                l_len = c - 1;
                r_len = (strlen(fstr) - 3) - l_len;
     
                tmp_left = (char *)calloc(l_len + 1, sizeof(char));
                tmp_right = (char *)calloc(r_len + 1, sizeof(char));
     
                strncpy(tmp_left, fstr, l_len);
                strncpy(tmp_right, &fstr[c + 2], r_len);
     
                f_sz = l_len + r_len + strlen(arg);
     
                fstr = (char *)realloc(fstr, (f_sz + 1) * sizeof(char));
     
                strcpy(fstr, tmp_left);
                strcpy(&fstr[l_len], arg);
                strcpy(&fstr[l_len + strlen(arg)], tmp_right);
     
                free(tmp_left);
                free(tmp_right);
            }
     
            free(start);
            free(param);
            free(end);
        }
     
        // free args
        for(int i = 0; i < argc; i++) free(args[i]);
     
        return fstr;
    }