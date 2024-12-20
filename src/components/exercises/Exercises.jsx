import React, { useState, useEffect } from "react";
import { useExercise } from "../../middleware/contextHooks";
import { Typography, Container, TextField, Grid, Button, Box, TableRow, TableCell, Table } from "@mui/material";
import { toast } from 'react-toastify';

//#region         [ Icons ]
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
//#endregion

import {
    convertInputToArrayString,
    convertArrayStringToArray,
  } from "../../common/helper";

import MainContainer from '../MainContainer'


export default function Exercises() {

    const [sortingArray, setSortingArray] = useState({
        input1: [], input2: [], input3: [], input4: [], input5: [], input6: []
    });
    const initialValues = { input1: "", input2: "", input3: "", input4: "", input5: "", input6: "" };
    const clearArray = { input1: [], input2: [], input3: [], input4: [], input5: [], input6: [] };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [show,setShow]=useState(false);
    const [formResult,setFormResult]=useState({exerciseName: null, formResult: null});
    const {toasts, clearErrors, exercises, getExercises, createExercise} = useExercise();
    const [data, setData] = useState([
        { exerciseName: null, formResult: null, user: null },
        { exerciseName: null, formResult: null, user: null },
        { exerciseName: null, formResult: null, user: null } 
    ])

    useEffect(() => {
        if(!exercises){
             getExercises();
        }

        if(exercises?.length > 0) {
             setData(exercises)
        }

        if(toasts){
            toasts.forEach(ele => {
                toast(ele.message, {type: ele.type})
            })
            clearErrors()
        }
    },[toasts, clearErrors, exercises, getExercises]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const arrayString = convertInputToArrayString(value);
        setFormValues({ ...formValues, [name]: arrayString });

        const array = convertArrayStringToArray(arrayString);
        setSortingArray({...sortingArray, [name]: array});
    };

    const handleSubmit = (e) => {
        if (data[0].exerciseName !== 'Zadanie 1' && data[1]?.exerciseName !== 'Zadanie 1' && data[2]?.exerciseName !== 'Zadanie 1') {
            if(window.confirm('Czy chcesz wysłać swoje odpowiedzi?')) {
                e.preventDefault();
                setFormErrors(validate())
                setFormResult(evaluate())
                setIsSubmit(true);
                setShow(true);
                createExercise(evaluate());
            }
        } else {
            toast('Twoja ocena już istnieje', {type: 'error'})
        }
    }

    const handleClear = () => {
        setFormValues(initialValues)
        setSortingArray(clearArray)
    }

    const validate = () => {
        const errors = {};
        const [ checkArray1, checkArray2, checkArray3,
                checkArray4, checkArray5, checkArray6] = [ 
                                                            [9,2,11,6,18,37,1,42], [9,2,6,11,18,37,1,42],
                                                            [9,2,6,1,18,37,11,42], [1,2,6,9,18,37,11,42],
                                                            [1,2,6,9,18,11,37,42], [1,2,6,9,11,18,37,42]
                                                         ] 

        const checkArrays = [checkArray1, checkArray2, checkArray3, checkArray4, checkArray5, checkArray6];

        for (let i = 1; i <= checkArrays.length; i++) {
            errors[`input${i}`] = JSON.stringify(sortingArray[`input${i}`]) === JSON.stringify(checkArrays[i - 1]) ? 'Correct' : 'Wrong';
        }

        return errors;
    }

    const evaluate = () => {
        let result = {exerciseName: "Zadanie 1", formResult: 0};
        const [ checkArray1, checkArray2, checkArray3,
            checkArray4, checkArray5, checkArray6] = [ 
                                                        [9,2,11,6,18,37,1,42], [9,2,6,11,18,37,1,42],
                                                        [9,2,6,1,18,37,11,42], [1,2,6,9,18,37,11,42],
                                                        [1,2,6,9,18,11,37,42], [1,2,6,9,11,18,37,42]
                                                     ] 

        const checkArrays = [checkArray1, checkArray2, checkArray3, checkArray4, checkArray5, checkArray6];

        for (let i = 1; i <= checkArrays.length; i++) {
            if (JSON.stringify(sortingArray[`input${i}`]) === JSON.stringify(checkArrays[i - 1])) {
                result.formResult += 1;
            }
        }

        result.formResult = result.formResult/6*100;
        result.formResult = result.formResult.toFixed(2);

        return result;
    }

    return (
        <MainContainer>
            <Container maxWidth="sm"
                sx={{
                    marginTop: 8, display: 'flex',
                    flexDirection: 'column'
                }}
            >

                <Table>
                    <TableRow>
                        <TableCell  sx={{ border: 2 }}>
                        <Typography sx={{ fontStyle: 'italic', fontSize: "1.1rem" }}>Protokół laboratorium 3: <span style={{ fontWeight: 'bold' }}>Algorytmy sortowania wewnętrznego</span></Typography>
                        </TableCell>
                    </TableRow>
                </Table>

                <Typography fontSize={20} component="h1" mb={4} mt={6}>
                    Dany jest ciąg do posortowania:
                </Typography>
                <Table  align="center">
                    <TableRow>
                        <TableCell  sx={{ border: 4, fontSize: "1.1rem" }} align="center"  width="8%">
                            9
                        </TableCell>
                        <TableCell  sx={{ border: 4, fontSize: "1.1rem" }} align="center"  width="8%">
                            11
                        </TableCell>
                        <TableCell  sx={{ border: 4, fontSize: "1.1rem" }} align="center"  width="8%">
                            2
                        </TableCell>
                        <TableCell  sx={{ border: 4, fontSize: "1.1rem" }} align="center"  width="8%">
                            6
                        </TableCell>
                        <TableCell  sx={{ border: 4, fontSize: "1.1rem" }} align="center"  width="8%">
                            18
                        </TableCell>
                        <TableCell  sx={{ border: 4, fontSize: "1.1rem" }} align="center"  width="8%">
                            37
                        </TableCell>
                        <TableCell  sx={{ border: 4, fontSize: "1.1rem" }} align="center"  width="8%">
                            1
                        </TableCell>
                        <TableCell  sx={{ border: 4, fontSize: "1.1rem" }} align="center"  width="8%">
                            42
                        </TableCell>
                    </TableRow>
                </Table>
                <Typography fontSize={18} mb={4} mt={5}>
                    Pokazać krok po kroku proces sortowania w porządku  <span style={{ fontWeight: 'bold' }}>rosnącym</span> tego ciągu algorytmem:
                </Typography>
                <Typography fontSize={18} mb={4}>
                    <span style={{ fontWeight: 'bold' }}>Zadanie 1.4.</span> Sortowania szybkiego (ang. quicksort):
                </Typography>

                <Grid container spacing={2} alignItems="stretch">
                    <Grid item xs={12}>
                        <TextField
                            name="input1"
                            label="Krok 1"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input1}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input1 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input1 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input2"
                            label="Krok 2"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input2}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input2 === "Correct" ? <CheckIcon sx={{ color: 'green' }} Poprawnie /> : <ClearIcon sx={{ color: 'red' }} Źle />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input2 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input3"
                            label="Krok 3"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input3}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input3 === "Correct" ? <CheckIcon sx={{ color: 'green' }} Poprawnie /> : <ClearIcon sx={{ color: 'red' }} Źle />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input3 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input4"
                            label="Krok 4"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input4}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input4 === "Correct" ? <CheckIcon sx={{ color: 'green' }} Poprawnie /> : <ClearIcon sx={{ color: 'red' }} Źle />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input4 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input5"
                            label="Krok 5"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input5}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input5 === "Correct" ? <CheckIcon sx={{ color: 'green' }} Poprawnie /> : <ClearIcon sx={{ color: 'red' }} Źle />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input5 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input6"
                            label="Krok 6"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input6}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input6 === "Correct" ? <CheckIcon sx={{ color: 'green' }} Poprawnie /> : <ClearIcon sx={{ color: 'red' }} Źle />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input6 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                </Grid>
                <Box display="flex">
                {   show? null:
                <Button
                    sx={{ mt: 3, mb: 2, ml: 16, width: '25%', align: 'center', backgroundColor: '#03591D' }}
                    onClick={handleSubmit}
                >
                    Prześlij
                </Button>
                }
                {   show? null:
                <Button
                    sx={{ mt: 3, mb: 2, ml: 2, width: '25%', align: 'center', backgroundColor: "#8D0103",}}
                    onClick={handleClear}
                >
                    Wyczyść
                </Button>
                }
                </Box>
                {
                    show?<Typography variant="body1" component="h2" align="center" mb={6}>Twój uzyskany wynik: <span style={{ fontWeight: 'bold' }}>{formResult.formResult}%</span></Typography>:null
                }
            </Container>
        </MainContainer>
    );
}