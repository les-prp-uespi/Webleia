import styled,{css} from "styled-components";


const dragActive = css`
    border-color: #38a1d6;
`;

const dragReject = css`
    border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
    className: "dropzone",
})`
    border: 1px dashed  #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: height 0.2s ease;
    width: 100%;

    

    ${props => props.disabled && "cursor: not-allowed;"}
    ${props => props.isDragActive && dragActive}
    ${props => props.isDragReject && dragReject}
    
`;

const messageColors = {
    default : "#8f8c8c",
    error : "#e57878",
    success: "#38a1d6"
}

export const UploadMessage = styled.h4`
    display: flex;
    color : ${props => messageColors[props.type || 'default']};
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
`;

export const Container = styled.ul`
  margin-top: 20px;

  li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: '#444';

      & + li {
          margin-top: 15px;
      }
  }
`;

export const Fileinfo = styled.div`
    display: flex;
    align-items: center;

    div {
        display: flex;
        flex-direction: column;

        span {
            font-size: 12px;
            color: "#999";
            margin-top: 5px;

            button {
                border: 0;
                background: transparent;
                color: "#e57878";
                margin-left: 5px;
                cursor: pointer;
            }
        }
    }
`;

export const Preview = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 5px;     
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    margin-right: 10px;

`;
