import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

let data = require("src/Services/Philippines/main.json");

const Client = () => {
    const [ state, setState ] = useState({ 
        regionState: 1, 
        provinceState: 1,
        municipalitState: 1,
        barangayState: 1
    });

    const [ regionList, setRegionList ] = useState([]);
    const [ selectedRegion, setSelectedRegion ] = useState("");

    const [ provinceList, setProvinceList ] = useState([]);
    const [ selectedProvince, setSelectedProvince ] = useState("Please select a Region");

    const [ municipalityList, setMunicipalityList ] = useState([]);
    const [ selectedMunicipality, setSelectedMunicipality ] = useState("Please select a Province");

    const [ barangayList, setBarangayList ] = useState([]);
    const [ selectedBarangay, setSelectedBarangay ] = useState("Please select a Municipality");

    const isMobile = useMediaQuery({
        query: "(max-width: 800px)"
    });

    useEffect(() => {
        setRegionList(data.map((currentRegion) => {
            return currentRegion.region_name
        }));
    }, []);

    useEffect(() => {
        setProvinceList(() => {
            let listOfProvinces = [];
            let selectedRegionData = data.map((currentData) => {
                return currentData.region_name
            }).indexOf(selectedRegion);
             // eslint-disable-next-line
            data.map((currentData, index) => {
                if(index === selectedRegionData){
                    return currentData.provinces
                }
            }).filter((unfilteredUndefinedData) => {
                return unfilteredUndefinedData !== undefined;
            }).map((currentFilteredData) => {
                return Object.values(currentFilteredData).map((currentProvince) => {
                    return listOfProvinces.push(currentProvince.province_name)
                });
            });
            setProvinceList(listOfProvinces);
        });
    // eslint-disable-next-line
    }, [selectedRegion]);

    useEffect(() => {
        setMunicipalityList(() => {
            let listOfMunicipality = [];
            data.map((currentData) => {
                // eslint-disable-next-line
                return currentData.provinces.map((currentProvince) => {
                    if(currentProvince.province_name === selectedProvince){
                        return currentProvince.municipalities.map((currentMunicipality) => {
                            return listOfMunicipality.push(currentMunicipality.municipality_name) 
                        })
                    }
                })
            })
            setMunicipalityList(listOfMunicipality);
        });
    }, [selectedProvince]);

    useEffect(() => {
            let liftOfBarangay = [];
            data.map((currentData) => {
                // eslint-disable-next-line
                return currentData.provinces.map((currentProvince) => {
                    if(currentProvince.province_name === selectedProvince){
                        // eslint-disable-next-line
                        return currentProvince.municipalities.map((currentMunicipality) => {
                            if(currentMunicipality.municipality_name === selectedMunicipality){
                                // eslint-disable-next-line
                                currentMunicipality.barangays.map((currentBarangay) => {
                                    liftOfBarangay.push(currentBarangay)
                                })
                            }
                        })
                    }
                })
            })
            setBarangayList(liftOfBarangay)
    // eslint-disable-next-line
    }, [selectedMunicipality]);

    return (
        <div>
            <form>
                <div>
                    <label className="block text-sm mb-1" >Region</label>
                    <select className="form-select"
                    defaultValue="Select your option" 
                    size={state.regionState} 
                    {...( isMobile ? { 
                        onFocus: () => {
                            setState((currentData)=> {
                                return {
                                    ...currentData,
                                    regionState: 5
                                }
                            });
                        },
                        onBlur: () => {
                            setState((currentData)=> {
                                return {
                                    ...currentData,
                                    regionState: 1
                                }
                            });
                        }
                    } : {} )}
                    onChange={(e) => {
                        e.target.blur()
                        setSelectedRegion(e.target.value)
                        setSelectedProvince("Select your option")
                        setSelectedMunicipality("Please select a Province")
                        setSelectedBarangay("Please select a Municipality")
                    }}>
                        <option disabled>Select your option</option>
                        {
                            regionList && regionList.map((currentRegion, regionKey)=>{
                                return <option key={regionKey}> { currentRegion } </option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <label className="block text-sm mb-1" >Provinces</label>
                    <select className="form-select"
                    value = { selectedProvince }
                    size={state.provinceState} 
                    {...( selectedRegion === "" ? { 
                        disabled: true
                    } : {} )}
                    {...( isMobile ? { 
                        onFocus: () => {
                            setState((currentData)=> {
                                return {
                                    ...currentData,
                                    provinceState: 5
                                }
                            });
                        },
                        onBlur: () => {
                            setState((currentData) => {
                                return {
                                    ...currentData,
                                    provinceState: 1
                                }
                            });
                        }
                    } : {} )}
                    onChange={(e) => {
                        e.target.blur()
                        setSelectedProvince(e.target.value)
                        setSelectedMunicipality("Select your option")
                        setSelectedBarangay("Please select a Municipality")
                    }}>
                        {
                            selectedRegion === "" ? 
                            <option disabled>Please select a Region</option>
                            :
                            <option disabled>Select your option</option>
                        }
                        {
                            provinceList && provinceList.map((currentProvince, provinceKey)=>{
                                return <option key={provinceKey}> { currentProvince } </option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <label className="block text-sm mb-1" >Municipality</label>
                    <select className="form-select"
                    value = { selectedMunicipality }
                    size={state.municipalitState} 
                    {...( selectedProvince === "Please select a Region" || selectedProvince === "Select your option" ? { 
                        disabled: true
                    } : {} )}
                    {...( isMobile ? { 
                        onFocus: () => {
                            setState((currentData)=> {
                                return {
                                    ...currentData,
                                    municipalitState: 5
                                }
                            });
                        },
                        onBlur: () => {
                            setState((currentData) => {
                                return {
                                    ...currentData,
                                    municipalitState: 1
                                }
                            });
                        }
                    } : {} )}
                    onChange={(e) => {
                        e.target.blur()
                        setSelectedMunicipality(e.target.value)
                        setSelectedBarangay("Select your option")
                    }}>
                        {
                            selectedProvince === "Please select a Region" || selectedProvince === "Select your option" ? 
                            <option disabled>Please select a Province</option>
                            :
                            <option disabled>Select your option</option>
                        }
                        {
                            municipalityList && municipalityList.map((currentMunicipality, municipalityKey)=>{
                                return <option key={municipalityKey}> { currentMunicipality } </option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <label className="block text-sm mb-1" >Barangay</label>
                    <select className="form-select"
                    value = { selectedBarangay }
                    size={state.barangayState} 
                    {...( selectedMunicipality === "Please select a Province" || selectedMunicipality === "Select your option" ? { 
                        disabled: true
                    } : {} )}
                    {...( isMobile ? { 
                        onFocus: () => {
                            setState((currentData)=> {
                                return {
                                    ...currentData,
                                    barangayState: 5
                                }
                            });
                        },
                        onBlur: () => {
                            setState((currentData) => {
                                return {
                                    ...currentData,
                                    barangayState: 1
                                }
                            });
                        }
                    } : {} )}
                    onChange={(e) => {
                        e.target.blur()
                        setSelectedBarangay(e.target.value)
                    }}>
                        {
                            selectedMunicipality === "Please select a Province" || selectedMunicipality === "Select your option" ? 
                            <option disabled>Please select a Municipality</option>
                            :
                            <option disabled>Select your option</option>
                        }
                        {
                            barangayList && barangayList.map((currentBarangay, barangayKey)=>{
                                return <option key={barangayKey}> { currentBarangay } </option>
                            })
                        }
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Client
