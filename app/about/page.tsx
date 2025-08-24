"use client";

import BlurText from "../../components/BlurText";
import AnimatedList from '../../components/AnimatedList'

// AnimatedList
const items = ['nigga 1', 'nigga 2', 'nigga 3', 'nigga 4', 'nigga 5', 'nigga 6', 'nigga 7', 'nigga 8', 'nigga 9', 'nigga 10']; 

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

export default function about () { 
    return(
        <>
        <div className="flex justify-center items-center">
            <div className="flex justify-center items-center h-full text-9xl font-mono mx-10">
                <BlurText
                    text="List of Niggas?!"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-2xl mb-8"
                />
            </div>

            <AnimatedList
                items={items}
                onItemSelect={(item, index) => console.log(item, index)}
                showGradients={true}
                enableArrowNavigation={true}
                displayScrollbar={true}
                />
        </div>
        </>
    ); 
}