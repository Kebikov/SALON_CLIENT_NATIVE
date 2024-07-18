import { logger, consoleTransport } from 'react-native-logs';


const defaultConfig = {
    levels: {
        debug: 0,
        info: 1,
        dot: 2,
        error: 3,
        page: 3
    },
    severity: 'debug',
    transport: consoleTransport,
    transportOptions: {
        colors: {
            page: 'yellow',
            info: 'green',
            dot: 'pink',
            error: 'redBright'
        }
    },
    async: true,
    dateFormat: 'iso',
    printLevel: true,
    printDate: true,
    fixedExtLvlLength: false,
    enabled: true
};

let log = logger.createLogger<'page' | 'info' | 'error' | 'dot'>(defaultConfig);

export default log;
