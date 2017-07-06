// Creating the virtual HTML categories that will come with flexibility of CRUD
var generateCategoryHtml = function(data, active) {

  var categoryGroup = document.createElement('li'),
    categoryLink = document.createElement('a'),
    categoryEditInput = document.createElement('input'),
    categoryControls = document.createElement('div'),
    categoryType = '',
    categorySpan = '',
    categoryControlTypes = [
      ['edit', 'glyphicon-pushpin'],
      ['delete', 'glyphicon-trash'],
      ['submit', 'glyphicon-ok'],
      ['cancel', 'glyphicon-remove']
    ];

  // Highlight if current category is selected
  if (active) {
    categoryGroup.className = 'input-group active';
  } else {
    categoryGroup.className = 'input-group';
  }

  // Generate the 'link' to the category of images
  categoryLink.className = 'list-group-item-text list-group-item categoryitem'
  categoryLink.href = '#';
  categoryLink.setAttribute('id', data._id);
  categoryLink.text = data.name;
  categoryLink.style = 'display: table-cell; vertical-align: middle;';
  categoryLink.onclick = viewCategory;

  categoryGroup.appendChild(categoryLink);

  // Generate an input field for editing the category
  categoryEditInput.type = 'text';
  categoryEditInput.className = 'form-control category-input';
  categoryEditInput.value = data.name;

  categoryGroup.appendChild(categoryEditInput);

  categoryControls.className = 'input-group-btn';
  if (!localStorage.getItem('token')) {
    categoryControls.style = 'display: none;';
  }

  /*
   * For each button, apply the relevant functions. ie, submit = edit category.
   */
  $.each(categoryControlTypes, function(i, item) {
    categoryType = document.createElement('button');
    categoryType.className = 'btn category-' + item[0];
    categorySpan = document.createElement('span');
    categorySpan.className = 'glyphicon ' + item[1];
    categoryType.appendChild(categorySpan);

    if (item[0] === 'submit') {
      categoryType.onclick = editCategory;
    } else if (item[0] === 'delete') {
      categoryType.onclick = deleteCategory;
    } else {
      categoryType.onclick = toggleEditCategory;
    }

    categoryControls.appendChild(categoryType);
  });

  categoryGroup.appendChild(categoryControls);
  return categoryGroup;
}



// This function builds the gallery. Based on salvattore plugin.
var buildGallery = function(picture, id) {
  // build/select our elements
  var grid = document.querySelector('#grid'),
    item = document.createElement('div'),
    item1 = document.createElement('div'),
    item2 = document.createElement('div'),
    item3 = document.createElement('img');

  item1.className = 'panel panel-primary';
  item2.className = 'panel-body';
  item3.id = id;
  item3.src = picture;

  item2.appendChild(item3);
  item1.appendChild(item2);

  salvattore.appendElements(grid, [item1]);
}

var displayError = function(err) {

  var errDiv = document.createElement('div'),
    errButton = document.createElement('button'),
    errSpan = document.createElement('span');

  errSpan.setAttribute('aria-label', 'true');
  errSpan.innerHTML = '&times;';

  errButton.appendChild(errSpan);
  errButton.className = 'close';
  errButton.setAttribute('data-dismiss', 'alert');
  errButton.setAttribute('aria-label', 'Close');

  errDiv.appendChild(errButton);
  errDiv.className = 'alert alert-warning alert-dismissible';
  errDiv.setAttribute('role', 'alert');
  errDiv.append(document.createTextNode(err));

  $('#errors').append(errDiv);

}

// Generic function to make an AJAX call
var fetchData = function(method, dataURL, query) {

  return $.ajax({
    type: method,
    data: query,
    dataType: 'json',
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content'),
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    url: dataURL
  });
}

var toggleEditCategory = function() {
  $(this).parent().parent().find('.categoryitem').toggle();
  $(this).parent().find('.category-edit').toggle();
  $(this).parent().find('.category-delete').toggle();
  $(this).parent().find('.category-submit').toggle();
  $(this).parent().find('.category-cancel').toggle();
  $(this).parent().parent().find('.category-input').toggle();
}

// Toggle add category
var toggleAddCategory = function() {
  $("#addcate").toggle();
  $("#addplus").toggle();
}

// Show add category
var showAddCategory = function() {
  $("#addcate").show();
  $("#addplus").show();
}
// Hide add category
var hideAddCategory = function() {
  $("#addcate").hide();
  $("#addplus").hide();
}

// Call the Flickr API and return pictures
var viewCategory = function(e) {

  var categoryLink = this,
    name = categoryLink.text,
    localAPI = "api/v1/getCategoryImages/" + name,
    method = "GET",
    data = {
      tagmode: "any",
      format: "json"
    };
  var url = "";

  // Make AJAX call/s
  var result = fetchData(method, localAPI, data);

  $.when(result)
    .done(function(data) {
      $('.column').empty();
      $.each(data.photos.photo, function(i, item) {
        url = "//farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_m.jpg";
        buildGallery(url, item.id);

      });

      // Assign onclick events
      // Allow a user to view an image
      var imagesAmount = $('#grid').find('.panel-primary').length;
      var viewImages = $('#grid').find('.panel-body img');

      for (var i = 0; i < imagesAmount; i++) {

        viewImages[i].onclick = viewImage;
      }
      // Highlight current category
      $('.categories').find('.active').removeClass('active');
      categoryLink.className += ' active';

      // Show the image category grid and hide the standalone modal if any
      $('.standalone').hide();
      $('#grid').show();

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      var errMsg = "Error: We could not get that category. ";
      if (jqXHR.responseJSON) {
        $.each(jqXHR.responseJSON, function(i, item) {
          displayError(errMsg + item);
        });
      } else {
        displayError(errMsg + errorThrown);
      }
    });

}

