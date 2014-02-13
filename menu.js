(function($) {
	$(document).ready(function() {
		/* Mobile Site navigation */
		$('.navigation li:has(ul) > a').append('<i class="icon-chevron-down"></i>');

		/* Left Menu Navigation */
		$('.left-menu li:has(ul)').prepend('<a href="#" class="toggle logo">toggle this section</a>');
		$('.left-menu li.selected > a.toggle, ' +
				'.left-menu li.ancestor > a.toggle').addClass('open');
		$('.left-menu a.toggle').click(function(event) {
			event.preventDefault();
			$(this).toggleClass('open');
			$(this).siblings('ul').slideToggle('slow');
		});

		/* Events Navbar Dropdown */		
		var m_names = new Array("Jan", "Feb", "Mar", 
				"Apr", "May", "Jun", "Jul", 
				"Aug", "Sep", "Oct",
				 "Nov", "Dec");
		
		var listEvents = function(json) {
			$.each(json, function(index, value) {
				var d = new Date(value.start_date);
				var day = d.getDate();
				var month = d.getMonth();
				$('<li><a href="http://calendar.tamu.edu/?&eventdatetime_id=' + 
					value.event_id + '"><div class="event-icon">' +									
					'<span class="event-month">' +m_names[month] +
					'</span>' + '<span class="event-day">' + day + '</span>' +
					'</div><span class="event-title">' + value.title + 
					'</span></a></li>')
				 	.appendTo('#events-dropdown ul.dropdown-menu');
			});
		};
		$('#events-dropdown').click(function(){
			var $this = $(this),
				$loaded = $this.data('events-loaded');
			console.log($this)	
			if (!$loaded) {
				$this.data('events-loaded', 'true');
				$('.events-loading')
					.ajaxStart(function() {
	        			$(this).show();
	    			})
	    			.ajaxStop(function() {
	        			$(this).hide();
	        			$('#events-dropdown ul.dropdown-menu')
	        				.append('<li><a class="more-events"' +
							'href="' + CALENDAR_URL + '">More Events</a></li>');
	   				});
	   			$('#events-dropdown ul.dropdown-menu')
	   				.ajaxError(function(event, request) {
	        			$(this).append('<li>Error Loading Events</li>');
	    			});

				$('#events-dropdown ul.dropdown-menu').append( function() {
					$.ajax({
						url: CALENDAR_URL,
						type: 'GET',
						dataType: 'json',
						cache: true,
						success: function(json) {
							listEvents(json);
						}
					});
				});
			};
		});
	});
})(jQuery);