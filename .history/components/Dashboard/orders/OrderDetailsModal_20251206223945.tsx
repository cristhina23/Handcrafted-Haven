import React from 'react'

export default function OrderDetailsModal() {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-3/4 max-w-2xl">
              <h2 className="text-lg font-bold mb-4">Order Details</h2>
              <button
                className="mt-4 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
  )
}
