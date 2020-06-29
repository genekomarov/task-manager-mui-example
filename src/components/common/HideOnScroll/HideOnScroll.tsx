import React from "react"
import useScrollTrigger from "@material-ui/core/useScrollTrigger/useScrollTrigger"
import Slide from "@material-ui/core/Slide/Slide"

interface HideOnScrollPropsType {
    window?: () => Window
    children: React.ReactElement
}

const HideOnScroll = (props: HideOnScrollPropsType) => {
    const {children, window} = props
    const trigger = useScrollTrigger({target: window ? window() : undefined})

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default HideOnScroll