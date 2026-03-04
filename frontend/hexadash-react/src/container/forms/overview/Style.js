import Styled from 'styled-components';

const HorizontalFormStyleWrap = Styled.div`
    .ant-card{
        margin-bottom: 25px
    }
    .ant-form-horizontal{
        label{
            display: inline-block;
            font-weight: 500;
            margin-bottom: 24px;
            @media only screen and (max-width: 767px) {
                margin-bottom: 12px;
            }
        }
        .ant-form-item{
            margin-bottom: 25px !important;
        }
        .ant-input-affix-wrapper > input.ant-input{
            padding-top: 12px;
            padding-bottom: 12px;
        }
        .ant-input-affix-wrapper .ant-input-prefix svg{
            width: 16px;
            height: 16px;
            color: ${({ theme }) => theme[theme.mainContent]['extra-light-text']};
        }
        .ninjadash-form-action{
            margin: -7.5px;
            button{
                font-size: 14px;
                font-weight: 500;
                border-radius: 4px;
                margin: 7.5px;
                padding: 6.4px 19px;
                &.ant-btn-light{
                    height: 44px;
                    color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
                    background-color: ${({ theme }) => theme[theme.mainContent]['border-color-default']};
                    border-color: ${({ theme }) => theme[theme.mainContent]['border-color-default']};
                }
                &.ant-btn-primary{
                    height: 44px;
                    background-color: ${({ theme }) => theme['primary-color']};
                    border-color: ${({ theme }) => theme['primary-color']};
                    color: #ffffff;
                    &:hover, &:focus {
                        background-color: ${({ theme }) => theme['primary-hover']};
                        border-color: ${({ theme }) => theme['primary-hover']};
                        color: #ffffff;
                    }
                }
            }
            .ant-btn-light{
                background-color: ${({ theme }) => theme[theme.mainContent]['main-background-light']};
            }
        }
    }
    &.sDash_input-form{
        .ant-picker{
            width: 100%;
            &:focus{
                outline: none;
                box-shadow: 0 0;
            }
        }
    }
    ant-picker-input{
        &::placeholder{
            color: #9299B8 !important;
        }
    }
`;

const VerticalFormStyleWrap = Styled.div`
    .ant-card{
        margin-bottom: 25px
    }
    .ant-input-affix-wrapper > input.ant-input{
        padding-top: 12px;
        padding-bottom: 12px;
    }
    .ant-input-affix-wrapper .ant-input-prefix svg{
        width: 16px;
        height: 16px;
        color: ${({ theme }) => theme['gray-color']};
    }
    .ninjadash-form-action{
        margin: -7.5px;
        button{
            font-size: 14px;
            font-weight: 500;
            border-radius: 6px;
            margin: 7.5px;
            padding: 6.4px 19px;
            &.ant-btn-light{
                height: 44px;
                color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
                background-color: ${({ theme }) => theme[theme.mainContent]['border-color-default']};
                border-color: ${({ theme }) => theme[theme.mainContent]['border-color-default']};
            }
            &.ant-btn-primary{
                height: 44px;
                background-color: ${({ theme }) => theme['primary-color']};
                border-color: ${({ theme }) => theme['primary-color']};
                color: #ffffff;
                &:hover, &:focus {
                    background-color: ${({ theme }) => theme['primary-hover']};
                    border-color: ${({ theme }) => theme['primary-hover']};
                    color: #ffffff;
                }
            }
        }
        .ant-form-item{
            margin-bottom: 25px !important;
        }
        .ant-btn-light{
            background-color: ${({ theme }) => theme[theme.mainContent]['main-background-light']};
        }
    }
`;

const CheckListWrap = Styled.div`
    .ninjadash-check-list-wrap{
        display: flex;
        justify-content: space-between;
        gap: 30px;
        .ninjadash-check-list{
            flex: 1;
            list-style: none;
            padding: 0;
            margin: 0;
            li{
                display: flex;
                align-items: center;
                padding: 8px 0;
                &:not(:last-child){
                    margin-bottom: 12px;
                }
                .ant-checkbox-wrapper,
                .ant-radio-wrapper{
                    font-size: 14px;
                    color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                    .ant-checkbox,
                    .ant-radio{
                        margin-right: 8px;
                        .ant-checkbox-inner,
                        .ant-radio-inner{
                            width: 16px;
                            height: 16px;
                            border-color: ${({ theme }) => theme[theme.mainContent]['border-color-default']};
                        }
                        &.ant-checkbox-checked{
                            .ant-checkbox-inner{
                                background-color: ${({ theme }) => theme['primary-color']};
                                border-color: ${({ theme }) => theme['primary-color']};
                                &:after{
                                    border-color: #ffffff;
                                }
                            }
                        }
                        &.ant-radio-checked{
                            .ant-radio-inner{
                                border-color: ${({ theme }) => theme['primary-color']} !important;
                                background-color: transparent !important;
                                &:after{
                                    background-color: #ffffff !important;
                                    width: 8px !important;
                                    height: 8px !important;
                                    margin-top: -4px !important;
                                    margin-left: -4px !important;
                                }
                            }
                        }
                        &:hover{
                            .ant-checkbox-inner,
                            .ant-radio-inner{
                                border-color: ${({ theme }) => theme['primary-color']};
                            }
                        }
                    }
                    &.ant-checkbox-wrapper-disabled,
                    &.ant-radio-wrapper-disabled{
                        color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
                        cursor: not-allowed;
                        .ant-checkbox-inner,
                        .ant-radio-inner{
                            background-color: ${({ theme }) => theme[theme.mainContent]['border-color-default']};
                            border-color: ${({ theme }) => theme[theme.mainContent]['border-color-default']};
                        }
                    }
                }
            }
        }
        .ninjadash-check-list--left{
            /* Left column styles */
        }
        .ninjadash-check-list--right{
            /* Right column styles */
        }
        @media only screen and (max-width: 767px) {
            flex-direction: column;
            gap: 20px;
        }
    }
`;

