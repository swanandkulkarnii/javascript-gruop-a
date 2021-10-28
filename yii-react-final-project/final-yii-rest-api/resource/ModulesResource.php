<?php
namespace app\resource;
use app\models\ModulesSearch;
class ModulesResource extends ModulesSearch{
    public function fields()
    {
        # code...
        return ['module_id','project_id','title','description'];
    }
    
    public function extraFields()
    {
        return ['project','created_at'];
    }
}