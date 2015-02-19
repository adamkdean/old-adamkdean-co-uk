---title: Excel SUM/COUNT based on background colourslug: excel-sum-count-based-on-background-colourdate: 2013-07-24 11:27tags:  - excel - vba---Today I have had to use VB. It's been seven or eight years since I last touched it, and today it's only to briefly complete a solution in Excel. I miss my curly braces. 

I've been asked how to calculate a `SUM()` based on cell background colour, and it looks like there isn't anything built in for this. My [StackOverflow question](http://stackoverflow.com/questions/17829816/how-can-i-find-sum-of-highlighted-cells) didn't exactly bring any great ideas, so it looks like a VBA script was my only option.

![Example](http://i.stack.imgur.com/Ii27n.png)

The following snippet -- inserted by pressing Alt + F11, then going to Insert and Module -- will `SUM()` based on the background colour of the cell passed in the first argument, the second argument being the range:

    Function SUMCLR(rColor As Range, rRange As Range)
        Dim rCell As Range
        Dim lCol As Long
        Dim vResult
        lCol = rColor.Interior.ColorIndex
        For Each rCell In rRange
            If rCell.Interior.ColorIndex = lCol Then
                vResult = WorksheetFunction.SUM(rCell, vResult)
            End If
        Next rCell
        SUMCLR = vResult
    End Function

This next snippet performs a count, rather than a sum operation:

    Function COUNTCLR(rColor As Range, rRange As Range)
        Dim rCell As Range
        Dim lCol As Long
        Dim vResult
        lCol = rColor.Interior.ColorIndex
        For Each rCell In rRange
            If rCell.Interior.ColorIndex = lCol Then
                vResult = 1 + vResult
            End If
        Next rCell
        COUNTCLR = vResult
    End Function

And then in the cells, just use the formula for example `=SUMCLR(A1, B1:B10)` and `=COUNTCLR(A1, B1:B10)`.