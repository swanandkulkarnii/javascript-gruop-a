<?php

namespace app\resources;

use app\models\Module;


class ModuleResource extends Module
{
    public function fields()
    {
        return ['id', 'title', 'description'];
    }

    public function extraFields()
    {
        return ['project'];
    }
}
