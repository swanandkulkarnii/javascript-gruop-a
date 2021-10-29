import http from './http-common';
export const getAddressData = () =>{
    return http.get("/yii/yii/yii/yii-backend/web/useraddress/read?expand=user");
}
export const deleteAddress = (address_id) =>{
    console.log("id coming",address_id);
    return http.put(`yii/yii/yii/yii-backend/web/useraddress/update?id=${address_id}`,{'is_deleted':1});
}
export const addAddress = (addressline1,addressline2,city,state,zipcode,country,user_id) =>{
    return http.post('yii/yii/yii/yii-backend/web/useraddress/create',{
        "addressline1":addressline1,
        "addressline2":addressline2,
        "city":city,
        "state":state,
        "zipcode":zipcode,
        "country":country,
        "user_id":user_id,
    });
}
export const addressSearch = (searchAddressCity) =>{
    return http.get(`yii/yii/yii/yii-backend/web/useraddress?filter[city][like]=${searchAddressCity}`)
}
export const editAddress = (address_id,user_id,addressline1,addressline2,city,state,zipcode,country) =>{
    return http.put(`yii/yii/yii/yii-backend/web/useraddress/update?id=${address_id}`,
    {
        "addressline1":addressline1,
        "addressline2":addressline2,
        "city":city,
        "state":state,
        "zipcode":zipcode,
        "country":country,
        "user_id":user_id
    });
}
export const sort = (sortBy) =>{
    return http.get(`yii/yii/yii/yii-backend/web/useraddress?sort=${sortBy}`);
}