// NPM Modules
import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useHistory } from 'react-router';

// Moduled Functions
import { axiosAPIHeader } from "src/Middleware/Axios"
import { notify } from "src/Services/Toaster";

// Assets
let data = require("src/Services/Philippines/main.json");

const TransactionCreate = () => {
    // Redux User State
    const { id, email, role, address } = useSelector((state) => state.user)                          // Logged/Current User's UUID, Email, Adress, Role

    // Component Initial Variables
    const history = useHistory();                                                                    // Navigation to react routes
    const [ formData, setFormData ] = useState({                                                     // All input fields value field
        user_information: {
            user: email,
            user_id: id,
            user_role: role
        },
        receiver_information: {
            receiver_name: ["Full Name", "receiversFullName", "text", ""],
            receiver_phone_number: ["Phone Number", "receiversPhoneNumber", "number", ""],
            receiver_email: ["Email Address", "receiversEmailAddress", "email", ""],
        },
        pick_up_address: {
            region: address.region,
            province: address.province,
            municipality: address.municipality,
            barangay: address.barangay
        },
        target_address: {
            region: "",
            province: "",
            municipality: "",
            barangay: ""
        },
        products: [],
        category: "Select an Industry Category",
        notes: ""
    });
    // Select and Option section for target address
    const [ addressLocation, setAddressLocation ] = useState({
        regionList: [],
        selectedRegion: "",
        provinceList: [],
        selectedProvince: "Please select a Region",
        municipalityList: [],
        selectedMunicipality: "Please select a Province",
        barangayList: [],
        selectedBarangay: "Please select a Municipality",
    });
    // Select component expand size
    const [ state, setState ] = useState({ 
        regionState: 1, 
        provinceState: 1,
        municipalitState: 1,
        barangayState: 1
    });
    // Check current client breakpoint
    const isMobile = useMediaQuery({                                            // Basis for responsive styling
        query: "(max-width: 800px)"
    });

    // Checks all formData field if it has been populated under the right circumstance
    const formDataValidation = (dataObject) => {
        try {
            let checkObjectFields = Object.values(dataObject).some((currentField) => {               // Checks if all first child does not contain an empty string
                return currentField === ""
            });
            if(checkObjectFields) {
                throw new Error("Please complete Transaction Information Fields!")                   // Throws if the first requirement has a value of true
            }
            if(dataObject.products.length === 0) {
                throw new Error("Please add a Product in the Listing!")                              // Throws an error if there is no product in the product array 
            }
            let checkAllProductsIfNotEmpty = Object.values(dataObject.products).some((currentField) => {    // Checks the product array if the populated fields contains an empty string
                return currentField.product_name === "" || currentField.product_weight === ""
            });
            if(checkAllProductsIfNotEmpty) {
                throw new Error("Please complete the Products Fields!")                              // Throws an error if the product array indexes fields contains an empty string
            }
        } catch (err) {
            throw new Error(err.message)                                                             // Throw backs to the parent/callback the err message to be passed to the Toaster
        }
    }

    // Form Submitter to API
    const handleSubmitFormData = async (dataEvent) => {
        dataEvent.preventDefault();                                                                  // Prevents the form to be submitted which will cause the page to refresh
        try {
            let formDataObject = {                                                                   // Form Data to be passed as the request body for the HTTP POST request
                ...formData,
                receiver_information: {
                    receiver_name: formData.receiver_information.receiver_name[3],
                    receiver_phone_number: formData.receiver_information.receiver_phone_number[3],
                    receiver_email: formData.receiver_information.receiver_email[3],
                },
                target_address: {
                    region: addressLocation.selectedRegion,
                    province: addressLocation.selectedProvince,
                    municipality: addressLocation.selectedMunicipality,
                    barangay: addressLocation.selectedBarangay,
                }
            }
            formDataValidation(formDataObject)                                                       // Checks all formData field if it has been populated under the right circumstance
            let postNewTransaction = await axiosAPIHeader.post("transaction/user/transaction/create", formDataObject)
            notify(postNewTransaction.data.message, "success")
            history.push(`/dashboard/transaction/${postNewTransaction.data.payload._id}`)           // Move to Transaction Page
        } catch (err) {
            err.response ? notify(err.response.data.message, "error") : notify(err.message, "error")  
        }
    }
    
    // Populate the Region list once the component has been rendered
    useEffect(() => {
        setAddressLocation((currentAddressData) => {
            return {
                ...currentAddressData,
                regionList: data.map((currentRegion) => { return currentRegion.region_name })
            }
        });
    }, []);

    // Populate the Province List once a Region has been selected
    useEffect(() => {
        setAddressLocation((currentAddressData) => {
            let listOfProvinces = [];
            let selectedRegionData = data.map((currentData) => {
                return currentData.region_name
            }).indexOf(addressLocation.selectedRegion);
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
            return {
                ...currentAddressData,
                provinceList: listOfProvinces,
            }
        });
    // eslint-disable-next-line
    }, [addressLocation.selectedRegion]);                                                     // Region Variable
    
    // Populate the Municipality List once a Province has been selected
    useEffect(() => {
        setAddressLocation((currentAddressData) => {
            let listOfMunicipality = [];
            data.map((currentData) => {
                // eslint-disable-next-line
                return currentData.provinces.map((currentProvince) => {
                    if(currentProvince.province_name === addressLocation.selectedProvince){
                        return currentProvince.municipalities.map((currentMunicipality) => {
                            return listOfMunicipality.push(currentMunicipality.municipality_name) 
                        })
                    }
                })
            })
            return {
                ...currentAddressData,
                municipalityList: listOfMunicipality
            }
        });
    }, [addressLocation.selectedProvince]);                                                     // Province Variable

    // Populate the Barangay List once a Municipality has been selected
    useEffect(() => {
        let liftOfBarangay = [];
        setAddressLocation((currentAddressData) => {
            data.map((currentData) => {
                // eslint-disable-next-line
                return currentData.provinces.map((currentProvince) => {
                    if(currentProvince.province_name === addressLocation.selectedProvince){
                        // eslint-disable-next-line
                        return currentProvince.municipalities.map((currentMunicipality) => {
                            if(currentMunicipality.municipality_name === addressLocation.selectedMunicipality){
                                // eslint-disable-next-line
                                currentMunicipality.barangays.map((currentBarangay) => {
                                    liftOfBarangay.push(currentBarangay)
                                })
                            }
                        })
                    }
                })
            })
            return {
                ...currentAddressData,
                barangayList: liftOfBarangay
            }
        })
    // eslint-disable-next-line
    }, [addressLocation.selectedMunicipality]);                                                     // Municipality Variable

    return (
        <div>
            <form 
                onSubmit={(e) => {
                    handleSubmitFormData(e)
                }}
            >
                {
                    Object.values({
                        ...formData.receiver_information,
                        category: ["Category", "receiversCategory", "text", ""],
                        notes: ["Notes for Delivery Parnter", "receiversDeliveryPartnerText", "text", ""],
                    }).map((currentReceiverInformation, informationKey) => {
                        return (
                            <div key={informationKey}>
                                <label htmlFor={currentReceiverInformation[1]}>
                                    { currentReceiverInformation[0] }
                                </label>
                                {
                                    informationKey === 3 ? 
                                    <select
                                        onChange={(e) => {
                                            setFormData((currentFormData) => {
                                                return {
                                                    ...currentFormData,
                                                    category: e.target.value
                                                }
                                            })
                                        }}
                                        defaultChecked={formData.category}
                                        defaultValue={formData.category}
                                    >
                                        {
                                            [
                                                "Select an Industry Category",
                                                "Product Delivery",
                                                "Food Delivery",
                                                "Document Delivery"
                                            ].map((currentCategory, key) =>{
                                                return (
                                                    currentCategory === "Select an Industry Category" ?
                                                    <option key={key} disabled>{currentCategory} </option>
                                                    :
                                                    <option key={key}>{currentCategory} </option>
                                                )
                                            })
                                        }
                                    </select>
                                    :
                                    <input 
                                        id={currentReceiverInformation[1]}
                                        type={currentReceiverInformation[2]}
                                        onChange={(e)=> {
                                            informationKey === 4 ?
                                            setFormData((currentFormData) => {
                                                return {
                                                    ...currentFormData,
                                                    notes: e.target.value
                                                }
                                            })
                                            :
                                            setFormData((currentFormData) => {
                                                return {
                                                    ...currentFormData,
                                                    receiver_information: {
                                                        ...currentFormData.receiver_information,
                                                        [`${informationKey === 0 ? "receiver_name" : informationKey === 1 ? "receiver_phone_number" : "receiver_email"}`]: 
                                                        formData.receiver_information[`${informationKey === 0 ? "receiver_name" : informationKey === 1 ? "receiver_phone_number" : "receiver_email"}`].map((currentIndex, indexKey) => {
                                                            return indexKey === 3 ? e.target.value : currentIndex
                                                        })
                                                    }
                                                }
                                            })
                                        }}
                                        placeholder="Please enter receiver's Full Name"
                                    />
                                }
                            </div>
                        )
                    })
                }
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
                            setAddressLocation((currentAddressData) => {
                                return {
                                    ...currentAddressData,
                                    selectedRegion: e.target.value,
                                    selectedProvince: "Select your option",
                                    selectedMunicipality: "Please select a Province",
                                    selectedBarangay: "Please select a Municipality"
                                }
                            })
                        }}>
                            <option disabled>Select your option</option>
                            {
                                addressLocation.regionList && addressLocation.regionList.map((currentRegion, regionKey)=>{
                                    return <option key={regionKey}> { currentRegion } </option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm mb-1" >Provinces</label>
                        <select className="form-select"
                        value = { addressLocation.selectedProvince }
                        size={state.provinceState} 
                        {...( addressLocation.selectedRegion === "" ? { 
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
                            setAddressLocation((currentAddressData) => {
                                return {
                                    ...currentAddressData,
                                    selectedProvince: e.target.value,
                                    selectedMunicipality: "Select your option",
                                    selectedBarangay: "Please select a Municipality"
                                }
                            })
                        }}>
                            {
                                addressLocation.selectedRegion === "" ? 
                                <option disabled>Please select a Region</option>
                                :
                                <option disabled>Select your option</option>
                            }
                            {
                                addressLocation.provinceList && addressLocation.provinceList.map((currentProvince, provinceKey)=>{
                                    return <option key={provinceKey}> { currentProvince } </option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm mb-1" >Municipality</label>
                        <select className="form-select"
                        value = { addressLocation.selectedMunicipality }
                        size={state.municipalitState} 
                        {...( addressLocation.selectedProvince === "Please select a Region" || addressLocation.selectedProvince === "Select your option" ? { 
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
                            setAddressLocation((currentAddressData) => {
                                return {
                                    ...currentAddressData,
                                    selectedMunicipality: e.target.value,
                                    selectedBarangay: "Select your option"
                                }
                            })
                        }}>
                            {
                                addressLocation.selectedProvince === "Please select a Region" || addressLocation.selectedProvince === "Select your option" ? 
                                <option disabled>Please select a Province</option>
                                :
                                <option disabled>Select your option</option>
                            }
                            {
                                addressLocation.municipalityList && addressLocation.municipalityList.map((currentMunicipality, municipalityKey)=>{
                                    return <option key={municipalityKey}> { currentMunicipality } </option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm mb-1" >Barangay</label>
                        <select className="form-select"
                        value = { addressLocation.selectedBarangay }
                        size={state.barangayState} 
                        {...( addressLocation.selectedMunicipality === "Please select a Province" || addressLocation.selectedMunicipality === "Select your option" ? { 
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
                            setAddressLocation((currentAddressData) => {
                                return {
                                    ...currentAddressData,
                                    selectedBarangay: e.target.value
                                }
                            })
                        }}>
                            {
                                addressLocation.selectedMunicipality === "Please select a Province" || addressLocation.selectedMunicipality === "Select your option" ? 
                                <option disabled>Please select a Municipality</option>
                                :
                                <option disabled>Select your option</option>
                            }
                            {
                                addressLocation.barangayList && addressLocation.barangayList.map((currentBarangay, barangayKey)=>{
                                    return <option key={barangayKey}> { currentBarangay } </option>
                                })
                            }
                        </select>
                    </div>
                </section>
                <div>
                    <button 
                        // Prevent Form to be submitted
                        type="button"
                        onClick={() => {
                            setFormData((currentFormData) => {
                                return {
                                    ...currentFormData,
                                    products: [
                                        ...currentFormData.products,
                                        {
                                            product_name: "",
                                            product_weight: ""
                                        }
                                    ]
                                }
                            })
                            // Prevent Form to be submitted
                            return false
                        }}
                    >
                        Add Product Listing
                    </button>
                    {
                        formData.products.map((currentProduct, productKey) => {
                            return (
                                <div key={productKey} className="flex">
                                    <input 
                                        type="text"
                                        value={formData.products[productKey].product_name}
                                        placeholder="Add Product Description"
                                        onChange={(e) => {
                                            return setFormData((currentData) => {
                                                currentData.products[productKey] = {
                                                    product_name: e.target.value,
                                                    product_weight: formData.products[productKey].product_weight
                                                }
                                                return {
                                                    ...currentData
                                                }
                                            })
                                        }}
                                    />
                                    <input 
                                        type="text"
                                        value={formData.products[productKey].product_weight}
                                        placeholder="Add Weight in Kilograms"
                                        onChange={(e) => {
                                            return setFormData((currentData) => {
                                                currentData.products[productKey] = {
                                                    product_name: formData.products[productKey].product_name,
                                                    product_weight: e.target.value
                                                }
                                                return {
                                                    ...currentData
                                                }
                                            })
                                        }}
                                    />
                                    <button 
                                        // Prevent Form to be submitted
                                        type="button"
                                        onClick={() => {
                                            setFormData((currentFormData) => {
                                                currentFormData.products.splice(productKey, 1)
                                                return {
                                                    ...currentFormData
                                                }
                                            })
                                            // Prevent Form to be submitted
                                            return false
                                        }}
                                    >
                                        Remove Product
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
                <button type="submit">test</button>
            </form>
        </div>
    )
}

export default TransactionCreate