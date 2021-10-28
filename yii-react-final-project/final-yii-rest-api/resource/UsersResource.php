<?php
namespace app\resource;
use app\models\Users;
class UsersResource extends Users{
    public function fields()
    {
        return ['id','firstname','lastname','gender','email_id','pro_pic'];
    }
    
    public function extraFields()
    {
        return ['created_at'];
    }
}
