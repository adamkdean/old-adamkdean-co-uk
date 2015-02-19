---title: Automatically prefix vendor description to Shopify productsslug: automatically-prefix-vendor-description-to-shopify-productsdate: 2013-04-08 16:08tags:  - liquid - shopify---I'm currently working on modifying a site that uses [Shopify](http://www.shopify.com) -- a great online e-commerce platform -- and have found that while at first the system seems a little restrictive, it is actually quite malleable once you get the hang of things. It's a bit hack n slash but with the right hacks, and a couple of slashes, it can actually work pretty well.

The following snippet loops through a list of collections a product belongs to, and if the collection if equal to the vendor of the product, it displays the vendors description.

    {% comment %} 
        This will show the vendors description above the items
    {% endcomment %}

    {% for c in product.collections %}
        {% if c.title == product.vendor %}
            {{ c.description }}
        {% endif %}
    {% endfor %}

This is great when you want a brand logo to appear above all items of that brand, without doing it manually. Another trick I used was to make a *smart collection* that assigned all items with the Vendor name to be part of the smart collection of the same name.

An example would be a product whose vendor was `Blackrock`. A smart collection with the name `Blackrock` would contain all items with the vendor `Blackrock`, and the description of that smart collection could then also contain a brand image in the description. Adding the above code to the `product.liquid` page could get an automatic brand image above the product description, like so:

![Example](http://i.imgur.com/96Iiz7c.png)

Easy, and effective.