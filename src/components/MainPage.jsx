import React from 'react'
import { Typography, Box, Container, Paper } from "@mui/material";

import MainContainer from '../components/MainContainer'

import logoUZ from '../logoUZ.jpg'

export default function MainPage() {
    return (
        <MainContainer>
            <Container maxWidth="100%" sx={{flexDirection: 'column'}} >
                <Box
                sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                p: 1,
                m: 1,
                mt: 10
                }}>
                    <Typography align="center" fontSize={42} fontWeight={500} md="10">Strona przeznaczona do nauki algorytmów sortowania na przedmiocie Algorytmy i Struktury Danych</Typography>
                </Box>
                <Paper variant="standard" display="flex" align="center">
                    <img
                    src={`${logoUZ}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${logoUZ}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    loading="lazy"
                    />
                </Paper>
                <Box
                sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                p: 1,
                m: 1,
                mt: 5
                }}>
                    <Typography ml={3} mr={3} fontSize={18} fontStyle={'oblique'}>Sortowanie jest jednym z najczęściej rozwiązywanych problemów informatycznych. Według różnych autorów, komputery spędzają od 25 do 80 procent czasu na porządkowaniu informacji. Porządek wśród elementów ułatwia i przyspiesza wykonywanie innych operacji (np. przeszukiwania).
                    Sortowanie jest też przykładem problemu, który może być rozwiązany na wiele sposobów, a ich efektywność jest istotnie różna. Za efektywność algorytmów sortujących przyjmuje się liczbę porównań wykonywanych między elementami danych. Zwykle jest ona podawana jako zależność od liczby elementów do uporządkowania.</Typography>
                </Box>
            </Container>
        </MainContainer>
    )
}