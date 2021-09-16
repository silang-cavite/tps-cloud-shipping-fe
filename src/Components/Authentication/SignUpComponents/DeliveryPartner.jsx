import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDropzone } from 'react-dropzone';
import { axiosAPI } from "src/Middleware/Axios";
import { notify } from "src/Services/Toaster";
import { thumbsContainer, thumb, thumbInner, img } from "./DropZone";

let data = require("src/Services/Philippines/main.json");

const DeliveryPartner = () => {
    const history = useHistory();

    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ password, setPassword ] = useState("");

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

    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
      }
    });
    
    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    alt=""
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
  

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

    const submitDeliveryPartnerForm = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();
            formData.append("first_name", firstName);
            formData.append("last_name", lastName);
            formData.append("username", username);
            formData.append("user_picture", files[0]);
            formData.append("address", {
                region: selectedRegion,
                province: selectedProvince,
                municipality: selectedMunicipality,
                barangay: selectedBarangay
            });
            formData.append("email", email);
            formData.append("phone_number", phoneNumber);
            formData.append("role", "Delivery Partner");
            formData.append("password", password);

            const signUpResponse = await axiosAPI.post('authentication/sign-up', formData)
            notify(signUpResponse.data.message, "success");
            history.push("sign-in")
        } catch (err) {
            err.response ? notify(err.response.data.message, "success") : notify(err.message, "success");
        }
    }

    return (
        <div>
            <form onSubmit={submitDeliveryPartnerForm}>
                <section>
                    <div>
                        <label class="block text-sm mb-1" for="name">First Name</label>
                        <input class="form-input" placeholder="Please enter a First Name" required 
                        onChange={(e) => 
                            setFirstName(e.target.value)
                        }/>
                    </div>
                    <div>
                        <label class="block text-sm mb-1" for="name">Last Name</label>
                        <input class="form-input" placeholder="Please enter a First Name" required
                        onChange={(e) => 
                            setLastName(e.target.value)
                        }/>
                    </div>
                    <div>
                        <label class="block text-sm mb-1" for="name">Username</label>
                        <input class="form-input" placeholder="Please enter a Username" required
                        onChange={(e) => 
                            setUsername(e.target.value)
                        }/>
                    </div>
                    <div>
                        <label class="block text-sm mb-1" for="name">Email</label>
                        <input class="form-input" placeholder="Please enter a Email" required
                        onChange={(e) => 
                            setEmail(e.target.value)
                        }/>
                    </div>
                    <div>
                        <label class="block text-sm mb-1" for="name">Phone Number</label>
                        <input class="form-input" placeholder="Please enter a Username" required
                        onChange={(e) => 
                            setPhoneNumber(e.target.value)
                        }/>
                    </div>
                    <div>
                        <label class="block text-sm mb-1" for="name">Password</label>
                        <input class="form-input" type="password" placeholder="Please enter a Username" required
                        onChange={(e) => 
                            setPassword(e.target.value)
                        }/>
                    </div>
                </section>
                <section className="container">
                    {
                        files.length === 0 ?
                            <div {...getRootProps({className: 'dropzone'})}>
                                <input {...getInputProps()} />
                                <button class="btn btn-primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                }}> Upload </button>
                            </div>
                        : 
                            <aside style={thumbsContainer}>
                                {thumbs}
                            </aside>
                    }
                </section>
                <section>
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
                </section>
                <button class="btn btn-primary"type="submit">Test</button>
            </form>
        </div>
    )
}

export default DeliveryPartner
