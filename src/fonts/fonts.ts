import { createGlobalStyle } from "styled-components";
import Megrim from "./Megrim-Regular.ttf";

export default createGlobalStyle`
    @font-face {
        font-family: 'Megrim';
        src: local('Megrim'),
        url(${Megrim}) format('truetype');
        font-weight: 400;
        font-style: normal;
    }
`;
