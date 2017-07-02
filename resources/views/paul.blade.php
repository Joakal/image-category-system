<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />

      <title>Paul's test</title>

      <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
      <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
      <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->
    </head>
    <body>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div id="errors"></div>
          </div>
        </div>
        <div class="row paul-js">
            JS sum checking...
        </div>
        <div class="row paul-php">
            PHP sum check: {{ $php ? 'True' : 'False' }}
        </div>
        <div class="row paul-mysql">
            MySQL sum check: {{ $mysql ? 'True' : 'False' }}
        </div>
        <div class="row paul-mongo">
          @isset($mongos)
          Mongos sum check:
          <ul>
            @foreach ($mongos as $mongo)
            <li>{{ $mongo->number }} : {{ $mongo->result ? 'True' : 'False' }}</li>
            @endforeach
          </ul>
          @endisset
        </div>
        <div class="row paul-xlst">
            XLST
        </div>

      </div>
      <script src="/js/jquery-3.2.1.min.js"></script>
      <script src="/js/sum.js"></script>
    </body>
</html>
