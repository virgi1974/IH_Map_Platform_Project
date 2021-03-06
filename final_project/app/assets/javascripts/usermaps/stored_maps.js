window.onload = function() {

//------------------ show the stored maps ---------------------
 
  $('.maps-gallery').empty();
  $userContainer = $('.show-stored-maps');
  var userId = $userContainer.attr('id');
  var request = $.get('/users/' + userId + '/mymaps');

  request.fail(function () {
    alert('Couldn’t get you maps from the DBcccccc')
  });

  request.done(function (response) {
    myMaps(response);
  });

 function myMaps(maps){
      for (var i = 0; i < maps.length; i++) {
       
        var htmlParts = [
            '<article class="col-md-3 each-my-map">',
              '<div id="container-thumbnails_' + i + '"' + 'class="my-maps"></div>',
              '<div>',
                '<p class="description">' + maps[i].description + '</p>',
                '<a id ="' + maps[i].id + '" href="#" class="btn btn-success btn-block map-detail">select</a>',
              '</div>',
            '</article>'   
        ];
        $('.maps-gallery').append(htmlParts.join('\n'));

        var my_stored_map = new Map();
        my_stored_map.table_name = maps[i].table;
        my_stored_map.city = maps[i].city;
        my_stored_map.state = maps[i].state;
        my_stored_map.date1 = maps[i].date1;
        my_stored_map.date2 = maps[i].date2;

        my_stored_map.getCartoDbUser();
        my_stored_map.getCity();
        my_stored_map.getState(); 
        my_stored_map.getDatesFromDb(); 
          
        my_stored_map.getCartodb('container-thumbnails_' + i);
      }
    };//myMaps

//show selected map below - preview

  $(document).on('click','.map-detail',function(event){

    $('#selected-map').empty();

    var currentDOMElement = $(event.currentTarget);
    var mapId = $(event.currentTarget).attr("id");

    var request = $.get('/maps/' + mapId);

    request.fail(function () {
      alert('Couldn’t get your map from the DB');
    });

    request.done(function (response) {
      selectedMap(response);
    })

    function selectedMap(map){

        var my_stored_map = new Map();

        setDataFromDb(map,my_stored_map);

        my_stored_map.getCartodb('selected-map');

    };//selectedMap

});

}; // windows-onload