import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const propTypes = {
    time: PropTypes.string,
    diff: PropTypes.string
};

const defaultProps = {
    time: '',
    diff: ''
};

class DiffTimer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tick: 0
        }
    }

    componentDidMount(){
        this.interval = setInterval(() => {
            this.setState(prev => ({
                tick: prev.tick++
            }))
        }, 100);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        const { time, diff, ...props } = this.props;
        const diffTime = (diff ? moment(diff) : moment()).diff(time ? moment(time) : moment());
        return(
            <div {...props}>
                { moment.utc(diffTime).format("HH:mm:ss.S") }
            </div>
        )
    }
}

DiffTimer.propTypes = propTypes;
DiffTimer.defaultProps = defaultProps;

export default DiffTimer;