import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

history.listen(() => {
    // if (window) {
    //     try {
    //         window.scrollTo({
    //             top: 0,
    //             left: 0,
    //             behavior: 'smooth',
    //         });
    //     } catch (e) {
    //         window.scrollTo(0, 0);
    //     }
    // }
});

export default history;
