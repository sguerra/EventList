import Router from './router.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

let $content = document.getElementById('content');

let router = new Router();
router.run($content);