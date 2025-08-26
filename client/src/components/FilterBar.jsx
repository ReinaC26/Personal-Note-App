import React, { useState } from 'react';

const FilterBar = ({ onFilter, filterColor, colorKey }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (color) => {
    onFilter(color);
    setIsOpen(false);
  };

  const selectedColor = colorKey.find(p => p.key === filterColor) || { key: 'all' };

  return (
    <div className="custom-dropdown" onClick={toggleDropdown}>
      <div className="dropdown-selected-color" style={{ backgroundColor: selectedColor.bg }}>
        {selectedColor.key === 'all' && 'All'}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <div
            className="dropdown-option all-notes"
            onClick={() => handleSelect('all')}
          >
            All
          </div>
          {colorKey.map((p) => (
            <div
              key={p.key}
              className="dropdown-option"
              onClick={() => handleSelect(p.key)}
              style={{ backgroundColor: p.bg }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBar;