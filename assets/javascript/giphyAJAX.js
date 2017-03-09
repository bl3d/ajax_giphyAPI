(function() {
  'use strict'; 



	//main giphy/ajax functionality
	var giphy = {

		topics: ["Myth Busters", "Game of Thrones", "House of Cards", "The Walking Dead", "Breaking Bad"],

	   	init: function(){ 

	   		this.updateButtons();

	   	},

	   	runSearch: function(topic){ 
	   		var topic = $(this).attr('data-topic')
	    	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	        topic + "&api_key=dc6zaTOxFJmzC&limit=10";

	        $.ajax({
	        	url: queryURL,
	        	method: "GET"
	        })
	        .done(function(response) {
	            var results = response.data;

	            $("#gifContent_holder").empty();

	            for (var i = 0; i < results.length; i++) {
	          		// console.log(results[i]);
	            	var gifDiv = $('<div class="gifHolder">');
	            	var rating = results[i].rating;
	            	var p = $("<p>").text("Rating: " + rating);
	            	var gifImg = $("<img>");

	            	gifImg
	            	.attr('src', results[i].images.fixed_height_still.url)
	            	.attr('data-still', results[i].images.fixed_height_still.url)
	            	.attr('data-animate', results[i].images.fixed_height.url)
	            	.attr('data-state', 'still')
	            	.addClass('gif');

	            	gifDiv
	            	.append(gifImg)
	            	.append(p); 

	            	$("#gifContent_holder").append(gifDiv);	            
	            }
	        });	   			   		
	   	},

	   	toggleGif: function(){ 
	   		var thisGif = $(this); 

	   		if (thisGif.attr('data-state') === 'still') {
	   			thisGif
	   			.attr('src', thisGif.attr('data-animate'))
	   			.attr('data-state', 'animate');
	   		}else{
	   			thisGif
	   			.attr('src', thisGif.attr('data-still'))
	   			.attr('data-state', 'still');
	   		}
	   	},

	   	addButton: function(){ 
	   		giphy.topics.push($('#filter-input').val().trim());
	   		this.updateButtons();
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