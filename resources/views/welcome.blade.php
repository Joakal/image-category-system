<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />

      <title>Flick Image Category Management System</title>

      <link rel="stylesheet" href="css/bootstrap.min.css">
      <link rel="stylesheet" href="css/app.css">

      <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
      <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
      <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->
    </head>
    <body>
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">ImageCategorySystem (ICS)</a>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
              <li class="dropdown">
                  @if (Auth::check())
                  <form method="post" action="logout" class="navbar-form navbar-left" id="logoutForm">
                    <button type="submit" class="btn btn-default">Logout</button>
                    {{ csrf_field() }}
                  </form>
                  @else
                  <form  role="form" method="POST" action="{{ route('login') }}" class="navbar-form navbar-left" id="loginForm">
                    <div class="form-group">
                      <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required placeholder="Username">
                      <input id="password" type="password" class="form-control" name="password" placeholder="Password" required>
                    </div>
                    <button type="submit" name="login" id="login" class="btn btn-default">Login</button>
                    {{ csrf_field() }}
                  @if ($errors->has('email'))
                      <span class="help-block">
                          <strong>{{ $errors->first('email') }}</strong>
                      </span>
                  @endif
                  @if ($errors->has('password'))
                      <span class="help-block">
                          <strong>{{ $errors->first('password') }}</strong>
                      </span>
                  @endif
                  </form>
                  @endif
              </li>
            </ul>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
      </nav>

      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div id="errors"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
              <div class="categories list-group"></div>
              <div class="addcategory">
                <div id="addplus">
                  <button type="button" class="btn btn-default" aria-label="Left Align">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add
                  </button>
                </div>
                <div id="addcate" style="display: none;">
                  <form method="post" action="api/v1/categories" id="add-category" class="navbar-form navbar-left">
                    <div class="form-group">
                      <input type="text" class="form-control" name="categoryname" id="categoryname" placeholder="Name of Category">
                    </div>
                    <button type="submit" name="categorysubmit" class="btn btn-default">Submit</button>
                    <button type="button" class="btn btn-default" id="cancel" aria-label="Left Align">
                      <span class="glyphicon glyphicon-minus" aria-hidden="true"></span> Cancel
                    </button>
                    {{ csrf_field() }}
                  </form>
                </div>
              </div>
          </div>

          <div class="col-md-9">

            <div data-columns="" id="grid">
            </div>

            <div class="standalone" style="display: none;">
              <div class="row jumbotron">
                <div class="col-md-6">
                    <img style="width:100%" class="standalone-image" src="index.svg" data-holder-rendered="true">
                </div>
                  <div class="col-md-6">
                  <button type="button" class="image-back pull-right btn btn-default" aria-label="Left Align">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                  </button>
                <h2 class="image-title">TITLE</h2>
                <p class="image-description">DESCRIPTION</p>
                <p><a class="image-url" href="">Flickr Source</a></p>
                </div>
              </div>
            </div>

          </div>

          </div>
        </div>

        <script src="/js/jquery-3.2.1.min.js"></script>
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/salvattore.min.js"></script>
        <script src="/js/project.js"></script>
    </body>
</html>
