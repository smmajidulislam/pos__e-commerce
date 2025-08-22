"use client";
import React, { useState, useEffect } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import {
  useUpdateAttributeValueMutation,
  useDeleteAttributeValueMutation,
  useCreateAttributeValueMutation,
  useGetAttributesQuery,
} from "@/app/features/api/attributeApi";

const EditVariantValuesModal = ({ isOpen, setIsOpen, initialData }) => {
  const { data: attributesData } = useGetAttributesQuery();
  const attributes = attributesData?.attributes || [];

  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [values, setValues] = useState([]); // [{id?, value}]

  const [updateValue] = useUpdateAttributeValueMutation();
  const [deleteValue] = useDeleteAttributeValueMutation();
  const [createValue] = useCreateAttributeValueMutation();

  // Initialize modal data
  useEffect(() => {
    if (initialData) {
      setSelectedAttribute(initialData.id || "");
      setValues(
        initialData.values?.map((v) => ({ id: v.id, value: v.value })) || []
      );
    } else {
      setSelectedAttribute("");
      setValues([]);
    }
  }, [initialData]);

  if (!isOpen) return null;

  // Submit handler for update existing values
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const val of values) {
        if (val.id) {
          // Update existing value
          await updateValue({
            id: val.id,
            value: Array.isArray(val.value) ? val.value : [val.value],
          }).unwrap();
        }
      }
      setIsOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // Add new input field (create on blur)
  const handleAddValue = () => {
    if (!selectedAttribute) {
      alert("Please select an attribute first!");
      return;
    }
    setValues([...values, { value: "" }]);
  };

  // Create API call when input loses focus
  const handleValueBlur = async (index) => {
    const val = values[index];
    if (val.value && !val.id) {
      try {
        const response = await createValue({
          attributeId: selectedAttribute,
          values: [val.value],
        }).unwrap();
        const updated = [...values];
        updated[index].id = response?.id || null;
        setValues(updated);
      } catch (err) {
        console.error("Create failed:", err);
      }
    }
  };

  const handleValueChange = (index, newVal) => {
    const updated = [...values];
    updated[index].value = newVal;
    setValues(updated);
  };

  const handleDeleteValue = async (val) => {
    try {
      if (val.id) {
        await deleteValue(val.id).unwrap();
      }
      setValues(values.filter((v) => v !== val));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Variant Values</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Attribute Select */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Select Attribute
            </label>
            <select
              value={selectedAttribute}
              onChange={(e) => setSelectedAttribute(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>
                -- Select Attribute --
              </option>
              {attributes.map((attr) => (
                <option key={attr.id} value={attr.id}>
                  {attr.name}
                </option>
              ))}
            </select>
          </div>

          {/* Values List */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Variant Values
            </label>
            {values.map((val, index) => (
              <div
                key={val.id || index}
                className="flex items-center gap-2 mb-2 border p-2 rounded"
              >
                <input
                  type="text"
                  value={val.value}
                  onChange={(e) => handleValueChange(index, e.target.value)}
                  onBlur={() => handleValueBlur(index)}
                  className="border border-gray-300 rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder='Enter value e.g. ["kg", "g"]'
                  required
                />
                <button
                  type="button"
                  className="bg-red-500 !text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDeleteValue(val)}
                >
                  Delete
                </button>
              </div>
            ))}

            <button
              type="button"
              className="mt-2 px-4 py-2 bg-green-600 !text-white rounded hover:bg-green-700 flex items-center"
              onClick={handleAddValue}
            >
              <FaPlus className="mr-2" /> Add Value
            </button>
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-600 !text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVariantValuesModal;
