import React from 'react';
import { districtSelect } from '../../resources/text';
import "./district-select.scss";

const DistrictSelect = (props) =>{
    const districts =  districtSelect['district'][props.language]
    const districtOptions = Object.keys(districts).map((districtId) => <option key={`${districtId}`} value={`${districtId}`}> {districts[districtId]}</option>);
    const selectedElement = props.page==="pitches"?<option value="favourite"  selected>{districtSelect["favourite"][props.language]}</option>:
                                                <option value="" disabled selected>{districtSelect["district"][props.language][props.selectedDistrictId]}</option>

    return <select onChange={props.handleChange} id="district" className={props.class}>
                {selectedElement}
                {districtOptions}
            </select>
}

export default DistrictSelect;