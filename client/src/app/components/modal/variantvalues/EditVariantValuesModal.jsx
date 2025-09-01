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
  const [values, setValues] = useState([]); // [{id?, value, isEditing?, isNew?}]

  const [updateValue] = useUpdateAttributeValueMutation();
  const [deleteValue] = useDeleteAttributeValueMutation();
  const [createValue] = useCreateAttributeValueMutation();

  // Modal data initialize
  useEffect(() => {
    if (initialData) {
      setSelectedAttribute(initialData.id || "");
      setValues(
        initialData.values?.map((v) => ({
          id: v.id,
          value: v.value,
          isEditing: false,
          isNew: false,
        })) || []
      );
    } else {
      setSelectedAttribute("");
      setValues([]);
    }
  }, [initialData]);

  if (!isOpen) return null;

  // Add new blank input
  const handleAddValue = () => {
    if (!selectedAttribute) {
      alert("Please select an attribute first!");
      return;
    }
    setValues([
      ...values,
      { value: "", isEditing: true, isNew: true }, // নতুন হলে save করতে হবে
    ]);
  };

  const handleValueChange = (index, newVal) => {
    const updated = [...values];
    updated[index].value = newVal;
    setValues(updated);
  };

  const handleSaveValue = async (val, index) => {
    try {
      if (val.isNew) {
        // create API
        const response = await createValue({
          attributeId: selectedAttribute,
          values: [val.value],
        }).unwrap();

        // কিছু backend array return করে, তাই handle করতে হবে
        const createdId =
          response?.id || response?.[0]?.id || response?.value?.id || null;

        const updated = [...values];
        updated[index] = {
          id: createdId,
          value: val.value,
          isEditing: false,
          isNew: false,
        };
        setValues(updated);
      } else if (val.isEditing) {
        // update API
        await updateValue({
          id: val.id,
          value: val.value, // 🟢 নিশ্চিত করলাম `value` পাঠাচ্ছি
        }).unwrap();

        const updated = [...values];
        updated[index].isEditing = false;
        setValues(updated);
      }
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleEditValue = (index) => {
    const updated = [...values];
    updated[index].isEditing = true;
    setValues(updated);
  };

  const handleDeleteValue = async (val) => {
    try {
      if (val.id) {
        // delete API সাধারণত শুধু id নেয়
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

        <div className="space-y-4">
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
                  disabled={!val.isEditing}
                  onChange={(e) => handleValueChange(index, e.target.value)}
                  className={`border border-gray-300 rounded-md p-2 flex-1 focus:outline-none focus:ring-2 ${
                    val.isEditing
                      ? "focus:ring-blue-400"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                  placeholder='Enter value e.g. "Small"'
                  required
                />
                {val.isEditing ? (
                  <button
                    type="button"
                    className="bg-green-600 !text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => handleSaveValue(val, index)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-yellow-500 !text-white px-3 py-1 rounded hover:bg-yellow-600"
                    onClick={() => handleEditValue(index)}
                  >
                    Edit
                  </button>
                )}
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
              className="mt-2 px-4 py-2 bg-blue-600 !text-white rounded hover:bg-blue-700 flex items-center"
              onClick={handleAddValue}
            >
              <FaPlus className="mr-2" /> Add New
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVariantValuesModal;
