---title: Fixed String.Format in C (GNU-C99)slug: fixed-string-format-in-c-gnu-c99date: 2011-01-12 22:00tags:  - c---I have fixed my strrep string replace function, for now, as there was a bug with using atoi.

I have also realised I was calling it string.replace - my bad - it's actually string.format I was thinking of, but more of a var for var replacement without the formatting!

I have now finished writing the C# String.Replace replication in C (GNU-C99) and it works great. The following code will allow you to substitute strings (char *s) in a format string like in C#. For example you can input "this {0} a test, {0} it {1}?" along with "is" and "working" to get "this is a test, is it working?".

Update: fixed and now leak free.

    /*
     * File:   strrep.c
     * Author: Adam K Dean
     * Description: string replacement (replication of string.replace for C)
     *
     * Created on 11 January 2011, 10:01
     * Fixed on 12 January 2011, 12:44
     */
     
    char *strrep(char *format, int argc, char *arg, ...);
    void itoa(int value, char *str, int base);
    void strreverse(char *begin, char *end);
     
    int main()
    {
        char *ret = strrep("this {0} a test, {0} it {1}?", 2, "is", "working");
        printf("%s\n", ret);
     
        return 0;
    }
     
    /* char *strrep(char *format, int argc, char *arg, ...)
     * String.Replace replication
     * Author: Adam K Dean
     */
    char *strrep(char *format, int argc, char *arg, ...)
    {
        char *tmp_left, *tmp_right;
        char start, end, param;
        int l_len, r_len, f_sz;
     
        va_list marker;
        va_start(marker, *arg);
     
        for(int i = 0; i < argc; i++)
        {
            printf("arg: %s\n", arg);
             
            for(int c = 1; c < strlen(format) - 1; c++)
            {
                start = format[c-1];
                param = format[c];
                end = format[c+1];
     
                char *ialpha = (char *)malloc((int_strlen(i) + 1) * sizeof(ialpha));
                itoa(i, ialpha, 10);
     
                if (start == '{' && end == '}' && isdigit(param) && param == ialpha[0])
                {
                    l_len = c - 1;
                    r_len = (strlen(format) - 3) - l_len;
     
                    tmp_left = (char *)calloc(l_len + 1, sizeof(char));
                    tmp_right = (char *)calloc(r_len + 1, sizeof(char));
     
                    strncpy(tmp_left, format, l_len);
                    strncpy(tmp_right, &format[c + 2], r_len);                
     
                    f_sz = l_len + r_len + strlen(arg);
     
                    format = (char *)calloc(f_sz + 1, sizeof(char));
     
                    strcpy(format, tmp_left);
                    strcpy(&format[l_len], arg);
                    strcpy(&format[l_len + strlen(arg)], tmp_right);
     
                    free(tmp_left);
                    free(tmp_right);
                }
     
                free(ialpha);
            }
     
            arg = va_arg(marker, char *);
        }
     
        va_end(marker);
        return format;
    }
     
    /* int_strlen(int val)
     * String length of an int
     * Author: Adam K Dean
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
     
    void strreverse(char *begin, char *end)
    {
        char aux;
        while(end > begin)
            aux = *end, *end-- = *begin, *begin++ = aux;
    }
     
    void itoa(int value, char *str, int base)
    {
        static char num[] = "0123456789abcdefghijklmnopqrstuvwxyz";
     
        char* wstr=str;
        int sign;
     
        if (base<2 || base>35){ *wstr='\0'; return; }
     
        if ((sign=value) < 0) value = -value;
     
        do *wstr++ = num[value % base]; while(value /= base);
     
        if(sign < 0) *wstr++ = '-';
        *wstr = '\0';
     
        strreverse(str, wstr - 1);
    }