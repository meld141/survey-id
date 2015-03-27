<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use League\Flysystem\Exception;

class Result extends Model {
    protected $table = 'results';
    protected $fillable = ['site', 'via'];

    public static function IncrementVote($site_name)
    {
        $result = new Result();
        try {
            $result = Result::where('site', $site_name)->firstOrFail();
        } catch (ModelNotFoundException $e) {
            $result->site = $site_name;
            $result->votes = 1;
            $result->save();
            return;
        }

        $result->votes = $result->votes + 1;
        $result->save();
        return;
    }

    public static function GetTotal()
    {
        $total = 0;
        $sites = Result::all();
        foreach ($sites as $site) {
            $total = $total + $site->votes;
        }

        return $total;
    }
}
