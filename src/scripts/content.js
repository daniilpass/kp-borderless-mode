
// Constants
const layoutBottomClassName  = "Layout_bottom_";
const bottomControlsClassName = "BottomControls_controls_";
const bottomControlsSpacesClassName = "BottomControls_controls-spacer";
const videoPlayerTagName = "video";

const OBJECT_FIT_CONTAIN = 'contain';
const OBJECT_FIT_COVER = 'cover';

// Add events
document.addEventListener('DOMNodeInserted', handleDomEvents);

function handleDomEvents (e) {
    if (e.target && e.target.className && e.target.className.startsWith(layoutBottomClassName)) {
        injectButtonChangeVideoFit();
    }
}

function injectButtonChangeVideoFit () {
    // get dom elements
    const bottomControls = document.querySelector(`[class^="${bottomControlsClassName}"]`);
    const bottomControlsSpaces = bottomControls && bottomControls.querySelectorAll(`[class^="${bottomControlsSpacesClassName}"]`);
    const bottomControlsLastSpace = bottomControlsSpaces && bottomControlsSpaces[bottomControlsSpaces.length-1];
    const videoPlayer = document.getElementsByTagName(videoPlayerTagName)[0];

    // check dom exists
    if (!bottomControlsLastSpace || !videoPlayer) {
        return;
    }
    
    // create button
    let buttonChangeVideoFit = createButtonChangeVideoFit(videoPlayer)

    // insert button
    insertBefore(buttonChangeVideoFit, bottomControlsLastSpace);

    // insert space
    insertBefore(bottomControlsLastSpace.cloneNode(true), buttonChangeVideoFit);
}

function createButtonChangeVideoFit (videoPlayer) {
    // create button
    let button = document.createElement('div');

    let label = document.createElement('label');
    label.htmlFor = 'dp-checkbox_change-fit';
    label.className = 'dp-button_change-fit';
    label.onchange = () => {
        if (videoPlayer.style.objectFit == OBJECT_FIT_COVER) {
            videoPlayer.style.objectFit = OBJECT_FIT_CONTAIN;
        } else {
            videoPlayer.style.objectFit = OBJECT_FIT_COVER;
        }            
    }

    let checkbox = document.createElement('input');
    checkbox.id = 'dp-checkbox_change-fit';
    checkbox.type = 'checkbox';
    checkbox.checked = videoPlayer.style.objectFit == OBJECT_FIT_COVER;

    let icon = document.createElement('div');
    icon.className = 'dp-ic-widescreen';
    icon.innerHTML = "<div class='dp-ic-widescreen__inner'></div>";

    label.appendChild(checkbox);
    label.appendChild(icon);
    button.appendChild(label);

    return button;
}

function insertBefore (newElement, existingElement) {
    existingElement.parentNode.insertBefore(newElement, existingElement);
}
