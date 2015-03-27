<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class VotesController extends Controller
{
    public function vote($site, $via = 'www')
    {
        return view('vote', ['site' => $site]);
    }
}
