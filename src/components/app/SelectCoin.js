import * as React from 'react';
import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled from '@mui/base/OptionUnstyled';
import { styled } from '@mui/system';
import { PopperUnstyled } from '@mui/base';

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 1.2rem;
  box-sizing: border-box;
  width: 110px;
  height: 40px;
  background: linear-gradient(135deg, rgba(0, 245, 255, 0.1) 0%, rgba(0, 232, 125, 0.1) 87.58%, rgba(0, 230, 106, 0.1) 100%);
  border: solid 1px rgba(0, 232, 125, 0.5);
  border-radius: 50px;
  padding: 0px 10px;
  text-align: left;
  line-height: 1.5;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 99;

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }`,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 0px 0;
  background: #062a20;
  border-radius: 0.75em;
  color: white;
  overflow: auto;
  outline: 0px;
  `,
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  background: transparent;
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    background: #093e2f;
  }
  &:last-of-type {
    border-bottom: none;
  }
  & img {
    margin-right: 10px;
  }`,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
});

CustomSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.func,
    Root: PropTypes.elementType,
  }),
};

const def_coins = [
  { code: 0, label: 'BNB' },
  { code: 1, label: 'BUSD' }
];

export default function UnstyledSelectRichOptions({ value, coins = def_coins, onChange, disabled }) {
  return (
    <CustomSelect defaultValue={0} value={value} onChange={onChange} disabled={disabled}>
      {coins.map((c) => (
        <StyledOption key={c.code} value={c.code}>
          <img
            loading="lazy"
            width="25"
            src={`/images/icons/${c.label.toLowerCase()}.png`}
            alt={`${c.label}`}
          />
          <span className='text-[16px]'>{c.label}</span>
        </StyledOption>
      ))}
    </CustomSelect>
  );
}