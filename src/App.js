import React from 'react';
import "regenerator-runtime/runtime";
import {AiFillStar} from "react-icons/ai";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import CircularProgress from "@mui/material/CircularProgress";



const RatingWidget = ({title, message, titleSize, textColor, selectedStarColor, unselectedStarColor, descSize, starSize, onRatingSet, open}) => {
    const [selectedStars, setStars] = React.useState(0);

    return <Fade in={open} {...(open ? {timeout: 1000} : {})}>
        <Box style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: textColor
        }}>
            {title && <div style={{fontSize: titleSize}}>{title}</div>}
            {message && <p style={{marginTop: 1, marginBottom: 5, fontSize: descSize}}>{message}</p>}
            <div style={{cursor: "pointer", marginTop: 10}}>
                            <span onClick={() => onRatingSet(1)} onMouseOver={() => {
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
                <span onClick={() => onRatingSet(2)} onMouseOver={() => {
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
                <span onClick={() => onRatingSet(3)} onMouseOver={() => {
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
                <span onClick={() => onRatingSet(4)} onMouseOver={() => {
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
                <span onClick={() => onRatingSet(5)} onMouseOver={() => {
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

function App({domElement}) {

    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const verticalPosition = domElement.getAttribute("data-position-vertical") || "bottom";
    const horizontalPosition = domElement.getAttribute("data-position-horizontal") || "right";
    const title = domElement.getAttribute("data-title") || "title";
    const message = domElement.getAttribute("data-message") || "message";
    const eventType = domElement.getAttribute("data-event-type") || "rating";
    const apiUrl = domElement.getAttribute("data-api-url");
    const autoHide = parseInt(domElement.getAttribute("data-auto-hide"), 10) * 1000;
    const sourceId = domElement.getAttribute("data-source-id");
    const sessionId = domElement.getAttribute("data-session-id");
    const profileId = domElement.getAttribute("data-profile-id");
    const saveEvent = domElement.getAttribute("data-save-event") || "true";
    const titleSize = parseInt(domElement.getAttribute("data-title-size")) || 22;
    const descSize = parseInt(domElement.getAttribute("data-desc-size")) || 15;
    const starSize = parseInt(domElement.getAttribute("data-star-size")) || 24;
    const selectedStarColor = domElement.getAttribute("data-selected-star-color") || "#ffd700"
    const unselectedStarColor = domElement.getAttribute("data-unselected-star-color") || "#ccc"
    const boxStyle = domElement.getAttribute("data-box-style") || "elevation"
    const boxPaddingLeft = parseInt(domElement.getAttribute("data-box-padding-left")) || 0
    const boxPaddingRight = parseInt(domElement.getAttribute("data-box-padding-right")) || 0
    const boxPaddingTop = parseInt(domElement.getAttribute("data-box-padding-top")) || 20
    const boxPaddingBottom = parseInt(domElement.getAttribute("data-box-padding-bottom")) || 20
    const boxElevation = parseInt(domElement.getAttribute("data-box-elevation")) || 5
    const boxBackgroundColor = domElement.getAttribute("data-box-gb-color") || "#fff"
    const textColor = domElement.getAttribute("data-box-text-color") || "#444"
    const borderSize = parseInt(domElement.getAttribute("data-box-border-size")) || 0
    const borderRadius = parseInt(domElement.getAttribute("data-box-border-radius")) || 14


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            setOpen(false);
        }
        if (reason === "timeout") {
            setOpen(false);
        }
    }

    const sendRating = async (rating) => {
        setLoading(true)
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
                                "saveEvent": saveEvent === "true"
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

    let style = {
        background: boxBackgroundColor,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingLeft: boxPaddingLeft,
        paddingRight: boxPaddingRight,
        paddingTop: boxPaddingTop,
        paddingBottom: boxPaddingBottom,
        borderRadius: borderRadius,
        borderWidth: borderSize,
        borderColor: "white",

    }
    console.log(style)
    if(borderSize >0) {
        style = {...style, borderStyle: "solid"}
    }

    return (
        <Snackbar
            open={open}
            anchorOrigin={{vertical: verticalPosition, horizontal: horizontalPosition}}
            onClose={handleClose}
            autoHideDuration={autoHide}
        >
            <SnackbarContent
                style={style}
                elevation={boxElevation}
                variant={boxStyle}
                message={loading
                    ? <CircularProgress />
                : <RatingWidget title={title}
                                titleSize={titleSize}
                                message={message} textColor={textColor}
                                selectedStarColor={selectedStarColor}
                                unselectedStarColor={unselectedStarColor}
                                descSize={descSize}
                                starSize={starSize}
                                open={open}
                                onRatingSet={sendRating}/>
                }
            />
        </Snackbar>

    );

}

export default App;
