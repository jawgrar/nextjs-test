"use client";
import React, { useState } from 'react';
import useSWR from 'swr';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { lightBlue, grey } from '@mui/material/colors';
import { TextField, Button, Box } from '@mui/material';

const fetcher = (url: string) => fetch(url).then(res => res.json())

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            default: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            default?: string;
        };
    }
}

const CustomTextField = styled(TextField)(({ theme }) => ({
    '& label.Mui-focused': {
        color: lightBlue[500],
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: lightBlue[500],
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: lightBlue[500],
        },
        '&:hover fieldset': {
            borderColor: lightBlue[700],
        },
        '&.Mui-focused fieldset': {
            borderColor: lightBlue[500],
        },
    },
    '& .MuiInputBase-input': {
        color: grey[100], // or another light color
    },
}));

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: lightBlue,
    },
    status: {
        default: lightBlue[500],
    },
});

export default function BasicTextFields() {
    const [message, setMessage] = useState('');
    const { data, error, isLoading } = useSWR('https://6f13bbd2-75ce-4fb4-89df-6cec5b31a41c.mock.pstmn.io/api/test', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const handleMessage = (event: any) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (message.length > 0) {
            setMessage('');
        }
    };

    if (isLoading) {
        return <p>Loading ...</p>
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                component="section"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <pre>
                    {JSON.stringify(data)}
                </pre>
            </Box>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <CustomTextField
                    id="outlined-basic"
                    label="Message"
                    variant="outlined"
                    onChange={handleMessage}
                    value={message}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                >
                    Send
                </Button>
            </Box>
            <Box>
                <pre>Test local env: {process.env.TEST_ENDPOINT ?? 'Oops! not fetched v2.'}</pre>
            </Box>
        </ThemeProvider>
    );
}