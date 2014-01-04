var _event = [];	       	 

$(document).ready(function() {
	
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		var dummy = 
			 {
				title: 'Dummy',
				start: new Date(y, m, 10)
		       	 };       	 
		var dummy_2 = 
			 {
				title: 'Dummy_2',
				start: new Date(y, m, 9)
		       	 };
		
		_event.push(dummy);
		addEvent(dummy_2);
		
		// page is now ready, initialize the calendar...

		$('#calendar').fullCalendar({
		
		// put your options and callbacks here
		
		header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			
		firstDay: 1,
		
		weekMode: 'variable',
		
		aspectRatio: 2,
		
		events: _event	
		
		});
		
		
		
});

function addEvent(ev) {
		
	_event.push(ev);
	
};
