import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDropzone } from 'react-dropzone';
import { axiosAPI } from "src/Middleware/Axios";
import { notify } from "src/Services/Toaster";
import { thumbsContainer, thumb, thumbInner, img } from "src/Components/Authentication/Dropzone";

let data = require("src/Services/Philippines/main.json");

const Client = () => {
    // Component Initial Variables
    const history = useHistory();                                               // Navigation to react routes
    const [ firstName, setFirstName ] = useState("");                           // First Name input field value
    const [ lastName, setLastName ] = useState("");                             // Last Name input field value
    const [ username, setUsername ] = useState("");                             // Username input field value
    const [ email, setEmail ] = useState("");                                   // Email input field value
    const [ phoneNumber, setPhoneNumber ] = useState("");                       // Phone Number input field value
    const [ password, setPassword ] = useState("");                             // Password input field value
    const [ role, setRole ] = useState("Please select a Role");                 // Role input field value
    const [ state, setState ] = useState({                                      // Address expand state
        regionState: 1, 
        provinceState: 1,
        municipalitState: 1,
        barangayState: 1
    });

    // Select and Option section for target address
    const [ regionList, setRegionList ] = useState([]);
    const [ selectedRegion, setSelectedRegion ] = useState("");
    const [ provinceList, setProvinceList ] = useState([]);
    const [ selectedProvince, setSelectedProvince ] = useState("Please select a Region");
    const [ municipalityList, setMunicipalityList ] = useState([]);
    const [ selectedMunicipality, setSelectedMunicipality ] = useState("Please select a Province");
    const [ barangayList, setBarangayList ] = useState([]);
    const [ selectedBarangay, setSelectedBarangay ] = useState("Please select a Municipality");
    
    // Check current client breakpoint
    const isMobile = useMediaQuery({
        query: "(max-width: 800px)"
    });

    // File Upload State
    const [files, setFiles] = useState([]);

    // Set the styles for the Dropzone Component
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
            })));
        }
    });
    
    // Map the sample Image for the DropZone
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

    // Re-render the Dropzone component once an image has been added/replace
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
  

    // Populate the Region list once the component has been rendered
    useEffect(() => {
        setRegionList(data.map((currentRegion) => {
            return currentRegion.region_name
        }));
    }, []);

    // Populate the Province List once a Region has been selected
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
    }, [selectedRegion]);                                                     // Region Variable
    
    // Populate the Municipality List once a Province has been selected
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
    }, [selectedProvince]);                                                     // Province Variable

    // Populate the Barangay List once a Municipality has been selected
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
    }, [selectedMunicipality]);                                                     // Municipality Variable

    // Form Submitter to API
    const submitClientForm = async (e) => {
        e.preventDefault();                                                         // Prevents the form to be submitted which will cause the page to refresh
        try {
            const formData = new FormData();                                        // Form Data to be passed as the request body for the HTTP POST request
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
            formData.append("role", "Client");
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
            <form onSubmit={submitClientForm}>
                <section>
                    <div>
                        <label className="block text-sm mb-1" htmlFor="name">First Name</label>
                        <input className="form-input" placeholder="Please enter a First Name" required 
                        onChange={(e) => 
                            setFirstName(e.target.value)
                        }/>
                    </div>
                    <div>
                        <label className="block text-sm mb-1" htmlFor="name">Last Name</label>
                        <input className="form-input" placeholder="Please enter a First Name" required
                        onChange={(e) => 
                            setLastName(e.target.value)
                        }/>
                    </div>
                    <div>
                        <label className="block text-sm mb-1" htmlFor="name">Username</label>
                        <input className="form-input" placeholder="Please enter a Username" required
                        onChange={(e) => 
                            setUsername(e.target.value)
                        }/>
                    </div>
                    <div>
                        <label className="block text-sm mb-1" htmlFor="name">Email</label>
                        <input className="form-input" placeholder="Please enter a Email" required
                        onChange={(e) => 
                            setEmail(e.target.value)
                        }/>
                    </div>
                    <div>
                        <label className="block text-sm mb-1" htmlFor="name">Phone Number</label>
                        <input className="form-input" placeholder="Please enter a Username" required
                        onChange={(e) => 
                            setPhoneNumber(e.target.value)
                        }/>
                    </div>
                    <div>
                        <label className="block text-sm mb-1" htmlFor="name">Password</label>
                        <input className="form-input" type="password" placeholder="Please enter a Username" required
                        onChange={(e) => 
                            setPassword(e.target.value)
                        }/>
                    </div>
                    <div>
                        <label className="block text-sm mb-1" htmlFor="name">Role</label>
                        <select className="form-select"
                        defaultValue="Please select a Role" 
                        size={state.regionState} 
                        value={role}
                        onChange={(e) => {
                            setRole(e.target.value)
                        }}>
                            <option disabled>Please select a Role</option>
                            {
                                ["Client", "Delivery Partner"].map((currentRole, roleKey)=>{
                                    return <option key={roleKey}> { currentRole } </option>
                                })
                            }
                        </select>
                    </div>
                </section>
                <section className="container">
                    {
                        files.length === 0 ?
                            <div {...getRootProps({className: 'dropzone'})}>
                                <input {...getInputProps()} />
                                <button className="btn btn-primary"
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
                <button className="btn btn-primary"type="submit">Test</button>
            </form>
        </div>
    )
}

export default Client
