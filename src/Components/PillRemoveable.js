import React from 'react';
import '../Styles/PillRemoveable.css';

function PillRemoveable({ text, onRemove }) {
  return (
    <button className='pill-removeable' onClick={onRemove}>
      {text}
      <div className='icon-container'>X</div>
    </button>
  );
}

export default PillRemoveable;
