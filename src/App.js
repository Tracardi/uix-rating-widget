import React from 'react';
import "regenerator-runtime/runtime";
import { Box, Snackbar, SnackbarContent, Typography } from "@material-ui/core";
import { AiFillStar } from "react-icons/ai";


function App({ domElement }) {

    const [open, setOpen] = React.useState(true);
    const [selectedStars, setStars] = React.useState(0);

    const verticalPosition = domElement.getAttribute("data-position-vertical");
    const horizontalPosition = domElement.getAttribute("data-position-horizontal");
    const title = domElement.getAttribute("data-title");
    const message = domElement.getAttribute("data-message");
    const eventType = domElement.getAttribute("data-event-type");
    const apiUrl = domElement.getAttribute("data-api-url");
    const darkTheme = domElement.getAttribute("data-theme") === "dark";
    const autoHide = parseInt(domElement.getAttribute("data-auto-hide"), 10) * 1000;
    const sourceId = domElement.getAttribute("data-source-id");
    const sessionId = domElement.getAttribute("data-session-id");
    const profileId = domElement.getAttribute("data-profile-id");
    const saveEvent = domElement.getAttribute("data-save-event") === "yes";


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            setOpen(false);
        }
        if (reason === "timeout") {
            setOpen(false);
        }
    }

    const sendRating = async (rating) => {

        const response = await fetch(`${apiUrl}/track`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "source": {
                    "id": sourceId
                },
                "session": {
                    "id": sessionId
                },
                "profile": {
                    "id": profileId
                },
                "context": {},
                "properties": {},
                "events": [
                    {
                        "type": eventType,
                        "properties": {
                            "rating": rating
                        },
                        "options": {
                            "saveEvent": saveEvent
                        }
                    }
                ],
                "options": {}
            })
        }).catch(error => console.log(error))

        const data = await response.json();
        console.log(data);

        setOpen(false);
    }


    return (
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: verticalPosition, horizontal: horizontalPosition }}
            onClose={handleClose}
            autoHideDuration={autoHide}
        >
            <SnackbarContent
                style={{
                    backgroundColor: darkTheme ? "#343434" : "#ffffff",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                }}
                message={
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <Box sx={{ color: darkTheme ? "#ffffff" : "#343434" }}>
                            <Typography variant="h5" color="inherit">{title}</Typography>
                        </Box>
                        <Box sx={{ color: darkTheme ? "#ffffff" : "#343434" }}>
                            <p>{message}</p>
                        </Box>
                        <Box>
                            <span onClick={() => sendRating(1)} onMouseOver={() => { setStars(1); }} onMouseLeave={() => { setStars(0); }}>
                                <AiFillStar
                                    style={{
                                        color: selectedStars > 0 ? "yellow" : "grey",
                                        margin: selectedStars > 0 ? 0: 2
                                    }}
                                    size={selectedStars > 0 ? 40 : 36} />
                            </span>
                            <span onClick={() => sendRating(2)} onMouseOver={() => { setStars(2); }} onMouseLeave={() => { setStars(0); }}>
                                <AiFillStar
                                    style={{
                                        color: selectedStars > 1 ? "yellow" : "grey",
                                        margin: selectedStars > 1 ? 0 : 2
                                    }}
                                    size={selectedStars > 1 ? 40 : 36} />
                            </span>
                            <span onClick={() => sendRating(3)} onMouseOver={() => { setStars(3); }} onMouseLeave={() => { setStars(0); }}>
                                <AiFillStar
                                    style={{
                                        color: selectedStars > 2 ? "yellow" : "grey",
                                        margin: selectedStars > 2 ? 0 : 2
                                    }}
                                    size={selectedStars > 2 ? 40 : 36} />
                            </span>
                            <span onClick={() => sendRating(4)} onMouseOver={() => { setStars(4); }} onMouseLeave={() => { setStars(0); }}>
                                <AiFillStar
                                    style={{
                                        color: selectedStars > 3 ? "yellow" : "grey",
                                        margin: selectedStars > 3 ? 0 : 2
                                    }}
                                    size={selectedStars > 3 ? 40 : 36} />
                            </span>
                            <span onClick={() => sendRating(5)} onMouseOver={() => { setStars(5); }} onMouseLeave={() => { setStars(0); }}>
                                <AiFillStar
                                    style={{
                                        color: selectedStars > 4 ? "yellow" : "grey",
                                        margin: selectedStars > 4 ? 0 : 2
                                    }}
                                    size={selectedStars > 4 ? 40 : 36} />
                            </span>
                        </Box>
                    </Box>
                }
            />
        </Snackbar>
    );

}

export default App;
