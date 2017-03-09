(function() {
  'use strict'; 



	//main giphy/ajax functionality
	var giphy = {

		//generate initial list of buttons for user
		topics: ["Myth Busters", "Game of Thrones", "House of Cards", "The Walking Dead", "Breaking Bad", "Beavis and Butthead"],

	   	init: function(){ 

	   		//set buttons up on first load from array above
	   		this.updateButtons();

	   	},

	   	runSearch: function(topic){ 
	   		//grab topic from btutton to us in search query below
	   		var topic = $(this).attr('data-topic');
	    	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	        topic + "&api_key=dc6zaTOxFJmzC&limit=10"; //limit to 10

	        $.ajax({
	        	url: queryURL,
	        	method: "GET"
	        })
	        .done(function(response) {
	            var results = response.data;

	            //empty on each load as opposed to allowing them to stack up
	            $("#gifContent_holder").html('<h3>( Click on an image to see it animate. )</h3>');

	            for (var i = 0; i < results.length; i++) {
	          		// console.log(results[i]);
	            	var gifDiv = $('<li class="gifHolder">');
	            	var rating = results[i].rating;
	            	var p = $("<p>").text("Rating: " + rating);
	            	var gifImg = $("<img>");

	            	gifImg
	            	.attr('src', results[i].images.fixed_width_still.url)
	            	.attr('data-still', results[i].images.fixed_width_still.url)
	            	.attr('data-animate', results[i].images.fixed_width.url)
	            	.attr('data-state', 'still')
	            	.addClass('gif');

	            	gifDiv
	            	.append(gifImg)
	            	.append(p); 

	            	$("#gifContent_holder").append(gifDiv);

	            	if (i === 0) {

	            	};	            
	            }

	            //set background image to first gif result for selected TV show
	            $('#bgGifImg').stop().animate({opacity: 0.0}, 350, function(){
	            	$(this)
	            	.css({background: 'url("'+results[0].images.original_still.url+'") no-repeat center center fixed'})
	            	.animate({opacity: 1.0}, 850);
	            });	            
	        });	   			   		
	   	},

	   	toggleGif: function(){ 
	   		var thisGif = $(this); 

	   		if (thisGif.attr('data-state') === 'still') {
	   			//if gif is currently still, switch it to play
	   			thisGif	   			
	   			.attr('src', thisGif.attr('data-animate'))
	   			.attr('data-state', 'animate')
	   			.parent().addClass('active');
	   		}else{
	   			//else it is already animating, switch back to still
	   			thisGif	   			
	   			.attr('src', thisGif.attr('data-still'))
	   			.attr('data-state', 'still')
	   			.parent().removeClass('active');
	   		}
	   	},

	   	addButton: function(){ 
	   		var newShow = $('#filter-input').val().trim();
	   		if (newShow) {
		   		giphy.topics.push(newShow);
		   		this.updateButtons();
		   		$('#filter-input').val(''); //set value to blank for input	   			
	   		}; 
	   	},

	   	updateButtons: function(){
			$("#btn_holder").empty();

	        for (var i = 0; i < this.topics.length; i++) {

				var btn = $("<button>");
				btn
				.attr("data-topic", this.topics[i])
				.text(this.topics[i]);

	            $("#btn_holder").append(btn);
	        }			

	   	}

	};


	// kick off giphy 
	giphy.init();  





	//user events
	//**************************************************//
 	$(document).on("click", "button", giphy.runSearch);

 	$(document).on("click", ".gif", giphy.toggleGif);

 	$(document).on("click", "#add-filter", function(e){
 		e.preventDefault();
 		giphy.addButton();
 	});



}()); 