// Reload all categories from the database
var refreshCategories = function() {

  var localAPI = "api/v1/categories",
    method = "GET",
    data = {},
    tempArray = [];

  // Make AJAX call/s
  var result = fetchData(method, localAPI, data);

  $.when(result)
    .done(function(data) {
      $('#categories').empty(); // remove everything
      var iLength = data.length;
      var categoriesList = document.getElementById('categories');
      var ul = document.createElement('ul');

      for (var i = 0; i < iLength; i++) {
        if (i === 0) {
          active = true;
        } else {
          active = false;
        };
        ul.appendChild(generateCategoryHtml(data[i], active));

      }
      categoriesList.appendChild(ul);
      //Lets hide some of the generated category fields
      $('.category-submit').hide();
      $('.category-cancel').hide();
      $('.category-input').hide();



    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      var errMsg = "Error: We could not get the current list of categories. ";
      if (jqXHR.responseJSON) {
        $.each(jqXHR.responseJSON, function(i, item) {
          displayError(errMsg + item);
        });
      } else {
        displayError(errMsg + errorThrown);
      }
    });


}



// Call the Flickr API by id and return one picture
var viewImage = function() {

  var id = $(this).attr('id'),
    localAPI = "api/v1/getImage/" + id,
    method = "GET",
    data = {
      tagmode: "any",
      format: "json"
    },
    url = "";

  // Make AJAX call/s
  var result = fetchData(method, localAPI, data);

  $.when(result)
    .done(function(data) {

      $('.standalone').toggle();
      $('#grid').toggle();
      item = data.photo;

      url = "//farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_z.jpg";
      $(".image-title").html(item.title._content);
      $(".image-description").html(item.description._content);
      $(".image-url").attr('href', item.urls.url[0]._content);
      $(".standalone-image").attr('src', url);

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      var errMsg = "Error: We could not get information on that image. ";
      if (jqXHR.responseJSON) {
        $.each(jqXHR.responseJSON, function(i, item) {
          displayError(errMsg + item);
        });
      } else {
        displayError(errMsg + errorThrown);
      }
    });


}


// Create a new category with a name
var createCategory = function(name) {
  var localAPI = "api/v1/categories",
    method = "POST",
    data = {
      name: name
    };

  // Make AJAX call/s
  var result = fetchData(method, localAPI, data);

  $.when(result)
    .done(function(data) {
      refreshCategories();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      var errMsg = "Error: We could not create the category. ";
      if (jqXHR.responseJSON) {
        $.each(jqXHR.responseJSON, function(i, item) {
          displayError(errMsg + item);
        });
      } else {
        displayError(errMsg + errorThrown);
      }
    });
}

// Delete a category
var deleteCategory = function() {

  var deleteButton = this,
    nameInput = $(this).parent().parent().find('a').text(),
    id = $(this).parent().parent().find('a').attr('id'),

    localAPI = "api/v1/categories/" + id,
    method = "DELETE",
    data = {};

  if (!confirm('Are you sure you want to delete ' + nameInput + ' category?')) {

    return;

  }

  // Make AJAX call/s
  var result = fetchData(method, localAPI, data);

  $.when(result)
    .done(function(data) {
      refreshCategories();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      var errMsg = "Error: We could not create the category. ";
      if (jqXHR.responseJSON) {
        $.each(jqXHR.responseJSON, function(i, item) {
          displayError(errMsg + item);
        });
      } else {
        displayError(errMsg + errorThrown);
      }
    });

}

// Edit a category
// id, name
var editCategory = function() {


  var submitButton = this,
    nameInput = $(this).parent().parent().find('input').val(),
    id = $(this).parent().parent().find('a').attr('id'),
    localAPI = "api/v1/categories/" + id,
    method = "PUT",
    data = {
      name: nameInput
    };

  // Make AJAX call/s
  var result = fetchData(method, localAPI, data);

  $.when(result)
    .done(function(data) {
      refreshCategories();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      var errMsg = "Error: We could not edit the category. ";
      if (jqXHR.responseJSON) {
        $.each(jqXHR.responseJSON, function(i, item) {
          displayError(errMsg + item);
        });
      } else {
        displayError(errMsg + errorThrown);
      }
    });
}

// login form
var loginForm = $('#loginForm');
loginForm.submit(function(e) {
  e.preventDefault();
  var formData = loginForm.serialize(),
    localAPI = "login",
    method = "POST",
    data = formData;

  // Make AJAX call/s
  var result = fetchData(method, localAPI, data);

  $.when(result)
    .done(function(data) {
      localStorage.setItem('token', data.user.api_token);

      $('#loginForm').hide();
      $('#logoutForm').show();
      $('.input-group-btn').show();
      $('.addcategory').show();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      var errMsg = "Error: We could not log you in. ";
      if (jqXHR.responseJSON) {
        $.each(jqXHR.responseJSON, function(i, item) {
          displayError(errMsg + item);
        });
      } else {
        displayError(errMsg + errorThrown);
      }
    });
});

// logout form
var logoutForm = $('#logoutForm');
logoutForm.submit(function(e) {
  localStorage.clear(); // clear internal cookie
});

// Allow a user to add a category
$("#addplus").click(toggleAddCategory);

// Allow a user to cancel adding a category
$("#cancel").click(toggleAddCategory);

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
