import React from 'react';

interface Props {
  description: string
}
function ProductDescription({ description }: Props) {
  return (
    <div
      className="text-lg bg-white border border-slate-200
        text-slate-800 shadow-sm p-9 rounded-xl hover:shadow-lg transition-all duration-200 ease-out
      "
    >
      <h3 className='font-bold text-xl mb-4 '>Product Description</h3>
      {description}
    </div>
  );
}

export default ProductDescription;
