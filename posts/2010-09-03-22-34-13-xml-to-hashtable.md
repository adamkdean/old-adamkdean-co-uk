---title: XML to Hashtableslug: xml-to-hashtabledate: 2010-09-03 22:34tags: - xml - hashtable - csharp---XML is often used nowadays for many things, mainly due to it being so flexible, lightweight and easy to understand for humans. From configuration files to layouts, they all seem to be using it. With all the methods inside System.Xml you have everything you could ever need, unless of course you are, like me, addicted to generic lists and hashtables...

I don't like going through nodes, and well I don't really like children so seeing ChildNode in my code makes me cry inside. Today I present you with a way to convert those bothersome XmlNodes into something we can all understand, a hashtable. Or well, a hashtable of hashtables, with a few generic lists thrown in for good measure.

Let us look at the following XML, it's nice and simple.

You can find the XML file here: http://www.w3schools.com/XML/note.xml

    <note>
        <to>Tove</to>
        <from>Jani</from>
        <heading>Reminder</heading>
        <body>Don't forget me this weekend!</body>
    </note>

We can easily access this using my XML to Hashtable parser method `ParseNode`:

    string xmlFilePath = @"http://www.w3schools.com/XML/note.xml";

    XmlDocument doc = new XmlDocument();
    doc.Load(xmlFilePath);
    XmlNode main = doc.DocumentElement;
    Hashtable note = ParseNode(main);

    string to = note["to"].ToString();
    string from = note["from"].ToString();
    string heading = note["heading"].ToString();
    string body = note["body"].ToString();

But what if there are multiple notes? What if there are a number of tags that are the same? Already ahead of you there, Sherlock, just look at how easy it is.

The XML we will be using is which follows this simple layout: http://www.w3schools.com/XML/simple.xml

    <breakfast_menu>
        <food>
            <name>Belgian Waffles</name>
            <price>$5.95</price>
            <description>two of our famous Belgian Waffles with plenty of real maple syrup</description>
            <calories>650</calories>
        </food>
        <food>
            <name>Strawberry Belgian Waffles</name>
            <price>$7.95</price>
            <description>light Belgian waffles covered with strawberries and whipped cream</description>
            <calories>900</calories>
        </food>
    </breakfast_menu>

As you can see, we simply choose the node we require (food), cast it to a List<Hashtable> and then iterate through each piece of food.

    string xmlFilePath = @"http://www.w3schools.com/XML/simple.xml";

    XmlDocument doc = new XmlDocument();
    doc.Load(xmlFilePath);
    XmlNode docNode = doc.DocumentElement;
    Hashtable menu = ParseNode(docNode);

    foreach (Hashtable food in (List<hashtable>)menu["food"])
    {
        Console.WriteLine("Name: {0}", food["name"]);
        Console.WriteLine("Price: {0}", food["price"]);
        Console.WriteLine("Description: {0}", food["description"]);
        Console.WriteLine("Calories: {0}", food["calories"]);
        Console.WriteLine("");
    }

    Console.ReadKey();

To which we will get the output:

    Name: Belgian Waffles
    Price: $5.95
    Description: two of our famous Belgian Waffles with plenty of real maple syrup
    Calories: 650

    Name: Strawberry Belgian Waffles
    Price: $7.95
    Description: light Belgian waffles covered with strawberries and whipped cream
    Calories: 900

    Name: Berry-Berry Belgian Waffles
    Price: $8.95
    Description: light Belgian waffles covered with an assortment of fresh berries and whipped cream
    Calories: 900

    and so on..

So, without further ado, the part you're all dying to copy and paste (I hope!), the method:

    public static Hashtable ParseNode(XmlNode node)
    {
        Hashtable ht = new Hashtable();
        // loop through all nodes within the node
        foreach (XmlNode n in node.ChildNodes)
        {
            string name = n.Name;
            object value = null;

            // if it has nodes within this node, and more than just one, then parse them
            if (n.HasChildNodes)
            {
                /* "In order to understand recursion, one must first understand recursion." */
                if (n.ChildNodes.Count > 1) value = (object)ParseNode(n);
                else
                {
                    // if theres only one, it may be the value, so take the value
                    if (n.ChildNodes[0].NodeType == XmlNodeType.Text)
                        value = (object)n.ChildNodes[0].Value;
                    else value = (object)ParseNode(n);
                }
            }
            else value = (object)n.Value;

            // as hashtables can't have a key the same, and xml can have two nodes of the same name
            // we have to put the hashtables into a list if there are more than one of the same node
            // example: <test></test> -> ht["test"] = Hashtable
            // but: <test></test><test></test> -> ht["test"] = List<hashtable>
            if (ht.ContainsKey(name))
            {
                // list exists, add to it
                if (ht[name] is List<hashtable>)
                {
                    List<hashtable> list = (List<hashtable>)ht[name];
                    list.Add((Hashtable)value);
                    ht[name] = list;
                }
                // list doesn't exist, so create it
                else if (ht[name] is Hashtable)
                {
                    List<hashtable> list = new List<hashtable>();
                    Hashtable htTmp = (Hashtable)ht[name];
                    list.Add(htTmp);
                    list.Add((Hashtable)value);
                    ht[name] = list;
                }
            }
            else ht.Add(name, value);
        }
        return ht; // and return it
    }

And there you have it, one of my favourite methods. I hope it helps you as much as it helps me, it is my preferred method of reading Xml files. Maybe one day I will write a Hashtable to XML writer. One day.
