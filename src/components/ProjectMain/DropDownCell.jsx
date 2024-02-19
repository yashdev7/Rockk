import React, { useState, useEffect, useRef } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export const DropDownCell = (props) => {
  const { dataItem, field, onChange } = props;
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const refreshToken = authTokens?.refresh_token;
  const [clientDetails, setClientDetails] = useState([]);
  const [selectedItemValue, setSelectedItemValue] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown open/close
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await fetch("http://3.13.185.49/client-listing", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        const data = await response.json();
        setClientDetails(data.message);
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    fetchClientDetails();
  }, [refreshToken]);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedItemValue(selectedValue);

    if (onChange) {
      onChange(selectedValue);
    }

    // Close the dropdown after selecting an item
    setIsDropdownOpen(false);
  };

  const handleDropDownOpen = () => {
    // Open the dropdown when in edit mode and client details are available
    if (dataItem.inEdit && clientDetails) {
      setIsDropdownOpen(true);
    }
  };

  const dataValue = dataItem[field] || "";

  return (
    <td>
      {selectedItemValue && typeof selectedItemValue === "object" ? (
        <p>{selectedItemValue.name}</p>
      ) : (
        dataItem.inEdit &&
        clientDetails && (
          <DropDownList
            ref={dropdownRef}
            style={{ width: "160px" }}
            data={clientDetails}
            textField="name"
            onChange={handleChange}
            open={isDropdownOpen} // Control dropdown open state
            onOpen={handleDropDownOpen} // Handle dropdown open event
          />
        )
      )}
    </td>
  );
};
