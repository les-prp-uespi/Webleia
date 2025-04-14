import styled from "styled-components";

export const ImageCropPreview = styled.div`

    height: 200px;
    width: 200px;
    background-image: url(${props => props.src});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

`