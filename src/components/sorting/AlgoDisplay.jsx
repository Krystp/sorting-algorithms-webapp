import React, { useEffect } from "react";
import styled from "styled-components";
import { sortingAlgorithms } from "../../common/config";
import { useControls, useData } from "../../common/store";
import shallow from "zustand/shallow";
import { SortManager } from "./visualizer/SortManager";

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  column-gap: 10px;
  row-gap: 10px;
  & > div {
    max-width: 100%;
    min-width: 375px;
  }
`;

const flexCenter = { display: "flex", justifyContent: "center" };

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
      style={{ maxWidth: "100%" }}
    >
      {value === index && children}
    </div>
  );
}

export function AlgoDisplay() {
  const resetSorting = useControls((state) => state.resetSorting);

  const [sortingArray, algorithm] = useData(
    (state) => [state.sortingArray, state.algorithm],
    shallow
  );

  useEffect(() => {
    resetSorting();
  }, [algorithm]);

  if (sortingArray.length === 0)
    return (
      <h3 style={flexCenter}>
        Wprowadź ciąg do posortowania lub użyj przycisku wygeneruj
      </h3>
    );

  if (JSON.stringify(sortingArray) === JSON.stringify([9,11,2,6,18,37,1,42]) || JSON.stringify(sortingArray) === JSON.stringify([19,1,2,16,8,7,1,19,7]))
    return (
      <h3 style={flexCenter}>
        Nie można wprowadzić ciągu użytego w zadaniach
      </h3>
    );

  return (
    <div style={flexCenter}>
      {sortingAlgorithms.map((algoInfo, idx) => (
        <TabPanel value={algorithm} index={idx} key={algoInfo.name}>
          <SortManager
            array={sortingArray}
            sortFunction={algoInfo.component}
            sortingAlgorithmName={algoInfo.name}
          />
        </TabPanel>
      ))}
      <TabPanel value={algorithm} index={sortingAlgorithms.length}>
        <FlexWrap>
          {sortingAlgorithms.map((algoInfo) => (
            <SortManager
              array={sortingArray}
              sortFunction={algoInfo.component}
              sortingAlgorithmName={algoInfo.name}
              key={algoInfo.name}
            />
          ))}
        </FlexWrap>
      </TabPanel>
    </div>
  );
}