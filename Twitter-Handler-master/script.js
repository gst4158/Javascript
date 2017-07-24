// Init twitter handler
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));

// Twitter ready function
twttr.ready(function (twttr) {
    twttr.events.bind('loaded', function (event) {
        injectCSS();
        $('.css-loader').hide();
        $('#twitter-widget-0").css('height', '2000');
        setTimeout(function(){
            $(".feed-wrapper").removeClass('hidden');
        }, 500);
    });
});

// injects custom css into feed and reveals it.
function injectCSS() {
    var $head = $("#mc #twitter-widget-0").contents().find("head");
    $head.append($("<link/>", { rel: "stylesheet", href: "/twitter-feed/css/twitter-feed.css", type: "text/css" }));
}
