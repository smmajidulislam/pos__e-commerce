"use client";
import { useState } from "react";

const AttributeSelector = ({ register, attributeGroups }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
      <label className="block mb-1 font-semibold text-gray-700">
        Attribute
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full border border-gray-300 rounded-md p-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Select Attributes
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-5">
            <h3 className="text-lg font-semibold mb-4">Select Attributes</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {attributeGroups &&
                Object.entries(attributeGroups).map(([groupName, attrs]) => (
                  <div
                    key={groupName}
                    className="border rounded-md p-3 bg-gray-50"
                  >
                    <span className="font-semibold text-gray-700 mb-2 block">
                      {groupName}
                    </span>
                    <div className="flex flex-col space-y-1">
                      {attrs.map((attr) => (
                        <label
                          key={attr.id}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            {...register("attributes")}
                            value={attr.id}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-gray-800">{attr.value}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-md bg-blue-600 !text-white hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttributeSelector;
