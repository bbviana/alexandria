import React, { Component, PropTypes } from 'react'

import { Button } from '../../components'

const ButtonCreate = ({ onClick }) =>
    <Button size="small" onClick={onClick}>
        Novo snippet
    </Button>

export default ButtonCreate