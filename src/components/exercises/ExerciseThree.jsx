import React, { useState, useEffect } from "react";
import { useExercise } from "../../middleware/contextHooks";
import { Typography, Container, TextField, Grid, Button, Table, TableCell, TableRow, Box } from "@mui/material";
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


export default function ExerciseThree() {

    const [sortingArray, setSortingArray] = useState({
        input1: [], input2: [], input3: [], input4: [],
        input5: [], input6: [], input7: [], input8: []
    });
    const initialValues = { input1: "", input2: "", input3: "", input4: "",
                            input5: "", input6: "", input7: "", input8: ""};
    const clearArray = { input1: [], input2: [], input3: [], input4: [],
                        input5: [], input6: [], input7: [], input8: [] };
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
        if (data[0].exerciseName !== 'Zadanie 3' && data[1]?.exerciseName !== 'Zadanie 3' && data[2]?.exerciseName !== 'Zadanie 3') {
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
        const [ checkArray1, checkArray2, checkArray3, checkArray4,
                checkArray5, checkArray6, checkArray7, checkArray8 ] = [ 
                                                                        [1,19,2,16,8,7,1,19,7], [1,2,19,16,8,7,1,19,7],
                                                                        [1,2,19,8,16,7,1,19,7], [1,2,8,16,19,7,1,19,7],
                                                                        [1,2,8,16,19,1,7,19,7], [1,2,8,16,19,1,7,7,19],
                                                                        [1,2,8,16,19,1,7,7,19], [1,1,2,7,7,8,16,16,19]
                                                                        ] 

        const checkArrays = [checkArray1, checkArray2, checkArray3, checkArray4, checkArray5, checkArray6, checkArray7, checkArray8];

        for (let i = 1; i <= checkArrays.length; i++) {
            if (JSON.stringify(sortingArray[`input${i}`]) === JSON.stringify(checkArrays[i - 1])) {
                errors[`input${i}`] = "Correct";
            } else {
                errors[`input${i}`] = "Wrong";
            }
        }

        return errors;
    }

    const evaluate = () => {
        let result = {exerciseName: "Zadanie 3", formResult: 0};
        const checkArrays = [       [1,19,2,16,8,7,1,19,7], 
                                    [1,2,19,16,8,7,1,19,7],
                                    [1,2,19,8,16,7,1,19,7], 
                                    [1,2,8,16,19,7,1,19,7],
                                    [1,2,8,16,19,1,7,19,7], 
                                    [1,2,8,16,19,1,7,7,19],
                                    [1,2,8,16,19,1,7,7,19], 
                                    [1,1,2,7,7,8,16,16,19]
                            ];

        for (let i = 0; i < 8; i++) {
            if (JSON.stringify(sortingArray[`input${i+1}`]) === JSON.stringify(checkArrays[i])) {
                result.formResult += 1;
            }
        }

        result.formResult = result.formResult/8*100;
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
                        <Typography sx={{ fontStyle: 'italic', fontSize: "1.05rem" }}>Protokół laboratorium 3: <span style={{ fontWeight: 'bold' }}>Algorytmy sortowania wewnętrznego 2</span></Typography>
                        </TableCell>
                    </TableRow>
                </Table>

                <Typography fontSize={19} component="h1" mb={4} mt={6}>
                    <span style={{ fontWeight: 'bold' }}>Zadanie 2.1. </span> Dany jest ciąg do posortowania:
                </Typography>
                <Table  align="center">
                    <TableRow>
                        <TableCell  sx={{ border: 4, fontSize: "1.1rem" }} align="center"  width="8%">
                            19
                        </TableCell>
                        <TableCell  sx={{ border: 4, fontSize: "1.1rem" }} align="center"  width="8%">
                            1
                        </TableCell>
                        <TableCell  sx={{ border: 4, fontSize: "1.1rem" }} align="center"  width="8%">
                            2
                        </TableCell>
                        <TableCell  sx={{ border: 4, fontSize: "1.1rem" }} align="center"  width="8%">
                            16
                        </TableCell>
                        <TableCell  sx={{ border: 4, fontSize: "1.1rem" }} align="center"  width="8%">
                            8
                        </TableCell>
                        <TableCell  sx={{ border: 4, fontSize: "1.1rem" }} align="center"  width="8%">
                            7
                        </TableCell>
                        <TableCell  sx={{ border: 4, fontSize: "1.1rem" }} align="center"  width="8%">
                            1
                        </TableCell>
                        <TableCell  sx={{ border: 4, fontSize: "1.1rem" }} align="center"  width="8%">
                            19
                        </TableCell>
                        <TableCell  sx={{ border: 4, fontSize: "1.1rem" }} align="center"  width="8%">
                            7
                        </TableCell>
                    </TableRow>
                </Table>
                <Typography fontSize={18} mb={4} mt={5}>
                    Pokazać krok po kroku proces sortowania w porządku  <span style={{ fontWeight: 'bold' }}>rosnącym</span> tego ciągu algorytmem:
                </Typography>
                <Typography fontSize={18} mb={4}>
                    <span style={{ fontWeight: 'bold' }}>b)</span> Sortowania przez scalanie:
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
                        show?<Typography>{formErrors.input2 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
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
                        show?<Typography>{formErrors.input3 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
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
                        show?<Typography>{formErrors.input4 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
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
                        show?<Typography>{formErrors.input5 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
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
                        show?<Typography>{formErrors.input6 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input6 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input7"
                            label="Krok 7"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input7}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input7 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input7 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input8"
                            label="Krok 8"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input8}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input8 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input8 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
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
                    show?<Typography variant="body1" component="h2" align="center" mt={4} mb={6}>Twój uzyskany wynik: <span style={{ fontWeight: 'bold' }}>{formResult.formResult}%</span></Typography>:null
                }
            </Container>
        </MainContainer>
    );
}