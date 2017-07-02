/*
$('#login').on('click', '#login', function (e) {
e.preventDefault();
alert('fail');
$.ajax({
        method: "POST",
        url: "login",
        data: $(this).serialize(),
        async: true,
         headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        }).done(function( msg ) {
        if(msg.error == 0){
            //$('.sucess-status-update').html(msg.message);
            alert(msg.message);
            alert('success');
        }else{
            alert(msg.message);
            alert('fail');
            //$('.error-favourite-message').html(msg.message);
        }
    });
});

$('body').on('click', '#logout', function (e) {
e.preventDefault();
if (confirm('Are you sure you want to logout?')) {
    var id = $(this).attr('id');
    $.ajax({
        method: "POST",
        url: "logout",
         headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        }).done(function( msg ) {
        if(msg.error == 0){
            //$('.sucess-status-update').html(msg.message);
            alert(msg.message);
        }else{
            alert(msg.message);
            //$('.error-favourite-message').html(msg.message);
        }
    });
} else {
    return false;
}
});

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
*/
// $('#addcategory').on('click', '#addcategory', function (e) {
// e.preventDefault();
// alert('fail');
// $.ajax({
//         method: "POST",
//         url: "login",
//         data: $(this).serialize(),
//         async: true,
//          headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
//         }).done(function( msg ) {
//         if(msg.error == 0){
//             //$('.sucess-status-update').html(msg.message);
//             alert(msg.message);
//             alert('success');
//         }else{
//             alert(msg.message);
//             alert('fail');
//             //$('.error-favourite-message').html(msg.message);
//         }
//     });
// });

// Creating the virtual HTML categories that will come with flexibility of CRUD
function generateCategoryHtml(data, active) {
  var categoryGroupStart = '<li class="input-group' + active + '">';
  var categoryGroupEnd = '</li>';

  var categoryLink = '<a style="display: table-cell; vertical-align: middle; " class="list-group-item-text categoryitem" href="#" id="' +
    data._id + '" >' +
    data.name +
    '</a>';

  var categoryEditInput = '<input type="text" class="form-control category-input" value="' +
    data.name +
    '">';

  var categoryEditControls = '<div class="input-group-btn">' +
    '<button type="button" class="btn category-edit">' +
    '<span class="glyphicon glyphicon-pushpin" aria-hidden="true"></span>' +
    '</button>' +
    '<button type="button" class="btn category-delete">' +
    '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>' +
    '</button>' +
    '<button type="button" class="btn category-submit">' +
    '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' +
    '</button>' +
    '<button type="button" class="btn category-cancel">' +
    '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
    '</button>' +
    '</div>';

  return categoryGroupStart + categoryLink + categoryEditInput + categoryEditControls + categoryGroupEnd;
}

// This function builds the gallery. Based on salvattore plugin.
function append(picture, id) {
  // build/select our elements
  var grid = document.querySelector('#grid');
  var item = document.createElement('div');
  // build the html
  var h = '<div class="panel panel-primary">';
  h += '<div class="panel-body">';
  h += '<img id="' + id + '" src="';
  h += picture;
  h += '"/>'
  h += '</div>';
  h += '</div>';
  salvattore['append_elements'](grid, [item])
  item.outerHTML = h;
}

// Generic function to make an AJAX call
var fetchData = function(method, dataURL, query) {
  return $.ajax({
    type: method,
    data: query,
    dataType: 'json',
    url: dataURL
  });
}

// Reload all categories from the database
function refreshCategories() {
  var localAPI = "api/v1/categories";
  var method = "GET";
  var data = {};

  // Make AJAX call/s
  var result = fetchData(method, localAPI, data);

  $.when(result)
    .done(function(data) {
      $('.categories').empty(); // remove everything
      $('.categories').append('<ul></ul>');
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          active = " active"
        } else {
          active = ""
        };
        $('.categories ul').append(
          generateCategoryHtml(data[i], active)
        );
      }
      //Lets hide some of the generated category fields
      $('.category-submit').hide();
      $('.category-cancel').hide();
      $('.category-input').hide();
    });

}

// Call the Flickr API and return pictures
function viewCategory(name) {

  var localAPI = "api/v1/getCategoryImages/" + name;
  var method = "GET";
  var data = {
    tagmode: "any",
    format: "json"
  };
  var url = "";

  // Make AJAX call/s
  var result = fetchData(method, localAPI, data);

  $.when(result)
    .done(function(data) {
      if (data) {
        $('.column').empty();
        $.each(data.photos.photo, function(i, item) {
          url = "https://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_m.jpg";
          append(url, item.id);

        });
        $('standalone').hide();
      }
    });
}

// Call the Flickr API by id and return one picture
function viewImage(id) {

  var localAPI = "api/v1/getImage/" + id;
  var method = "GET";
  var data = {
    tagmode: "any",
    format: "json"
  };
  var url = "";

  // Make AJAX call/s
  var result = fetchData(method, localAPI, data);

  $.when(result)
    .done(function(data) {
      item = data.photo;

      url = "https://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_z.jpg";
      $(".image-title").html(item.title._content);
      $(".image-description").html(item.description._content);
      $(".image-url").attr('href', item.urls.url[0]._content);
      $(".standalone-image").attr('src', url);

    });


}


