import React from 'react';
// import PropTypes from 'prop-types';
import { getNextStop, isLastStop, getNextStops, getStop, getStopsArr, getStopStep } from '../common/utils';
import './Tracker.scss';
import { STOPS, STOP_STATUS, TRANSPORT_TYPES, TRANSPORT_TYPE_ICONS } from '../common/constants';
import moment from 'moment';
import DiffTimer from '../common/DiffTimer';

const propTypes = {

};

const defaultProps = {

};

class Tracker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stopKey: '',
            prevStopKey: '',
            prevTempStopKey: '',
            tempStopKey: STOPS.VGOLF,
            stopsData: {},
            stopStatus: STOP_STATUS.ON_RIDE,
            showStopsDropdown: false,
            showUndoArrival: false,
            showUndoDeparture: false,
        }
    }

    handleNextStop = () => {
        this.setState(prev => {
            const nextStop = getNextStop(prev.stopKey);
            return ({
                stopKey: nextStop ? nextStop.key : prev.stopKey
            });
        })
    }

    handleStopOptionClick = tempStopKey => {
        this.setState({ 
            tempStopKey,
            showStopsDropdown: false
        });
    }

    handleArrival = () => {
        this.setState(prev => ({
            stopKey: prev.tempStopKey,
            prevStopKey: prev.stopKey,
            stopsData: {
                ...prev.stopsData,
                [prev.tempStopKey]: {
                    ...prev.stopsData[prev.tempStopKey],
                    arriveTime: moment().toISOString()
                }
            },
            stopStatus: STOP_STATUS.ARRIVED,
            showStopsDropdown: false,
            showUndoArrival: true,
            showUndoDeparture: false
        }));
    }

    handleArrivalUndo = () => {
        this.setState(prev => ({
            stopKey: prev.prevStopKey,
            prevStopKey: '',
            stopsData: {
                ...prev.stopsData,
                [prev.tempStopKey]: {
                    ...prev.stopsData[prev.tempStopKey],
                    arriveTime: undefined
                }
            },
            stopStatus: STOP_STATUS.ON_RIDE,
            showStopsDropdown: false,
            showUndoArrival: false
        }))
    }

    handleDeparture = transportType => {
        this.setState(prev => {
            const nextStop = getNextStop(prev.stopKey);
            return ({
                tempStopKey: nextStop ? nextStop.key : prev.tempStopKey,
                prevTempStopKey: prev.tempStopKey,
                stopsData: {
                    ...prev.stopsData,
                    [prev.stopKey]: {
                        ...prev.stopsData[prev.tempStopKey],
                        departTime: moment().toISOString(),
                        transportType
                    }
                },
                stopStatus: STOP_STATUS.ON_RIDE,
                showStopsDropdown: false,
                showUndoDeparture: true,
                showUndoArrival: false
            });
        });
    }

    handleDepartureUndo = () => { 
        this.setState(prev => {
            return({
                tempStopKey: prev.prevTempStopKey,
                prevTempStopKey: '',
                stopsData: {
                    ...prev.stopsData,
                    [prev.stopKey]: {
                        ...prev.stopsData[prev.stopKey],
                        departTime: undefined,
                        transportType: undefined
                    }
                },
                stopStatus: STOP_STATUS.ARRIVED,
                showStopsDropdown: false,
                showUndoDeparture: false
            })
        })
    }

    toggleDropdown = () => {
        this.setState(prev => ({ 
            showStopsDropdown: !prev.showStopsDropdown
        }));
    }

    renderTotalTimeCard = () => {
        const { stopsData } = this.state;
        const stopsArr = getStopsArr();
        const { arriveTime: overallStartTime } = stopsData[stopsArr[0].key] || {};
        const { arriveTime: overallEndTime } = stopsData[stopsArr[stopsArr.length - 1].key] || {};

        return overallStartTime && (
            <div className='card'>
                <DiffTimer time={overallStartTime} diff={overallEndTime} className='timer large'/>
                <div className='card-title'>Total commute time</div>
            </div>
        )
    }

    renderArrivalDepartureTime = () => {
        const { stopsData, stopKey } = this.state;
        const stopData = stopsData[stopKey];
        const { arriveTime, departTime } = stopData || {};

        return (arriveTime || departTime) && !isLastStop(stopKey) && (
            <div className='arrival-departure'>
                <div className='card'>
                    <DiffTimer time={arriveTime} diff={departTime} className='timer'/>
                    <div className='card-title'>Current wait time</div>
                </div>
                <div className='card'>
                    <DiffTimer time={departTime} className='timer'/>
                    <div className='card-title'>Current ride time</div>
                </div>
            </div>
        )
    }

    renderTimeTable = () => {
        const { stopsData } = this.state;
        let stopsArr = [];

        Object.keys(stopsData).forEach(stopKey => {
            stopsArr[getStopStep(stopKey)] = {
                ...stopsData[stopKey],
                key: stopKey
            };
        });

        return stopsArr.length > 0 && (
            <div className='card time-table'>
                <div className='row header'>
                    <div className='col' style={{flexGrow: 2}}>Stop</div>
                    <div className='col'>Arrival</div>
                    <div className='col'>Departure</div>
                </div>
                {stopsArr.filter(stop => stop).map(stopData => (
                    <div className='row'>
                        <div className='col' style={{flexGrow: 2}}>{getStop(stopData.key).name}</div>
                        <div className='col'>{stopData.arriveTime && moment(stopData.arriveTime).format('h:mm a')}</div>
                        <div className='col'>{stopData.departTime && moment(stopData.departTime).format('h:mm a')}</div>
                    </div>
                ))}
            </div>
        )
    }

    render(){
        const { stopKey, stopStatus, showStopsDropdown, tempStopKey, showUndoArrival, showUndoDeparture } = this.state;
        const nextStops = getNextStops(stopKey);
        // const stopStatus = getStopStatus(stopsData[tempStopKey]);

        console.log("state", this.state);

        return(
            <div className='tracker-page'>
                <div className='stop-header'>
                    <div className='next-stop'>{ stopStatus === STOP_STATUS.ARRIVED ? 'Select ride' : 'Next stop' }</div>
                    { showUndoArrival && 
                        <img
                            className='undo-button'
                            onClick={this.handleArrivalUndo}
                            src="https://img.icons8.com/ios-glyphs/30/000000/undo.png"
                            alt='undo-arrival'
                        />
                    }
                    { showUndoDeparture && 
                        <img
                            className='undo-button'
                            onClick={this.handleDepartureUndo}
                            src="https://img.icons8.com/ios-glyphs/30/000000/undo.png"
                            alt='undo-departure'
                        />
                    }
                    <div className='stop-select'>
                        <div
                            className={`curr ${stopStatus === STOP_STATUS.ARRIVED ? 'disabled' : ''}`}
                            onClick={stopStatus === STOP_STATUS.ARRIVED ? null : this.toggleDropdown}
                        >
                            { getStop(tempStopKey).name }
                        </div>
                        { showStopsDropdown &&
                            <div className='options'>
                                { nextStops.map((sData, i) => (
                                    <React.Fragment>
                                        <div 
                                            key={`option-${sData.key}`}
                                            className='option'
                                            onClick={() => { this.handleStopOptionClick(sData.key) }}
                                        >
                                            {sData.name}
                                        </div>
                                        { nextStops.length - 1 > i && <div className='divider'/>}
                                    </React.Fragment>
                                ))}
                            </div>
                        }
                    </div>
                </div>
                { !isLastStop(stopKey) &&
                    <div className='option-buttons'>
                        { stopStatus === STOP_STATUS.ON_RIDE &&
                            <div className='arrived-button' onClick={this.handleArrival}>
                                <span>Arrived</span>
                            </div>
                        }
                        { (stopStatus === STOP_STATUS.ARRIVED && !isLastStop(stopKey)) &&
                            <div className='transport-buttons'>
                                { Object.keys(TRANSPORT_TYPES).map(transportType => (
                                    <div className='transport-option' onClick={() => { this.handleDeparture(transportType) }}>
                                        <img src={TRANSPORT_TYPE_ICONS[transportType]} alt={`transport-type-${transportType}`}/>
                                        <span>{transportType}</span>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                }
                <div style={{overflow: 'hidden'}}>
                    { this.renderTotalTimeCard() }
                    { this.renderArrivalDepartureTime() }
                    { this.renderTimeTable() }
                </div>
            </div>
        )
    }
}

Tracker.propTypes = propTypes;
Tracker.defaultProps = defaultProps;

export default Tracker;