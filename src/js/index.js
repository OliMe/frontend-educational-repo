import _ from 'lodash';
import '../scss/main.scss';

/**
 * Created by pavel_s on 18.09.17.
 */
function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Этот код из офф туториала вебпака!'], ' ');
    element.classList.add('hello');

    return element;
}

document.body.appendChild(component());