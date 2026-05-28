import React, { useLayoutEffect, useRef } from 'react'
import useWindowStore from '#store/Window.js'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

const WindowWrapper = (Component, windowKey) => {

    const Wrapped = (props) => {
        const {focusWindow, windows} = useWindowStore();
        const {isOpen, zIndex} = windows[windowKey];
        const ref = useRef(null);

        useGSAP(() => {
            const el = ref.current;
            if(!el || !isOpen) return;
            el.style.display = 'block';

            gsap.fromTo(
                el, 
                { scale: 0.8, opacity: 0 , y: 40},
                { scale: 1, opacity: 1, y: 0, duration: 0.1, ease: "power3.Out"});
        },[isOpen])

        useLayoutEffect(() => {
            const el = ref.current;
            if(!el) return;
            el.style.display = isOpen ? 'block' : 'none';
        },[isOpen])

        useGSAP(() => {
            const el = ref.current;
            if(!el) return;
            const dragHandle =
                el.querySelector('[data-window-drag-handle="true"]') ||
                el.querySelector('#window-header') ||
                el.querySelector('.terminal-header');

            if (dragHandle) {
                dragHandle.style.touchAction = 'none';
            }

            const [instance] = Draggable.create(el, {
                trigger: dragHandle ?? el,
                // Disable GSAP's built-in z-index boost — it uses an internal
                // counter that produces values far below our React-managed range
                // (1001+), causing pressed windows to sink behind others.
                // We manage z-index entirely through focusWindow/openWindow.
                zIndexBoost: false,
                onPress: function() {
                    // Bring this window to front on every press.
                    // Safe to call unconditionally because onpress fires on
                    // pointerdown, which is always before the click event that
                    // triggers React's onClick / openWindow for any child window.
                    // So if a child opens (onClick → openWindow), it runs AFTER
                    // this focusWindow call and receives topZ+1, landing on top.
                    focusWindow(windowKey);
                },
            });
            return () => instance.kill();
        },[])

        return( <section id={windowKey} ref={ref} style={{zIndex, display: 'none'}} className="absolute">
            <Component {...props} />
        </section>
        )
    }

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`;

    return Wrapped;
}

export default WindowWrapper