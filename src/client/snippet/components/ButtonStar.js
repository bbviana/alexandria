import React, { Component, PropTypes } from 'react'

import { Button, Icon } from '../../components'

const ButtonStar = ({ onClick }) => {
    return (
        <Button size="small" onClick={onClick}>
            <Icon name="star" /> Star
        </Button>
    )
}

ButtonStar.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default ButtonStar