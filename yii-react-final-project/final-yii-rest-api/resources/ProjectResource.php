<?php

namespace app\resources;

use app\models\Project;


class ProjectResource extends Project
{
    public function fields()
    {
        return ['id', 'title', 'description'];
    }

    public function extraFields()
    {
        return ['modules', 'apis'];
    }
}
