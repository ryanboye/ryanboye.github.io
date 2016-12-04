// $(document).ready(function(){
// 	var skill = $('.skill'),
// 			skills = ['innovation', 'design', 'research', 'ambition'],
// 			i = 0;

// 	function rotateSkill(){
// 		i = i + 1;
// 		if (i > skills.length) i = 0;

// 		toggleSkill(i);
// 	}

// 	function toggleSkill(i){
// 		clearClasses();
// 		skill.addClass('slide-out');

// 		setTimeout(function(){
// 			clearClasses();
// 			skill.addClass('slide-in');
// 			skill.html(skills[i]);
// 		}, 300);
// 	}

// 	function clearClasses(){
// 		skill.removeClass('slide-in slide-out');
// 	}

// 	setInterval(rotateSkill, 8000);
// });






$(document).ready(function(){
	var dribbble_url = 'dribbble_query.php';

	$.getJSON( dribbble_url, function( data ){
		var item;
		console.log(data)
		$.each( data.shots, function( key, val ) {
			item = '<div class="col-sm-6 col-lg-2"><a href="' + val.url + '" target="_blank"><img src="' + val.image_url + '"></a></div>';
			$('#showcase').append(item);
			return key<5;
		});
	});

	var behance_url = 'behance_query.php';

	$.getJSON( behance_url, function( data ){
		var item;
		$.each( data.projects, function( key, val ) {
			item = '<div class="col-sm-6 col-lg-3"><a href="' + val.url + '" target="_blank"><img src="' + val.covers[202] + '"></a></div>';
			$('#behance_div').append(item);
		});
	});

	$(function() {
		$('#worklink').bind('click',function(event){
			var $anchor = $(this);

			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, "slow");
	      /*
	      if you don't want to use the easing effects:
	      $('html, body').stop().animate({
	          scrollTop: $($anchor.attr('href')).offset().top
	      }, 1000);
			*/
			event.preventDefault();
		});
	});
});