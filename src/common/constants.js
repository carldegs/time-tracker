export const STOPS = {
    VGOLF: 'VGOLF',
    PASIG: 'PASIG',
    KALAYAAN: 'KALAYAAN',
    MCKINLEY: 'MCKINLEY',
    SCIHUB: 'SCIHUB'
};

export const STOPS_DATA = {
    [STOPS.VGOLF]: {
        key: STOPS.VGOLF,
        name: 'Valley Golf',
        step: 0
    },
    [STOPS.PASIG]: {
        key: STOPS.PASIG,
        name: 'Pasig',
        step: 1
    },
    [STOPS.KALAYAAN]: {
        key: STOPS.KALAYAAN,
        name: 'Kalayaan',
        step: 2
    },
    [STOPS.MCKINLEY]: {
        key: STOPS.MCKINLEY,
        name: 'McKinley Hill',
        step: 3
    },
    [STOPS.SCIHUB]: {
        key: STOPS.SCIHUB,
        name: 'Science Hub',
        step: 4
    }
}

export const STOP_STATUS = {
    ON_RIDE: 'ON_RIDE',
    ARRIVED: 'ARRIVED'
}

export const TRANSPORT_TYPES = {
    JEEP: 'JEEP',
    BUS: 'BUS',
    UV: 'UV',
    TAXI: 'TAXI'
}

export const TRANSPORT_TYPE_ICONS = {
    [TRANSPORT_TYPES.JEEP]: "https://img.icons8.com/ios-glyphs/30/000000/jeep-wrangler.png",
    [TRANSPORT_TYPES.BUS]: "https://img.icons8.com/ios-glyphs/30/000000/bus.png",
    [TRANSPORT_TYPES.UV]: "https://img.icons8.com/ios-glyphs/30/000000/vanpool--v1.png",
    [TRANSPORT_TYPES.TAXI]: "https://img.icons8.com/ios-glyphs/30/000000/taxicab.png"
}

export const MOCK_DATA = {
    date: '2019-07-19T13:15:52.451Z',
    stops: [
        {
            stop: STOPS.VGOLF,
            arriveTime: '2019-07-19T13:15:52.451Z',
            departTime: '2019-07-19T13:30:52.451Z',
            transportType: TRANSPORT_TYPES.UV
        },
        {
            stop: STOPS.KALAYAAN,
            arriveTime: '2019-07-19T14:15:52.451Z',
            departTime: '2019-07-19T15:16:52.451Z',
            transportType: TRANSPORT_TYPES.JEEP
        },
        {
            stop: STOPS.MCKINLEY,
            arriveTime: '2019-07-19T15:25:52.451Z',
            departTime: '2019-07-19T15:35:52.451Z',
            transportType: TRANSPORT_TYPES.BUS
        },
        {
            stop: STOPS.SCIHUB,
            arriveTime: '2019-07-19T15:42:52.451Z',
        }
    ]
}