import { STOPS_DATA, STOP_STATUS } from "./constants";

export const getStop = stopKey => {
    return STOPS_DATA[stopKey] || {};
}

export const getNextStops = stopKey => {
    const currStep = getStopStep(stopKey);
    return currStep <= Object.keys(STOPS_DATA).length ? getStopsArr().slice(currStep + 1) : [];
}

export const getNextStop = stopKey => {
    const currStep = getStopStep(stopKey);
    return currStep <= Object.keys(STOPS_DATA).length ? getStopsArr()[currStep + 1] : null;
}

export const getStopsArr = () => {
    let stopsArr = [];

    Object.keys(STOPS_DATA).forEach(stopKey => {
        const sData = STOPS_DATA[stopKey]
        stopsArr[sData.step] = sData;
    });

    return stopsArr;
}

export const getStopStep = stopKey => STOPS_DATA[stopKey] ? STOPS_DATA[stopKey].step : -1;

export const isEmpty = str => {
    return !str || str === '' || str === undefined || str === null;
}

export const getStopStatus = stopData => {
    return isEmpty(stopData && stopData.arriveTime) ? STOP_STATUS.ON_RIDE : STOP_STATUS.ARRIVED;
}

export const isLastStop = stopKey => getStopsArr().length - 1 === getStopStep(stopKey);