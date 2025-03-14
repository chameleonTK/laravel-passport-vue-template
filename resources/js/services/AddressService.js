import _ from 'lodash';
import provinces from '../newgeodata/data/provinces.json';
import districts from '../newgeodata/data/districts.json';
import subdistricts from '../newgeodata/data/subdistricts.json';

class AddressService {
    constructor(){
        
    }

    getProvinces(){
        return provinces.map((p) => {
            return {
                id: p.province_id,
                text: p.province_name_th,
                value: p.province_name_th, 
            }
        });
    }

    getDistricts(province_id){
        return districts.filter((d) => {
            return d.province_id == province_id;
        }).map((p) => {
            return {
                id: p.district_id,
                text: p.district_name_th,
                value: p.district_name_th, 
            }
        });
    }

    getSubdistricts(district_id){
        return subdistricts.filter((d) => {
            return d.district_id == district_id;
        }).map((p) => {
            return {
                id: p.subdistrict_id,
                text: p.subdistrict_name_th,
                value: p.subdistrict_name_th, 
                postcode: p.postal_code,
            }
        });
    }

    getPostCode(district_id){
        const postcodes = subdistricts.filter((d) => {
            return d.district_id == district_id;
        }).map((p) => {
            return {
                text: ""+p.postal_code,
                value: ""+p.postal_code,
            }
        });

        return _.uniqBy(postcodes, "value");
    }

}
export default new AddressService();