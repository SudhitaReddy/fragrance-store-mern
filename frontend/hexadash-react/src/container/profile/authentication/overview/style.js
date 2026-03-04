import Styled from 'styled-components';

const AuthenticationWrap = Styled.div`
  position: relative;
  padding: 120px 0;
  background-position: top;
  background-repeat: no-repeat;
  background-size: 100%;
  @media only screen and (max-width: 1399px){
    padding: 80px 0;
  }
  .ninjadash-authentication-wrap{
    @media only screen and (max-width: 767px){
      padding: 0 15px;
    }
  }
  .ninjadash-authentication-brand{
    text-align: center;
  }
`;

const Content = Styled.div`
    padding: 100px;
    @media only screen and (max-width: 1599px){
      padding: 50px;
    }
    @media only screen and (max-width: 991px){
      padding: 20px;
    }
    @media only screen and (max-width: 767px){
      text-align: center;
    }
    .auth-content-figure{
      @media only screen and (max-width: 1199px){
        max-width: 420px;
      }
      @media only screen and (max-width: 991px){
        max-width: 100%;
      }
    }
`;

const AuthFormWrap = Styled.div`

  border-radius: 6px;
  margin-top: 25px;
  box-shadow: 0 5px 20px rgba(140,144,164,.08);
  background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
  .ninjadash-authentication-top{
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-secondary']};
    .ninjadash-authentication-top__title{
      font-size: 20px;
      font-weight: 600;
      line-height: 1;
      margin-bottom: 0;
      color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
    }
  }
  .ninjadash-authentication-content{
    padding: 30px 40px;
    @media only screen and (max-width: 1599px){
      padding: 30px;
    }
    .ant-form-item-label {
      > label{
        font-size: 14px;
        font-weight: 500;
        color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
      }
    }
    .ant-form-item{
      margin-bottom: 25px;
    }
    .ant-input,
    .ant-input-affix-wrapper{
      border-radius: 6px;
      border: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-secondary']};
      
      &:focus,
      &:focus-within{
        border-color: ${({ theme }) => theme['primary-color']};
        box-shadow: 0 0 0 2px ${({ theme }) => theme['primary-color']}20;
      }
      
      &::placeholder{
        color: ${({ theme }) => theme[theme.mainContent]['extra-light-text']};
      }
    }
    
    .ant-input{
      padding: 12px 20px;
    }
    
    .ant-input-affix-wrapper{
      padding: 8px 20px;
      
      > input.ant-input{
        padding: 4px 0;
        border: none;
        box-shadow: none;
        
        &:focus{
          border: none;
          box-shadow: none;
        }
      }
    }
    .ant-form-item-explain-error{
      font-size: 13px;
      margin-top: 2px;
    }
    .ninjadash-auth-extra-links{
      display: flex;
      justify-content: space-between;
      margin-top: -5px;
      .ant-checkbox-wrapper{
        span{
          font-size: 13px;
          color: ${({ theme }) => theme[theme.mainContent]['light-text']};
        }
        .ant-checkbox{
          &+span{
            position: relative;
            top: -2px;
          }
        }
      }
      .forgot-pass-link{
        font-size: 13px;
        color: ${({ theme }) => theme['primary-color']};
      }
    }
    .btn-signin,
    .btn-reset,
    .btn-create{
      font-size: 14px;
      font-weight: 500;
      border-radius: 6px;
      width: 100%;
      min-height: 48px;
      margin-top: 25px;
    }
    .btn-signin{
      &.ant-btn-primary {
        background-color: ${({ theme }) => theme['primary-color']};
        border-color: ${({ theme }) => theme['primary-color']};
        
        &:hover,
        &:focus {
          background-color: ${({ theme }) => theme['primary-color']};
          border-color: ${({ theme }) => theme['primary-color']};
          opacity: 0.9;
        }
      }
    }
    .btn-reset{
      margin-top: 0;
    }
    .ninjadash-form-divider{
      font-size: 14px;
      color: #999999;
      text-align: center;
      position: relative;
      margin: 30px 0;
      &:before{
        content: '';
        position: absolute;
        width: 100%;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        height: 1px;
        background: #e8e8e8;
      }
      span{
        font-weight: 500;
        padding: 0 20px;
        display: inline-block;
        position: relative;
        z-index: 2;
        background: ${({ theme }) => theme[theme.mainContent]['white-background'] || '#ffffff'};
        color: ${({ theme }) => theme[theme.mainContent]['gray-text'] || '#999999'};
      }
    }
    .ant-input-affix-wrapper {
      &.ant-input-password{
        input{
          color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
        }
        
        .ant-input-suffix {
          color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
          cursor: pointer;
          
          &:hover {
            color: ${({ theme }) => theme['primary-color']};
          }
        }
      }
    }
    .ninjadash-social-login{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: -6px;
      &.signin-social{
        li{
          a{
            background-color: #fff;
          }
        }
      }
      li{
        padding:15px 6px;
        a{
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          height: 48px;
          padding: 0 15px;
          background: ${({ theme }) => theme[theme.mainContent]['general-background']};
          color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
          font-weight: 500;
          transition: background-color 0.3s;
          @media only screen and (max-width: 1399px){
            padding: 0 12px;
          }
          @media only screen and (max-width: 379px){
            height: 44px;
          }
          span:not(.anticon){
            display: inline-block;
            margin-left: 5px;
          }
          svg,
          i{
            width: 20px;
            height: 20px;
          }
          &.google-social{
            background-color: #F0654810;
            color: #F06548;
            &:hover{
              background-color: #F06548;
              svg path{
                fill: #FFFFFF;
              }
            }
            svg path{
              fill: #F06548;
            }
            div{
              height: 20px;
            }
          }
          &.facebook-social{
            background-color: #3A589B10;
            color: #3A589B;
            &:hover{
              background-color: #3A589B;
              color: #FFFFFF;
            }
          }
          &.twitter-social{
            background-color: #03A9F410;
            color: #03A9F4;
            &:hover{
              background-color: #03A9F4;
              color: #FFFFFF;
            }
          }
          &.github-social{
            background-color: #03A9F410;
            color: #090E30;
            &:hover{
              background-color: #03A9F4;
              color: #FFFFFF;
            }
          }
        }
      }
    }
  }
  .ninjadash-authentication-bottom{
    text-align: center;
    padding: 25px;
    border-radius: 0 0 6px 6px;
    background-color: ${({ theme }) => theme[theme.mainContent]['dark-background'] || '#f8f9fa'};
    p{
      font-size: 14px;
      font-weight: 500;
      color: ${({ theme }) => theme[theme.mainContent]['gray-text'] || '#666666'};
      margin-bottom: 0;
      a{
        color: ${({ theme }) => theme['primary-color'] || '#5F63F2'};
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s ease;
        
        &:hover {
          color: ${({ theme }) => theme['primary-color'] || '#5F63F2'};
          text-decoration: underline;
        }
      }
    }
  }
  .auth-contents{
    display: flex;
    align-items: center;
    justify-content: center;
    form{
      width: 420px;
      h1{
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 45px;
        @media only screen and (max-width: 767px){
          margin-bottom: 28px;
        }
        input::placeholder{
          color: ${({ theme }) => theme['extra-light-color']};
        }
      }
      .auth-form-action{
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        @media only screen and (max-width: 379px){
          flex-flow: column;
          .forgot-pass-link{
            margin-top: 15px;
          }
        }
      }
    }
    #forgotPass{
      .forgot-text{
        margin-bottom: 25px;
      }
      .return-text{
        margin-top: 35px;
      }
    }


  }
  .auth-buttons{
    margin: 20px 0;
    display: flex;
   
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0 6px;
    
    a{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      height: 56px;
      min-width: 170px;
     
      background-color: ${({ theme }) => theme['primary-color'] || '#5F63F2'};
      color: #ffffff;
      font-weight: 600;
      font-size: 14px;
      border: 2px solid ${({ theme }) => theme['primary-color'] || '#5F63F2'};
      border-radius: 5px;
      margin: 6px;
      flex: 1;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(95, 99, 242, 0.1);
      
      &:hover {
        background: ${({ theme }) => theme['primary-color'] || '#5F63F2'};
        color: #ffffff;
        text-decoration: none;
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(95, 99, 242, 0.2);
      }
      
      &:active {
        transform: translateY(0);
      }
      
      @media (max-width: 480px){
        width: 100%;
        max-width: 280px;
        min-width: auto;
      }
    }
    
    @media (min-width: 768px) {
      flex-direction: row;
      gap: 5px;
    }
  }
  
  .auth0-login{
    margin: -6px;
    display: flex;
    flex-wrap: wrap;
    a{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      height: 48px;
      padding: 0 26px;
      background: ${({ theme }) => theme['bg-color-light']};
      color: ${({ theme }) => theme['text-color']};
      font-weight: 500;
      border: 0 none;
      border-radius: 5px;
      margin: 6px;
      flex: 1;
      @media (max-width:480px){
        flex: none;
        width: 100%;
      }
    }
  }
`;

const AuthWrapper = AuthenticationWrap;

export { AuthenticationWrap, Content, AuthFormWrap, AuthWrapper };
