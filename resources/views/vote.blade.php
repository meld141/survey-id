@extends('layouts.default')

@section('content')
    <div class="content">
        <div>
            <h1>Thank You!</h1>
            <h2>You have voted for <i>{{ $site }}</i></h2>
            <br><br>
            <a href="/" class="btn btn-default btn-lg">Home Page</a>
        </div>
    </div>
@stop
