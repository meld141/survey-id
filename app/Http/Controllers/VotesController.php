<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Result;
use Illuminate\Http\Request;

class VotesController extends Controller
{
    public function vote($site, $via = 'www')
    {
        Result::IncrementVote($site);

        return view('vote', ['site' => $site]);
    }

    public function summary()
    {
        $sites = Result::all();
        $total = Result::GetTotal();
        $data = [];
        foreach ($sites as $site) {
            $percentage = ($site->votes / $total) * 100;
            $percentage = round($percentage, 2);
            $data[$site->site] = ['votes' => $site->votes, 'percent' => $percentage];
        }

        return view('summary', $data);
    }
}
