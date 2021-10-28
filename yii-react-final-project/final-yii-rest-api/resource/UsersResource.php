<?php
namespace app\resource;
use app\models\Users;
class UsersResource extends Users{
    public function fields()
    {
        return ['user_id','first_name','last_name','email','profile_pic','gender'];
    }
    
    public function extraFields()
    {
        return ['created_at'];
    }
}