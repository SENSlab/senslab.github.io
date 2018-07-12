var userAgent = window.navigator.userAgent.toLowerCase();

if(userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1){
  window.alert('This page doesn\'t support this browser (Internet Exploler).\n' +
               'Please use other browsers (Google Chrome, Safari, FireFox).\n' +
               'Thank you!');
}
