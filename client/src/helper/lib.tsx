import { Link } from "react-router-dom";
import styled, { ThemeProps } from "styled-components";
import { Theme } from "./theme";
import {
  MailOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";

export const Section = styled.section`
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VideoShowCase = styled.section`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  filter: blur(0);

  .video {
    min-width: 100%;
    min-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }

  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(19, 18, 18, 0.5);
  }
`;

export const VideoContent = styled.div`
  position: relative;
  align-items: center;
  text-align: center;
  color: white;
  z-index: 10;
  margin-top: -5%;
  display: flex;
  flex-direction: column;

  .h1 {
    font-size: 2rem;
  }

  a {
    width: 100px;
    color: white;
    padding: 10px 0;
    margin-top: 1rem;
    border: 2px solid white;
  }
`;

export const HeaderSection = styled.header``;

export const DynamicHeaderSection = styled.header`
  height: 0px;
`;

export const BodySection = styled.section`
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;
  margin-top: -1rem;
`;

export const Grid = styled.div`
  max-width: 1920px;
  margin: auto;
  display: grid;
  z-index: 2;
  grid-template-columns: repeat(10, 1fr);
  grid-row-gap: 0px;
  justify-items: center;
  @media (min-width: 1000px) {
    .toggle-btn {
      display: none;
    }
  }
  @media (max-width: 1000px) {
    .logo-toggle,
    .menu-toggle {
      display: none;
    }
    .toggle-btn {
      grid-column: 5 / 6;
      .show {
        visibility: visible;
        z-index: 2;
        transform: scale(1);
      }
    }
  }
`;

export const MenuContainer1 = styled.div`
  grid-column: 4 / 5;
`;

export const MenuContainer2 = styled.div`
  grid-column: 5 / 6;
`;

export const MenuContainer3 = styled.div`
  grid-column: 6 / 7;
`;

export const MenuContainer4 = styled.div`
  grid-column: 7 / 8;
`;

export const MenuLogo = styled.a`
  grid-column: 4 / 8;
  text-decoration: none;
  color: black;
  font-weight: bold;
  &:hover {
    text-decoration: none;
  }
`;

export const MenuDeco = styled.a`
  text-decoration: none;
  color: black;
  font-weight: bold;
  &:hover {
    text-decoration: none;
  }
`;

export const MenubarLogo = styled.a`
  grid-column: 5 / 6;
  cursor: pointer;
  color: black;
  font-size: 25px;
`;

export const TransactionsLogo = styled.a`
  cursor: pointer;
  grid-column: 9 / 10;
  color: black;
  font-size: 25px;
  padding: 1rem;
`;

export const CartLogo = styled.a`
  cursor: pointer;
  grid-column: 10 / 11;
  color: black;
  font-size: 25px;
  padding: 1rem;
`;

export const UserLogo = styled.a`
  cursor: pointer;
  grid-column: 1 / 2;
  color: black;
  font-size: 25px;
  padding: 1rem;
`;

export const DropdowLogo = styled.div`
  grid-column: 1 / 2;
`;

export const FooterLink = styled.a`
  text-decoration: none;
  color: white;
  &:hover {
    text-decoration: none;
  }
`;

export const HighlightLink = styled(Link)`
  color: #bf1650;
  text-decoration: none;
  &:hover {
    color: hotpink;
    text-decoration: none;
  }
`;

export const Listing = styled.li`
  text-decoration: none;
  display: inline-block;
  margin-right: 40px;
  color: black;
`;

export const FooterSection = styled.footer`
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: black;
  color: white;
  font-size: 0.7rem;
  padding-left: 7vw;
  padding-right: 7vw;
  flex: auto;
  font-size: 1rem;
`;

export const FooterBreadCrumb = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid grey;
  font-weight: bold;
`;

export const FooterNavigation = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-row-gap: 0px;
  text-align: left;
  flex-wrap: wrap;
`;

export const TextArea = styled.textarea`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid black;
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 14px;
`;

export const Form = styled.form`
  max-width: 500px;
  margin: 1rem auto 30px;
`;

export const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid black;
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 14px;
`;

export const SubmitInput = styled.input.attrs({
  type: "submit",
})`
  background: #ec5990;
  color: black;
  text-transform: uppercase;
  width: 100%;
  border-radius: 4px;
  border: none;
  margin-top: 20px;
  padding: 20px;
  font-size: 16px;
  font-weight: 100;
  letter-spacing: 10px;
  -webkit-appearance: none;
  &:hover {
    background: #bf1650;
  }
  &:active {
    transition: 0.3s all;
    transform: translateY(3px);
    border: 1px solid transparent;
    opacity: 0.8;
  }
`;

