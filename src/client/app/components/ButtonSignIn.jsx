import React, { Component, PropTypes } from 'react'

import { Icon } from '../../components'

const ButtonSignIn = () => {
    return (
        <a className="btn btn-danger" href="/auth/google">
            <Icon name="google-plus" /> Entrar
        </a>
    )
}

export default ButtonSignIn