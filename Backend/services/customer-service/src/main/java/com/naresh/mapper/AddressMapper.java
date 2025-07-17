package com.naresh.mapper;

import com.naresh.dto.AddressDTO;
import com.naresh.model.Address;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {

    public AddressDTO toAddressDTO(Address address){
        return new AddressDTO(address.getId(), address.getHouseNo()
        , address.getStreet(), address.getLandmark(), address.getDistrict(), address.getState(),
                address.getCountry(), address.getPinCode());
    }
}
