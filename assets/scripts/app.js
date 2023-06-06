$.getJSON("assets/data/aws.json", function(data){
	aws = data.aws.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);});
	$('#results').text(aws.length);
	var currIndex = '',
			fontIndex = '',
			addIndex = '';
	$('#items').empty();
	for ( i = 0 ; i < aws.length ; i++){
		fontIndex = aws[i].name.charAt(0);
		if (currIndex !== fontIndex){
			currIndex = fontIndex;
			addIndex = currIndex;
			if(isNaN(addIndex)){
				addNav(addIndex);
			};
		} else {
			addIndex = '';
		}
		addFont(aws[i], addIndex);
	};
});

function addNav(letter){
	var letterID = letter === 'a'?'items':letter;
	var $li = $('<li>').append(
			$('<a>').addClass('page-scroll')
				.attr('href', '#' + letterID)
				.text(letter)
		);
	$('#letters').append($li);
};

function addFont(font, index){
	var name = font.name;
	var fontClass = font.class;
	var classTxt = `fa fa-4x ${fontClass} text-primary`;
	var $div = $('<div>').addClass('f-item-box').attr({'data-font': name, 'data-class': fontClass});
	if (index){
		$div.attr('id', index);
	};
	$div.append($('<span>').addClass(classTxt));
	$div.append($('<h3>').text(fontClass));
	$div.append($('<h4>').text(name));
	$('#items').append($div);
};

$(function(){
	$('nav a[href^="#"]').on('click', function(event) {
		var target = $( $(this).attr('href') );
		if( target.length ) {
			event.preventDefault();
			$('html, body').animate({scrollTop: target.offset().top - 50}, 1000);
		}
	});

	$('#search').on('keyup', function(){
		if($('#search').val().length > 0){
			$('#items div').addClass('hide').removeClass('result');
			$('div[data-font*=' + $('#search').val() + '], div[data-class*=' + $('#search').val() + ']').addClass('result').removeClass('hide');
			$('#results').html($('.result').length);
		}else{
			$('#items div').removeClass('hide').addClass('result');
			$('#results').html($('.result').length);
		}
	});

});
