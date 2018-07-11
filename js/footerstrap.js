/** START loads the footer, please insert in every file **/
$("footer").load("footer.html", function()
{
  var linkToMe = $('a[href="'+window.location.href.split('/').pop()+'"]').parent();
  linkToMe.addClass('active')
});
