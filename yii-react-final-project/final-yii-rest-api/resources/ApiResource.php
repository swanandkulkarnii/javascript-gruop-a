<?php

namespace app\resources;

use app\models\Api;


class ApiResource extends Api
{
    public function fields()
    {
        return ['id', 'url', 'title', 'description', 'method', 'request', 'response'];
    }

    public function extraFields()
    {
        return ['project', 'module'];
    }
}
