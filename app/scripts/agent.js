var getAgent = function() {

  var agent = navigator.userAgent.toLowerCase(),
    obj = {
      viewport:
      {
        is:
        {
          ie10    : !!(agent.match(/msie 10.0/)),
          ie9     : !!(agent.match(/msie 9.0/)),
          ie8     : !!(agent.match(/msie 8.0/)),
          ie7     : !!(agent.match(/msie 7.0/)),
          ie6     : !!(agent.match(/msie 6.0/)),
          opera     : !!(agent.match(/opera/)),
          chrome  : !!(agent.match(/chrome/)),
          safari  : !!(agent.match(/safari/)),
          firefox : !!(agent.match(/firefox/)),
          android	: !!(agent.match(/android/)),
          iOS		: !!(agent.match(/iphone/) || agent.match(/ipod/))
        }
      }
    };

  for (var key in obj.viewport) {
    var o = obj.viewport[key];
    for (var prop in o) {
      if(o[prop])
        agent = prop;
    };
  };

  return agent;
};