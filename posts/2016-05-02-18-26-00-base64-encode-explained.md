---
title: base64 encode explained
slug: base64-encode-explained
date: 2016-05-02 18:26
tags: 
 - javascript
 - algorithms
 - binary
 - prototypes
 - strings
---

This is from a kata I recently completed at [codewars](http://www.codewars.com/kata/base64-encoding/javascript). I've used base64 a lot but never have I delved into it enough to understand exactly what goes on. So I took the time to explain via inline comments. I hope you enjoy reading it as much as I enjoyed writing it. [Part 2 - base64 decode explained](http://www.adamkdean.co.uk/base64-decode-explained).

    String.prototype.toBase64 = function () {  
      const base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef' +
                          'ghijklmnopqrstuvwxyz0123456789+/';
      
      let plaintext = this,
          result = '',
          padding = '';
      
      // step 1. ensure that the string is a multiple of three chars
      if (plaintext.length % 3 > 0) {
        for(let count = 0; count < 3; count++) {
          padding += '=';
          plaintext += '\0';
        }
      }
      
      // step 2. iterate over the input string, three chars at a time
      for (let i = 0; i < plaintext.length; i += 3) {
        // step 3. take three 8-bit (ASCII) chars, and store
        //         them as one single 24-bit number
        //
        // 00000000 8-bit (1 byte)
        // 00000000 00000000 00000000 24-bit (3 bytes)
        //
        // we'll bitshift the first number two bytes (16 bits)
        // we'll bitshift the second number one byte (8 bits)
        // and we'll pop the other number into the third byte
        //
        // 00000000 <------- -------- first char << 16
        //          00000000 <------- second char << 8
        //                   00000000 third char (no shift)    
        const a = plaintext.charCodeAt(i) << 16;
        const b = plaintext.charCodeAt(i + 1) << 8;
        const c = plaintext.charCodeAt(i + 2);
        const n = a + b + c;
        
        // step 4. separate this 24-bit number into four 6-bit numbers
        //
        // we'll do this by shifting to the right (with zero pad >>>)
        // and then doing a logical AND (&) to strip everything after 
        // the first (right most) six bits
        //
        // e.g.   00001111 00000101 00001010
        // to     |----||- ---||--- -||----|
        //         d     e      f      g
        //
        // >>> 18 00000000 00000000 00000011
        // & 63   00000000 00000000 00111111
        // d =    00000000 00000000 00000011
        //                            
        // >>> 12 00000000 00000000 11110000 
        // & 63   00000000 00000000 00111111
        // e =    00000000 00000000 00110000
        //
        // >>> 6  00000000 00111100 00010100 
        // & 63   00000000 00000000 00111111
        // f =    00000000 00000000 00010100
        //
        // noop   00001111 00000101 00001010
        // & 63   00000000 00000000 00111111
        // g =    00000000 00000000 00001010
        const d = (n >>> 18) & 63;
        const e = (n >>> 12) & 63;
        const f = (n >>> 6) & 63;
        const g = n & 63;
        
        // step 5. use the four 6-bit numbers as indices to pluck
        //         chars from our char array above, and add to the
        //         result string, before continuing with the loop
        //
        // this works because a 6-bit number is 0-63, and we have
        // 64 characters above. Therefore, we can pluck out chars
        result += base64chars[d];
        result += base64chars[e];
        result += base64chars[f];
        result += base64chars[g];
      }
      
      // step 6. finally, we'll remove the zero pad we added above
      //         and add the actual padding, then return this string
      return result.substring(0, result.length - padding.length) + padding;
    };
