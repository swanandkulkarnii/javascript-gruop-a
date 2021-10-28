<?php
namespace app\resource;
use app\models\ProjectSearch;
class ProjectResource extends ProjectSearch{
    
    public function fields()
    {
        # code...
        return ['project_id','title','description'];
    }
    
    public function extraFields()
    {
        return ['modules','created_at'];
    }
}