	// ********************
	// Project Section
	// ********************
	// Search inside tag 'search-included'
	var container = document.querySelector('[data-project-toggle="search-included"]');
	
	var btnAll = document.querySelector('[data-project-toggle="input-all"]');
	var btnThemePerception = document.querySelector('[data-project-toggle="input-theme-perception"]');
	var btnThemeVRAR = document.querySelector('[data-project-toggle="input-theme-vr-ar"]');
	var btnThemeFabrication = document.querySelector('[data-project-toggle="input-theme-fabrication"]');

    var mixer = mixitup(container, 
	{
		animation: 
		{
			duration: 350
		},
		
		controls: 
		{
			toggleLogic: 'and'
        }		
	});

	// Set up a handler to listen for "click" events from the search input
	btnAll.addEventListener('click', function() 
	{
		mixer.filter('all');
	});
	
	btnThemePerception.addEventListener('click', function() 
	{
		mixer.filter('[class*=perception]');
	});
	
	btnThemeVRAR.addEventListener('click', function() 
	{
		mixer.filter('[class*=vr-ar]');
	});
	
	btnThemeFabrication.addEventListener('click', function() 
	{
		mixer.filter('[class*=fabrication]');
	});

	function filterByString(searchValue) 
	{
		if (searchValue) 
		{
			// Use an attribute wildcard selector to check for matches
			mixer.filter('[class*="' + searchValue + '"]');
		} 
		else 
		{
			// If no searchValue, treat as filter('all')
			mixer.filter('all');
		}
	}