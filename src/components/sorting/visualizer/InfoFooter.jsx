import React from "react";
import styled from "styled-components";

const InfoFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

export function InfoFooter({ swapCount, comparisionCount, children }) {
  return (
    <InfoFlex>
      <div>Zamiany: <strong>{swapCount}</strong></div>
      <div>Porównania: <strong>{comparisionCount}</strong></div>
    </InfoFlex>
  );
}