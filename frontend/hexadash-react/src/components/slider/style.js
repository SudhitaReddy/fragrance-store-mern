import { Slider } from 'antd';
import Styled from 'styled-components';

const IconWrapper = Styled.div`
    position: relative;
    padding: 0px 30px;
    .anticon {
      position: absolute;
      top: -2px;
      width: 16px;
      height: 16px;
      line-height: 1;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.25);
    }      
    .anticon:first-child {
      left: 0;
    }      
    .anticon:last-child {
      right: 0;
    }
`;

const SliderStyle = Styled(Slider)`
  /* Ensure handles are circular and override any conflicting styles */
  .ant-slider-handle {
    border-radius: 50% !important;
    outline: none !important;
    box-sizing: border-box !important;
  }

  .ant-slider-handle-1,
  .ant-slider-handle-2 {
    border-radius: 50% !important;
    outline: none !important;
  }

  .ant-slider-dot {
    width: 8px;
    height: 8px;
    border: 2px solid #d9d9d9;
    background-color: #fff;
    
    &.ant-slider-dot-active {
      border-color: #8231D3;
    }
  }

  .ant-slider-mark {
    .ant-slider-mark-text {
      color: rgba(0, 0, 0, 0.65);
      font-size: 12px;
    }
  }
`;

export { IconWrapper, SliderStyle };
