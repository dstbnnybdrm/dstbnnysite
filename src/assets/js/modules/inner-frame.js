const innerFrameFooter = document.getElementById("inner-frame-footer");

export function initInnerFrame() {
    if (!innerFrameFooter) {
        return;
    }

    innerFrameFooter.hidden = window.self == window.top ? false : true;
}
