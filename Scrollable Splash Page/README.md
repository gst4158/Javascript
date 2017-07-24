# scrollable-splashpage

[![License](http://img.shields.io/badge/License-MIT-blue.svg)](http://opensource.org/licenses/MIT)

### Scrollable splash page with the ability to re-activate if the user scrolls to the top of page and continues to scroll up again

***
### [→ Example File ←](http://jsfiddle.net/teejudp3/7/)
***

Detailed Explaination
------------
* Create a CSS element.

* When the user scrolls DOWN the element will be given a class called removed

* If the user scrolls back to the top, they will automatically be sent down 1px from the top ( $(window).scrollTop(1); )

* If the user attempts to scroll up again, they will reactivate the fixed element
