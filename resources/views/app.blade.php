<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="csrf-token" value="{{ csrf_token() }}" />
    <style>
        html, body {
            width: 100%;
        }
    </style>
    
    <title>
        @isset($title)
            {{ $title }} 
        @else
            TITLE
        @endisset
    </title>

    <link rel="icon" type="image/png" href="{{asset('favicon.png')}}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@200;400;500;600;800&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.lineicons.com/3.0/lineicons.css">
    <!-- <link href="https://unpkg.com/@yaireo/tagify/dist/tagify.css" rel="stylesheet" type="text/css" /> -->
    <!-- <link href="https://unpkg.com/filepond/dist/filepond.css" rel="stylesheet"> -->
    <!-- <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.13.1/themes/smoothness/jquery-ui.css"> -->
    
    <style>
        html,
        body,
        div,
        p,
        a,
        span,
        td,
        input,
        textarea {
            font-family: 'Prompt', sans-serif;
            font-size: 16px;
            font-weight: 400;
        }
    </style>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <!-- <link rel="stylesheet" href="https://unpkg.com/multiple-select@1.7.0/dist/multiple-select.min.css"> -->
    <!-- <link rel="stylesheet" type="text/css" href="{{asset('css/bootstrap-select.min.css')}}"> -->
    <link rel="stylesheet" type="text/css" href="{{asset('css/fontawesome.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('css/flatpickr.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/style.css')}}">

    @if(env("APP_ENV", "local")=="local")
        <link href="{{ asset('css/app.css?v=202503131620') }}" rel="stylesheet">
    @else
        <link href="{{ asset('css/app.css?v=202503131620') }}" rel="stylesheet">
    @endif
    
    @section('style')
    @show
</head>

<body class="">
    @yield('content')
    <div id="app">
        <app />
    </div>
    <script>
        // window.ASSET_PATH = "{{asset('/storage/')}}";
        // window.PRIVATE_ASSET_PATH = "{{url('/image')}}";
        // window.API_ENDPOINT = "{{url('/api')}}";
        // window.CLIENT_ID = "{{env('API_CLIENT_ID')}}";
        // window.CLIENT_SECRET = "{{env('API_CLIENT_SECRET')}}";
        
    </script>

    <!-- Script -->
    <!-- JS File -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

    <script src="{{asset('js/flatpickr.min.js')}}"></script>
    <script src="{{asset('js/flatpickr.th.min.js')}}"></script>


    @section('script')

    @show

    <script src="{{ asset('js/app.js?v=202503131620') }}"></script>
    
</body>

</html>