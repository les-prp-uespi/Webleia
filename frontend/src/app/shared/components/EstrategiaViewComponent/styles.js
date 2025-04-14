import { Accordion } from "@mui/material";
import { Theme } from "app/shared/utils";
import styled from "styled-components";

export const StyledAccordion = styled(Accordion)`
    border-bottom: 1px solid ${Theme.colors.gray.ligth};
    border-radius: 0px !important;
    
    .MuiAccordionSummary-root {
        margin: 0px !important;
        min-height: 40px !important;
    }

    .MuiAccordionSummary-content {
        margin: 5px 0px !important;
    }
    margin-bottom: 0px !important;
`