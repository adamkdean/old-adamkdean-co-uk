---

So I turned to YQL the only other source really, without scraping html.. and have strangely found that Yahoo's stock data table has disappeared. `"No definition found for Table yahoo.finance.quotes"`. A few other people have also found this so after less than 30 seconds of digging, I found an answer:

Add `&env=http://datatables.org/alltables.env` to your query.

For example:
http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quotes where symbol in ("YHOO","AAPL","GOOG","MSFT")&env=http://datatables.org/alltables.env

There you go. Enjoy.