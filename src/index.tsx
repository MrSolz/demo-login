export { default as DemoScreen } from './screens/Demo/demo'
export { default as LoginScreen } from './screens/Login'
import { Subject } from 'rxjs';

import { store, getStore } from './models';
interface DefaultProps {
    api_url: string,
    api_login_url: string
};
export const setDefaultProps = (obj: DefaultProps) => {
    console.log("set store", obj);
    store.initStore.saveInit(obj)
    console.log('====================================');
    console.log("initStore", getStore);
    console.log('====================================');

}

export const subject = new Subject()