export const Button = styled.button`
  background: #ec5990;
  color: black;
  text-transform: uppercase;
  border: none;
  margin-top: 20px;
  padding: 20px;
  font-size: 16px;
  font-weight: 100;
  letter-spacing: 10px;
  width: 100%;
  border-radius: 4px;
  -webkit-appearance: none;
  &:hover {
    background: #bf1650;
  }
  &:active {
    transition: 0.3s all;
    transform: translateY(3px);
    border: 1px solid transparent;
    opacity: 0.8;
  }
`;

export const SubmitButton = styled.button.attrs({
  type: "submit",
})`
  background: #ec5990;
  color: black;
  text-transform: uppercase;
  border: none;
  margin-top: 20px;
  padding: 20px;
  font-size: 16px;
  font-weight: 100;
  letter-spacing: 10px;
  width: 100%;
  border-radius: 4px;
  -webkit-appearance: none;
  &:hover {
    background: #bf1650;
  }
  &:active {
    transition: 0.3s all;
    transform: translateY(3px);
    border: 1px solid transparent;
    opacity: 0.8;
  }

  .sold-out {
    opacity: 0.5;
  }
`;

export const Label = styled.label`
  line-height: 2;
  text-align: left;
  display: block;
  margin-bottom: 13px;
  color: black;
  font-size: 14px;
  font-weight: 200;
`;

export const Title = styled.h2`
  font-weight: 100;
  color: black;
  margin-top: 1rem;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(79, 98, 148);
`;

export const SubTitle = styled.h3`
  font-weight: 100;
  color: black;
  text-align: center;
  padding-bottom: 10px;
  padding-top: 10px;
  font-size: 1.17em;
`;

export const Warning = styled.p`
  color: #bf1650;
  &:before {
    display: inline;
    content: "??? ";
  }
`;

export const LoadingViewTitle = styled.h1<ThemeProps<Theme>>`
  font-family: ${(p): string => p.theme.fontFamily};
  color: ${(p): string => p.theme.primaryTextColor};
  font-size: 24px;
  font-weight: 200;
  margin: 16px 0px 4px;
`;

export const LoadingViewBody = styled.p<ThemeProps<Theme>>`
  font-family: ${(p): string => p.theme.fontFamily};
  color: ${(p): string => p.theme.primaryTextColor};
  font-size: 16px;
  font-weight: 400;
  margin: 8px 0px 8px 0px;
  white-space: pre-wrap;
`;

export const DropDown = styled.li`
  position: relative;
  display: inline-block;
`;

export const UserListContainer = styled.form`
  margin: 2rem auto 0px;
  width: 713.91px;
`;

export const ProductListContainer = styled.form`
  margin: 2rem auto 0px;
  width: 830px;
`;

export const ProductContainer = styled.form`
  margin: 0.7rem auto 0px;
  max-width: 1240px;
`;

export const ListTitle = styled.h4`
  text-align: center;
`;

export const ProductComponent = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  padding-top: 1.5rem;
  img {
    width: 100%;
    height: auto;
    margin-bottom: 0.5rem;
  }

  @include atMobile {
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 2rem;
    .product {
      padding: 0.2rem;
      font-size: 0.4rem;
    }
  }

  @include atTablets {
    grid-template-columns: repeat(3, 1fr);
    .product {
      padding: 0.4rem;
      font-size: 0.6rem;
    }
  }
`;

export const Img = styled.img`
  min-width: 300px;
  width: 300px;
  height: 300px;
`;

export const DropZoneContainer = styled.div`
  .dzu-inputLabel {
    font-family: "Montserrat", sans-serif;
    color: black;
    font-weight: 100;
  }
`;

export const SingleProductContainer = styled.div`
  width: 100%;
  padding: 3rem 4rem;
`;

export const CheckList = styled.span``;

export const Wrapper = styled.div`
  padding: 50px 15vw 50px 15vw;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  font-size: 3rem;
`;

export const Message = styled.p`
  font-size: 1rem;
  text-align: center;
`;

export const Mail = styled(MailOutlined)`
  padding: 0.5rem;
`;

export const LinkedIn = styled(LinkedinOutlined)`
  padding: 0.5rem;
`;

export const Github = styled(GithubOutlined)`
  padding: 0.5rem;
`;

export const ReviewContainer = styled.form`
  text-align: center;
`;
