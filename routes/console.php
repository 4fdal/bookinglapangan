<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();


Artisan::command('storage:link-manual', function () {
    $storage_path = base_path("/storage/app/public");
    $public_storage = base_path("/public/storage");

    if (file_exists($public_storage)) exec("rm -r ./public/storage");
    exec("ln -s \"{$storage_path}\" \"{$public_storage}\"");
});
