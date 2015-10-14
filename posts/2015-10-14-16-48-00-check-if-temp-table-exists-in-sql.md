---
title: Check if temp table exists in SQL
slug: check-if-temp-table-exists-in-sql
date: 2015-10-14 16:48
tags:
 - sql
---

I'm going to start posting some SQL snippets, either things I learn day to day or things that I've had sat around for years.

Today's is a checking if a temp table exists (and then dropping it.)

    IF OBJECT_ID('Tempdb..#tablename') IS NOT NULL
    BEGIN
        -- do something here, like say, drop that table?
        DROP TABLE #tablename;
    END