const DropDownListComponents = Styled.div`
    .ninjadash_dropdown-list{
        .ant-dropdown-trigger{
            font-size: 14px;
            font-weight: 400;
            color: #9299B8;
            width: 100%;
            justify-content: flex-start;
            &:not(:last-child){
                margin-bottom: 25px;
            }
        }
    }
`;

const FormComponentsWrap = Styled.div`
    .sDash_datepicker-list{
        .ant-picker.ant-picker-range{
            width: 100%;
        }
    }
    .sDash_editor{
        border: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-secondary']};
        border-radius: 4px;
        .EditorToolbar__root___3_Aqz{
            padding: 12px 20px 0;
        }
        .DraftEditor-root{
            min-height: 100px;
            .public-DraftEditorPlaceholder-root{
                padding: 12px 20px 0;
            }
        }
        select{
            margin-top: -4px;
        }
        .Dropdown__value___34Py9{
            &:after,
            &:before{
                ${({ theme }) => (theme.rtl ? 'right' : 'left')}: auto;
                ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 10px;
            }
        }
    }
    .sDash_slider-list{
        margin: -25px 0;
        .ant-slider{
            margin: 25px 0;
        }
    }
    /* Switch/Toggle Button Styling */
    .ant-switch{
        background-color: ${({ theme }) => theme[theme.mainContent]['border-color-default']};
        &.ant-switch-checked{
            background-color: ${({ theme }) => theme['primary-color']};
        }
        &:focus{
            box-shadow: 0 0 0 2px ${({ theme }) => theme['primary-color']}20;
        }
        &:hover:not(.ant-switch-disabled){
            background-color: ${({ theme }) => theme[theme.mainContent]['border-color-default']};
            &.ant-switch-checked{
                background-color: ${({ theme }) => theme['primary-hover']};
            }
        }
        &.ant-switch-disabled{
            background-color: ${({ theme }) => theme[theme.mainContent]['border-color-default']};
            opacity: 0.6;
            &.ant-switch-checked{
                background-color: ${({ theme }) => theme['primary-color']}60;
            }
        }
    }
`;

const FormValidationWrap = Styled.div`
    .ant-card-body{
        padding: 30px 25px 50px 25px !important;
    }
    /* Input Styling */
    .ant-input{
        padding: 12px 20px;
        border-radius: 4px;
        border: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
        background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
        color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
        font-size: 14px;
        &:focus{
            border-color: ${({ theme }) => theme['primary-color']};
            box-shadow: 0 0 0 2px ${({ theme }) => theme['primary-color']}20;
        }
        &:hover{
            border-color: ${({ theme }) => theme['primary-color']};
        }
    }
    .ant-form-item-has-error{
        .ant-form-item-explain{
            font-size: 13px;
        }
        .ant-input{
            border-color: ${({ theme }) => theme['danger-color']};
            &:focus{
                border-color: ${({ theme }) => theme['danger-color']};
                box-shadow: 0 0 0 2px ${({ theme }) => theme['danger-color']}20;
            }
        }
    }
    .ant-form-item-has-success{
        .ant-input{
            border-color: ${({ theme }) => theme['success-color']};
            &:focus{
                border-color: ${({ theme }) => theme['success-color']};
                box-shadow: 0 0 0 2px ${({ theme }) => theme['success-color']}20;
            }
        }
    }
    .ant-form-item{
        .ant-form-item-label{
            >label{
                color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                font-weight: 500;
            }
        }
        margin-bottom: 20px;
    }
    .sDash_agree-check{
        .ant-form-item-control-input{
            min-height: auto;
        }
        .ant-form-item-has-error{
            .ant-checkbox-wrapper{
                span{
                    font-size: 13px;
                    color: ${({ theme }) => theme['danger-color']};
                }
                .ant-checkbox{
                    border-color: ${({ theme }) => theme['danger-color']}30;
                    &.ant-checkbox-checked{
                        border-color: ${({ theme }) => theme['danger-color']}30;
                        &:after{
                            border-color: ${({ theme }) => theme['danger-color']}30;
                        }
                        .ant-checkbox-inner{
                            &:after{
                                border-color: ${({ theme }) => theme['danger-color']};
                            }
                        }
                    }
                    .ant-checkbox-inner{
                        border-color: ${({ theme }) => theme['danger-color']}30;
                        background-color: ${({ theme }) => theme['danger-color']}30;
                    }
                }
            }
        }
        .ant-form-item-explain{
            margin-left: 25px;
            font-size: 13px;
        }
    }
    .ninjadash-form-action{
        margin: -7.5px;
        button{
            font-size: 14px;
            font-weight: 500;
            border-radius: 4px;
            margin: 7.5px;
            padding: 6.4px 29.2px;
            height: 44px;
            &.ant-btn-primary{
                background-color: ${({ theme }) => theme['primary-color']};
                border-color: ${({ theme }) => theme['primary-color']};
                color: #ffffff;
                &:hover, &:focus {
                    background-color: ${({ theme }) => theme['primary-hover']};
                    border-color: ${({ theme }) => theme['primary-hover']};
                    color: #ffffff;
                }
            }
        }
    }
    .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input, 
    .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:hover{
        background-color: ${({ theme }) => theme[theme.mainContent]['input-bg']};
    }
`;

export {
  HorizontalFormStyleWrap,
  VerticalFormStyleWrap,
  CheckListWrap,
  DropDownListComponents,
  FormComponentsWrap,
  FormValidationWrap,
};
