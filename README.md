# kopopup
Very simple popup plugin that supports images, HTML, and iframes.
- Auto-sizing
- Auto-centers in window
- Responsive

###Options

```javascript
    type: "image"|"iframe"|"html"
    gallery: true|false
    onOpen: function(el)   //callback function after the popup is opened (el = element opened)
    onClose: function(el)  //callback function after the popup is closed (el = element closed)
    onChange: function(el) //callback function when the popup is changed (next/prev) (el = element changed to)
```

###Images

```javascript
$(document).ready(function() {
    $('.item-to-popup').kopopup({
        type: "image",
        gallery: true
    });
});
```

Add the image url to a 'data-url' attribute on the element.
```html
<div class="item-to-popup" data-url="/url/of/image/to/show.jpg">Image1</div>
<div class="item-to-popup" data-url="/url/of/image/to/show.jpg">Image2</div>
<div class="item-to-popup" data-url="/url/of/image/to/show.jpg">Image3</div>
```

You can also add description HTML to each image if needed. Just wrap the HTML in a container with class 'ko-popup-content'
```html
<div class="item-to-popup" data-url="/url/of/image/to/show.jpg">
    Click here
    <div class="ko-popup-content">Description here.</div>
</div>
```

### HTML Content
```html
<div class="item-to-popup">
    Click here
    <div class="ko-popup-content">
        HTML to use in the popup goes here.
    </div>
</div>
```

### Iframes

```javascript
$(document).ready(function() {
    $('.item-to-popup').kopopup({
        type: "iframe",
        gallery: false
    });
});
```

Add the iframe URL to a 'data-url' attribute on the element.
```html
<div class="item-to-popup" data-url="/url1/to/load/in/iframe/popup">Click here</div>
<div class="item-to-popup" data-url="/url2/to/load/in/iframe/popup">Click here</div>
<div class="item-to-popup" data-url="/url3/to/load/in/iframe/popup">Click here</div>
```

####See the examples.html file for examples!
