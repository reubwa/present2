
export const SlideTypes = {
    TextBullets : "Text and Bullet Points",
    TitleSubtitle : "Title and Subtitle",
    Markdown : "Markdown",
    Image : "Image",
    Maths : "Maths",
    Code : "Code"
};

export const BuiltInThemes = {
    Beige : "Beige",
    Blood : "Blood",
    Black : "Black",
    League : "League",
    Moon : "Moon",
    Night : "Night",
    Serif : "Serif",
    Simple : "Simple",
    Sky : "Sky",
    Solarized : "Solarized",
    White : "White",
    Dracula : "Dracula"
};

export const Transitions = {
    None : "None",
    Fade : "Fade",
    Slide : "Slide",
    Convex : "Convex",
    Concave : "Concave",
    Zoom : "Zoom"
};

export const TransitionSpeeds = {
    Default : "Default",
    Fast : "Fast",
    Slow : "Slow"
};

export const TransitionModes = {
    Entry : "Entry",
    Exit : "Exit"
};

export class SlideContent {
    type : SlideTypes;
    strings : string[];
    constructor(type : SlideTypes){
        this.type = type;
        this.strings = [];
    }
}

export class Slide {
    title : string;
    content : SlideContent;
    number : number;
    entryTransition : Transitions;
    exitTransition : Transitions;
    transitionSpeeds : TransitionSpeeds;
    constructor(type : SlideTypes){
        this.title = "";
        this.content = new SlideContent(type);
        this.number = 0;
        this.entryTransition = Transitions.None;
        this.exitTransition = Transitions.None;
        this.transitionSpeeds = TransitionSpeeds.Default;
    }
}

export class Presentation {
    title : string;
    slides : Slide[];
    theme : BuiltInThemes;
    constructor(title : string){
        this.title = title;
        this.slides = [];
        this.theme = BuiltInThemes.White;
    }
    addSlide(slide : Slide){
        slide.number = this.slides.length + 1;
        this.slides.push(slide);
    }
    removeSlide(index : number){
        this.slides.splice(index,1);
    }
}

export function getIcon(slide_type : SlideTypes): string{
    switch(slide_type){
        case SlideTypes.TextBullets : return 'ListIcon';
        case SlideTypes.TitleSubtitle : return 'BookTextIcon';
        case SlideTypes.Markdown : return 'AArrowDownIcon';
        case SlideTypes.Image : return 'Image';
        case SlideTypes.Maths : return 'SquareSigmaIcon';
        case SlideTypes.Code : return 'Code';
        default : return '';
    }
}

export type SlideTypes = typeof SlideTypes[keyof typeof SlideTypes];
export type BuiltInThemes = typeof BuiltInThemes[keyof typeof BuiltInThemes];
export type Transitions = typeof Transitions[keyof typeof Transitions];
export type TransitionSpeeds = typeof TransitionSpeeds[keyof typeof TransitionSpeeds];
export type TransitionModes = typeof TransitionModes[keyof typeof TransitionModes];