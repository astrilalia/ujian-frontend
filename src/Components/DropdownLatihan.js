import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const DropdownLatihan = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
            Users
        </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>{props.id}</DropdownItem>
            </DropdownMenu>
    </Dropdown>
  );
}

export default DropdownLatihan;