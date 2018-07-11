/** START loads the header, please insert in every file **/
$("header").load("header.html", function()
{
  var linkToMe = $('a[href="'+window.location.href.split('/').pop()+'"]').children();
  linkToMe.addClass('nav-active')
});
$( "a.submenu" ).on('click', function()
{
	$( ".menuBar" ).slideToggle( "normal", function()
	{
// Animation complete.
	});
});
$( "ul li.dropdown a" ).on('click', function()
{
$( "ul li.dropdown ul" ).slideToggle( "normal", function()
	{
// Animation complete.
	});
	$('ul li.dropdown').toggleClass('current');
});
