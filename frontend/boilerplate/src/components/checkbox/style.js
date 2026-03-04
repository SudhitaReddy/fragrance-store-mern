import { Checkbox } from 'antd';
import Styled from 'styled-components';

const CheckboxStyle = Styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${({ theme }) => theme['primary-color']} !important;
    border-color: ${({ theme }) => theme['primary-color']} !important;
  }
  
  .ant-checkbox-checked:hover .ant-checkbox-inner {
    background-color: ${({ theme }) => theme['primary-hover']} !important;
    border-color: ${({ theme }) => theme['primary-hover']} !important;
  }
  
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: ${({ theme }) => theme['primary-color']} !important;
  }
  
  .ant-checkbox-indeterminate .ant-checkbox-inner {
    background-color: ${({ theme }) => theme['primary-color']} !important;
    border-color: ${({ theme }) => theme['primary-color']} !important;
  }
  
  .ant-checkbox-indeterminate:hover .ant-checkbox-inner {
    background-color: ${({ theme }) => theme['primary-hover']} !important;
    border-color: ${({ theme }) => theme['primary-hover']} !important;
  }
`;

export { CheckboxStyle };
