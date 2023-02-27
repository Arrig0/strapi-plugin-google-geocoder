import React from 'react';
import PropTypes from 'prop-types';
export default class Marker extends React.Component {
    static propTypes: {
        text: PropTypes.Requireable<string>;
    };
    static defaultProps: {};
    constructor(props: any);
    render(): JSX.Element;
}
