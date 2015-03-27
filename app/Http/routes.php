<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

Route::get('interninc', function()
{
    return view('interninc_files.index');
});

Route::get('jobstreet', function()
{
    return view('jobstreet.index');
});

Route::get('im', function()
{
    return view('im.index');
});

Route::get('linkedin', function()
{
    return view('linkedin.index');
});

Route::get('urban', function()
{
    return view('urban.index');
});

Route::get('vote/{site}', ['as' => 'vote', 'uses' => 'VotesController@vote']);
Route::get('vote/{site}/{via}', ['as' => 'vote', 'uses' => 'VotesController@vote']);

Route::get('summary', ['as' => 'summary', 'uses' => 'VotesController@summary']);