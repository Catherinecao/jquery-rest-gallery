jQuery(document).ready(function($){

	var dataURL = "data/data.json",
		dataModel = {},
		$gallery = $('.gallery'),
		$overlay,
		$body = $('body'),
		$thumbsContainer;

	function loadData() {
		$.getJSON(dataURL, function(data){
			dataModel.images = data;
			dataModel.lastIndex = dataModel.images.length - 1;

			init();
		})
	}

	function init(){
		renderThumbsView();
		addThumbsController();
		renderOverlayView();
		addOverlayController();
	}

	function renderThumbsView(){
		// $thumbsContainer = $('<div>',{'class': 'thumbs clearfix'});
		// var images = dataModel.images,
		// 	$thumb;

		// images.forEach(function(image){

		// 	$thumb = $('<img>',{'src': image.medium, 'alt': image.caption});
		// 	$thumbsContainer.append($thumb);
		// });

		// $gallery.append($thumbsContainer);

		var thumbsHTML = Templates.thumbs(dataModel);
			$gallery.html(thumbsHTML);

		//alert(thumbHTML);
	}

	function addOverlayController(){
		$overlay.find('.close-btn').click(function(){
			removeOverlay();
		})

		$overlay.click(function(e){
			if(e.target === this){
				removeOverlay();
			}
		})
		$overlay.find('.next-btn').click(function(){
			dataModel.currentIndex = dataModel.currentIndex < dataModel.lastIndex?
			dataModel.currentIndex + 1: 0;
			loadImage();
		})
		$overlay.find('.prev-btn').click(function(){
			dataModel.currentIndex = dataModel.currentIndex > 0?
			dataModel.currentIndex - 1 : dataModel.lastIndex;
			loadImage();
		})
	}

	function addThumbsController(){
		var $thumbs = $gallery.find('img');

		$thumbs.click(function(){
			dataModel.currentIndex = $thumbs.index($(this));

			addOverlay();
			loadImage();
		})
	}

	function renderOverlayView(){
		// $overlay = $('<div>',{'class': 'overlay'});

		// var $imageContainer = $('<div>',{'class': 'image-container clearfix'}),
		// 	$figure = $('<figure>'),
		// 	$image = $('<img>'),
		// 	$figCaption = $('<figcaption>'),
		// 	$closeBtn = $('<div>',{'class': 'close-btn fa fa-close'}),
		// 	$nextBtn = $('<div>',{'class': 'next-btn fa fa-arrow-right'}),
		// 	$prevBtn = $('<div>',{'class': 'prev-btn fa fa-arrow-left'});

		// $figure.append($image, $figCaption, $closeBtn, $nextBtn, $prevBtn);
		// $imageContainer.append($figure);
		// $overlay.append($imageContainer);

		$overlay = $(Templates.overlay());
	}

	

	function loadImage(){
		var image = dataModel.images[dataModel.currentIndex];
			// $image = $(Templates.image(image));
		// $overlay.find('img')
		// .css({'opacity':0})
		// .attr({'src':image.image,'alt': image.caption})
		// .load(function(){
		// 	$(this).unbind('load').velocity('fadeIn',{duration: 300})
		// });
		// $overlay.find('figcaption').html(image.caption);
		$overlay.find('figure').html(Templates.image(image));
		$overlay.find('img').load(function(){
			$(this).velocity('fadeIn',{duration:300});
		})
	}

	function addOverlay(){
			$body.append($overlay).css({'overflow':'hidden'});
	}

	function removeOverlay(){
		$overlay.detach();
		$body.css({'overflow': 'scroll'});
	}

	loadData();
});