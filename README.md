# kopopup
Popup window for images, iframes or html.

How to use:

```javascript
$(document).ready(function() {
    $('.item-to-popup').koPopup({
        type: "image",
        gallery: true
    });
});
```

```html
<div class="item-to-popup" img-url="/url/of/image/to/show.jpg"></div>
<div class="item-to-popup" img-url="/url/of/image/to/show.jpg"></div>
<div class="item-to-popup" img-url="/url/of/image/to/show.jpg"></div>
```
