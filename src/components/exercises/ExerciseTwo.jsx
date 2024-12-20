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


export default function ExerciseTwo() {

    const [sortingArray, setSortingArray] = useState({
        input1: [], input2: [], input3: [], input4: [], input5: [], input6: [], input7: [],
        input8: [], input9: [], input10: [], input11: [], input12: [], input13: [], input14: [],
        input15: [], input16: [], input17: [], input18: [], input19: [], input20: [], input21: []
    });
    const initialValues = { input1: "", input2: "", input3: "", input4: "", input5: "", input6: "", input7: "",
                            input8: "", input9: "", input10: "", input11: "", input12: "", input13: "", input14: "",
                            input15: "", input16: "", input17: "", input18: "", input19: "", input20: "", input21: ""
                        };
    const clearArray = {    input1: [], input2: [], input3: [], input4: [], input5: [], input6: [], input7: [],
                            input8: [], input9: [], input10: [], input11: [], input12: [], input13: [], input14: [],
                            input15: [], input16: [], input17: [], input18: [], input19: [], input20: [], input21: [] };
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
        if (data[0].exerciseName !== 'Zadanie 2' && data[1]?.exerciseName !== 'Zadanie 2' && data[2]?.exerciseName !== 'Zadanie 2') {
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
                checkArray5, checkArray6, checkArray7, checkArray8,
                checkArray9, checkArray10, checkArray11, checkArray12,
                checkArray13, checkArray14, checkArray15, checkArray16,
                checkArray17, checkArray18, checkArray19, checkArray20,
                checkArray21 ] = [ [19,1,2,19,8,7,1,16,7], [19,1,7,19,8,2,1,16,7], [19,19,7,1,8,2,1,16,7],
                                    [19,19,7,16,8,2,1,1,7], [7,19,7,16,8,2,1,1,19], [19,7,7,16,8,2,1,1,19],
                                    [19,16,7,7,8,2,1,1,19], [1,16,7,7,8,2,1,19,19], [16,1,7,7,8,2,1,19,19],
                                    [16,8,7,7,1,2,1,19,19], [1,8,7,7,1,2,16,19,19], [8,1,7,7,1,2,16,19,19],
                                    [8,7,7,1,1,2,16,19,19], [2,7,7,1,1,8,16,19,19], [7,2,7,1,1,8,16,19,19],
                                    [1,2,7,1,7,8,16,19,19], [7,2,1,1,7,8,16,19,19], [1,2,1,7,7,8,16,19,19],
                                    [2,1,1,7,7,8,16,19,19], [1,1,2,7,7,8,16,19,19], [1,1,2,7,7,8,16,19,19]
                                ]

        const checkArrays = [checkArray1, checkArray2, checkArray3, checkArray4, checkArray5, checkArray6, checkArray7, checkArray8, checkArray9, checkArray10, checkArray11, checkArray12, checkArray13, checkArray14, checkArray15, checkArray16, checkArray17, checkArray18, checkArray19, checkArray20, checkArray21];

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
        let result = {exerciseName: "Zadanie 2", formResult: 0};
        const [ checkArray1, checkArray2, checkArray3, checkArray4,
            checkArray5, checkArray6, checkArray7, checkArray8,
            checkArray9, checkArray10, checkArray11, checkArray12,
            checkArray13, checkArray14, checkArray15, checkArray16,
            checkArray17, checkArray18, checkArray19, checkArray20,
            checkArray21 ] = [ [19,1,2,19,8,7,1,16,7], [19,1,7,19,8,2,1,16,7], [19,19,7,1,8,2,1,16,7],
                                [19,19,7,16,8,2,1,1,7], [7,19,7,16,8,2,1,1,19], [19,7,7,16,8,2,1,1,19],
                                [19,16,7,7,8,2,1,1,19], [1,16,7,7,8,2,1,19,19], [16,1,7,7,8,2,1,19,19],
                                [16,8,7,7,1,2,1,19,19], [1,8,7,7,1,2,16,19,19], [8,1,7,7,1,2,16,19,19],
                                [8,7,7,1,1,2,16,19,19], [2,7,7,1,1,8,16,19,19], [7,2,7,1,1,8,16,19,19],
                                [1,2,7,1,7,8,16,19,19], [7,2,1,1,7,8,16,19,19], [1,2,1,7,7,8,16,19,19],
                                [2,1,1,7,7,8,16,19,19], [1,1,2,7,7,8,16,19,19], [1,1,2,7,7,8,16,19,19]
                            ]

        const checkArrays = [checkArray1, checkArray2, checkArray3, checkArray4, checkArray5, checkArray6, checkArray7, checkArray8, checkArray9, checkArray10, checkArray11, checkArray12, checkArray13, checkArray14, checkArray15, checkArray16, checkArray17, checkArray18, checkArray19, checkArray20, checkArray21];

        for (let i = 1; i <= checkArrays.length; i++) {
            if (JSON.stringify(sortingArray[`input${i}`]) === JSON.stringify(checkArrays[i - 1])) {
                result.formResult += 1;
            }
        }

        result.formResult = result.formResult/21*100;
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
                    <span style={{ fontWeight: 'bold' }}>a)</span> Sortowania stogowego:
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
                            variant="outlined" disabled={isSubmit}
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
                    <Grid item xs={12}>
                        <TextField
                            name="input9"
                            label="Krok 9"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input9}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input9 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input9 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input10"
                            label="Krok 10"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input10}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input10 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input10 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input11"
                            label="Krok 11"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input11}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input11 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input11 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input12"
                            label="Krok 12"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input12}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input12 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input12 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input13"
                            label="Krok 13"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input13}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input13 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input13 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input14"
                            label="Krok 14"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input14}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input14 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input14 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input15"
                            label="Krok 15"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input15}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input15 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input15 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input16"
                            label="Krok 16"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input16}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input16 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input16 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input17"
                            label="Krok 17"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input17}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input17 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input17 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input18"
                            label="Krok 18"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input18}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input18 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input18 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input19"
                            label="Krok 19"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input19}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input19 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input19 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input20"
                            label="Krok 20"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input20}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input20 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input20 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="input21"
                            label="Krok 21"
                            variant="outlined"
                            disabled={isSubmit}
                            value={formValues.input21}
                            onChange={handleChange}
                        />
                        <Box display="flex">
                        {
                        show?<Typography>{formErrors.input21 === "Correct" ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}</Typography>:null
                        }
                        {
                        show?<Typography mt={0.2}>{formErrors.input21 === "Correct" ? 'Poprawnie' : 'Źle'}</Typography>:null
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