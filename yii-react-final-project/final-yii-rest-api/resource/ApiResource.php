<?php
namespace app\resource;
use app\models\ApiSearch;
class ApiResource extends ApiSearch{
    public function fields()
    {
        return ['api_id','project_id','module_id','url','title','description','method','request','response'];
    }
    public function extraFields()
    {
        return ['created_at','project','module'];
    }
}