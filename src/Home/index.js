import { createStackNavigator } from 'react-navigation'
import Home from './home';
import Pdf from './pdf';

export default createStackNavigator({
    Home,
    Pdf
},
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);