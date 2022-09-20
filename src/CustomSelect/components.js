import React, { memo } from 'react';
import { components } from 'react-select';

// import Icon from '../Icon';
// import { DownArrow16Icon } from '../../SvgIcon';

export const DropdownIndicator = memo(
    (props) =>
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                {/* <DownArrow16Icon /> */}
            </components.DropdownIndicator>
        )
);

DropdownIndicator.displayName = 'DropdownIndicator';

export const ClearIndicator = memo(
    (props) =>
        components.ClearIndicator && (
            <components.ClearIndicator {...props}>
                {/* <Icon fontType="close" size="16" /> */}
            </components.ClearIndicator>
        )
);

ClearIndicator.displayName = 'ClearIndicator';
