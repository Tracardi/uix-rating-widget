import React from 'react';
import "regenerator-runtime/runtime";
import {Box, Snackbar, SnackbarContent} from "@material-ui/core";
import {AiFillStar} from "react-icons/ai";
import Fade from "@material-ui/core/Fade";


function App({domElement}) {

    const [open, setOpen] = React.useState(true);
    const [selectedStars, setStars] = React.useState(0);

    const verticalPosition = domElement.getAttribute("data-position-vertical");
    const horizontalPosition = domElement.getAttribute("data-position-horizontal");
    const title = domElement.getAttribute("data-title") || "title";
    const message = domElement.getAttribute("data-message") || "message";
    const eventType = domElement.getAttribute("data-event-type") || "rating";
    const apiUrl = domElement.getAttribute("data-api-url");
    const autoHide = parseInt(domElement.getAttribute("data-auto-hide"), 10) * 1000;
    const sourceId = domElement.getAttribute("data-source-id");
    const sessionId = domElement.getAttribute("data-session-id");
    const profileId = domElement.getAttribute("data-profile-id");
    const saveEvent = domElement.getAttribute("data-save-event") === "yes";
    const titleSize = domElement.getAttribute("data-title-size") || "22px";
    const descSize = domElement.getAttribute("data-desc-size") || "15px";
    const starSize = domElement.getAttribute("data-star-size") || "24px";
    const selectedStarColor = domElement.getAttribute("data-selected-star-color") || "#ffd700"
    const unselectedStarColor = domElement.getAttribute("data-unselected-star-color") || "#ccc"
    const boxStyle = domElement.getAttribute("data-box-style") || "elevation"
    const boxPadding = domElement.getAttribute("data-box-padding") || "10px"
    const boxElevation = domElement.getAttribute("data-box-elevation") || "1"
    const boxBackgroundColor = domElement.getAttribute("data-box-gb-color") || "white"
    const textColor = domElement.getAttribute("data-box-text-color") || "black"

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            setOpen(false);
        }
        if (reason === "timeout") {
            setOpen(false);
        }
    }

    const sendRating = async (rating) => {
        try {
            await fetch(`${apiUrl}/track`, {
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
            })
        } catch (e) {
            console.log(e)
        } finally {
            setOpen(false);
        }
    }

    return (

        <Snackbar
            open={open}
            anchorOrigin={{vertical: verticalPosition, horizontal: horizontalPosition}}
            onClose={handleClose}
            autoHideDuration={autoHide}
        >
            <SnackbarContent
                style={
                    {
                        backgroundColor: boxBackgroundColor,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        padding: boxPadding
                    }
                }
                elevation={boxElevation}
                variant={boxStyle}
                message={
                    <Fade in={open} {...(open ? {timeout: 2000} : {})}>
                        <Box style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            color: textColor
                        }}>
                            {title && <div style={{fontSize: titleSize}}>{title}</div>}
                            {message && <p style={{marginTop: 1, marginBottom: 5, fontSize: descSize}}>{message}</p>}
                            <div style={{cursor: "pointer", marginTop: 10}}>
                            <span onClick={() => sendRating(1)} onMouseOver={() => {
                                setStars(1);
                            }} onMouseLeave={() => {
                                setStars(0);
                            }}>
                                    <AiFillStar style={
                                        {
                                            color: selectedStars > 0 ? selectedStarColor : "grey",
                                            margin: 2
                                        }
                                    } size={starSize}/>
                            </span>
                                <span onClick={() => sendRating(2)} onMouseOver={() => {
                                    setStars(2);
                                }} onMouseLeave={() => {
                                    setStars(0);
                                }}>
                                    <AiFillStar style={
                                        {
                                            color: selectedStars > 1 ? selectedStarColor : unselectedStarColor,
                                            margin: 2
                                        }
                                    } size={starSize}/>
                                </span>
                                <span onClick={() => sendRating(3)} onMouseOver={() => {
                                    setStars(3);
                                }} onMouseLeave={() => {
                                    setStars(0);
                                }}>
                                    <AiFillStar style={
                                        {
                                            color: selectedStars > 2 ? selectedStarColor : unselectedStarColor,
                                            margin: 2
                                        }
                                    } size={starSize}/>
                                </span>
                                <span onClick={() => sendRating(4)} onMouseOver={() => {
                                    setStars(4);
                                }} onMouseLeave={() => {
                                    setStars(0);
                                }}>
                                    <AiFillStar style={
                                        {
                                            color: selectedStars > 3 ? selectedStarColor : unselectedStarColor,
                                            margin: 2
                                        }
                                    } size={starSize}/>
                                </span>
                                <span onClick={() => sendRating(5)} onMouseOver={() => {
                                    setStars(5);
                                }} onMouseLeave={() => {
                                    setStars(0);
                                }}>
                                    <AiFillStar style={
                                        {
                                            color: selectedStars > 4 ? selectedStarColor : unselectedStarColor,
                                            margin: 2
                                        }
                                    } size={starSize}/>
                                </span>
                            </div>
                        </Box>
                    </Fade>
                }
            />
        </Snackbar>

    );

}

export default App;
