import React from 'react'

export default function Mock() {
    const [value, setState] = React.useState('test')
    console.log('mock rendered');
    return (
        <div>
            Mock {value}
        </div>
    )
}
