<?php 

namespace app\resource;

use app\models\SearchUserAddress;

class UserAddressResource extends SearchUserAddress{

    public function fields()
    {
        return ['address_id','addressline1','addressline2','city','state','zipcode','country','user_id'];
    }

    public function extraFields()
    {
        return ['created_at','users','is_deleted','user'];
    }
    
}