// Create a new category with a name
function createCategory(name) {
  var localAPI = "api/v1/categories";
  var method = "POST";
  var data = {
    name: name
  };

  // Make AJAX call/s
  var result = fetchData(method, localAPI, data);

  $.when(result)
    .done(function(data) {
      refreshCategories();
    })
    .fail(function(data) {
      // display red warning
      var errorsHtml = "";
      $.each(data.responseJSON, function(key, value) {
        errorsHtml += '<li>' + value[0] + '</li>'; //showing only the first error.
      });
      $('#errors').html('<div class="alert alert-danger" role="alert"><ul>' + errorsHtml + '</ul></div>');
      $("#errors").fadeTo(4000, 500).slideUp(500, function() {
        $("#errors").slideUp(500);
      });
      return false;

    });
}

// Delete a category by ID
function deleteCategory(id) {

  var localAPI = "api/v1/categories/" + id;
  var method = "DELETE";
  var data = {};

  // Make AJAX call/s
  var result = fetchData(method, localAPI, data);

  $.when(result)
    .done(function(data) {
      refreshCategories();
    })
    .fail(function(data) {
      // display red warning
      var errorsHtml = "";
      $.each(data.responseJSON, function(key, value) {
        errorsHtml += '<li>' + value[0] + '</li>'; //showing only the first error.
      });
      $('#errors').html('<div class="alert alert-danger" role="alert"><ul>' + errorsHtml + '</ul></div>');
      $("#errors").fadeTo(4000, 500).slideUp(500, function() {
        $("#errors").slideUp(500);
      });
      return false;
    });

}

// Edit a category
// id, name
function editCategory(id, name) {

  var localAPI = "api/v1/categories/" + id;
  var method = "PUT";
  var data = {
    name: name
  };

  // Make AJAX call/s
  var result = fetchData(method, localAPI, data);

  $.when(result)
    .done(function(data) {
      refreshCategories();
    })
    .fail(function(data) {
      // display red warning
      var errorsHtml = "";
      $.each(data.responseJSON, function(key, value) {
        errorsHtml += '<li>' + value[0] + '</li>'; //showing only the first error.
      });
      $('#errors').html('<div class="alert alert-danger" role="alert"><ul>' + errorsHtml + '</ul></div>');
      $("#errors").fadeTo(4000, 500).slideUp(500, function() {
        $("#errors").slideUp(500);
      });
      return false;
    });
}

// Allow a user to view a category of pictures
$(".categories").on("click", ".categoryitem", function() {
  viewCategory($(this).text());
  $(this).parent().find('.active').removeClass('active');
  $(this).addClass('active');
  $('.standalone').hide();
  $('#grid').show();
});

// Allow a user to view an image
$("#grid").on("click", ".panel-body img", function() {
  viewImage($(this).attr('id'));
  $('.standalone').toggle();
  $('#grid').toggle();
});

// Allow a user to go back to gallery
$(".standalone").on("click", ".image-back", function() {
  $('.standalone').toggle();
  $('#grid').toggle();
});

// Toggle edit category
function toggleEditCategory(current) {
  current.parent().parent().find('.categoryitem').toggle();
  current.parent().find('.category-edit').toggle();
  current.parent().find('.category-delete').toggle();
  current.parent().find('.category-submit').toggle();
  current.parent().find('.category-cancel').toggle();
  current.parent().parent().find('.category-input').toggle();
}

// Allow a user to edit or cancel edditing a category
$(".categories").on("click", ".category-edit", function() {
  toggleEditCategory($(this));
});
// Allow a user to cancel editing a category
$(".categories").on("click", ".category-cancel", function() {
  toggleEditCategory($(this));
});
// Allow a user to submit a category update
$(".categories").on("click", ".category-submit", function() {
  currentID = $(this).parent().parent().find('.categoryitem').attr('id');
  nameInput = $(this).parent().parent().find('.category-input').val();

  editCategory(currentID, nameInput);
});
// Allow a user to delete a category
$(".categories").on("click", ".category-delete", function() {

  currentID = $(this).parent().parent().find('.categoryitem').attr('id');
  nameInput = $(this).parent().parent().find('.category-input').val();

  if (confirm('Are you sure you want to delete ' + nameInput + ' category?')) {

    deleteCategory(currentID);
  }
});

// Toggle add category
function toggleAddCategory() {
  $("#addcate").toggle();
  $("#addplus").toggle();
}

// Allow a user to add a category
$(".addcategory").on("click", "#addplus :button", function() {
  toggleAddCategory()
});
// Allow a user to cancel adding a category
$(".addcategory").on("click", "#cancel", function() {
  toggleAddCategory()
});

// Allow a user to create a category
$('#add-category').on('submit', function(e) {
  e.preventDefault();
  nameInput = $('input[name=categoryname]').val();

  createCategory(nameInput);
  toggleAddCategory()
});


$(function() {
  // Display all categories from database on page load
  refreshCategories();

});
