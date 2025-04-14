import styled from "styled-components";

export const Loader = styled.img`
    width: 250px;
    display: block;
    margin: auto;
    vertical-align: middle;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    animation: blinker 2s linear infinite;

    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }
`