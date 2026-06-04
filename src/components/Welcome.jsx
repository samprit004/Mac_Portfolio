import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const FONT_WEIGHTS = {
    subtitle: {min: 100, max: 400, default: 100},
    title: {min: 100, max: 800, default: 300}
}

const renderText = (text, className, baseweight = 300) => {
    return [...text].map((char, i) => (
        <span
        key={i}
        className={`font-inter ${className}`}
        style={{ fontVariationSettings: `'wght' ${baseweight}` }}>
            {char === " " ? "\u00A0" : char}
        </span>
    ))
}

const steupTextHover = (container, type) => {
    if (!container) return;

    const letters = container.querySelectorAll('span');
    const {min, max, default: baseweight} = FONT_WEIGHTS[type];

    const animateLetters = (letter, weight, duration = 0.25) => {
        return gsap.to(letter, {
            fontVariationSettings: `'wght' ${weight}`,
            duration,
            ease: "power2.Out",
           
        })
    }

    const handleMouseMove = (e) => {
        const {left} = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter) => {
            const { left: letterLeft, width } = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (letterLeft - left + width / 2));
            const intensity = Math.exp(-(distance ** 2) / 5000);

            animateLetters(letter, baseweight + (max - baseweight) * intensity);
        });
    }

    const handleMouseLeave = () => {
        letters.forEach((letter) => {
            animateLetters(letter, baseweight);
        });
    }

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
    };
}

const Welcome = () => {
  
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)

    useGSAP(() => {
        const cleanupTitle = steupTextHover(titleRef.current, 'title');
        const cleanupSubtitle = steupTextHover(subtitleRef.current, 'subtitle');

        return () => {
            cleanupTitle?.();
            cleanupSubtitle?.();
        };
    },[]);
  
    return (
    <section id='welcome' className="max-sm:hidden">
        <p ref={subtitleRef}>
            {renderText(
                "Hey, It's Samprit! Welcome to my", 
                "text-2xl ",
                100
            )}
        </p>
        <h1 ref={titleRef} className="mt-5">
            {renderText(
                "Portfolio", 
                "text-9xl tracking-[0.08em] italic", 
                300
            )}</h1>

        <div className="small-screen">
            <p>This Portfolio is only available on desktop and tablet screens</p>
        </div>
    </section>
  )
}

export default Welcome